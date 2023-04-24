import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function CategoryForm({ _id, title: existingTitle }) {
  const [title, setTitle] = useState(existingTitle || "");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const toastConfig = {
    pending: "in progress...",
    success: "category added successfully!",
    error: "failed !",
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, parentCategory };
    if (_id) {
      toast.promise(axios.put(`/api/categories`, { ...data, _id }), {
        ...toastConfig,
        success: "category updated successfully!",
      });
    } else {
      toast.promise(axios.post("/api/categories", data), toastConfig);
    }
  };
  useEffect(() => {
    axios.get("/api/categories").then((respone) => {
      setCategories(respone.data);
      console.log(respone.data);
    });
  }, []);
  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="max-w-full w-[500px]">
        <h2 className="text-2xl text-center text-blue-500 font-bold my-3 uppercase">
          {_id ? "Edit" : "Add"} category form
        </h2>
        <div>
          <label htmlFor="name">category title</label>
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
        <div>
          <div>
            <label htmlFor="category">category</label>
            <select
              id="category"
              onChange={(e) => {
                setParentCategory(e.target.value);
              }}
              value={parentCategory}
              defaultValue={parentCategory}
            >
              <option value={""}>No parent category</option>
              {categories &&
                categories.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.title}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <button className="btn-success min-w-[200px] !p-1">Save</button>
      </form>
    </div>
  );
}

export default CategoryForm;
