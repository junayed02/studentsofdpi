import Image from "next/image";
import notfound from "../../public/notfound.png";
import Button from "@/components/Button";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="w-[40%] h-[40%] lg:w-[25%] lg:h-[25%]">
        <Image src={notfound} alt="notfound" className="w-full h-full" />
        <div className="text-center text-xl py-10 text-gray-600">
          Page not found
        </div>
        <div className="flex w-full justify-center items-center">
          <Link href={"/"}>
            <Button>Go To Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
