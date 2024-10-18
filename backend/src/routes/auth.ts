import { Router, Request, Response, NextFunction
 } from 'express';
import passport from 'passport';
import authMiddleware from '../middleware/auth'
import { generateJwtToken, updateOrCreateUser, findUser } from '../services/authService';

const router = Router();

// Extend the Express Request type
interface AuthRequest extends Request {
  user?: string; // Change this type to match your user object structure
}

// Google Authentication Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');  // Redirect on successful Google login
  }
);

// Logout Route
router.get('/logout', (req, res) => {
  req.logout(() => {});
  res.redirect('/');
});

// Login Route
router.post('/login', async (req: Request, res: Response) => {
  const { google_id, name, email, picture } = req.body;

  try {
    // Find or create the user in the database
    const user = await updateOrCreateUser({ google_id, name, email, picture });
    console.log('user:', user);
    // Generate a JWT token for the authenticated user
    const token = generateJwtToken(user);

    // Send the token and user info to the frontend
    res.status(200).json({
      message: 'User login is successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
      token,
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/user', authMiddleware, (req: Request, res: Response) => {
  const user = req.user; // User is attached by the authMiddleware
  res.status(200).json(user);
});


export default router;
