const { Schema, model, models, default: mongoose } = require("mongoose");

const CategorySchema = new Schema({
  title: { type: String, required: true },
  parentCategory: { type: mongoose.Types.ObjectId, ref: "category" },
});
export const Category = models.category || model("category", CategorySchema);
