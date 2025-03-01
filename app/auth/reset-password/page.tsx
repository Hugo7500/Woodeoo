"use client";

/**
 * Page de réinitialisation du mot de passe
 *
 * L'utilisateur choisit un nouveau mot de passe (respectant certains critères),
 * et le confirme. Si tout est bon, on affiche un message de succès puis on redirige
 * vers la page de connexion.
 *
 * Ici, on remplace les classes globales par un style module : auth.module.css
 * pour la mise en forme du conteneur, de la carte, des inputs, etc.
 */

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// On importe notre fichier de styles en module
import styles from "@/styles/auth.module.css";

export default function ResetPasswordPage() {
  // Permet de rediriger côté client
  const router = useRouter();

  // État pour le mot de passe et la confirmation
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Toggle pour afficher ou masquer le mdp
  const [showPassword, setShowPassword] = useState(false);

  // Validation du mot de passe
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  // Gestion des erreurs et d'un message de succès
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  /**
   * Vérifie si le mdp respecte les critères :
   * - 8+ caractères
   * - Au moins 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
   */
  const validatePassword = (pwd: string) => {
    const isValid =
      pwd.length >= 8 &&
      /[A-Z]/.test(pwd) &&    // Majuscule
      /[a-z]/.test(pwd) &&    // Minuscule
      /\d/.test(pwd) &&       // Chiffre
      /[!@#$%^&*]/.test(pwd); // Caractère spécial

    setIsPasswordValid(isValid);
    return isValid;
  };

  /**
   * handlePasswordChange : met à jour password et vérifie les critères
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPwd = e.target.value;
    setPassword(newPwd);
    validatePassword(newPwd);
    setError(""); // On réinitialise l'erreur en tapant
  };

  /**
   * handleConfirmPasswordChange : met à jour confirmPassword
   */
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setError("");
  };

  /**
   * handleSubmit : gère la soumission du formulaire
   * - Vérifie la validité du mdp
   * - Vérifie la correspondance mdp / confirmation
   * - Si tout est OK, affiche un message de succès puis redirige après 2s
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifie les critères du mot de passe
    if (!isPasswordValid) {
      setError("Le mot de passe ne respecte pas les critères de sécurité.");
      return;
    }

    // Vérifie la correspondance
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    // Si tout est bon
    setError("");
    setSuccessMessage("Mot de passe modifié avec succès ! Redirection en cours...");

    // Redirection après 2 secondes (ex: vers la page de connexion)
    setTimeout(() => {
      router.push("/auth/signup");
    }, 2000);
  };

  return (
    <>
      {/* 
        On remplace les classes globales "min-h-screen bg-[#F1E3C6] flex items-center justify-center font-roboto"
        par un style module, par ex. styles["reset-container"] si on l'a défini dans auth.module.css.
        Si on veut garder le style tailwind, on peut l'ajouter en plus. 
      */}
      <div className={`${styles["register-container"]} flex items-center justify-center`}>
        {/* 
          La carte blanche, ex: styles["register-card"] 
          On peut garder w-full max-w-md p-8 shadow-lg si on utilise Tailwind en plus du module.
        */}
        <div className={`${styles["register-card"]} w-full max-w-md p-8 shadow-lg rounded-lg`}>
          <h2 className="text-2xl font-bold text-[#5E3D07] text-center mb-6">
            Réinitialisation du mot de passe
          </h2>

          <p className="text-lg text-[#2E2E2E] text-center mb-4">
            Choisissez un nouveau mot de passe sécurisé.
          </p>

          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            {/* Champ Nouveau Mot de Passe */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nouveau mot de passe"
                className={`${styles["input-style"]} pr-10`}
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {/* Icône Oeil / Oeil barré pour afficher/masquer */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700 hover:text-gray-900"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                  <circle cx="12" cy="12" r="3" />
                  {/* Barre diagonale si !showPassword */}
                  {!showPassword && (
                    <line
                      x1="4"
                      y1="4"
                      x2="20"
                      y2="20"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Critères du mot de passe si non valide et non vide */}
            {!isPasswordValid && password.length > 0 && (
              <div className="text-sm text-[#5E3D07] bg-[#F8F0E3] p-2 rounded-lg">
                <p className={password.length >= 8 ? "text-green-600" : "text-red-600"}>
                  {password.length >= 8 ? "✔" : "✖"} Minimum 8 caractères
                </p>
                <p className={/[A-Z]/.test(password) ? "text-green-600" : "text-red-600"}>
                  {/[A-Z]/.test(password) ? "✔" : "✖"} Une majuscule
                </p>
                <p className={/[a-z]/.test(password) ? "text-green-600" : "text-red-600"}>
                  {/[a-z]/.test(password) ? "✔" : "✖"} Une minuscule
                </p>
                <p className={/\d/.test(password) ? "text-green-600" : "text-red-600"}>
                  {/\d/.test(password) ? "✔" : "✖"} Un chiffre
                </p>
                <p className={/[!@#$%^&*]/.test(password) ? "text-green-600" : "text-red-600"}>
                  {/[!@#$%^&*]/.test(password) ? "✔" : "✖"} Un symbole spécial (!@#$%^&*)
                </p>
              </div>
            )}

            {/* Champ Confirmation */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirmer le mot de passe"
                className={`${styles["input-style"]} pr-10`}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              {/* Même icône œil / œil barré */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700 hover:text-gray-900"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                  <circle cx="12" cy="12" r="3" />
                  {!showPassword && (
                    <line
                      x1="4"
                      y1="4"
                      x2="20"
                      y2="20"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Message d'erreur ou de succès */}
            {error && <p className="text-red-600 text-center">{error}</p>}
            {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}

            {/* Bouton Réinitialiser : désactivé si mdp non valide */}
            <button
              type="submit"
              className={`bg-[#E6B04C] text-white font-bold py-3 rounded-lg transition-colors text-lg w-full 
                ${isPasswordValid ? "hover:bg-[#f0c46e]" : "opacity-50 cursor-not-allowed"}`}
              disabled={!isPasswordValid}
            >
              Réinitialiser
            </button>
          </form>
        </div>
      </div>
    </>
  );
}