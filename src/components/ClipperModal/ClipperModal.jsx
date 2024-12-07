/**
 * Modal component for Clipper card selection and fare preferences
 * Displays different fare options and handles user selection
 */
import { useCallback } from 'react';
import { useUserPreferences } from '../../hooks/useUserPreferences';
import './ClipperModal.css';

/**
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {Function} props.onClose - Callback function to close modal
 */
const ClipperModal = ({ isOpen, onClose }) => {
  const { savePreferences } = useUserPreferences();

  /**
   * Handles fare class selection and saves to preferences
   * @param {string} fareClass - Selected fare class identifier
   */
  const handleFareSelection = useCallback((fareClass) => {
    savePreferences({
      fareClass,
      setupComplete: true
    });
    onClose();
  }, [savePreferences, onClose]);

  if (!isOpen) return null;

  return (
    <div className="clipper-modal-overlay">
      <div className="clipper-modal">
        <h2>Select Your Clipper Card Type</h2>
        <p>Choose your card type to see accurate fares for your trips</p>
        
        <div className="clipper-options">
          <div 
            className="clipper-option"
            onClick={() => handleFareSelection('standard')}
            role="button"
            tabIndex={0}
          >
            <img src="/clipper-standard.png" alt="Standard Clipper" />
            <h3>Standard Clipper</h3>
            <p>Regular adult fare</p>
          </div>
          
          <div 
            className="clipper-option"
            onClick={() => handleFareSelection('senior')}
            role="button"
            tabIndex={0}
          >
            <img src="/clipper-senior.png" alt="Senior Clipper" />
            <h3>Senior/Disabled</h3>
            <p className="discount">62.5% off regular fare</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClipperModal;