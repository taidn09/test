const { Schema, model, models, default: mongoose } = require("mongoose");

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  category: { type: mongoose.Types.ObjectId, ref: "category" },
  price: { type: Number, required: true },
});
export const Product = models.product || model("product", ProductSchema);
