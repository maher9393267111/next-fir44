import '../styles/globals.css'
import 'bulma/css/bulma.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'antd/dist/antd.css';
import { wrapper } from "../context/store/index";
import GlobalContext from '../context/global'
import Header from '../components/Header'
import Layout from '../components/layout'
function MyApp({ Component, pageProps }) {
  return (
  <GlobalContext>
    <Layout>
      <ToastContainer />
  <Component {...pageProps} />

    </Layout>
  </GlobalContext>
  )
}

export default wrapper.withRedux( MyApp);