import type { NextApiRequest, NextApiResponse } from 'next';
// import { hashPassword, findUserByEmail, createUser } from '../../../lib/authService'; // exemples de fonctions abstraites

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    // Méthode non autorisée
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email et mot de passe requis" });
  }

  try {
    // Exemple: vérifier si l'utilisateur existe déjà
    // const existingUser = await findUserByEmail(email);
    // if (existingUser) {
    //   return res.status(409).json({ error: "Cet email est déjà utilisé" });
    // }

    // Hacher le mot de passe avant de le stocker (sécurité)
    // const hashedPassword = await hashPassword(password);

    // Créer le nouvel utilisateur dans la base de données
    // await createUser({ email, password: hashedPassword });
    
    // Répondre avec succès
    return res.status(201).json({ message: "Compte créé avec succès" });
  } catch (err) {
    console.error("Erreur lors de l'inscription:", err);
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
}