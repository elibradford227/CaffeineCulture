/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

export default function FilterBar({ getAllPosts }) {
  const { user } = useAuth();

  const handleClick = () => {
    getAllPosts(user.uid);
  };

  return (
    <div><Button onClick={handleClick}>load posts</Button></div>
  );
}
