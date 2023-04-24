import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  image: existingImage,
  category: asignedCategory,
}) {
  console.log("categoryid", asignedCategory);
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || 0);
  const [image, setImage] = useState(existingImage || "");
  const [category, setCategory] = useState(asignedCategory || "");
  const [categories, setCategories] = useState([]);
  const toastConfig = {
    pending: "in progress...",
    success: "product added successfully!",
    error: "failed !",
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, description, price, image, category };
    if (_id) {
      toast.promise(axios.put(`/api/products`, { ...data, _id }), {
        ...toastConfig,
        success: "product updated successfully!",
      });
    } else {
      toast.promise(axios.post("/api/products", data), toastConfig);
    }
  };
  const uploadImage = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setImage(e.target.result);
    };
  };
  useEffect(() => {
    axios.get("/api/categories").then((respone) => {
      setCategories(respone.data);
    });
  }, []);
  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="max-w-full w-[500px]">
        <h2 className="text-2xl text-center text-blue-500 font-bold my-3 uppercase">
          {_id ? "Edit" : "Add"} product form
        </h2>
        <div>
          <label htmlFor="name">product title</label>
          <input
            autoComplete="off"
            spellCheck="false"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            id="name"
            placeholder="enter title..."
          />
        </div>

        <div className="flex justify-start items-center">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-[150px] h-[150px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
            </div>
            <input
              type="file"
              id="dropzone-file"
              className="hidden"
              onChange={uploadImage}
              multiple={false}
            />
          </label>
          {image && (
            <Image
              src={image}
              alt="product image"
              width={150}
              height={150}
              className="border-2 border-gray-300 border-solid rounded-md ms-2"
            />
          )}
        </div>
        {categories && (
          <div>
            <label htmlFor="category">category</label>
            <select
              id="category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              defaultValue={category}
              value={category}
            >
              {categories.map((item) => {
                return (
                  <option key={item._id} value={item._id}>
                    {item.title}
                  </option>
                );
              })}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="desc">description</label>
          <textarea
            autoComplete="off"
            spellCheck="false"
            rows={5}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            id="desc"
            placeholder="enter description..."
          />
        </div>
        <div>
          <label htmlFor="price">price (USD)</label>
          <input
            autoComplete="off"
            spellCheck="false"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            id="price"
            placeholder="enter price..."
            type="number"
          />
        </div>
        <button className="btn-success min-w-[200px] !p-1">Save</button>
      </form>
    </div>
  );
}

export default ProductForm;
