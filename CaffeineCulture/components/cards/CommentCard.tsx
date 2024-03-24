import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteComment } from '../../utils/data/commentData';
import CommentForm from '../CommentForm';
import { CommentData } from '../../utils/interfaces';

interface Props {
  commentObj: CommentData;
  user: {
    uid: string;
  }
  postId: number;
  onEditClick?: () => void;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
  getPostDetails: () => void;
}

export default function CommentCard({
  commentObj, onEditClick, user, setChange, getPostDetails, postId,
}: Props) {

  const deleteThisComment = async () => {
    if (window.confirm('Delete comment?')) {
      await deleteComment(commentObj.id);
      setChange((prevState) => !prevState);
    }
  };

  const [form, setForm] = useState<boolean>(false);

  const handleForm = () => {
    setForm((prevState) => !prevState);
  };

  return (
    <>
      <Card className={commentObj.parent !== null ? 'reply-card' : 'comment-card'}>
        <Card.Body>
          <hr />
          <Link passHref href={`/profile/${commentObj.user?.username}`}>
            <p className="username">{commentObj.user?.username}</p>
          </Link>
          {commentObj.parent !== null ? (
            <div>@{commentObj.parent?.user?.username}</div>
          ) : ''}
          <p>{commentObj.content}</p>
          <hr />
          <span style={{
            display: 'flex', alignItems: 'center', gap: '5px', fontSize: '1em',
          }}
          >

            {user.uid === commentObj.user?.uid ? (
              <>
                <div>
                  <FontAwesomeIcon icon={faPenToSquare} className="fa-icon" onClick={onEditClick} style={{ marginRight: '10px' }} />
                </div>
                <div>
                  <FontAwesomeIcon icon={faTrashCan} className="fa-icon" onClick={deleteThisComment} style={{ marginRight: '10px' }} />
                </div>
              </>
            ) : '' }
            
            <Button className="signout-btn" variant="secondary" onClick={handleForm}>Reply</Button>
          </span>
        </Card.Body>
        {form ? (
          <CommentForm replyId={commentObj.id} getPostDetails={getPostDetails} postId={postId} handleForm={handleForm} />
        ) : ' '}
      </Card>
    </>
  );
}
