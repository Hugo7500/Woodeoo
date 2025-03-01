"use client";

import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import "@/styles/auth.css";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [contact, setContact] = useState("");
  const [isValid, setIsValid] = useState(false);

  // Vérifie si l'entrée est un email ou un numéro valide
  const validateInput = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]{8,15}$/;
    setIsValid(emailRegex.test(value) || phoneRegex.test(value));
    setContact(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      // Redirige vers /auth/verify-code avec le contact dans la query string
      router.push(`/auth/verify-code?contact=${encodeURIComponent(contact)}`);
    }
  };

  return (
    <>
      <Head>
        <title>Mot de passe oublié | Woodeoo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="register-container">
        <div className="register-card">
          <h2 className="text-2xl font-bold text-[#5E3D07] text-center mb-6">
            Mot de passe oublié
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Entrez votre email ou numéro de téléphone"
              className="input-style"
              required
              value={contact}
              onChange={(e) => validateInput(e.target.value)}
            />

            {/* Bouton avec la même logique que VerifyCode */}
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