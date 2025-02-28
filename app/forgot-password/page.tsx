"use client"; // Composant client pour gérer l’état

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [contact, setContact] = useState("");
  const [isValid, setIsValid] = useState(false);
  const router = useRouter(); // Pour gérer la redirection

  // Vérifie si c'est un email ou un numéro valide
  const validateInput = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]{8,15}$/; // Accepte les numéros avec ou sans + (8 à 15 chiffres)

    if (emailRegex.test(value) || phoneRegex.test(value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setContact(value);
  };

  // Gestion de l'envoi du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    console.log("Envoi du code à :", contact);
    
    // Simule l'envoi du code et redirige vers la page de vérification
    setTimeout(() => {
      router.push("/verify-code");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F1E3C6] flex items-center justify-center font-roboto">
      <div className="bg-white w-full max-w-md p-8 shadow-lg rounded-lg">
        
        {/* Titre */}
        <h2 className="text-2xl font-bold text-[#5E3D07] text-center mb-6">
          Mot de passe oublié
        </h2>

        {/* Formulaire */}
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          
          <input
            type="text"
            placeholder="Entrez votre email ou numéro de téléphone"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#E6B04C] text-lg text-[#2E2E2E] placeholder:text-gray-600"
            required
            value={contact}
            onChange={(e) => validateInput(e.target.value)}
          />

          {/* Bouton Envoyer (désactivé tant que l'input est invalide) */}
          <button
            type="submit"
            className={`text-white font-bold py-3 rounded-lg transition-colors text-lg ${
              isValid ? "bg-[#E6B04C] hover:bg-[#f0c46e]" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isValid}
          >
            Réinitialiser le mot de passe
          </button>
        </form>

        {/* Lien vers la connexion */}
        <p className="text-center text-md text-[#5E3D07] mt-4">
          Retour à la{" "}
          <Link href="/signup" className="font-bold hover:underline">
            connexion
          </Link>
        </p>
      </div>
    </div>
  );
}