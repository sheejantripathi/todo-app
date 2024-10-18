import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { ensureEnvVariables } from '../utils/env';

ensureEnvVariables(['JWT_SECRET']); // Ensure that JWT_SECRET is set in environment variables

const JWT_SECRET = process.env.JWT_SECRET as string;

interface JwtPayload {
  id: number;
  googleId: string;
  name: string;
  email: string;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token provided' });
    return; // Make sure to explicitly return after sending a response
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Fetch user details using the user ID (id from JWT)
    const user = await User.findByPk(decoded.id); 

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return; 
    }

    // Attach user data to the request object
    req.user = user;

    // Call next() to continue to the next middleware or route handler
    next();
  } catch (error) {
    // Handle invalid token error
    res.status(401).json({ message: 'Invalid token' });
    return; 
  }
};

export default authMiddleware;
