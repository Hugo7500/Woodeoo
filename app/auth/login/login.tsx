import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styles from "../../styles/auth.module.css";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Si l'utilisateur vient de s'inscrire, on peut afficher un message de succès via la query string
  const registered = router.query.registered;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Veuillez indiquer votre email et votre mot de passe.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Identifiants invalides.");
      } else {
        // Connexion réussie : on peut stocker le token (via utils/auth) et rediriger
        // Par exemple, stocker le token dans un cookie HTTP-only côté serveur pour la sécurité
        router.push("/");  // redirection vers page d'accueil ou tableau de bord
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
      setError("Impossible de se connecter. Veuillez vérifier votre connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h1>Connexion</h1>
      {/* Message de confirmation si inscription récente */}
      {registered && <p className={styles.info} role="status">Votre compte a été créé avec succès, veuillez vous connecter.</p>}
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
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </Button>
      </form>
      <p className={styles.switchAuth}>
        <Link href="/auth/forgot-password">Mot de passe oublié ?</Link>
      </p>
      <p className={styles.switchAuth}>
        Pas de compte ? <Link href="/auth/register">Inscription</Link>
      </p>
    </div>
  );
};

export default LoginPage;