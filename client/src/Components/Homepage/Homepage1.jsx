import React, { Component } from "react";
import CoreValues from "./CoreValues";
import Footer from "./Footer";
import Quotes from "./Quotes";
import Subscribe from "./Subscribe";
import Sliders from "./Sliders";

class Homepage1 extends Component {
  render() {
    return (
      <React.Fragment>
        <Sliders />
        <CoreValues />
        <Quotes />
        <Subscribe />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Homepage1;
