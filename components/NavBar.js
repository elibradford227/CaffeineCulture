/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { signOut } from '../utils/auth';
import { getUsersLatestMessage } from '../utils/data/messageData';
import { returnNotificationCount } from '../utils/data/notificationData';
import { useNotification } from '../utils/context/notifContext';

export default function NavBar({ user }) {
  const [latestChat, setLatestChat] = useState({});
  const { notificationCount, updateNotificationCount } = useNotification();

  // Checks for new notifs on signin

  useEffect(() => {
    returnNotificationCount(user.uid).then((res) => updateNotificationCount(res));
  }, [user.uid]);

  // Check for new notifications every two minutes

  useEffect(() => {
    const intervalId = setInterval(() => {
      returnNotificationCount(user.uid).then((res) => updateNotificationCount(res));
    }, 120000);

    return () => clearInterval(intervalId);
  }, [user.uid, updateNotificationCount]);

  useEffect(() => {
    getUsersLatestMessage(user.uid).then((res) => setLatestChat(res));
  }, [user.uid]);

  return (
    <Navbar id="navbar" collapseOnSelect expand="lg">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <img
              src="/navlogo.png"
              style={{ maxWidth: '160px', maxHeight: '70px' }}
              id="navLogo"
              alt=""
            />{' '}
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/posts/new">
              <Nav.Link>Create Post</Nav.Link>
            </Link>
            <Link passHref href={`/messages/${latestChat.receiver?.username}`}>
              <Nav.Link>Messages</Nav.Link>
            </Link>
            <Link passHref href="/notifications">
              <Nav.Link>Notifications {notificationCount[0] > 0 ? <span className="notif-count">{notificationCount[0]}</span> : '' }</Nav.Link>
            </Link>
          </Nav>
          <Nav className="ms-auto">
            <Link passHref href={`/profile/${user.username}`}>
              <Nav.Link style={{ color: '#77BB3F' }}>Profile</Nav.Link>
            </Link>
            <Button className="signout-btn" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

NavBar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};
