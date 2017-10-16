import React, { Component } from 'react';
import { css } from 'glamor';
import shuffle from 'lodash/shuffle';

class Triangle extends Component {
  constructor(props) {
    super(props);

    const triHeight = this.props.triHeight;

    this.state = {
      points: [
        [100,100],
        [0,100],
        [triHeight,0],
      ]
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      points: shuffle([
        [100,100],
        [0,100],
        [nextProps.triHeight,0],
      ]),
      oldPoints: this.state.points
    })
  }

  render() {
    let rule = css({
      float: 'right',
      display: 'inline',
      height: '100px',
      width: '100px',
    });

    let polygonRule = css({
      fill: '#666',
      animation: '',
    });

    const pointsString = this.state.points.map( (xy) => xy.join(",")).join(" ")

    let oldPointsString = "";
    let beginFn = null;

    if (this.state.oldPoints) {
      beginFn = (animate) => { if (animate) animate.beginElement(); }
      oldPointsString = this.state.oldPoints.map( (xy) => xy.join(",")).join(" ")
    } else {
      oldPointsString = pointsString;
    }

    return (
     <div {...rule} className="Triangle">
       <svg width="100" height="100">
        <polygon {...polygonRule} points={ oldPointsString }>
          <animate ref={ beginFn } fill="freeze" begin="indefinite" attributeName="points" dur="2000ms" from={ oldPointsString } to={ pointsString }/>
        </polygon>
       </svg>
     </div>
   );
  }
}

export default Triangle;
