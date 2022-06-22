import '../styles/globals.css'
import 'bulma/css/bulma.min.css';
import 'antd/dist/antd.css';
import { wrapper } from "../store/index";
import GlobalContext from '../context/global'
function MyApp({ Component, pageProps }) {
  return (
  <GlobalContext>
  <Component {...pageProps} />

  </GlobalContext>
  )
}

export default wrapper.withRedux( MyApp);