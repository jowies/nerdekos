import React from 'react';
import vis from 'vis';

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
   
  }

  componentDidUpdate() {
 
  }

  render() {
    return (
      <div className="flexJustifyContentCenter flexDisplay">
        <div className="flexJustifyContentCenter flexDisplay">
          <h1 className="center mdl-color-text--grey-100">NERDEK<span className="mdl-color-text--red-A700">&hearts;</span>S</h1>
        </div>
      </div>
    );
  }
}
