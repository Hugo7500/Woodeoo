"use client";

/**
 * Page "Mot de passe oublié"
 *
 * Cette page permet à l'utilisateur de saisir un email ou un numéro de téléphone
 * afin de réinitialiser son mot de passe. Une fois la saisie validée, on redirige
 * vers la page de vérification de code (verify-code), en passant la valeur de contact
 * (email/téléphone) dans la query string.
 *
 * Utilise un fichier de styles sous forme de module : auth.module.css
 * pour gérer les classes .register-container, .register-card, etc.
 */

import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";

/**
 * On importe le fichier de style en module, ce qui permet
 * d'accéder aux classes via "styles.nomDeClasse".
 */
import styles from "@/styles/auth.module.css";

export default function ForgotPasswordPage() {
  // Hook Next.js pour naviguer/rediriger côté client
  const router = useRouter();

  // contact : email ou téléphone saisi par l'utilisateur
  const [contact, setContact] = useState("");
  // isValid : indique si la saisie (email/tél) est jugée valide
  const [isValid, setIsValid] = useState(false);

  /**
   * Fonction de validation : vérifie si la valeur saisie est un email ou un numéro
   * de téléphone "valide" (simple regex).
   */
  const validateInput = (value: string) => {
    // Regex basique pour email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Regex basique pour numéro de téléphone (8 à 15 chiffres, avec + en option)
    const phoneRegex = /^\+?[0-9]{8,15}$/;

    // Si c'est un email OU un numéro, alors isValid = true
    const isInputValid = emailRegex.test(value) || phoneRegex.test(value);

    setIsValid(isInputValid);
    setContact(value);
  };

  /**
   * handleSubmit : gère la soumission du formulaire
   * - Empêche le rechargement de page (preventDefault)
   * - Si la saisie est valide, redirige vers /auth/verify-code
   *   en passant le contact dans la query string.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isValid) {
      // Redirection vers la page verify-code, en passant le contact
      // encodeURIComponent(contact) pour échapper les caractères spéciaux
      router.push(`/auth/verify-code?contact=${encodeURIComponent(contact)}`);
    }
  };

  return (
    <>
      {/* Balise <Head> pour définir le <title> et le favicon */}
      <Head>
        <title>Mot de passe oublié | Woodeoo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 
        Conteneur principal : on applique la classe de module 
        styles["register-container"] pour un style cohérent.
      */}
      <div className={styles["register-container"]}>
        {/* 
          Carte/formulaire : styles["register-card"] 
          pour le style de la carte (fond blanc, padding, etc.).
        */}
        <div className={styles["register-card"]}>
          {/* Titre de la page */}
          <h2 className="text-2xl font-bold text-[#5E3D07] text-center mb-6">
            Mot de passe oublié
          </h2>

          {/* Formulaire de saisie */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {/* Champ pour email ou téléphone */}
            <input
              type="text"
              placeholder="Entrez votre email ou numéro de téléphone"
              // On réutilise la classe "input-style" définie dans auth.module.css
              className={styles["input-style"]}
              required
              value={contact}
              onChange={(e) => validateInput(e.target.value)}
            />

            {/* 
              Bouton "Réinitialiser le mot de passe"
              - Couleur dorée #E6B04C par défaut
              - Si isValid == false, on applique .opacity-50 + cursor-not-allowed
                et on désactive le bouton (disabled).
            */}
            <button
              type="submit"
              className={`
                bg-[#E6B04C] text-white font-bold py-3 rounded-lg transition-colors text-lg w-full 
                ${isValid ? "hover:bg-[#f0c46e]" : "opacity-50 cursor-not-allowed"}
              `}
              disabled={!isValid}
            >
              Réinitialiser le mot de passe
            </button>
          </form>

          {/* 
            Lien de retour à la connexion :
            "ROUTES.signup" pointe probablement vers "/auth/signup"
          */}
          <p className="text-center text-md text-[#5E3D07] mt-4">
            Retour à la{" "}
            <Link href={ROUTES.signup} className="font-bold hover:underline">
              connexion
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}