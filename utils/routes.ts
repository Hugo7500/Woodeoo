// Définition centralisée des routes de l'application pour éviter les hard-codes dans le code
const Routes = {
  HOME: "/",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",
  VERIFY_CODE: "/auth/verify-code",
  RESET_PASSWORD: "/auth/reset-password",
  // ... autres routes de l'application
} as const;

// TypeScript: Exporte un type qui liste les clés possibles, utile si on veut typer une prop qui attend une route clé
export type RouteKey = keyof typeof Routes;
export default Routes;