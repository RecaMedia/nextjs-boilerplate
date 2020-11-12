import React, {useEffect, useState} from 'react';
import Nav from './nav';
import MainMenu from '../includes/main-menu';

export default class Footer extends React.Component {

	constructor(props) {
		super(props);
		
    this.state = {
			menu: MainMenu
		}
  }
  
  componentDidMount() {

  }

	render() {

    return (
      <footer className="footer">
        <div className="footer__copy">
          &copy;{new Date().getFullYear()} Copyright
        </div>
        <Nav navid="2" menu={this.state.menu}/>
      </footer>
    )
  }
}