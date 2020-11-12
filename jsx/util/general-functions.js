import cookie from 'js-cookie';

const setJSONCookie = (name, value) => {
  cookie.set(name, JSON.stringify(value), {sameSite: 'strict'});
}

const getJSONCookie = (name) => {
  let cookie = Cookies.get(cookie_name);
  if (cookie == undefined) {
    cookie = null;
  } else {
    cookie = JSON.parse(cookie);
  }
  return cookie;
}

export default {
  setJSONCookie,
  getJSONCookie
}