"use client";

/**
 * Page "SignUpPage"
 *
 * Permet à l’utilisateur de saisir un email et un mot de passe pour s’inscrire,
 * puis redirige vers le tableau de bord (ROUTES.dashboard) après la soumission.
 *
 * On propose aussi un lien "Mot de passe oublié" (forgot password)
 * et un bouton "Créer un nouveau compte" qui envoie vers /auth/register.
 *
 * On utilise un fichier de style module : auth.module.css
 * pour la mise en forme du conteneur, de la carte, etc.
 */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";

// Import du style module au lieu d'un .css global
import styles from "@/styles/auth.module.css";

export default function SignUpPage() {
  // Hook pour naviguer côté client
  const router = useRouter();

  // État local : affichage/masquage du mot de passe
  const [showPassword, setShowPassword] = useState(false);

  // Champs de formulaire
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  /**
   * handleSignup : gère la soumission du formulaire
   * - Si email et password sont remplis, on redirige vers ROUTES.dashboard
   */
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      // Ici on simule la réussite de l'inscription
      // On peut ensuite rediriger vers le dashboard
      router.push(ROUTES.dashboard);
    }
  };

  return (
    <>
      {/* 
        <Head> pour configurer le <title> et le favicon 
        spécifique à la page signup
      */}
      <Head>
        <title>Inscription | Woodeoo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/*
        Container principal : 
        - On peut mélanger du Tailwind (min-h-screen, flex, etc.)
        - et des classes du module CSS (styles["register-container"]) si on veut
      */}
      <div className={`${styles["register-container"]} min-h-screen bg-[#F1E3C6] flex items-center justify-center font-roboto`}>
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center">
          
          {/* ======= 1ère Colonne : Présentation ======= */}
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 md:mt-[-100px]">
            {/* Logo Woodeoo */}
            <Image src="/logo.png" alt="Logo Woodeoo" width={240} height={240} />
            <p className="text-[#2E2E2E] text-lg max-w-md mt-6">
              Trouvez et commandez facilement votre bois de chauffage ou vos granulés en ligne.
              Faites-vous livrer en quelques clics, directement chez vous ! 🔥🌳
            </p>
          </div>

          {/* ======= 2ème Colonne : Formulaire ======= */}
          <div className="flex-1 flex flex-col items-center p-8">
            {/* Carte blanche : on peut utiliser styles["register-card"] pour un style de base */}
            <div className={`${styles["register-card"]} bg-white w-full max-w-md p-8 shadow-lg rounded-lg`}>
              {/* Formulaire d'inscription */}
              <form className="flex flex-col space-y-4" onSubmit={handleSignup}>
                {/* Champ email */}
                <input
                  type="email"
                  placeholder="Entrez votre email"
                  className={`${styles["input-style"]} border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#E6B04C] text-lg text-[#2E2E2E] placeholder:text-gray-600`}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* Champ mot de passe + icône œil */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Entrez votre mot de passe"
                    className={`${styles["input-style"]} border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:border-[#E6B04C] text-lg text-[#2E2E2E] placeholder:text-gray-600`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* Affiche l'icône œil seulement si le champ password n'est pas vide */}
                  {password.length > 0 && (
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
                        {/* Barre diagonale si showPassword == false */}
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
                  )}
                </div>

                {/* Bouton S'inscrire */}
                <button
                  type="submit"
                  className="bg-[#E6B04C] text-white font-bold py-3 rounded-lg hover:bg-[#f0c46e] transition-colors text-lg w-full"
                >
                  S'inscrire
                </button>

                {/* Lien mot de passe oublié */}
                <div className="text-center">
                  <Link href={ROUTES.forgotPassword} className="text-[#5E3D07] text-md hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </div>
              </form>

              {/* Séparateur */}
              <div className="w-full border-t border-gray-300 my-4"></div>

              {/* Lien vers la page Register (particulier/pro) */}
              <Link href={ROUTES.register}>
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
    </>
  );
}