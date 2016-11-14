import React from 'react';

export default class Suggestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 600,
      height: 600,
    };
  }

  componentWillMount() {
    const width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    const height = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;
    this.setState({
      width,
      height,
    });
  }

  render() {
    return (
      <div >
        <video width={this.state.width} autoPlay height={this.state.height}>
          <source src="heman.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

      </div>
    );
  }
}

Suggestion.propTypes = {
  relationships: React.PropTypes.array,
  people: React.PropTypes.array,
  loading: React.PropTypes.bool,
};
