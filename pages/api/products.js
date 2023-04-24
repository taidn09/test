import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";
export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "GET") {
    if (req.query?.id) {
      return res.json(await Product.findOne({ _id: req.query.id }));
    }
    return res.json(await Product.find().populate("category"));
  }
  if (method === "POST") {
    const { title, description, price, image, category } = req.body;
    const productDoc = await Product.create({
      title,
      description,
      price,
      image,
      category,
    });
    res.json(productDoc);
  }
  if (method === "PUT") {
    const { _id, title, description, price, image, category } = req.body;
    await Product.updateOne(
      { _id },
      {
        title,
        description,
        price,
        image,
        category,
      }
    );
    res.json(true);
  }
  if (method === "DELETE") {
    const { id } = req.query;
    if (req.query?.id) {
      await Product.deleteOne({ _id: id });
      res.json(true);
    }
  }
}
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // Set desired value here
    },
  },
};
