import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
  return (
    <Layout>
      <section>
        {!loading && (
          <>
            <div className="text-right">
              <Link href={"/products"} className="btn-success">
                Back products list
              </Link>
            </div>
            {product && <ProductForm {...product} />}
          </>
        )}
        {loading && (
          <div className="flex justify-center items-center h-full">
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
