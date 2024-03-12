/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
// import useNotifsCount from '../utils/useNotifsCount';
import { signOut } from '../utils/auth';
import { getUsersLatestMessage } from '../utils/data/messageData';
import { returnNotificationCount } from '../utils/data/notificationData';

export default function NavBar({ user }) {
  const [count, setCount] = useState(0);
  const [latestChat, setLatestChat] = useState({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      returnNotificationCount(user.uid).then((res) => setCount(res));
    }, 10000);

    return () => clearInterval(intervalId);
  }, [user.uid]);

  useEffect(() => {
    getUsersLatestMessage(user.uid).then((res) => setLatestChat(res));
  }, [user.uid]);

  console.warn(latestChat);

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
              <Nav.Link>Notifications {count[0] > 0 ? <span className="notif-count">{count[0]}</span> : '' }</Nav.Link>
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
