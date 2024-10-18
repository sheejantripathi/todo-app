import express from 'express';
import session from 'express-session';
import passport from 'passport';
import helmet from 'helmet';
import sequelize from './config/database';
import authRoutes from './routes/auth';
import todoRoutes from './routes/todo';
import groupRoutes from './routes/group';

import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Use Helmet to secure HTTP headers
app.use(helmet());


// Middleware
app.use(express.json());
app.use(session({ secret: 'this_is_the_session_secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Enable CORS
app.use(cors({
  origin: `http://localhost:5173`,
  credentials: true,
}));

// Sync database
sequelize.sync().then(() => {
  console.log('Database synced');
}).catch(err => console.error('Database sync error:', err));

// Routes
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);
app.use('/group', groupRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
