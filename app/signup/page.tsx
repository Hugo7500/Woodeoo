"use client"; // Indique que c'est un composant Client

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-[#F1E3C6] flex items-center justify-center font-roboto">
      {/* Conteneur principal */}
      <div className="max-w-6xl w-full flex flex-col md:flex-row">
        
        {/* ======= 1ère Colonne : Présentation ======= */}
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <div className="flex items-center space-x-6">
            <Image src="/logo.png" alt="Logo PlaniPro" width={100} height={100} />
            <h1 className="text-[#5E3D07] text-5xl font-bold">PlaniPro</h1>
          </div>

          <p className="text-[#2E2E2E] text-lg max-w-md mt-6">
            Gagnez du temps, simplifiez vos tâches administratives
            et collaborez plus efficacement. Rejoignez PlaniPro,
            l’outil tout-en-un qui accompagne chaque artisan au quotidien !
          </p>
        </div>

        {/* ======= 2ème Colonne : Formulaire (ajustement des angles) ======= */}
        <div className="flex-1 flex flex-col items-center p-8">
          <div className="bg-white w-full max-w-md p-8 shadow-lg rounded-lg">
            
            <form className="flex flex-col space-y-4">
              
              {/* Champ Email */}
              <input
                type="text"
                placeholder="Entrez votre email ou numéro de téléphone"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#E6B04C] text-lg text-[#2E2E2E] placeholder:text-gray-600"
                required
              />

              {/* Champ Mot de passe avec œil 👁 */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Entrez votre mot de passe"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:border-[#E6B04C] text-lg text-[#2E2E2E] placeholder:text-gray-600"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* Bouton œil visible uniquement si champ focus + texte saisi */}
                {password.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center"
                  >
                    {/* Icône œil avec barre diagonale si masqué */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 hover:text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/>
                      <circle cx="12" cy="12" r="3"/>
                      {!showPassword && (
                        <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2"/>
                      )}
                    </svg>
                  </button>
                )}
              </div>

              {/* Bouton Se connecter */}
              <button
                type="submit"
                className="bg-[#E6B04C] text-white font-bold py-3 rounded-lg hover:bg-[#f0c46e] transition-colors text-lg w-full"
              >
                Se connecter
              </button>D

              {/* Lien "Mot de passe oublié" */}
              <div className="text-center">
                <Link href="/forgot-password" className="text-[#5E3D07] text-md hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
            </form>

            {/* Séparateur */}
            <div className="w-full border-t border-gray-300 my-4"></div>

            {/* Bouton "Créer un nouveau compte" */}
            <Link href="/register">
              <button
                type="button"
                className="w-full bg-[#5E3D07] text-white font-bold py-3 rounded-lg hover:bg-[#7F5A0A] transition-colors text-lg text-center"
              >
                Créer un nouveau compte
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}