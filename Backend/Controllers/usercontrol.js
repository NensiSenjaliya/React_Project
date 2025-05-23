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
        res.status(200).json({delregister});
    }
    catch (err) {
        console.log("Error: ", err);
        res.status(401).json({ status: false, message: INTERNAL_SERVER_ERROR });

    }
}
// module.exports = { addregi, getdataregi, deletebyidregi,updatebyidregi};