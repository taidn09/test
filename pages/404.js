import Image from "next/image";
import notFoundGif from "/images/funny-404-error-page-design.gif";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex flex-col items-center w-full justify-center">
      <Image
        src={notFoundGif}
        alt="404 not found"
        className="select-none w-[600px] max-w-full"
        draggable="false"
      />
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <h1 className="font-bold text-3xl">Look like you're lost</h1>
      <p className="mb-2">The page you are looking for is not avalible</p>
      <Link href={"/"} className="btn-success">
        Back to dashboard
      </Link>
    </div>
  );
}

export default NotFound;
