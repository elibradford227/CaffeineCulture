import PropTypes from 'prop-types';
import { useAuth } from './context/authContext.js';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavBar from '../components/NavBar';
import RegisterForm from '../components/RegisterForm';

interface Props {
  component: React.ComponentType<any>;
  pageProps: Record<string, any>;
}

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }: Props) => {
  const { user, userLoading, updateUser } = useAuth();

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // what the user should see if they are logged in
  if (user) {
    return (
      <>
        <NavBar user={user} /> {/* NavBar only visible if user is logged in and is in every view */}
        <div className="container">{'valid' in user ? <RegisterForm user={user} updateUser={updateUser} /> : <Component {...pageProps} />}</div>
      </>
    );
  }

  return <Signin />;
};

export default ViewDirectorBasedOnUserAuthStatus;
