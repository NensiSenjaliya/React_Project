import UserModel from '../Models/UserModel.js'
import Jwt from 'jsonwebtoken';
import {
    EMAIL_PSW_REQUIRE,
    NO_FOUND_USER,
    INVALID_CRADI,
    SOMETHING_WRONG_GENERATE_TOKEN,
    USER_REGISTER_SUCCESSFULLY,
    USER_LOGIN_SUCCESSFULLY,
    INTERNAL_SERVER_ERROR
} from '../Messages/usermsg.js'
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from 'dotenv';
dotenv.config();
// import * as usermsg from '../Messages/usermsg.js'
const jwtKey = 'e-comm'

export const addregi = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const register = new UserModel({ name, email, password });
        const registration = await register.save();

        Jwt.sign({ userId: registration._id }, jwtKey, { expiresIn: "1h" }, (err, token) => {
            if (err) {
                return res.status(500).json({ message: SOMETHING_WRONG_GENERATE_TOKEN });
            }

            res.status(200).json({ message: USER_REGISTER_SUCCESSFULLY, auth: token });
        });

    } catch (err) {
        console.log("Error: ", err);
        res.status(401).json({ status: false, message: INTERNAL_SERVER_ERROR });

    }
};

export const getloginuser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: EMAIL_PSW_REQUIRE });
    }

    try {
        // Find user with email
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: NO_FOUND_USER });
        }

        // In production: Use bcrypt.compare for hashed passwords
        if (user.password !== password) {
            return res.status(401).json({ message: INVALID_CRADI });
        }

        const { password: pwd, ...userWithoutPassword } = user.toObject();

        Jwt.sign(
            { userId: user._id },
            jwtKey,
            { expiresIn: "1h" },
            (err, token) => {
                if (err) {
                    return res.status(500).json({ message: SOMETHING_WRONG_GENERATE_TOKEN });
                }

                res.status(200).json({
                    message: USER_LOGIN_SUCCESSFULLY,
                    auth: token,
                    user: userWithoutPassword  // includes role
                });
            }
        );
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({ status: false, message: INTERNAL_SERVER_ERROR });
    }
};

// export const googleLogin = async (req, res) => {
//     try {
//         const { googleId, name, email } = req.body;

//         if (!email || !googleId) {
//             return res.status(400).json({ message: "Google login data missing" });
//         }

//         // Find existing user
//         let user = await UserModel.findOne({ email });

//         if (!user) {
//             user = new UserModel({
//                 googleId,
//                 name,
//                 email,
//                 password: null,
//                 role: "user"
//             });
//             await user.save();
//         }


//         const { password, ...userWithoutPassword } = user.toObject();

//         // Generate token
//         Jwt.sign(
//             { userId: user._id },
//             jwtKey,
//             { expiresIn: "1h" },
//             (err, token) => {
//                 if (err) {
//                     return res.status(500).json({ message: "Token generation failed" });
//                 }

//                 res.status(200).json({
//                     message: "Google login successful",
//                     auth: token,
//                     user: userWithoutPassword
//                 });
//             }
//         );
//     } catch (err) {
//         console.log("Google login error:", err);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

export const googleLogin = async (req, res) => {
    try {
        const { googleId, name, email } = req.body;

        if (!email || !googleId) {
            return res.status(400).json({ message: "Google login data missing" });
        }

        // Find existing user by email
        let user = await UserModel.findOne({ email });

        if (!user) {
            // Create new Google user
            user = new UserModel({
                googleId,
                name,
                email,
                password: null,
                role: "user",
            });
            await user.save();
        } else if (!user.googleId) {
            // If user exists but has no googleId, link it
            user.googleId = googleId;
            await user.save();
        }

        const { password, ...userWithoutPassword } = user.toObject();

        // Generate JWT token
        const token = Jwt.sign(
            { userId: user._id, role: user.role },
            jwtKey,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Google login successful",
            auth: token,
            user: userWithoutPassword,
        });
    } catch (err) {
        console.error("Google login error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const getdataregi = async (req, res) => {

    try {

        const registertions = await UserModel.find();
        res.status(200).json(registertions);
    }
    catch (err) {
        console.log("Error: ", err);
        res.status(401).json({ status: false, message: INTERNAL_SERVER_ERROR });

    }
}
export const updatebyidregi = async (req, res) => {

    try {
        const { name,
            email,
            password
        } = req.body;
        const { id } = req.params;
        const delregister = await UserModel.findByIdAndUpdate(id, {
            name,
            email,
            password
        });
        res.status(200).json(delregister);
    }
    catch (err) {
        console.log("Error: ", err);
        res.status(401).json({ status: false, message: INTERNAL_SERVER_ERROR });

    }
}
export const deletebyidregi = async (req, res) => {

    try {
        const { id } = req.params;
        const delregister = await UserModel.findByIdAndDelete(id);
        res.status(200).json({ delregister });
    }
    catch (err) {
        console.log("Error: ", err);
        res.status(401).json({ status: false, message: INTERNAL_SERVER_ERROR });

    }
}


//forgot password
export const sendForgotPasswordOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save OTP with expiry (5 mins)
        user.resetOTP = otp;
        user.resetOTPExpire = Date.now() + 5 * 60 * 1000;
        await user.save();

        // Setup nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER,  // use env variable
                pass: process.env.PASS,    // use app password
            },
        });

        const mailOptions = {
            from: process.env.USER,
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is: ${otp}. It will expire in 5 minutes.`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "OTP sent to email" });

    } catch (err) {
        console.error("Forgot password error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const verifyForgotPasswordOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user || user.resetOTP !== otp || user.resetOTPExpire < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        res.status(200).json({ message: "OTP verified. You can reset password now." });
    } catch (err) {
        console.error("Verify OTP error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user || user.resetOTP !== otp || user.resetOTPExpire < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // Update password (⚠️ use bcrypt in production)
        user.password = newPassword;
        user.resetOTP = null;
        user.resetOTPExpire = null;

        await user.save();

        res.status(200).json({ message: "Password reset successfully" });

    } catch (err) {
        console.error("Reset password error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
