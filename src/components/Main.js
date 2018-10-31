require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

// //获取图片信息
// var imageData = require('../data/imageData.json');

// //将图片名信息转化成图片URL路径信息
// imageData = (function genImageData(imageData) {
//   for (var i = 0; i < imageData.length; i++){
//     var oneImage = require('../images' + imageData[i].fileName);
//     imageData[i] = oneImage;
//   }
// })(imageData);

class AppComponent extends React.Component {
  render() {
    return (
      <div className="stage">
        <section className="img-sec"></section>
        <nav className="controller-nav"></nav>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
