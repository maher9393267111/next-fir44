import '../styles/globals.css'
import 'bulma/css/bulma.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'antd/dist/antd.css';
import { wrapper } from "../context/store/index";
import GlobalContext from '../context/global'
import Cartprovider from '../context/cartContext'; 

import Layout from '../components/layout'
function MyApp({ Component, pageProps }) {
  return (
  <GlobalContext>
    <Cartprovider>
    <Layout>
      <ToastContainer />
  <Component {...pageProps} />

    </Layout>
    </Cartprovider>
  </GlobalContext>
  )
}

export default wrapper.withRedux( MyApp);