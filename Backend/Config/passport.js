// // var GoogleStrategy = require('passport-google-oauth20').Strategy;
// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://www.example.com/auth/google/callback"
// },
//     function (accessToken, refreshToken, profile, cb) {
//         User.findOrCreate({ googleId: profile.id }, function (err, user) {
//             return cb(err, user);
//         });
//     }
// ));

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../Models/UserModel.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,       // from console
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, // from console
            callbackURL: "http://localhost:5000/api/auth/google/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // find user by Google ID
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    user = await User.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                    });
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

export default passport;