import React from 'react';
import Slider from 'react-viewport-slider';
const data = [
  "https://scontent.xx.fbcdn.net/v/t1.0-9/13100690_10208272746391839_223693133460415313_n.jpg?oh=ebf000696e6a9e4a5fc3f6b0f17b3cb2&oe=57CBE11D#.jpg",
  "https://scontent.xx.fbcdn.net/t31.0-8/12484741_10207288525666936_5053017157545856962_o.jpg#.jpg",
  "https://scontent.xx.fbcdn.net/t31.0-8/12310036_10207056305501577_3307527667839448203_o.jpg#.jpg",
  "https://scontent.xx.fbcdn.net/v/t1.0-9/12241323_10206996628689694_5449847592439127282_n.jpg?oh=8399ffd40d0a5d35d68d6369163ee074&oe=5800E2A3#.jpg",
  "https://scontent.xx.fbcdn.net/t31.0-8/11109437_10205450636520856_3106000668922565474_o.jpg#.jpg",
  "https://scontent.xx.fbcdn.net/v/t1.0-9/18687_10205445922363005_8643246825540455017_n.jpg?oh=1633adee9aeaf99a3803d1669be200ef&oe=57D674E0#.jpg",
  "https://scontent.xx.fbcdn.net/v/t1.0-9/10639376_10204024796075736_2947119624606504994_n.jpg?oh=0dc848d16f97a42d2b784c57b97d9bfb&oe=57D7D106#.jpg",
  "https://scontent.xx.fbcdn.net/t31.0-8/10506885_10203766215731389_8273713365625673583_o.jpg#.jpg",
  "https://scontent.xx.fbcdn.net/v/t1.0-9/10372539_10202332334659952_3436401212391021871_n.jpg?oh=33c969e2bb49e78a5e7dc6da2731470a&oe=57CBDCF9#.jpg"
];

const Slides = () => (
  <Slider>
    <div itemStyle={{ backgroundColor: '#002D8E' }}>
      <div className="Aligner  centering text-center">
        <div className="col-md-8 choiceAligner choiceContainer">
          <div className="content h1">
          Headshot
            <div className="photoContainer">
              {data.map(image => <img className='photo' src={image} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div itemStyle={{ backgroundColor: '#00B1F2' }}>
      <div className="Aligner centering text-center">
        <div className="col-md-8 choiceAligner choiceContainer">
          <div className="content h1">Professional</div>
        </div>
      </div>
    </div>
    <div itemStyle={{ backgroundColor: '#0099F2' }}>
      <div className="Aligner centering text-center">
        <div className="col-md-8 choiceAligner choiceContainer">
          <div className="content h1">Athletic</div>
        </div>
      </div>
    </div>
    <div itemStyle={{ backgroundColor: '#F2D500' }}>
      <div className="Aligner  centering text-center">
        <div className="col-md-8 choiceAligner choiceContainer">
          <div className="content h1">Adventurous</div>
        </div>
      </div>
    </div>
    <div itemStyle={{ backgroundColor: '#C9009D' }}>
      <div className="Aligner  centering text-center">
        <div className="col-md-8 choiceAligner choiceContainer">
          <div className="content h1">You're done!</div>
        </div>
      </div>
    </div>
  </Slider>
);

export default Slides;
