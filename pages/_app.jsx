import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "../assets/css/index.css";
import "../assets/css/mdb-pro.css";

import NextApp from 'next/app';
// set fetch globally


class MyApp extends NextApp {

  render() {
    const {Component, pageProps} = this.props;

    return (
      <Component {...pageProps} />
    );
  }
}

export default MyApp