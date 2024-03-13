/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="signin-container">
      <div className="signin-logo">
        <img
          src="/signinlogo.jpeg"
          id="navLogo"
          alt=""
          className="signin-img"
        />{' '}
      </div>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '100vh',
          padding: '30px',
          margin: '0 auto',
          zIndex: 1,
          minHeight: '25rem',
          minWidth: '30rem',
          paddingBlock: '0 5rem',
        }}
      >
        <h1 style={{ marginBottom: '1em' }}>Welcome to Caffeine Culture!</h1>
        <Button type="button" size="lg" className="signout-btn" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Signin;
