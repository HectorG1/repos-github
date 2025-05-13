import { useState } from 'react';
import Button from '../UI/Button/Button';

import './modal.css';

type ModalProps = {
  label: string;
  description: string;
  action: () => void;
}

export default function Modal({ label, action, description }: ModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  const toogleModal = () => {
    action();
    setIsOpen(!isOpen);
  }

  return (
    <>
      {isOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>{label}</h2>
            <p>{description}</p>
            <div className="buttonContainer">
              <Button label="Ok" size="sm" onClick={toogleModal} buttonType="primary" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
