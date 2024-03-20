/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { AuthProvider } from '../utils/context/authContext';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';
import { NotifProvider } from '../utils/context/notifContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <title>Caffeine Culture</title>
      {/* AuthProvider is first context */}
      <AuthProvider>
        {/* Notif provider would allow all components here to access notifications state */}
        <NotifProvider>
          {/* gives children components access to user and auth methods */}
          <ViewDirectorBasedOnUserAuthStatus
            // if status is pending === loading
            // if status is logged in === view app
            // if status is logged out === sign in page
            component={Component}
            pageProps={pageProps}
          />
        </NotifProvider>
        {' '}
      </AuthProvider>
    </>
  );
}

export default MyApp;
