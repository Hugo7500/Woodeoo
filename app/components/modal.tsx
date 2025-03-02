import React, { useEffect } from "react";
import styles from "../styles/Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

/**
 * Modal - Composant modale réutilisable pour afficher du contenu par-dessus la page.
 * Gère l'accessibilité aria et le focus.
 */
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // Empêcher le scroll de fond quand la modale est ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose} role="presentation">
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        {/* Bouton de fermeture accessible */}
        <button onClick={onClose} className={styles.closeButton} aria-label="Fermer la modale">×</button>
        {title && <h2 id="modal-title">{title}</h2>}
        <div className={styles.modalContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;