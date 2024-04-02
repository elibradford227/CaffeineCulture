import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Like from '../Like';
import { PostData } from '../../utils/interfaces';

interface Props {
  postObj: PostData;
}

export default function PostCard({ postObj }: Props) {
  return (
    <Card className="post-card">
      <Card.Body>
        <Card.Title>{postObj.title}</Card.Title>
        <Link passHref href={`/profile/${postObj.user?.username}`}>
          <p className="username">{postObj.user?.username}</p>
        </Link>
        <hr />
        <p>{postObj.content}</p>
        {postObj.image_url ? <img src={`${postObj.image_url}`} style={{ maxWidth: "500px", maxHeight: "500px", overflow: "hidden"}}></img> : '' }
            <hr />
        <p>{postObj.category?.name}</p>
        <hr />
        <div className="post-card-footer">
          <Like postId={postObj.id} liked={postObj.liked} likeCount={(postObj.like_count)} />
          <Link href={`/posts/${postObj.id}`} passHref>
            <Button variant="primary" className="signout-btn">Comments</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}
