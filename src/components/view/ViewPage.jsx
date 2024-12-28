"use client";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Form from "@/components/Form";
import { GlobalContext } from "@/context";
import Navbar from "../navbar/Navbar";
import { FiUser } from "react-icons/fi";

const ViewPage = ({ details, myId }) => {
  const [popUp, setPopUp] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [logoutBtn, setLogOutBtn] = useState(false);
  const router = useRouter();
  const { isLogIn, currentId, isAdmin, setIsLogIn, setCurrentId } =
    useContext(GlobalContext);

  const logoutHandle = () => {
    localStorage.removeItem("isLogIn");
    localStorage.removeItem("currentId");

    setIsLogIn(false);
    setCurrentId(null);

    router.push("/login");
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
   
    if (!(isLogIn && currentId === myId) && !isAdmin) {
      router.push("/login");
    }
  }, [isLogIn, currentId, myId, router, isAdmin]);

  if (!isMounted) {
    return null;
  }

  if ((isLogIn && currentId === myId) || isAdmin) {
    return (
      <div className="w-full min-h-screen bg-gray-200 relative">
        {!isAdmin&&<div className="absolute flex flex-col items-end gap-1 top-7 right-3 sm:right-8 md:right-12 lg:right-14 lg:right-18 xl:right-20">
          <div
            className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center cursor-pointer text-white font-semibold"
            onClick={() => setLogOutBtn(!logoutBtn)}
          >
            <FiUser size={20} />
          </div>
          {logoutBtn && (
            <div
              className="bg-white px-3 py-1 hover:bg-black cursor-pointer duration-300 hover:text-white rounded-lg"
              onClick={() => router.push(`/info/${currentId}`)}
            >
              Profile
            </div>
          )}
          {logoutBtn && (
            <div
              className="bg-white px-3 py-1 hover:bg-black cursor-pointer duration-300 hover:text-white rounded-lg"
              onClick={logoutHandle}
            >
              Log out
            </div>
          )}
        </div>}

        <Navbar />
        <Container>
          <div className="text-3xl text-center pb-7">
            Personal Information <span className="block">of</span>
            <span className="block text-purple-600 font-semibold text-4xl">
              {details?.Name}
            </span>
          </div>
          <div className="flex w-full items-center justify-center">
            <div className="flex flex-col gap-y-5">
              <div>
                <span className="font-semibold text-xl pr-6">Session:</span>{" "}
                {details?.Session}
              </div>
              <div>
                <span className="font-semibold text-xl pr-6">Phone:</span>{" "}
                0{details?.Phone}
              </div>
              <div>
                <span className="font-semibold text-xl pr-6">Email:</span>{" "}
                {details?.Email}
              </div>
              <div>
                <span className="font-semibold text-xl pr-6">Roll:</span>{" "}
                {details?.Roll}
              </div>
              <div>
                <span className="font-semibold text-xl pr-6">Reg:</span>{" "}
                {details?.Reg}
              </div>
              <div>
                <span className="font-semibold text-xl pr-6">Semester:</span>{" "}
                {details?.Semester}
              </div>
              <div>
                <span className="font-semibold text-xl pr-6">Group:</span>{" "}
                {details?.Group}
              </div>
              <div>
                <span className="font-semibold text-xl pr-6">Blood:</span>{" "}
                {details?.Blood}
              </div>
              <div>
                <span className="font-semibold text-xl pr-6">Skills:</span>{" "}
                {details?.Skills}
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center py-10">
            <Button onClick={() => setPopUp(true)}>Edit</Button>
          </div>

          {popUp && <Form setPopUp={setPopUp} details={details} />}
        </Container>
      </div>
    );
  }

  return null;
};

export default ViewPage;
