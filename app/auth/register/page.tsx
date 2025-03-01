"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@/styles/auth.css"; // Assure-toi que le chemin est correct

export default function RegisterPage() {
  const router = useRouter();

  // Sélection du type de compte
  const [accountType, setAccountType] = useState<"client" | "artisan" | null>(null);

  // Champs du formulaire
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Toggle "œil" (identique à ResetPassword)
  const [showPasswords, setShowPasswords] = useState(false);

  // Validation du mot de passe
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  // Gestion des erreurs
  const [error, setError] = useState("");

  // Réinitialisation des champs
  const resetFields = () => {
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setIsPasswordValid(false);
    setError("");
  };

  // Vérification du mot de passe : 8+ caractères, maj., min., chiffre, caractère spécial
  const validatePassword = (pwd: string) => {
    const isValid =
      pwd.length >= 8 &&
      /[A-Z]/.test(pwd) &&
      /[a-z]/.test(pwd) &&
      /\d/.test(pwd) &&
      /[!@#$%^&*]/.test(pwd);
    setIsPasswordValid(isValid);
  };

  // Soumission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !phone || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs !");
      return;
    }
    if (!isPasswordValid) {
      setError("Le mot de passe ne respecte pas les critères de sécurité.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    setError("");
    console.log("Inscription réussie !");
    // router.push("/client/dashboard"); // Par exemple
  };

  // Icônes "œil"
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
    <div className="register-container">
      {!accountType ? (
        // ÉTAPE 1 : Choix du type de compte
        <div className="register-card">
          <h2 className="text-2xl font-bold text-[#5E3D07] mb-6">Bienvenue sur Woodeoo</h2>
          <p className="text-lg text-[#2E2E2E] mb-6">Vous êtes :</p>

          <div className="flex flex-col space-y-4">
            <button
              className="bg-[#E6B04C] text-white font-bold py-3 rounded-lg hover:bg-[#f0c46e] transition-colors text-lg"
              onClick={() => {
                resetFields();
                setAccountType("client");
              }}
            >
              🏠 Particulier
            </button>
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

          <p className="text-center text-md text-[#5E3D07] mt-6">
            Vous avez déjà un compte ?{" "}
            <Link href="/auth/signup" className="font-bold hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      ) : (
        // ÉTAPE 2 : Formulaire
        <div className="register-card">
          <h2 className="text-2xl font-bold text-[#5E3D07] text-center mb-6">
            {accountType === "client" ? "Inscription Particulier" : "Inscription Professionnel"}
          </h2>

          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={accountType === "artisan" ? "Nom d'entreprise" : "Nom d'utilisateur"}
              className="input-style"
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="input-style"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />

            <input
              type="tel"
              placeholder="Numéro de téléphone"
              className="input-style"
              required
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setError("");
              }}
            />

            {accountType === "artisan" && (
              <input
                type="text"
                placeholder="Numéro SIRET (optionnel)"
                className="input-style"
              />
            )}

            {/* Mot de passe (toggle œil) */}
            <div className="relative">
              <input
                type={showPasswords ? "text" : "password"}
                placeholder="Mot de passe (8+ caractères)"
                className="input-style pr-10"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                  setError("");
                }}
              />
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

            {/* Critères du mdp */}
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

            {/* Confirmation du mdp (même toggle) */}
            <div className="relative">
              <input
                type={showPasswords ? "text" : "password"}
                placeholder="Confirmer le mot de passe"
                className="input-style pr-10"
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

            {/* Erreur */}
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}

            {/* Bouton "S'inscrire" : même logique que VerifyCode */}
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

          <button
            onClick={() => {
              resetFields();
              setAccountType(null);
            }}
            className="text-[#5E3D07] font-bold text-md mt-6 hover:underline"
          >
            ⬅ Retour
          </button>

          <p className="text-center text-md text-[#5E3D07] mt-4">
            Déjà un compte ?{" "}
            <Link href="/signup" className="font-bold hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}