"use client";
import Button from "@/components/Button";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const page = () => {
  const router = useRouter();
  const { setIsAdmin } = useContext(GlobalContext);
  const [storeData, setStoreData] = useState({});
  const handlesubmit = () => {
    if (
      process.env.NEXT_PUBLIC_Admin_ID === storeData?.Number &&
      process.env.NEXT_PUBLIC_Admin_Pass === storeData?.Password
    ) {
      setIsAdmin(true);
      router.push("/notice");
    } else {
      alert("incorrect");
    }
  };

  return (
    <div className="bg-gray-200 w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col w-[80%] md:w-[50%] lg:[45%] xl:w-[35%] mx-auto bg-white px-9 py-10">
        <div className="flex w-full items-center justify-center pb-4">
          <div className=" h-14 w-14 rounded-full flex items-center justify-center bg-purple-600">
            <MdOutlineAdminPanelSettings size={35} color="white" />
          </div>
        </div>
        <h1 className="text-4xl text-center font-semibold pb-10">Admin</h1>
        <input
          type="text"
          className="outline-none h-12 rounded-full border-2 placeholder:text-sm bg-transparent border-black px-6"
          placeholder="Enter your id"
          onChange={(e) =>
            setStoreData({ ...storeData, Number: e.target.value })
          }
        />
        <input
          type="password"
          className="outline-none h-12 rounded-full border-2 placeholder:text-sm bg-transparent border-black px-6 my-8"
          placeholder="Enter your Password"
          onChange={(e) =>
            setStoreData({ ...storeData, Password: e.target.value })
          }
        />
        <Button onClick={handlesubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default page;
