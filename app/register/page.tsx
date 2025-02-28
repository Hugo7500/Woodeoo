"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./register.css"; // ✅ Import du CSS propre

export default function RegisterPage() {
  const [accountType, setAccountType] = useState<"client" | "artisan" | null>(null);

  return (
    <div className="register-container">
      
      {/* ÉTAPE 1 : Sélection du type de compte */}
      {!accountType ? (
        <div className="register-card">
          <h2 className="text-2xl font-bold text-[#5E3D07] mb-6">Bienvenue sur PlaniPro</h2>
          <p className="text-lg text-[#2E2E2E] mb-6">Vous êtes :</p>

          <div className="flex flex-col space-y-4">
            {/* ✅ Bouton Particulier en doré */}
            <button 
              className="bg-[#E6B04C] text-white font-bold py-3 rounded-lg hover:bg-[#f0c46e] transition-colors text-lg"
              onClick={() => setAccountType("client")}
            >
              🏠 Particulier
            </button>
            {/* ✅ Bouton Professionnel en marron */}
            <button 
              className="bg-[#5E3D07] text-white font-bold py-3 rounded-lg hover:bg-[#7F5A0A] transition-colors text-lg"
              onClick={() => setAccountType("artisan")}
            >
              🛠️ Professionnel
            </button>
          </div>

          {/* ✅ Ajout du lien "Vous avez déjà un compte ?" */}
          <p className="text-center text-md text-[#5E3D07] mt-6">
            Vous avez déjà un compte ? <Link href="/signup" className="font-bold hover:underline">Se connecter</Link>
          </p>
        </div>
      ) : (
        <div className="register-card">
          
          <h2 className="text-2xl font-bold text-[#5E3D07] text-center mb-6">
            {accountType === "client" ? "Inscription Particulier" : "Inscription Professionnel"}
          </h2>

          <form className="flex flex-col space-y-4">
            {/* ✅ Changement de "Nom d'utilisateur" en "Nom d'entreprise" pour les pros */}
            <input 
              type="text" 
              placeholder={accountType === "artisan" ? "Nom d'entreprise" : "Nom d'utilisateur"} 
              className="input-style" 
              required 
            />
            <input type="email" placeholder="Email" className="input-style" required />

            {/* ✅ Numéro de téléphone OBLIGATOIRE */}
            <input type="tel" placeholder="Numéro de téléphone" className="input-style" required />

            {/* ✅ SIRET Optionnel MAIS TOUJOURS AFFICHÉ AVEC (optionnel) DANS LA BARRE */}
            {accountType === "artisan" && (
              <input type="text" placeholder="Numéro SIRET (optionnel)" className="input-style" />
            )}

            <input type="password" placeholder="Mot de passe (8+ caractères)" className="input-style" required />
            <input type="password" placeholder="Confirmer le mot de passe" className="input-style" required />

            <button type="submit" className="btn-primary">S'inscrire</button>
          </form>

          {/* ✅ Bouton retour PLUS visible (marron comme demandé) */}
          <button 
            onClick={() => setAccountType(null)} 
            className="text-[#5E3D07] font-bold text-md mt-6 hover:underline"
          >
            ⬅ Retour
          </button>

          <p className="text-center text-md text-[#5E3D07] mt-4">
            Déjà un compte ? <Link href="/signup" className="font-bold hover:underline">Se connecter</Link>
          </p>
        </div>
      )}
    </div>
  );
}