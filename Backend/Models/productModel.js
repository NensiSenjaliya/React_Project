import mongoose from 'mongoose';
const productschema = new mongoose.Schema({
    name: String,
    imgurl: { type: String, required: true },
    price: Number,
    category: String,
    userid: String,
    Company: String
})

export default mongoose.model("Productsn", productschema);