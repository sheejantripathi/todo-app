import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: 'http://localhost:5000/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ where: { googleId: profile.id }});
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails?.[0]?.value ?? '' // Optional chaining and empty string as a fallback
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
}));

passport.serializeUser((user, done) => {
  done(null, (user as any).id);
});

passport.deserializeUser(async (id: number, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});

export default passport;
