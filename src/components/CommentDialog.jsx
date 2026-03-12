import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSpring, animated } from 'react-spring';
import { fetchCommentsForReview, insertComment } from '../helpers';

Modal.setAppElement('#root'); // Set the root element for accessibility

const CommentDialog = ({ isOpen, onClose, review, loggedInUser }) => {
  const animation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? `scale(1)` : `scale(0.9)`,
  });
  
  const [comments, setComments] = useState([]);
  const [commentPost, setCommentPost] = useState('');

  useEffect( () => {
    if(!review) return;
    setComments([]); // clear out old comments first
    const getComments = async () => {
      const commentsData = await fetchCommentsForReview(review.id)
      if(commentsData) {
        setComments(commentsData)
      }
    }
    getComments()
    console.log(comments)
  }, [review])
  
  if (!review) return null;
  const { rating, review_body, created_at } = review
  const reviewer  = review.profiles.email

  const handleSubmit = async e => {
    e.preventDefault();
    const newComment = {
      review_id: review.id,
      profile_id: loggedInUser,
      comment_body: commentPost
    }

    await insertComment(newComment);
    const commentsData = await fetchCommentsForReview(review.id);
    if (commentsData) {
      setComments(commentsData);
    }

    setCommentPost('');
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          borderRadius: '10px',
          maxWidth: '500px'
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <animated.div style={animation}>
        <div className="review-preview">
            <h3>{rating}</h3>
            <p>{review_body}</p>
            <small>
                Written by {reviewer} on {new Date(created_at).toLocaleDateString()}
            </small>
        </div>
        { comments.length > 0 ? 
          (
            comments.map( (comment, index) => (
              <div key={comment.id} className='comment-body mt-1 ps-2'> 
                <p className="m-0">{comment.comment_body}</p>
                <small>{comment.profiles?.email || "Unknown user"}</small>
              </div>
            ))
          ) : (
            <p>No comments yet</p>
          )
        }
        <form onSubmit={handleSubmit}>
          <textarea
            id="commentBody" 
            name="commentBody" 
            rows="4" 
            cols="50" 
            placeholder="What do you think of this review?"
            required
            value={commentPost}
            onChange={e => setCommentPost(e.target.value)}
          >
          </textarea>
          <input type="submit" value="Post Comment" className="cta"></input>
        </form>
        <button onClick={onClose} style={{ marginTop: '10px' }}>Close</button>
      </animated.div>
    </Modal>
  );
};

export default CommentDialog;
