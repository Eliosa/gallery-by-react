require('normalize.css/normalize.css');
// require('styles/App.css');
require('styles/App.scss');


import React from 'react';
import ReactDOM from 'react-dom';

//获取图片信息
var imageData = require('../data/imageData.json');

//将图片名信息转化成图片URL路径信息
imageData = (function genImageData(imageDataArr) {
  for (var i = 0; i < imageDataArr.length; i++){
    imageDataArr[i].imgURL = require('../images/' + imageData[i].flieName);
  }
  return imageDataArr;
})(imageData);

/**
 * 图片组件
 */
function ImgFigure(props){
  // 如果props中指定了这张图片的定位信息 则使用
  var styleObj = [];
  if (props.arrange.pos) {
    styleObj = props.arrange.pos;
  }

  if (props.arrange.rotate) {
    (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(value => {
      styleObj[value ] = 'rotate(' + props.arrange.rotate + 'deg)';
    });
  }

  if(props.arrange.isCenter){
    styleObj.zIndex = 11;
  }

  var ImgFigureClassName = 'img-figure';
  ImgFigureClassName += props.arrange.isInverse ? ' isInverse':'';
  
  return(
    <figure className={ImgFigureClassName} style={styleObj}  onClick={props.onClick}>
      <img src={props.data.imgURL} alt={props.data.title} />
      <figCaption>
        <h2 className="img-title">{props.data.title}</h2>
        <div className="img-back">
          {props.data.Desc}
        </div>
      </figCaption>
    </figure>
  )
}

/**
 * 控制组件
 */
function ControllerUnit(props){

  var controllerUnit_ClassName = 'controller-unit';
  controllerUnit_ClassName += props.arrange.isCenter ? ' selected' : '';
  return (
    <span className={controllerUnit_ClassName} onClick={props.onClick}></span>
  )
}

/**
 * 获取区间内任意一个随机值
 * @param {*} low  上区间
 * @param {*} high   下区间
 */
function getRangeRandom(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

/**
 * 获取 0~30°之间,任意正负值
 */
function get30DegRandom() {
  return (Math.random() > 0.5 ? '' : '-') + Math.floor(Math.random() * 30);
}

class AppComponent extends React.Component {
  constructor(props){
    super(props);
    var constant = {
      centerPos:{
        left:0,
        top:0
      },
      hPosRange:{  //水平方向取值范围
        leftSecX:[0,0],
        rightSecX:[0,0],
        y:[0,0]
      },
      vPosRange:{  //垂直方向取值范围
        x:[0,0],
        topY:[0,0]
      }
    }

    this.Constant = constant;

    this.state = {
      imgsArrangeArr:[
        // {
        //   post:{
        //     left:'0',
        //     top:'0'
        //   },
        //   rotate: 0 ,//旋转角度
        //   isInverse: false,  //当前是否旋转
        //   isCenter: false //是否是最中间的图片
        // }
      ]
    }
  }
  /**
   * 图片点击翻转
   */

  inverse(index) {
    var imgsArrangeArr = this.state.imgsArrangeArr;

    imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

    this.setState({
      imgsArrangeArr: imgsArrangeArr
    });
  }

  center(index){
    this.reArrange(index);
  }

  handleClick(index, e) {
    e.stopPropagation();
    e.preventDefault();

    // this.inverse.bind(this,index);
    // this.inverse(index);

    if(this.state.imgsArrangeArr[index].isCenter){
      this.inverse(index);
    }else{
      this.center(index)
    }
  }

  /**
   * 重新布局所有图片
   * @param centerIndex 指定居中排布哪张图片
   */
  reArrange(centerIndex) {
    var imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRangeLeftSecX = Constant.hPosRange.leftSecX,
        hPosRangeRightSecX = Constant.hPosRange.rightSecX,
        hPosRangeY = Constant.hPosRange.y,
        vPosRangeTopY = Constant.vPosRange.topY,
        vPosRangeX = Constant.vPosRange.x,
        imgsArrangeTopArr = [],
        topImgNum = Math.floor(Math.random() * 2),
        topImgSpliceIndex = 0,
        imgArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);
        // imgArrangeCenterArr[0].pos = centerPos;
    
    //居中的centerIndex不需要旋转
    imgArrangeCenterArr[0] = {
      pos : centerPos,
      rotate: 0,
      isCenter: true
    };

    topImgSpliceIndex = Math.floor(Math.random() * imgsArrangeArr.length);
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
    
    // 布局位于上侧的图片
    imgsArrangeTopArr.forEach((value, index) => {
      imgsArrangeTopArr[index] = {
        pos:{
          top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
          left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
        },
        rotate: get30DegRandom(),
        isCenter: false
      }
    })

    // 布局位于左右两侧的图片
    for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
      var hPosRangeLORX = null;
      // 前半部分布局在左边，右半部分布局在右边
      if(i < k){
        hPosRangeLORX = hPosRangeLeftSecX;
      }else{
        hPosRangeLORX = hPosRangeRightSecX;
      }

      imgsArrangeArr[i] = {
        pos:{
          top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
          left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
        },
        rotate: get30DegRandom(),
        isCenter: false
      }
    }

    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
    }

    imgsArrangeArr.splice(centerIndex,0,imgArrangeCenterArr[0]);

    this.setState({
      imgsArrangeArr:imgsArrangeArr
    });
  }

  //组件加载成功以后为每张图片计算其位置范围
  componentDidMount(){
    //首先拿到舞台的大小
    var stageW = ReactDOM.findDOMNode(this.refs['stage']).scrollWidth,
        stageH = ReactDOM.findDOMNode(this.refs['stage']).scrollHeight,
        halfStageW = Math.floor(stageW / 2),
        halfStageH = Math.floor(stageH / 2);

    // 拿到每张图片卡片的大小
    var imgFigure = document.querySelector('.img-figure'),
        imgW = imgFigure.scrollWidth,
        imgH = imgFigure.scrollHeight,
        halfImgW = Math.floor(imgW / 2),
        halfImgH = Math.floor(imgH / 2);
    //计算中心图片位置
    this.Constant.centerPos = {
      top: halfStageH - halfImgH,
      left: halfStageW - halfImgW
    }
    // 计算左侧、右侧区域图片排布位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;
    // 计算上侧区域图片排布位置的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    this.reArrange(0);
  }

  render() {
    var controllerUnits = [], imgFigures = [],imgsArrangeArr = this.state.imgsArrangeArr;

    imageData.forEach((value, index) => {
      if (!imgsArrangeArr[index]) {
        imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0,
          isInverse: false,
          isCenter: false
        }
      }

      imgFigures.push(<ImgFigure data={value} arrange={this.state.imgsArrangeArr[index]} key={'imgF' + index} onClick={(e) => {this.handleClick(index ,e)}}/>);

      controllerUnits.push(<ControllerUnit  arrange={this.state.imgsArrangeArr[index]} key={'cUnit' + index} onClick={(e) => {this.handleClick(index ,e)}} />)
    });

    return (
      <div className="stage" ref="stage">
        <section className="image-sec">
            {imgFigures}
        </section>
        <nav className="controller-nav">
            {controllerUnits}
        </nav>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
