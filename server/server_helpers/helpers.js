const _ = require('lodash');
const Promise = require('bluebird');
const Clarifai = require('clarifai');
const DbForSavingPhotoAPIResults = require('./DbForSavingPhotoAPIResults');
const key = require('../../keys.js');
const categories = require('./categories.js');
const client = Promise.promisifyAll(
  new Clarifai({
    id: key.clarifaiClientID,
    secret: key.clarifaiClientSecret,
  })
);

// take an array and return arr selecting only =limit # of elements
module.exports.minimizeAndRandArr = (arr, targetLength) => {
  const totalLen = arr.length;
  const di = totalLen / targetLength;
  const results = [];

  if (totalLen <= targetLength) {
    return arr;
  }
  for (let i = 0; i < totalLen; i += di) {
    const ind = Math.floor(i + Math.floor(Math.random() * di));
    console.log(ind);
    results.push(arr[ind]);
  }
  return results;
};

// OLD: Takes an array of photos and return an array w/ attributes
module.exports.createArrayOfPhotos = (imageArray) => {
  const result = [];
  for (let img = 0; img < imageArray.length; img++) {
    result.unshift({
      thumbnail: imageArray.models[img].attributes.url,
      src: imageArray.models[img].attributes.url,
      arcId: imageArray.models[img].attributes.arc_id,
    });
  }
  return result;
};

// Get Tags from Clarifai (memoized on database) and return array with photos
module.exports.getTags = (photoArray, callback) => {
  const db = Promise.promisifyAll(new DbForSavingPhotoAPIResults());
  let imagesFoundInDb;
  let imagesNotFoundInDb;
  let images;
  client.getAccessTokenAsync()

  // See what is already in the db
  .then(() => db.retrieveUsingArrayAsync(photoArray))

  // Tag items not found in db
  .then(({ imagesFound, imagesNotFound }) => {
    imagesFoundInDb = imagesFound;
    imagesNotFoundInDb = imagesNotFound;
    console.log('images in db:', imagesFoundInDb.length);
    console.log('images not in db:', imagesNotFoundInDb.length);

    if (imagesNotFoundInDb.length > 0) {
      return client.tagFromUrlsAsync('image', imagesNotFoundInDb);
    }
    // if no images needed to lookup resolve with blank array
    return new Promise(resolve => resolve([]));
  })

  // Save tags from images not found into db
  .then((newlyTagged) => {
    // put in array if Clarifai only returns one item
    let newTags = newlyTagged;
    if (!Array.isArray(newTags)) {
      newTags = [newTags];
    }

    const dbAddPromises = [];
    images = Array(imagesNotFoundInDb.length);
    for (let i = 0; i < imagesNotFoundInDb.length; i++) {
      images[i] = { url: imagesNotFoundInDb[i], apiData: newTags[i] };
      console.log('add url', images[i].url);
      console.log('add apiData', JSON.stringify(images[i].apiData));
      console.log('\n\n');
      dbAddPromises.push(db.addAsync(images[i].url, images[i].apiData));
    }
    return Promise.all(dbAddPromises);
  })

  // Combine all images in one array
  .then(() => {
    console.log(`${imagesNotFoundInDb.length} images successfully added to db`);
    images = images.concat(imagesFoundInDb);
    callback(null, images);
  })
  .catch(err => callback(err));
};

module.exports.classifyTags = (tags) => {
//   // TODO: Complete Function
  // Input is an array of tags
  // Output is an array of one or multiple categories (ex: ['professional', 'headshot'])
  const categorized = [];
  _.each(categories, (value, index) => {
    // Look at all the tags
    for (let i = 0; i < tags.length; i++) {
      // If it is inside the categories array, push it but break immediately
      // so there are no duplicate categories
      if (_.indexOf(value, tags[i].class) !== -1) {
        categorized.push(index);
        break;
      }
    }
  });
  return categorized;
};


// Helper Functions that I need
  // Get the facebook photos that I need from the array Andy is sending me
    // PENDING: May already have from createArrayofPhotos Helper

