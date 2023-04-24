import Layout from "@/components/Layout";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
function Products() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios.get("/api/products").then((respone) => {
      setProducts(respone.data);
      setLoading(false);
    });
  }, []);
  return (
    <Layout>
      <section>
        {!loading && (
          <>
            <div className="text-right">
              <Link href={"products/add"} className="btn-success">
                Add new product
              </Link>
            </div>
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            #
                          </th>
                          <th scope="col" className="px-6 py-4">
                            preview
                          </th>
                          <th scope="col" className="px-6 py-4">
                            title
                          </th>
                          <th scope="col" className="px-6 py-4">
                            category
                          </th>
                          <th scope="col" className="px-6 py-4">
                            description
                          </th>
                          <th scope="col" className="px-6 py-4">
                            price
                          </th>
                          <th scope="col" className="px-6 py-4">
                            handle
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((item) => (
                          <tr
                            key={item._id}
                            className="border-b dark:border-neutral-500"
                          >
                            <td className="whitespace-nowrap px-6 py-4">
                              {item._id.slice(0, 15) + "..."}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <Image
                                src={item.image}
                                alt="product image"
                                width={40}
                                height={40}
                              />
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {item.title}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {item.category.title}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {item.description.length > 30
                                ? item.description.slice(0, 30).trim() + "..."
                                : item.description}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {item.price.toLocaleString(undefined)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <Link
                                href={`/products/edit/${item._id}`}
                                className="btn-outlined-primary !lowercase me-1 inline-flex items-center"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                  />
                                </svg>
                                edit
                              </Link>
                              <Link
                                href={`/products/delete/${item._id}`}
                                className="btn-outlined-danger !lowercase inline-flex items-center"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                                delete
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
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

export default Products;
