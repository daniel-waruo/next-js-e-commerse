// IMPORT MDBOOTSTRAP CSS
import '../css/dist/all.min.css';
import '../assets/css/mdb-pro.css';
import '../assets/css/dist/style.css';
import React from 'react';
import Head from 'next/head';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>Next E-commerce</title>
        <link rel="shortcut icon" href={"/favicon.ico"} />
      </Head>
      <Component {...pageProps} />
    </>
  )
}