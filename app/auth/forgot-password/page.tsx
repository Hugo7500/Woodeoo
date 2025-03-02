import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styles from "../../styles/auth.module.css";

const ForgotPasswordPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!email) {
      setError("Veuillez renseigner votre adresse email.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Une erreur s'est produite. Veuillez réessayer.");
      } else {
        // Succès : on informe l'utilisateur et on redirige vers la vérification de code
        setMessage("Un code de vérification vous a été envoyé par email.");
        // On passe l'email en paramètre de query pour la page suivante
        router.push(`/auth/verify-code?email=${encodeURIComponent(email)}`);
      }
    } catch (err) {
      console.error(err);
      setError("Erreur réseau, veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h1>Mot de passe oublié</h1>
      {message && <p className={styles.info} role="status">{message}</p>}
      {error && <p className={styles.error} role="alert">{error}</p>}
      <form className={styles.authForm} onSubmit={handleSubmit} noValidate>
        <Input 
          label="Adresse email" 
          type="email" 
          name="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Envoi en cours..." : "Envoyer le code"}
        </Button>
      </form>
      <p className={styles.switchAuth}>
        <Link href="/auth/login">← Retour à la connexion</Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;