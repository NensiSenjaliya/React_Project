import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "e-comm";

// Redirect to Google login
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route
router.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/login-failed" }),
    (req, res) => {
        // Generate JWT token for frontend
        const token = jwt.sign(
            { userId: req.user._id, role: req.user.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Redirect to frontend with token
        res.redirect(`http://localhost:3000/google-success?token=${token}`);
    }
);

export default router;
