// IMPORT MD-BOOTSTRAP CSS
import '@fortawesome/fontawesome-free/css/all.min.css'
import '../assets/css/mdb-pro.css';
import '../assets/css/dist/style.css';
import React from 'react';
import Head from 'next/head';
import {DefaultSeo} from 'next-seo'
import {AppLayout} from "../components/app";
import {withApollo} from "../lib/apollo";

// This default export is required in a new `pages/_app.js` file.
function App({Component, pageProps}) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href={"/favicon.ico"}/>
        <script type="text/javascript" src="https://platform.linkedin.com/badges/js/profile.js" async defer/>
      </Head>
      <DefaultSeo
        title={""}
        titleTemplate={" %s | Next JS E-commerce Website"}
        description={
          "This is a demo E-commerce website written by Daniel Waruo a Full Stack Web Developer" +
          "in Kenya."
        }
      />

      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  )
}

export default withApollo({ssr: false})(App)