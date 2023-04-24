import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function EditProductPage() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) router.push("/404");
    setLoading(true);
    axios
      .get(`/api/products?id=${id}`)
      .then((respone) => {
        setProduct(respone.data);
        setLoading(false);
      })
      .catch((_) => {
        router.push("/404");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const backProductsList = () => {
    router.push("/products");
  };
  const deleteProduct = async () => {
    await axios.delete(`/api/products?id=${id}`).then((res) => {
      if (res.data === true) {
        toast.success("product deleted successfully!");
        backProductsList();
      }
    });
  };
  return (
    <Layout>
      <section>
        {!loading && (
          <>
            {product && (
              <>
                <div>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Do you really want to delete "{product.title}"{" "}
                  <button
                    className="btn-outlined-primary inline-flex items-center me-2"
                    onClick={deleteProduct}
                  >
                    yes
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                  <button
                    className="btn-outlined-danger inline-flex items-center"
                    onClick={backProductsList}
                  >
                    <span>no</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </>
        )}
        {loading && (
          <div className="flex justify-center">
            <div
              className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default EditProductPage;
