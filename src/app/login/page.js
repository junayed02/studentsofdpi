"use client";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import { GlobalContext } from "@/context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const initialState = {
  Number: "",
  Password: "",
};

const page = () => {
  const router = useRouter();
  const { setIsLogIn, setCurrentId } = useContext(GlobalContext);

  const [logInData, setLogInData] = useState(initialState);
  const [disable, setDisable] = useState(true);
  const [logReturnMessage, setLogReturnMessage] = useState(null);

  const handleChange = (e) => {
    const updatedData = { ...logInData, [e.target.name]: e.target.value };
    setLogInData(updatedData);
    if (updatedData.Number.length < 11 || updatedData.Password.length < 8) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchRequest = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(logInData),
    });
    const result = await fetchRequest.json();

    if (result?.success) {

      setIsLogIn(true);
      setCurrentId(result?.userId);
      router.push(`/info/${result?.userId}`);
    } else {
      setLogReturnMessage({ success: result.success, message: result.message });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-200 flex items-center justify-center">
      <div
        className={
          logReturnMessage !== null
            ? "opacity-0"
            : "grid grid-cols-1 md:grid-cols-2 w-[80%] xl:w-[65%]  h-auto"
        }
      >
        <div className="bg-white py-10">
          <h1 className="pb-12 text-4xl text-center">Sign In</h1>
          <form
            className="flex flex-col w-[80%] mx-auto"
            onSubmit={handleSubmit}
          >
            <label>Phone Number</label>
            <input
              name="Number"
              placeholder="Enter Phone Number"
              onChange={(e) => handleChange(e)}
              type="text"
              className="border h-10 rounded-full px-5 outline-purple-600 mt-2 placeholder:text-sm"
            />

            <label className="pt-8"> Password</label>
            <input
              name="Password"
              placeholder="Enter password (at least 8 characters)"
              onChange={(e) => handleChange(e)}
              type="password"
              className="border h-10 rounded-full px-5 outline-purple-600 mt-2 placeholder:text-sm"
            />

            <Button
              className="mt-6 disabled:bg-gray-400 disabled:border-none disabled:text-white"
              disabled={disable}
            >
              Log In
            </Button>
          </form>
          <div className="w-[80%] mx-auto mt-5 md:hidden">
            <p>
              Don't have an account?{" "}
              <span className="text-purple-600 cursor-pointer">
                <Link href={"/signup"}>Sign Up</Link>
              </span>
            </p>
          </div>
        </div>
        <div className="bg-purple-700 hidden md:flex flex-col items-center justify-center px-10 text-white ">
          <h1 className="text-4xl ">Welcome to log in</h1>
          <p className="my-4">Don't have an account?</p>
          <Button className="hover:text-white">
            <Link href={"/signup"}>Sign Up</Link>
          </Button>
        </div>
      </div>
      {logReturnMessage !== null && (
        <Alert
          logReturnMessage={logReturnMessage}
          setLogReturnMessage={setLogReturnMessage}
        />
      )}
    </div>
  );
};

export default page;
