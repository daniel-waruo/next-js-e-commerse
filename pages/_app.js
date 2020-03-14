// IMPORT MD-BOOTSTRAP CSS
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../assets/css/mdb-pro.css';
import '../assets/css/dist/style.css';
import React from 'react';
import Head from 'next/head';
import cookie from 'js-cookie';
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>next-js-e-commerce</title>
        <link rel="shortcut icon" href={"/favicon.ico"}/>
      </Head>
      <Component {...pageProps} />
    </>
  )
}