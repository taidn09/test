import CategoryForm from "@/components/CategoryForm";
import Layout from "@/components/Layout";
import Link from "next/link";
function Add() {
  return (
    <Layout>
      <section>
        <div className="text-right">
          <Link href={"/categories"} className="btn-success">
            Back categories list
          </Link>
        </div>
        <CategoryForm />
      </section>
    </Layout>
  );
}

export default Add;
