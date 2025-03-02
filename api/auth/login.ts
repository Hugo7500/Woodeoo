import type { NextApiRequest, NextApiResponse } from 'next';
// import { findUserByEmail, verifyPassword, generateAuthToken } from '../../../lib/authService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email et mot de passe requis" });
  }

  try {
    // Vérifier si l'utilisateur existe et valider le mot de passe
    // const user = await findUserByEmail(email);
    // if (!user) {
    //   return res.status(401).json({ error: "Identifiants invalides" });
    // }
    // const passwordIsValid = await verifyPassword(password, user.hashedPassword);
    // if (!passwordIsValid) {
    //   return res.status(401).json({ error: "Identifiants invalides" });
    // }

    // Générer un token JWT de session par exemple
    // const token = await generateAuthToken({ userId: user.id, email: user.email });

    // Placer le token en cookie HTTP-only pour la sécurité (optionnel, sinon renvoyer dans le body)
    // res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=3600; Secure; SameSite=Strict`);

    return res.status(200).json({ message: "Connexion réussie" /*, token */ });
  } catch (err) {
    console.error("Erreur lors de la connexion:", err);
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
}