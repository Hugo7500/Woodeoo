import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styles from "../../styles/auth.module.css";

const ResetPasswordPage: React.FC = () => {
  const router = useRouter();
  const { email = "", code = "" } = router.query;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirige si pas d'email ou de code (accès direct non autorisé)
  useEffect(() => {
    if (!email || !code) {
      router.replace("/auth/forgot-password");
    }
  }, [email, code, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!newPassword || !confirmPassword) {
      setError("Veuillez renseigner et confirmer votre nouveau mot de passe.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Impossible de réinitialiser le mot de passe.");
      } else {
        setSuccess("Votre mot de passe a été réinitialisé avec succès. Vous pouvez vous connecter.");
        // Optionnel: on peut rediriger automatiquement vers la connexion après quelques secondes
        setTimeout(() => router.push("/auth/login"), 3000);
      }
    } catch (err) {
      console.error(err);
      setError("Erreur serveur, veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h1>Réinitialisation du mot de passe</h1>
      {success && <p className={styles.success} role="status">{success}</p>}
      {error && <p className={styles.error} role="alert">{error}</p>}
      <form className={styles.authForm} onSubmit={handleSubmit} noValidate>
        <Input 
          label="Nouveau mot de passe" 
          type="password" 
          name="newPassword" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
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
          {loading ? "Enregistrement..." : "Enregistrer le nouveau mot de passe"}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;