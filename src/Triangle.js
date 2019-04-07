import React, { Component } from 'react';
import { css } from 'glamor';
import isEqual from 'lodash/isEqual';

class Triangle extends Component {
  constructor(props) {
    super(props);

    const triHeight = this.props.triHeight;

    this.state = {
      points: [[100, 100], [0, 100], [triHeight, 0]],
    };
  }

  shouldComponentUpdate(nextProps) {
    if (
      isEqual(this.props, nextProps) ||
      nextProps.triIndex % nextProps.every !== 0
    ) {
      return false;
    } else {
      return true;
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { triHeight, triIndex, every, color } = nextProps;

    // let possibles = [
    //   [[triHeight, 0], [100, 100], [0, 100]],
    //   [[100, 100], [triHeight, 0], [0, 100]],
    //   [[0, 100], [100, 100], [triHeight, 0]],
    // ];
    //

    const { triHeight: a, triIndex: b, every: c, color: d } = this.props;

    if (!isEqual([triHeight, triIndex, every, color], [a, b, c, d])) {
      if (triIndex % every === 0) {
        this.setState({
          oldColor: this.state.color,
          points: [[triHeight, 0], [100, 100], [0, 100]],
          oldPoints: this.state.points,
          color: color,
        });
      }
    }
  }

  render() {
    let rule = css({
      float: 'right',
      display: 'inline',
      height: '100px',
      width: '100px',
    });

    let polygonRule = css({
      fill: this.props.color,
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
            fill={this.state.color}
            style={{ transition: `fill ${this.props.duration}ms` }}
          >
            <animate
              ref={beginFn}
              fill="freeze"
              begin="indefinite"
              attributeName="points"
              dur={`${this.props.duration}ms`}
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
