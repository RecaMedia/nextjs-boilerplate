import React from 'react';
import {Transition} from 'react-transition-group';
import MainMenu from '../includes/main-menu';
import Head from '../modules/head';
import Header from '../modules/header';
import Footer from '../modules/footer';

const defaultStyle = {
    transition: 'opacity 250ms ease',
    opacity: 1
};

const transitionStyles = {
    entering: { opacity: 0}, 
    entered: { opacity: 1},
    exiting: { opacity: 0 },
    exited: { opacity: 0 }
};

const meta = {
    title: "",
    description: "",
    url: "",
    keywords: "",
    image: ""
};

class AppView extends React.Component {

	constructor(props) {
    super(props);
  }

  render() {
    // Separate children fromt the rest of the props values to prevent duplication
    let {children, ...sub_props} = this.props;

    return (
      <Transition in={true} timeout={250}>
        {sec_trans_state => (
          <div className="main-content" style={{...defaultStyle, ...transitionStyles[sec_trans_state]}}>
            <Head meta={meta}/>
            <Header name={"Boilerplate"} menu={MainMenu} sticky={true} />
              <div className="content">
                {React.cloneElement(this.props.children, sub_props)}
              </div>
            <Footer menu={MainMenu}/>
          </div>
        )}
      </Transition >
    )
	}
}
export default AppView;