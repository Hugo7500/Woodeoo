// Ce fichier gère des actions liées à l'authentification sur le frontend (token, déconnexion, etc.)

/**
 * Stocke le token d'authentification de l'utilisateur de manière sécurisée.
 * Ici on utilise un cookie HTTP-only via l'API, donc cette fonction peut rester vide 
 * ou garder un fallback localStorage si nécessaire.
 */
export function saveAuthToken(token: string): void {
    try {
      localStorage.setItem("authToken", token);
    } catch (err) {
      console.error("Impossible de stocker le token", err);
      // En cas d'échec (quota ou navigation privée), on pourrait envisager une autre stratégie.
    }
  }
  
  /**
   * Récupère le token d'authentification stocké (si présent).
   */
  export function getAuthToken(): string | null {
    try {
      return localStorage.getItem("authToken");
    } catch (err) {
      console.error("Impossible de lire le token", err);
      return null;
    }
  }
  
  /**
   * Supprime le token d'authentification (lors de la déconnexion).
   */
  export function clearAuthToken(): void {
    try {
      localStorage.removeItem("authToken");
    } catch (err) {
      console.error("Impossible de supprimer le token", err);
    }
  }
  
  /**
   * Redirige vers la page de connexion si l'utilisateur n'est pas authentifié.
   * (Dans une application Next.js, on pourrait utiliser cette fonction dans les pages protégées.)
   */
  export function redirectIfUnauthenticated(ctx: any): void {
    // Cette fonction peut être utilisée côté serveur (getServerSideProps) ou client.
    // Si on détecte l'absence de token (ou de session), on redirige.
    const token = typeof window === "undefined" 
      ? ctx.req.cookies?.token 
      : getAuthToken();
    if (!token) {
      if (typeof window === "undefined") {
        ctx.res.writeHead(302, { Location: "/auth/login" });
        ctx.res.end();
      } else {
        window.location.href = "/auth/login";
      }
    }
  }