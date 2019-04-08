import React, { Component } from 'react';
import { css } from 'glamor';
import isEqual from 'lodash/isEqual';

const rotatePointOrder = pointOrder => {
  let result = Object.create(pointOrder);
  const first = result.shift();
  result.push(first);
  return result;
};

class Triangle extends Component {
  constructor(props) {
    super(props);

    const triHeight = this.props.scene.triHeight;

    this.state = {
      points: [[100, 100], [0, 100], [triHeight, 0]],
      pointOrder: [0, 1, 2],
    };
  }

  shouldComponentUpdate(nextProps) {
    if (
      isEqual(this.props.scene, nextProps.scene) ||
      nextProps.triIndex % nextProps.scene.every !== 0
    ) {
      return false;
    } else {
      return true;
    }
  }

  UNSAFE_componentWillReceiveProps({ scene, triIndex }) {
    const { triHeight, every, rotate, size } = scene;

    if (!isEqual(scene, this.props.scene)) {
      if (triIndex % every === 0) {
        const pointOrder = rotate
          ? rotatePointOrder(this.state.pointOrder)
          : this.state.pointOrder;
        const points = [[triHeight, 0], [size, size], [0, size]];
        const orderedPoints = [
          points[pointOrder[0]],
          points[pointOrder[1]],
          points[pointOrder[2]],
        ];

        this.setState({
          points: orderedPoints,
          oldPoints: this.state.points,
          pointOrder: pointOrder,
        });
      }
    }
  }

  render() {
    const { duration, color } = this.props.scene;

    let rule = css({
      float: 'right',
      display: 'inline',
      height: '100px',
      width: '100px',
    });

    let polygonRule = css({
      fill: color,
      animation: '',
    });

    const pointsString = this.state.points.map(xy => xy.join(',')).join(' ');

    let oldPointsString = '';
    let beginFn = null;

    if (this.state.oldPoints) {
      beginFn = animate => {
        if (animate) animate.beginElement();
      };

      oldPointsString = this.state.oldPoints.map(xy => xy.join(',')).join(' ');
    } else {
      oldPointsString = pointsString;
    }

    return (
      <div {...rule} className="Triangle">
        <svg width="100" height="100">
          <polygon
            {...polygonRule}
            points={oldPointsString}
            fill={color}
            style={{ transition: `fill ${duration}ms` }}
          >
            <animate
              ref={beginFn}
              fill="freeze"
              begin="indefinite"
              attributeName="points"
              dur={`${duration}ms`}
              from={oldPointsString}
              to={pointsString}
            />
          </polygon>
        </svg>
      </div>
    );
  }
}

export default Triangle;
