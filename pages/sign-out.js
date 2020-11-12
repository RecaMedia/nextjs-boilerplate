import React, {useEffect} from 'react';
import Router from 'next/router';
import Cookies from 'js-cookie';
import Loading from 'root/jsx/modules/curtain';
import LoadingAnimation from 'root/jsx/modules/loading-animation';
import store from 'root/jsx/redux/store';

const SignOut = (props) => {

  useEffect(() => {
    Cookies.remove('shopmymenu_user');

    store.dispatch({
      type: "USER_SIGNOUT"
    });

    Router.push('/');
  })

  return <Loading>
    <LoadingAnimation/>
  </Loading>;
}

export default SignOut;