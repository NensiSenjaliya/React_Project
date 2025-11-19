import mongoose from 'mongoose';
const userschema = new mongoose.Schema({
    googleId:{type:String},
    name: { type: String, required: true },
    email: { type: String, required: true ,unique: true },
    password: { type: String, default: null},
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    resetOTP: {type:String},
    resetOTPExpire:{type:Date}
})

export default mongoose.model("Regiusers", userschema);