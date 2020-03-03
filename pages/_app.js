// IMPORT MDBOOTSTRAP CSS

import '../css/dist/all.min.css';
/*
import '../css/dist/bootstrap.min.css';
import '../css/dist/mdb.css';
import '../assets/css/index.css'
import '../assets/css/mdb-pro.css'
*/
import '../css/dist/style.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}