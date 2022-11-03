import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContextProvider from '../context/user-context';
import SSRProvider from 'react-bootstrap/SSRProvider';
import TopBar from '../components/Home/TopBar'
import FooterInfo from '../components/Footer/FooterInfo';

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <UserContextProvider>
        <TopBar />
          <div id='frontDiv'>
            <Component {...pageProps} />
          </div>
        <FooterInfo />
      </UserContextProvider>
    </SSRProvider>
  )
}

export default MyApp
