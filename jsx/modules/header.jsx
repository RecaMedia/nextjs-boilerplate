import React from 'react';
import Nav from './nav';

export default class Header extends React.Component {

	constructor(props) {
		super(props);
		
    this.state = {
      menu: this.props.menu,
      userMenu: this.props.userMenu
		}
  }

	render() {

    let attr = {
      className: (this.props.className ? this.props.className : "")
    }

    if (this.props.sticky) {
      attr.className = attr.className + " header--sticky";
    }

    return (
      <header {...attr}>
        <div id="SiteName">
          <a className="logo" href="/">
            <span>{this.props.name}</span>
          </a>
        </div>
        <Nav menu={this.state.menu} userMenu={this.state.userMenu}/>
      </header>
    )
  }
}