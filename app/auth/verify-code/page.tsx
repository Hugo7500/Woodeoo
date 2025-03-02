import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styles from "../../styles/auth.module.css";

const VerifyCodePage: React.FC = () => {
  const router = useRouter();
  const { email = "" } = router.query; // email passé en paramètre de query
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Si l'email n'est pas dans les query (accès direct à la page), on peut rediriger vers /forgot-password
  useEffect(() => {
    if (!email) {
      router.replace("/auth/forgot-password");
    }
  }, [email, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!code) {
      setError("Veuillez entrer le code de vérification reçu.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Code invalide. Veuillez réessayer.");
      } else {
        // Code valide : redirige vers la page de réinitialisation du mot de passe en transmettant email et code
        router.push(`/auth/reset-password?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`);
      }
    } catch (err) {
      console.error(err);
      setError("Erreur de réseau. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h1>Vérification du code</h1>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <p>Entrez le code à 6 chiffres que nous avons envoyé à <strong>{email}</strong> :</p>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <Input 
          label="Code de vérification" 
          type="text" 
          name="code" 
          value={code} 
          onChange={(e) => setCode(e.target.value)} 
          required 
          pattern="\\d{6}" 
          title="Le code à 6 chiffres envoyé par email" 
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Vérification..." : "Vérifier"}
        </Button>
      </form>
      <p className={styles.switchAuth}>
        <Link href="/auth/forgot-password">← Renvoyer un code</Link>
      </p>
    </div>
  );
};

export default VerifyCodePage;