import React from 'react';
import HeadStatic from '../modules/head-static';
import store from '../redux/store';
import call from '../util/api-call';
import preloads from '../includes/image-preloads';

class Wrapper extends React.Component {

	constructor(props) {
    super(props);

    this.processAuth = this.processAuth.bind(this);
    this.processCookies = this.processCookies.bind(this);
    
    this.state = {
      cookiesLoaded: false,
      WPInfo: null,
      preloads
    }
  }
  
  componentDidUpdate(nextProps, prevState) {
    if (!prevState.cookiesLoaded && nextProps.cookies != null) {
      this.processAuth(nextProps.cookies);
      this.processCookies(nextProps.cookies);
    }
  }

  componentDidMount() {
    // Check for cookies
    if (!this.state.cookiesLoaded && this.props.cookies != null) {
      this.processAuth(this.props.cookies);
      this.processCookies(this.props.cookies);
    }
  }

  processAuth(cookies) {
    // Check if user has signed-in by looking for cookie
    if (cookies.shopmymenu_user != undefined) {
      // If found, prepare header for authentication
      let user_data = JSON.parse(cookies.shopmymenu_user);
      let authorization = 'Basic ' + user_data.key + ':' + user_data.token;
      let options = {
          headers: {
          'Authorization': authorization, 
          'Content-Type': 'application/json'
        }
      }

      // Make auth request
      call.app("/auth", options).then((response) => {
        // Check if authentication is valid
        if (response.authenticated) {
          // Store authentication for future use
          store.dispatch({
            type: "AUTH",
            auth: response.authenticated
          });
        }
      });
    }
  }

  processCookies(cookies) {
    if (cookies != null) {
      store.dispatch({
        type: "FROM_COOKIES",
        cookies
      });
      this.setState({cookiesLoaded: true});
    }
  }

  /*
	* All children objects are supplied with "cookies", "response", and "query" props
	*/

	render() {
    // Separate children fromt the rest of the props values to prevent duplication
    let {children, ...sub_props} = this.props;
    
    return <div id="Wrapper">
      <HeadStatic/>
      <div className="preloaded-images">
        {this.state.preloads.map((item,i) => {
          return <img key={i} src={item}/>
        })}
      </div>
      <div id="App">
        {React.cloneElement(children, Object.assign({}, sub_props, {store, wpinfo:this.state.WPInfo}))}
      </div>
    </div>;
	}
}

export default Wrapper;