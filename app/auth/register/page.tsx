import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Input from "../../components/Input";   // composant Input réutilisable
import Button from "../../components/Button"; // composant Button réutilisable
import styles from "../../styles/auth.module.css";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  // États locaux pour les champs du formulaire et les messages d'erreur
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation côté client avant l'envoi
    if (!email || !password) {
      setError("Veuillez remplir tous les champs requis.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    try {
      // Appel de l'API d'inscription
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        // Affiche le message d'erreur renvoyé par l'API (ex: email déjà pris)
        setError(data.error || "Inscription échouée. Veuillez réessayer.");
      } else {
        // Inscription réussie : redirige vers la page de connexion
        router.push("/auth/login?registered=1");
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
      setError("Une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h1>Inscription</h1>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <form className={styles.authForm} onSubmit={handleSubmit} noValidate>
        <Input 
          label="Email" 
          type="email" 
          name="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <Input 
          label="Mot de passe" 
          type="password" 
          name="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          minLength={6}
        />
        <Input 
          label="Confirmer le mot de passe" 
          type="password" 
          name="confirmPassword" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required 
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Inscription..." : "Créer mon compte"}
        </Button>
      </form>
      <p className={styles.switchAuth}>
        Déjà un compte ? <Link href="/auth/login">Connexion</Link>
      </p>
    </div>
  );
};

export default RegisterPage;