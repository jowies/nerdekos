import React from 'react';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';

export default class HomeLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      villager: this.randomVillager(),
      width: 20,
    };
    this.setWidth = this.setWidth.bind(this);
  }

  componentWillMount() {
    this.setWidth();
  }

  componentDidMount() {
    upgrade(this.refs.layout);
    this.setWidth();
    window.addEventListener('resize', this.setWidth);
  }

  componentWillUnmount() {
    downgrade(this.refs.layout);
    window.removeEventListener('resize', this.setWidth);
  }

  setWidth() {
    this.setState({
      width: this.getWidth(),
    });
  }

  getWidth() {
    if ((window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth) <= 1024) {
      return 56;
    }
    return 20;
  }

  randomVillager() {
    const villagers = [
      'http://24.media.tumblr.com/9194e47d45feebc1ff55904d39c09dac/tumblr_mo8o1rkyBW1s2vk2go1_1280.png',
      'http://orig13.deviantart.net/0679/f/2014/291/b/1/psycho_villager_murders_links__by_pxlcobit-d83dad6.jpg',
      'http://i0.kym-cdn.com/photos/images/original/000/559/469/ca8.png',
      'http://orig03.deviantart.net/6c47/f/2013/290/6/5/creepy_villager_meme_2___by_ajp_by_ajpcrosser-d6qvjn1.jpg',
      'http://vignette3.wikia.nocookie.net/ssb/images/5/58/Villager.png/revision/20130807012847',
      'http://i1.wp.com/shoryuken.com/wp-content/uploads/2016/09/Villager-Smash-4.jpg?fit=750%2C400&resize=750%2C400',
      'http://i1.kym-cdn.com/photos/images/original/000/932/955/156.png',
    ];
    const random = Math.floor((Math.random() * 7));
    return villagers[random];
  }

  render() {
    return (
      <div
        className="mdl-layout mdl-js-layout
            mdl-layout--fixed-header layout"
        ref="layout"
      >
        <header
          id="header"
          className="mdl-layout__header mdl-color--grey-900 mdl-color-text--grey-600"
        >
          <div className="mdl-layout__header-row" style={{ paddingLeft: this.state.width }}>
            <i className="material-icons mdl-color-text--red-A700">favorite</i>
            <span className="mdl-layout-title mdl-color-text--grey-50"><a href="/">
              NERDEKOS<span style={{ fontSize: 12 }}>&nbsp; BY JOWIE</span>
            </a></span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation mdl-layout--large-screen-only">
              <a className="mdl-navigation__link" href="/kart">Kosekartet</a>
              <a className="mdl-navigation__link" href="/suggestion">Legg til hook</a>
              { /*<a className="mdl-navigation__link" href="">Om Nerdekos</a>
              <a className="mdl-navigation__link" href="">Kontakt</a> */}
              <a className="mdl-navigation__link" href={this.state.villager}>Jowie?</a>
            </nav>
          </div>
        </header>
        <div
          className="mdl-layout__drawer
          mdl-layout--small-screen-only
          mdl-color--grey-900 drawer"
        >
          <nav className="mdl-navigation navigation">
            <a className="mdl-navigation__link" href="/kart">
              <i
                className="material-icons mdl-color-text--red-A700"
                role="presentation"
              >favorite</i>
              NERDEKOS
            </a>
            <a className="mdl-navigation__link" href="/kart">
              <i className="material-icons" role="presentation">share</i>
              Kosekartet
            </a>
            <a className="mdl-navigation__link" href="/suggestion">
              <i className="material-icons" role="presentation">group_add</i>
              Legg til hook
            </a>
            {/* <a className="mdl-navigation__link" href="">
              <i className="material-icons" role="presentation">info</i>
              Om Nerdekos
            </a>
            <a className="mdl-navigation__link" href="">
              <i className="material-icons" role="presentation">message</i>
              Kontakt
            </a> */}
            <a className="mdl-navigation__link" href={this.state.villager}>
              <i className="material-icons" role="presentation">mood</i>
              Jowie?
            </a>
          </nav>
        </div>
        <main className="mdl-layout__content mdl-color--grey-800">
          {this.props.content}
        </main>
      </div>
    );
  }
}

HomeLayout.propTypes = {
  content: React.PropTypes.object,
};
