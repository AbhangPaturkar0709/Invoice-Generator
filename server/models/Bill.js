import mongoose from "mongoose";

const billItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const billSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [billItemSchema],
    subTotal: { type: Number, required: true },
    totalWithGST: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Bill", billSchema);
