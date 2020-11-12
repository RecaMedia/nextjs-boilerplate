const global = function(state, action) {

	state = Object.assign({}, state, {
		lastAction: action.type
	})

	switch (action.type) {

    case "AUTH" : {

      state = Object.assign({}, state, {
        authenticated: action.auth
      });
      
      break;
    }

    case "USER_SIGNIN" : {

      state = Object.assign({}, state, {
        cookies: Object.assign({}, state.cookies, {
          shopmymenu_user: action.user
        }),
        user: action.user
      });

			break;
    }

    case "USER_SIGNOUT" : {

      if (state.cookies != null && state.cookies.shopmymenu_user != undefined) {
        delete state.cookies.shopmymenu_user;
      }
      
      state = Object.assign({}, state, {
        cookies: Object.assign({}, state.cookies),
        user: null
      });

      console.log(state.cookies);

			break;
    }

		case "FROM_COOKIES" : {

      state = Object.assign({}, state, {
        cookies: action.cookies
      });

			break;
    }
  }

  return state;
}

export default global;