/**
 * Vérifie si une string est un email valide.
 * Utilise une expression régulière simple pour valider le format.
 */
export function isValidEmail(email: string): boolean {
    // Regex simplifiée pour validation email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  /**
   * Extrait les messages d'erreur depuis un objet Error (par ex. erreur d'API)
   * pour fournir un message utilisateur.
   */
  export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    // Cas où l'erreur est un objet renvoyé par fetch par exemple
    try {
      return JSON.stringify(error);
    } catch {
      return String(error);
    }
  }
  
  /**
   * Formate une date au format lisible (ex: "12/03/2025 à 14:30")
   */
  export function formatDate(date: Date): string {
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  }