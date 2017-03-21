import React from 'react';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';


export default class Info extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    upgrade(this.refs.exit);
  }

  componentWillUnmount() {
    downgrade(this.refs.exit);
  }

  list(items) {
    if (items.length > 0) {
      const names = items.map((relation) =>
        <div key={relation._id} className="namediv">
          <p className="name mdl-color-text--grey-100">{relation.firstname}</p>
        </div>
      );
      return names;
    }
    return '';
  }


  render() {
    return (
      <div style={{ height: window.innerHeight - this.props.height }} className="info-container">
        <div className="info-color mdl-shadow--2dp">
          <button onClick={this.props.exit} ref="exit" className="mdl-button mdl-js-button mdl-button--icon">
            <i className="mdl-color-text--grey-100 material-icons">clear</i>
          </button>
          <div style={{ padding: 10 }}>
            <div>
              <h5 className="titleCloser mdl-color-text--grey-100">Navn: </h5>
              <div className="namediv">
                <p className="name mdl-color-text--grey-100">{this.props.info.person.firstname}</p>
              </div>
              <div style={{ clear: 'both' }}></div>
            </div>
            <div>
              {this.props.info.klin.length > 0 ? <h5 className="titleCloser mdl-color-text--grey-100">Klin:</h5> : ''}
              {this.list(this.props.info.klin)}
              <div style={{ clear: 'both' }}></div>
            </div>
            <div>
              {this.props.info.ligg.length > 0 ? <h5 className="titleCloser mdl-color-text--grey-100">Ligg:</h5> : ''}
              {this.list(this.props.info.ligg)}
              <div style={{ clear: 'both' }}></div>
            </div>
            <div>
              {this.props.info.eskimosiblings.length > 0 ? <h5 className="titleCloser mdl-color-text--grey-100">Eskimosøsken:</h5> : ''}
              {this.list(this.props.info.eskimosiblings)}
              <div style={{ clear: 'both' }}></div>
            </div>
          </div>
        </div>
      </div>
  );
  }
}

Info.propTypes = {
  info: React.PropTypes.object,
  height: React.PropTypes.number,
  exit: React.PropTypes.func,
};
