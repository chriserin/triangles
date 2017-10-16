import React, { Component } from 'react';
import './TrianglesContainer.css';
import Triangle from './Triangle.js'

class TrianglesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {triHeight: 60}

    this.shift = this.shift.bind(this);
  }

  shift() {
    this.setState((prevState) => ({triHeight: prevState.triHeight === 0 ? 100 : 0 }))
  }

  render() {
    const triangles = Array(400).fill('').map(
      (_, i) => <Triangle key={i} triHeight={this.state.triHeight}/>
    )

    return (
      <div className="TrianglesContainer">
        <actions>
          <button onClick={ this.shift }>Shift</button>
        </actions>
        { triangles }
     </div>
   );
  }
}

export default TrianglesContainer;
