import fetch from 'isomorphic-unfetch';

const app = async function(path, options) {
  const final_options = Object.assign({}, {
    method: "GET",
    headers: {
      "Content-Type":"application/json"
    }
  }, options);
  const res = await fetch("//api.shopmymenu." + (process.env.NODE_ENV == "development" ? "local" : "com") + path, final_options);
  return await res.json();
}

export default {
  app
};