"use client";

/**
 * Page "VerifyCodePage"
 *
 * Permet à l'utilisateur de saisir un code à 6 chiffres (envoyé par email ou téléphone)
 * pour valider l'étape de réinitialisation de mot de passe.
 *
 * - On stocke le code dans un state (max 6 chiffres).
 * - On gère un compte à rebours de 60s (timeLeft), après lequel l'utilisateur peut renvoyer le code.
 * - Si le code est "123456", on simule une vérification réussie et on redirige vers reset-password.
 * - Sinon, on affiche une erreur.
 *
 * On remplace l'import global par un style module : auth.module.css
 * pour la mise en forme du conteneur, de la carte, etc.
 */

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ROUTES } from "@/utils/routes";

// Import du style module
import styles from "@/styles/auth.module.css";

export default function VerifyCodePage() {
  // Permet la navigation client-side
  const router = useRouter();

  // State pour le code saisi
  const [code, setCode] = useState("");
  // Message d'erreur si le code est incorrect ou incomplet
  const [error, setError] = useState("");

  // timeLeft : compte à rebours avant de pouvoir renvoyer un code
  const [timeLeft, setTimeLeft] = useState(60);
  // canResend : indique si on peut cliquer sur "Renvoyer le code"
  const [canResend, setCanResend] = useState(false);

  /**
   * useEffect pour décrémenter timeLeft toutes les secondes,
   * tant que timeLeft > 0. Quand timeLeft atteint 0, on active canResend.
   */
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  /**
   * handleCodeChange : gère la saisie du code
   * - Autorise uniquement des chiffres, max 6 caractères
   * - Réinitialise l'erreur si on tape à nouveau
   */
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Regex : 0 à 6 chiffres
    if (/^\d{0,6}$/.test(value)) {
      setCode(value);
      setError("");
    }
  };

  /**
   * handleSubmit : gère la validation du code
   * - Vérifie que le code a 6 chiffres
   * - Simule la vérification (ex: code "123456" => OK)
   * - Sinon affiche une erreur
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (code.length !== 6) {
      setError("Le code doit contenir 6 chiffres.");
      return;
    }

    // Exemple : on considère "123456" comme code correct
    if (code === "123456") {
      console.log("Code correct, redirection vers reset-password...");
      router.push("/auth/reset-password");
    } else {
      setError("Code incorrect. Veuillez réessayer.");
    }
  };

  /**
   * handleResend : réinitialise le timer à 60s
   * et simule l'envoi d'un nouveau code
   */
  const handleResend = () => {
    if (!canResend) return;
    setTimeLeft(60);
    setCanResend(false);
    console.log("Code renvoyé !");
  };

  return (
    <>
      {/* <Head> pour le titre et le favicon */}
      <Head>
        <title>Vérification du code | Woodeoo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 
        Container principal : 
        on peut mixer du Tailwind (min-h-screen, flex, etc.) 
        et le style module (styles["register-container"])
      */}
      <div className={`${styles["register-container"]} min-h-screen bg-[#F1E3C6] flex items-center justify-center font-roboto`}>
        {/* 
          Carte : on peut utiliser styles["register-card"] 
          pour le style de la carte (fond blanc, padding, etc.)
        */}
        <div className={`${styles["register-card"]} bg-white w-full max-w-md p-8 shadow-lg rounded-lg`}>
          <h2 className="text-2xl font-bold text-[#5E3D07] text-center mb-6">
            Vérification du code
          </h2>

          <p className="text-[#2E2E2E] text-md text-center mb-4">
            Un code à 6 chiffres vous a été envoyé à votre email ou téléphone.
          </p>

          {/* Formulaire pour saisir le code */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              value={code}
              onChange={handleCodeChange}
              placeholder="Entrez le code"
              // On peut mixer .input-style + tailwind
              className={`${styles["input-style"]} border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#E6B04C] text-lg text-center tracking-widest text-[#2E2E2E] placeholder:text-gray-600`}
              maxLength={6}
              inputMode="numeric"
            />

            {/* Affiche l'erreur si besoin */}
            {error && <p className="text-red-600 text-center text-sm">{error}</p>}

            {/* Bouton "Valider le code" */}
            <button
              type="submit"
              className={`
                bg-[#E6B04C] text-white font-bold py-3 rounded-lg transition-colors text-lg w-full 
                ${code.length === 6 ? "hover:bg-[#f0c46e]" : "opacity-50 cursor-not-allowed"}
              `}
              disabled={code.length !== 6}
            >
              Valider le code
            </button>
          </form>

          {/* Section "Renvoyer le code" */}
          <div className="text-center mt-4">
            {canResend ? (
              <button onClick={handleResend} className="text-[#5E3D07] font-bold hover:underline">
                Renvoyer le code
              </button>
            ) : (
              <p className="text-gray-500">Renvoyer dans {timeLeft}s</p>
            )}
          </div>

          {/* Bouton de retour */}
          <div className="text-center mt-6">
            <Link href="/auth/forgot-password" className="text-[#5E3D07] font-bold hover:underline">
              ⬅ Retour
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}