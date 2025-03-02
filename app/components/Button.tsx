import React from "react";
import styles from "../styles/auth.module.css"; // on peut aussi créer un Button.module.css dédié si besoin

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

/**
 * Button - Composant bouton réutilisable
 * @param children - Le texte (ou contenu) du bouton.
 * @param props - Autres props HTML du bouton (type, disabled, onClick, etc.).
 */
const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};

export default Button;