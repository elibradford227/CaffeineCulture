import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { getUsersLatestMessage } from '../utils/data/messageData';
import { returnNotificationCount } from '../utils/data/notificationData';
import { useNotification } from '../utils/context/notifContext';
import { UserData, MessageData } from '../utils/interfaces';

interface Props {
  user: UserData;
}

export default function NavBar({ user }: Props) {
  const [latestChat, setLatestChat] = useState<MessageData>({} as MessageData);
  const { notificationCount, updateNotificationCount } = useNotification();

  // Checks for new notifs on signin

  useEffect(() => {
    const getCount = async () => {
      const res = await returnNotificationCount(user.uid);
      updateNotificationCount(res as number);
    }
    getCount();
  }, [user.uid]);

  // Check for new notifications every two minutes

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const res = await returnNotificationCount(user.uid);
      updateNotificationCount(res as number);
    }, 120000);

    return () => clearInterval(intervalId);
  }, [user.uid, updateNotificationCount]);

  useEffect(() => {
    const getMessage = async () => {
      const res = await getUsersLatestMessage(user.uid);
      setLatestChat(res as MessageData);
    }
    getMessage();
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
