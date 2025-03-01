"use client";

/**
 * Page d’inscription "RegisterPage"
 *
 * Cette page propose deux étapes :
 * 1) Sélection du type de compte (Particulier ou Professionnel)
 * 2) Formulaire d’inscription selon le type choisi (Nom d’entreprise si artisan, etc.)
 *
 * On utilise un fichier de styles sous forme de module : auth.module.css
 * pour gérer les classes .register-container, .register-card, .input-style, etc.
 */

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";

/**
 * On importe le fichier de style en module, ce qui permet
 * d'accéder aux classes via "styles.nomDeClasse".
 */
import styles from "@/styles/auth.module.css";

export default function RegisterPage() {
  // Hook Next.js pour la navigation client-side
  const router = useRouter();

  // État pour le type de compte : "client" ou "artisan", ou null si non sélectionné
  const [accountType, setAccountType] = useState<"client" | "artisan" | null>(null);

  // Champs de formulaire
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Toggle pour l'affichage/masquage du mot de passe et de la confirmation
  const [showPasswords, setShowPasswords] = useState(false);

  // Validation du mot de passe
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  // Gestion d'un message d'erreur global (champs vides, mots de passe non correspondants, etc.)
  const [error, setError] = useState("");

  /**
   * resetFields : réinitialise tous les champs et l'état d'erreur,
   * utile quand on change de type de compte ou qu'on veut nettoyer le formulaire.
   */
  const resetFields = () => {
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setIsPasswordValid(false);
    setError("");
  };

  /**
   * validatePassword : vérifie que le mot de passe répond aux critères
   * - Minimum 8 caractères
   * - Au moins 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
   */
  const validatePassword = (pwd: string) => {
    const isValid =
      pwd.length >= 8 &&
      /[A-Z]/.test(pwd) &&       // Au moins une majuscule
      /[a-z]/.test(pwd) &&       // Au moins une minuscule
      /\d/.test(pwd) &&          // Au moins un chiffre
      /[!@#$%^&*]/.test(pwd);    // Au moins un caractère spécial

    setIsPasswordValid(isValid);
  };

  /**
   * handleSubmit : gère la soumission du formulaire
   * - Vérifie que tous les champs sont remplis
   * - Vérifie la validité du mot de passe
   * - Vérifie la correspondance mot de passe / confirmation
   * - Si tout est OK, on simule l'inscription (console.log)
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifie si tous les champs obligatoires sont remplis
    if (!email || !phone || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs !");
      return;
    }

    // Vérifie si le mot de passe respecte les critères
    if (!isPasswordValid) {
      setError("Le mot de passe ne respecte pas les critères de sécurité.");
      return;
    }

    // Vérifie si le mot de passe correspond à la confirmation
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    // Si tout est OK, on considère l'inscription réussie
    setError("");
    console.log("Inscription réussie !");

    // Par exemple, on pourrait rediriger vers le tableau de bord client :
    // router.push("/client/dashboard");
  };

  // Icône œil "ouvert"
  const EyeOpenIcon = (
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
    </svg>
  );

  // Icône œil "barré"
  const EyeSlashIcon = (
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
      <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  return (
    // On remplace .register-container par styles["register-container"]
    <div className={styles["register-container"]}>
      {/* Si on n'a pas encore choisi "client" ou "artisan", on affiche le choix */}
      {!accountType ? (
        <div className={styles["register-card"]}>
          <h2 className="text-2xl font-bold text-[#5E3D07] mb-6">Bienvenue sur Woodeoo</h2>
          <p className="text-lg text-[#2E2E2E] mb-6">Vous êtes :</p>

          <div className="flex flex-col space-y-4">
            {/* Bouton Particulier */}
            <button
              className="bg-[#E6B04C] text-white font-bold py-3 rounded-lg hover:bg-[#f0c46e] transition-colors text-lg"
              onClick={() => {
                resetFields();
                setAccountType("client");
              }}
            >
              🏠 Particulier
            </button>

            {/* Bouton Professionnel */}
            <button
              className="bg-[#5E3D07] text-white font-bold py-3 rounded-lg hover:bg-[#7F5A0A] transition-colors text-lg"
              onClick={() => {
                resetFields();
                setAccountType("artisan");
              }}
            >
              🛠️ Professionnel
            </button>
          </div>

          {/* Lien "déjà un compte" */}
          <p className="text-center text-md text-[#5E3D07] mt-6">
            Vous avez déjà un compte ?{" "}
            <Link href="/auth/signup" className="font-bold hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      ) : (
        // Sinon, on affiche le formulaire d'inscription
        <div className={styles["register-card"]}>
          <h2 className="text-2xl font-bold text-[#5E3D07] text-center mb-6">
            {accountType === "client" ? "Inscription Particulier" : "Inscription Professionnel"}
          </h2>

          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            {/* Nom d'utilisateur ou d'entreprise selon le type */}
            <input
              type="text"
              placeholder={accountType === "artisan" ? "Nom d'entreprise" : "Nom d'utilisateur"}
              className={styles["input-style"]}
              required
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className={styles["input-style"]}
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />

            {/* Téléphone */}
            <input
              type="tel"
              placeholder="Numéro de téléphone"
              className={styles["input-style"]}
              required
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setError("");
              }}
            />

            {/* SIRET optionnel si artisan */}
            {accountType === "artisan" && (
              <input
                type="text"
                placeholder="Numéro SIRET (optionnel)"
                className={styles["input-style"]}
              />
            )}

            {/* Mot de passe + icône œil */}
            <div className="relative">
              <input
                type={showPasswords ? "text" : "password"}
                placeholder="Mot de passe (8+ caractères)"
                className={`${styles["input-style"]} pr-10`}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                  setError("");
                }}
              />
              {/* Affiche l'icône œil seulement si l'utilisateur a commencé à taper */}
              {password.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="absolute inset-y-0 right-3 flex items-center"
                >
                  {showPasswords ? EyeOpenIcon : EyeSlashIcon}
                </button>
              )}
            </div>

            {/* Critères du mot de passe, s'affichent si le mdp n'est pas encore valide et pas vide */}
            {!isPasswordValid && password.length > 0 && (
              <div className="text-sm text-[#5E3D07] bg-[#F8F0E3] p-2 rounded-lg">
                <p className={password.length >= 8 ? "text-green-600" : "text-red-600"}>
                  {password.length >= 8 ? "✔" : "✖"} Minimum 8 caractères
                </p>
                <p className={/[A-Z]/.test(password) ? "text-green-600" : "text-red-600"}>
                  {/[A-Z]/.test(password) ? "✔" : "✖"} Au moins une majuscule
                </p>
                <p className={/[a-z]/.test(password) ? "text-green-600" : "text-red-600"}>
                  {/[a-z]/.test(password) ? "✔" : "✖"} Au moins une minuscule
                </p>
                <p className={/\d/.test(password) ? "text-green-600" : "text-red-600"}>
                  {/\d/.test(password) ? "✔" : "✖"} Au moins un chiffre
                </p>
                <p className={/[!@#$%^&*]/.test(password) ? "text-green-600" : "text-red-600"}>
                  {/[!@#$%^&*]/.test(password) ? "✔" : "✖"} Un caractère spécial (!@#$%^&*)
                </p>
              </div>
            )}

            {/* Confirmation du mot de passe + icône œil */}
            <div className="relative">
              <input
                type={showPasswords ? "text" : "password"}
                placeholder="Confirmer le mot de passe"
                className={`${styles["input-style"]} pr-10`}
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
              />
              {confirmPassword.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="absolute inset-y-0 right-3 flex items-center"
                >
                  {showPasswords ? EyeOpenIcon : EyeSlashIcon}
                </button>
              )}
            </div>

            {/* Message d'erreur global */}
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}

            {/* Bouton "S'inscrire" : on le désactive si le mot de passe n'est pas valide */}
            <button
              type="submit"
              className={`
                bg-[#E6B04C] text-white font-bold py-3 rounded-lg transition-colors text-lg w-full
                ${isPasswordValid ? "hover:bg-[#f0c46e]" : "opacity-50 cursor-not-allowed"}
              `}
              disabled={!isPasswordValid}
            >
              S'inscrire
            </button>
          </form>

          {/* Bouton retour (réinitialise tout et repasse accountType à null) */}
          <button
            onClick={() => {
              resetFields();
              setAccountType(null);
            }}
            className="text-[#5E3D07] font-bold text-md mt-6 hover:underline"
          >
            ⬅ Retour
          </button>

          {/* Lien "Déjà un compte ? Se connecter" */}
          <p className="text-center text-md text-[#5E3D07] mt-4">
            Déjà un compte ?{" "}
            <Link href="/auth/signup" className="font-bold hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}