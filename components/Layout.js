import { useSession, signIn } from "next-auth/react";
import Nav from "@/components/Nav";
function Layout({ children }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="w-screen h-screen flex flex-col items-center">
        <h2 className="uppercase m-3 font-medium text-blue-500 text-3xl">
          Welcome to NextShop Admin
        </h2>
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="btn-outlined-primary"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="w-screen h-screen flex bg-blue-100/50">
      <Nav />
      {children}
    </div>
  );
}

export default Layout;
