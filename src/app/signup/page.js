"use client";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import Link from "next/link";

import { useState } from "react";
const initialState = {
  Number: "",
  Password: "",
};
const page = () => {

  const [signUpdata, setSignUpData] = useState(initialState);

  const [disable, setDisable] = useState(true);
  const [returnMessage, setReturnMessage] = useState(null);
  const handleChange = (e) => {
    const updatedData = { ...signUpdata, [e.target.name]: e.target.value };
    setSignUpData(updatedData);
    if (updatedData.Number.length < 11 || updatedData.Password.length < 8) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchRequest = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(signUpdata),
    });
    const result = await fetchRequest.json();
    setReturnMessage({ success: result.success, message: result.message });
  };
  return (
    <div className="min-h-screen w-full bg-gray-200 flex items-center justify-center">
      <div
        className={
          returnMessage !== null
            ? "opacity-0"
            : "grid grid-cols-1 md:grid-cols-2 w-[90%] xl:w-[65%] h-auto"
        }
      >
        <div className="bg-white py-10 order-2">
          <h1 className="pb-12 text-4xl text-center">Sign Up</h1>
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
              Sign Up
            </Button>
          </form>
          <div className="w-[80%] mx-auto mt-5 md:hidden">
            <p>
              Already have an account?{" "}
              <span className="text-purple-600 cursor-pointer">
                <Link href={"/login"}>Log In</Link>
              </span>
            </p>
          </div>
        </div>
        <div className="bg-purple-700 hidden md:flex flex-col items-center justify-center px-10 text-white order-1">
          <h1 className="text-4xl">Welcome to sign up</h1>
          <p className="my-4">Already have an account?</p>
          <Button className="hover:text-white">
            <Link href={"/login"}>Log In</Link>
          </Button>
        </div>
      </div>
      {returnMessage !== null && (
        <Alert
          returnMessage={returnMessage}
          setReturnMessage={setReturnMessage}
        />
      )}
    </div>
  );
};

export default page;
