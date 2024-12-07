/**
 * Modal component for displaying the BART system map
 * Implements keyboard navigation and accessibility features
 */
import { useEffect, useCallback } from 'react';
import './MapModal.css';

/**
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {Function} props.onClose - Callback function to close the modal
 */
const MapModal = ({ isOpen, onClose }) => {
  // Handle ESC key press to close modal
  const handleEsc = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      // Add keyboard listener and prevent body scroll when modal is open
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    // Cleanup listeners and restore body scroll on unmount
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEsc]);

  if (!isOpen) return null;

  return (
    <div className="map-modal-overlay" onClick={onClose}>
      <div className="map-modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close map">×</button>
        <img
          src="/bart-map.png"
          alt="BART System Map"
          className="modal-map-image"
        />
      </div>
    </div>
  );
};

export default MapModal;