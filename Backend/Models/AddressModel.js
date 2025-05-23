import mongoose from 'mongoose';
const addresschema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true ,unique: true },
    number:{type:Number, required: true},
    street:{type: String, required: true},
    city:{type: String, required: true},
    country:{type: String, required: true},
    state:{type: String, required: true},
    pincode:{type: Number, required: true}
})

export default mongoose.model("UserAddress", addresschema);