"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ROUTES } from "@/utils/routes";
import "@/styles/auth.css";

export default function VerifyCodePage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Autorise uniquement les chiffres, max 6 caractères
    if (/^\d{0,6}$/.test(value)) {
      setCode(value);
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError("Le code doit contenir 6 chiffres.");
      return;
    }

    // Ici, on simule la vérification du code.
    // Par exemple, si le code est "123456", c'est validé.
    if (code === "123456") {
      console.log("Code correct, redirection vers reset-password...");
      router.push("/auth/reset-password");
    } else {
      setError("Code incorrect. Veuillez réessayer.");
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimeLeft(60);
    setCanResend(false);
    console.log("Code renvoyé !");
  };

  return (
    <>
      <Head>
        <title>Vérification du code | Woodeoo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-[#F1E3C6] flex items-center justify-center font-roboto">
        <div className="bg-white w-full max-w-md p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-[#5E3D07] text-center mb-6">
            Vérification du code
          </h2>
          <p className="text-[#2E2E2E] text-md text-center mb-4">
            Un code à 6 chiffres vous a été envoyé à votre email ou téléphone.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              value={code}
              onChange={handleCodeChange}
              placeholder="Entrez le code"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#E6B04C] text-lg text-center tracking-widest text-[#2E2E2E] placeholder:text-gray-600"
              maxLength={6}
              inputMode="numeric"
            />
            {error && <p className="text-red-600 text-center text-sm">{error}</p>}
            <button
              type="submit"
              className={`bg-[#E6B04C] text-white font-bold py-3 rounded-lg transition-colors text-lg w-full ${
                code.length === 6 ? "hover:bg-[#f0c46e]" : "opacity-50 cursor-not-allowed"
              }`}
              disabled={code.length !== 6}
            >
              Valider le code
            </button>
          </form>
          <div className="text-center mt-4">
            {canResend ? (
              <button onClick={handleResend} className="text-[#5E3D07] font-bold hover:underline">
                Renvoyer le code
              </button>
            ) : (
              <p className="text-gray-500">Renvoyer dans {timeLeft}s</p>
            )}
          </div>
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