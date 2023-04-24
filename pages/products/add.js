import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import Link from "next/link";
function Add() {
  return (
    <Layout>
      <section>
        <div className="text-right">
          <Link href={"/products"} className="btn-success">
            Back products list
          </Link>
        </div>
        <ProductForm />
      </section>
    </Layout>
  );
}

export default Add;
