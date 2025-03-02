import React from "react";
import styles from "../styles/auth.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

/**
 * Input - Composant champ de formulaire réutilisable avec son label et gestion d'erreur basique.
 * @param label - Libellé du champ affiché au-dessus de l'input.
 * @param name - Nom/id du champ, utilisé pour lier le label et l'input.
 * @param props - Autres props standard pour l'input (type, value, onChange, required, etc.).
 */
const Input: React.FC<InputProps> = ({ label, name, ...props }) => {
  const inputId = `input-${name}`;

  return (
    <div className={styles.formField}>
      <label htmlFor={inputId}>{label}</label>
      <input id={inputId} name={name} {...props} />
      {/* Si un message d'erreur spécifique au champ est passé via props (ex: props['aria-errormessage']), 
          on pourrait l'afficher ici sous forme de <span className={styles.error}>...<span> */}
    </div>
  );
};

export default Input;