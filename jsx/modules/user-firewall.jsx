import React from 'react';
import store from 'root/jsx/redux/store';

export default class UserFirewall extends React.Component {

	constructor(props) {
    super(props);

    this.app_state = store.getState();

    this.checkAuth = this.checkAuth.bind(this);
		
		this.state = {
      authSuccess: false,
      hideMode: (props.hideMode != undefined ? true : false),
      showSignin: (props.showSignin != undefined ? true : false),
      result: null
		}
	}

  componentDidMount() {
    // Mounted
    
    // Check auth when last action is hit
    this.unsubscribe = store.subscribe(() => {
      this.app_state = store.getState();
      if (this.app_state.global.lastAction === "AUTH") {
        this.checkAuth();
      }
    });

    // Check auth
    this.checkAuth();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  checkAuth() {
    let authSuccess = this.state.authSuccess;

    // Check response
    if (this.app_state.global.authenticated) {
      authSuccess = true;
    } else {
      authSuccess = false;
    }

    // Make sure state is set prior to processing
    this.setState({authSuccess});
  }

	render() {
    if ((this.state.authSuccess && !this.state.hideMode) || (!this.state.authSuccess && this.state.hideMode)) {
      return this.props.children;
    } else {
      if (this.state.showSignin) {
        let message = <div className="sign-in-wrapper">
          <p>You must be signed-in to access this page.</p>
          <a className="button" href="/sign-in">Sign-In</a>
        </div>
        
        return message;
      } else {
        return null;
      }
    }
  }
}