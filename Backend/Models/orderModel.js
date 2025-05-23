import mongoose from 'mongoose';
const OrderSchema = new mongoose.Schema({
    ProductId: { type: "String", required: true },
    CustomerId: { type: "String", required: true },
    CustomerName: { type: String, required: true },
    ProductName: { type: String, required: true },
    // ProductId: { type: mongoose.Schema.Types.ObjectId, ref: 'Productsn' },
    // CustomerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Regiusers' },
    Qty: { type: Number, required: true },
    price: { type: Number, required: true },
    Total: { type: Number, required: true },
    OrderDate: {
      type: String,
      default: () => new Date().toLocaleDateString("en-US"),
    },
  });

  export default mongoose.model("Order", OrderSchema);