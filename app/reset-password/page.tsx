"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [error, setError] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  // Vérification des critères de sécurité
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
    setError("");
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordValid) {
      setError("Le mot de passe ne respecte pas les critères de sécurité.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    // ✅ Simuler l'envoi de la requête au serveur
    console.log("Mot de passe réinitialisé avec succès !");
    
    // ✅ Afficher un message de succès
    setSuccessMessage("Mot de passe modifié avec succès ! Redirection en cours...");
    
    // ✅ Rediriger vers la page de connexion après 2 secondes
    setTimeout(() => {
      router.push("/signup");
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
          
          {/* Champ Nouveau Mot de Passe */}
          <div className="relative">
            <input
              type={showPasswords ? "text" : "password"}
              placeholder="Nouveau mot de passe"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none 
                focus:border-[#E6B04C] text-lg text-[#2E2E2E] placeholder:text-gray-700"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {/* ✅ Icône Oeil présente dans les DEUX champs et contrôle les deux */}
            <button
              type="button"
              onClick={() => setShowPasswords(!showPasswords)}
              className="absolute inset-y-0 right-3 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 hover:text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/>
                <circle cx="12" cy="12" r="3"/>
                {!showPasswords && (
                  <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2"/>
                )}
              </svg>
            </button>
          </div>

          {/* ✅ Critères du mot de passe affichés uniquement si non valide */}
          {!isPasswordValid && password.length > 0 && (
            <div className="text-sm text-[#5E3D07] bg-[#F8F0E3] p-2 rounded-lg">
              <p className={`${password.length >= 8 ? "text-green-600" : "text-red-600"}`}>
                {password.length >= 8 ? "✔" : "✖"} Minimum 8 caractères
              </p>
              <p className={`${/[A-Z]/.test(password) ? "text-green-600" : "text-red-600"}`}>
                {/[A-Z]/.test(password) ? "✔" : "✖"} Une majuscule
              </p>
              <p className={`${/[a-z]/.test(password) ? "text-green-600" : "text-red-600"}`}>
                {/[a-z]/.test(password) ? "✔" : "✖"} Une minuscule
              </p>
              <p className={`${/\d/.test(password) ? "text-green-600" : "text-red-600"}`}>
                {/\d/.test(password) ? "✔" : "✖"} Un chiffre
              </p>
              <p className={`${/[!@#$%^&*]/.test(password) ? "text-green-600" : "text-red-600"}`}>
                {/[!@#$%^&*]/.test(password) ? "✔" : "✖"} Un symbole spécial (!@#$%^&*)
              </p>
            </div>
          )}

          {/* Champ Confirmation du Mot de Passe */}
          <div className="relative">
            <input
              type={showPasswords ? "text" : "password"}
              placeholder="Confirmer le mot de passe"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none 
                focus:border-[#E6B04C] text-lg text-[#2E2E2E] placeholder:text-gray-700"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {/* ✅ Icône Oeil dans le champ de confirmation aussi */}
            <button
              type="button"
              onClick={() => setShowPasswords(!showPasswords)}
              className="absolute inset-y-0 right-3 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 hover:text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/>
                <circle cx="12" cy="12" r="3"/>
                {!showPasswords && (
                  <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2"/>
                )}
              </svg>
            </button>
          </div>

          {/* Message d'erreur */}
          {error && <p className="text-red-600 text-center">{error}</p>}

          {/* ✅ Message de succès après soumission */}
          {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}

          <button 
            type="submit" 
            className={`bg-[#E6B04C] text-white font-bold py-3 rounded-lg transition-colors text-lg w-full 
              ${isPasswordValid && password === confirmPassword ? "hover:bg-[#f0c46e]" : "opacity-50 cursor-not-allowed"}`}
            disabled={!isPasswordValid || password !== confirmPassword}
          >
            Réinitialiser
          </button>
        </form>
      </div>
    </div>
  );
}