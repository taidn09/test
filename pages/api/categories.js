import mongooseConnect from "@/lib/mongoose";
import { Category } from "@/models/Category";
export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "GET") {
    if (req.query?.id) {
      return res.json(await Category.findOne({ _id: req.query.id }));
    }
    return res.json(await Category.find());
  }
  if (method === "POST") {
    const { title, parentCategory } = req.body;
    const categoryDoc = await Category.create({
      title,
      parentCategory: parentCategory || undefined,
    });
    res.json(categoryDoc);
  }
  if (method === "PUT") {
    const { _id, title, parentCategory } = req.body;
    await Category.updateOne(
      { _id },
      {
        title,
        parentCategory: parentCategory || undefined,
      }
    );
    res.json(true);
  }
  if (method === "DELETE") {
    const { id } = req.query;
    if (req.query?.id) {
      await Category.deleteOne({ _id: id });
      res.json(true);
    }
  }
}
