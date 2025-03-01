"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "@/styles/auth.css"; // Ajuste le chemin selon ta configuration

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Toggle œil
  const [showPassword, setShowPassword] = useState(false);

  // Vérification du mot de passe
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  // Gestion erreurs / succès
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Vérifie critères : 8+ caractères, maj., min., chiffre, car. spécial
  const validatePassword = (pwd: string) => {
    const isValid =
      pwd.length >= 8 &&
      /[A-Z]/.test(pwd) &&
      /[a-z]/.test(pwd) &&
      /\d/.test(pwd) &&
      /[!@#$%^&*]/.test(pwd);

    setIsPasswordValid(isValid);
    return isValid;
  };

  // Gère la saisie du mot de passe principal
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
    setError("");
  };

  // Gère la saisie du mot de passe de confirmation
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setError("");
  };

  // Soumission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Vérification des critères de sécurité
    if (!isPasswordValid) {
      setError("Le mot de passe ne respecte pas les critères de sécurité.");
      return;
    }
    // Vérification correspondance
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    // Si tout est bon
    setError("");
    setSuccessMessage("Mot de passe modifié avec succès ! Redirection en cours...");

    setTimeout(() => {
      router.push("/auth/signup");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F1E3C6] flex items-center justify-center font-roboto">
      <div className="bg-white w-full max-w-md p-8 shadow-lg rounded-lg">
        
        <h2 className="text-2xl font-bold text-[#5E3D07] text-center mb-6">
          Réinitialisation du mot de passe
        </h2>

        <p className="text-lg text-[#2E2E2E] text-center mb-4">
          Choisissez un nouveau mot de passe sécurisé.
        </p>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          
          {/* Champ Mot de Passe */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Nouveau mot de passe"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 
                focus:outline-none focus:border-[#E6B04C] text-lg text-[#2E2E2E] placeholder:text-gray-700"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {/* Icône Oeil / Oeil barré */}
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
                {/* Barre diagonale affichée si !showPassword */}
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

          {/* Critères si mdp non valide && champ non vide */}
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none 
                focus:border-[#E6B04C] text-lg text-[#2E2E2E] placeholder:text-gray-700"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {/* Même icône, même logique */}
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

          {/* Autorisé si mdp valide (même si confirm != mdp) */}
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
  );
}