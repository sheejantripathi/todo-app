// services/authService.ts
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { ensureEnvVariables } from '../utils/env';

ensureEnvVariables(['JWT_SECRET', 'JWT_EXPIRATION']);

// Ensure the necessary environment variables are set
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION as string;

interface typeUser {
    id?: number;
    google_id?: string;
    name: string;
    email: string;
    picture: string;
  }

// Helper function to find or create a user
export const updateOrCreateUser = async (userData: typeUser) => {
  const { google_id, name, email, picture } = userData;
  let user = await User.findOne({ where: { googleId: google_id } });

  if (user) {
    // Update user if they exist
    user.name = name;
    user.email = email;
    user.picture = picture;
    await user.save();
  } else {
    // Create a new user if they don't exist
    user = await User.create({
      googleId: google_id,
      name,
      email,
      picture,
    });
  }

  return user;
};

export const findUser = (id: string) => {
    return User.findByPk(id);
}

// Helper function to generate JWT token
export const generateJwtToken = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      googleId: user.google_id,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRATION }
  );
};
