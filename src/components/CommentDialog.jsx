import React from 'react';
import Modal from 'react-modal';
import { useSpring, animated } from 'react-spring';

Modal.setAppElement('#root'); // Set the root element for accessibility

const CommentDialog = ({ isOpen, onClose, review }) => {
  const animation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? `scale(1)` : `scale(0.9)`,
  });

  if (!review) return;

  const { rating: rating, review_body, reviewer, created_at } = review

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
          textAlign: 'center',
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
        <p>No comments yet</p>
        <button onClick={onClose} style={{ marginTop: '10px' }} className="cta">Close</button>
      </animated.div>
    </Modal>
  );
};

export default CommentDialog;
