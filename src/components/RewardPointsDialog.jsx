import React from 'react';
import Modal from 'react-modal';
import { useSpring, animated } from 'react-spring';

Modal.setAppElement('#root'); // Set the root element for accessibility

const RewardPointsDialog = ({ isOpen, onClose, points }) => {
  const animation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? `scale(1)` : `scale(0.9)`,
  });

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
        <h2>🎉 You've Accrued {points} Points! 🎉</h2>
        <p>Congratulations! You can now use up 100 points on your next order and get the meal for free!</p>
        <button onClick={onClose} style={{ marginTop: '10px' }} className="cta">Close</button>
      </animated.div>
    </Modal>
  );
};

export default RewardPointsDialog;
