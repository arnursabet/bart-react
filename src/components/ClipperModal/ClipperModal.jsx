import { useUserPreferences } from '../../hooks/useUserPreferences';
import "./ClipperModal.css";

const CLIPPER_TYPES = {
  REGULAR: { id: 'clipper', name: 'Clipper', discount: 0 },
  START: { id: 'start', name: 'Clipper START', discount: 0.5 },
  SENIOR: { id: 'rtcclipper', name: 'Senior/Disabled Clipper', discount: 0.625 },
  YOUTH: { id: 'student', name: 'Youth Clipper', discount: 0.5 }
};
export const ClipperModal = ({ isOpen, onClose }) => {
  const { savePreferences } = useUserPreferences();

  const handleSelection = (type) => {
    savePreferences({
      clipperType: type.id,
      fareClass: type.id,
      discount: type.discount
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="clipper-modal-overlay">
      <div className="clipper-modal">
        <h2>Select Your Clipper Card Type</h2>
        <p>Choose your card type to see accurate fares</p>
        
        <div className="clipper-options">
          {Object.values(CLIPPER_TYPES).map((type) => (
            <button
              key={type.id}
              className="clipper-option"
              onClick={() => handleSelection(type)}
            >
              <span>{type.name}</span>
              {type.discount > 0 && (
                <span className="discount">
                  {type.discount * 100}% discount
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

  export default ClipperModal;