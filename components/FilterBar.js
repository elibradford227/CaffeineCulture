/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

export default function FilterBar({ getAllPosts }) {
  const { user } = useAuth();

  const handleLatest = () => {
    getAllPosts(user.uid);
    console.warn('ok');
  };

  return (
    <div>
      <Button onClick={handleLatest}>latest</Button>
      {/* <Button onClick={handleClick}>load oldest</Button>
      <Button onClick={handleClick}>popular</Button>
      <Button onClick={handleClick}>controversial</Button> */}
    </div>
  );
}
