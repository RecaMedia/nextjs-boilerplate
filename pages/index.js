import React from 'react';
import Wrapper from 'root/jsx/util/wrapper';
import APPView from 'root/jsx/views/app-view';
import GetInitialProps from 'root/jsx/util/get-initial-props';
import serverInfo from 'root/configs/server-info.json';

/*
// Authenticated API call example
let my_call = {
  url: "https://your.api.domain",
  options: {
    method: "GET",
    headers: {
      'Authorization': 'Basic ' + Buffer.from('********:********').toString('base64'), 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  }
}

// GraphQL call example
let my_call_2 = {
  url: "http://localhost:4000/graphql",
  options: {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify({"query": "{courses(topic: \"Node.js\"){author}}"}),
  }
}
*/

/*
Wrapper passes down the following props to the child
{cookies, response, query}
*/
const homePage = GetInitialProps(null, (props) => (
  <Wrapper {...props}>
    <APPView>
      <h1>Hello World</h1>
    </APPView>
  </Wrapper>
));

export default homePage;