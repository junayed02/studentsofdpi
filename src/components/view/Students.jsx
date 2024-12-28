"use client";

import { useContext, useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { GlobalContext } from "@/context";
import { FaUserShield } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { MdOutlineArrowOutward } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";

const Students = ({ studentsInfo }) => {
  const title = ["Name", "Roll", "Session", "Semester", "Skills", "Blood"];
  const { isAdmin, setIsAdmin, isLogIn, setIsLogIn, setCurrentId, currentId } =
    useContext(GlobalContext);
  const [isClient, setIsClient] = useState(false);
  const [logoutBtn, setLogOutBtn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsClient(true);
  }, []);
  const [shortBy, setShortBy] = useState({
    filterBy: "",
    check: "",
  });
  const logoutHandle = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    localStorage.removeItem("isLogIn");
    localStorage.removeItem("currentId");

    setIsLogIn(false);
    setCurrentId(null);

    router.push("/login");
  };
  const handleChange = (e) => {
    const updateData = { ...shortBy, [e.target.name]: e.target.value };
    setShortBy(updateData);
  };

  const filteredStudents = studentsInfo?.filter((e) => {
    if (shortBy?.filterBy && shortBy?.check) {
      return e[shortBy.filterBy]
        ?.toString()
        .toLowerCase()
        .includes(shortBy.check.toLowerCase());
    }
    return true;
  });
  const handleDelete = async (e) => {
    const deleteFetch = await fetch(`/api/datadelete?id=${e}`, {
      method: "DELETE",
    });
    const result = await deleteFetch.json();
    if (result?.success) {
      router.refresh();
    } else {
      alert(result?.message);
    }
  };
  return (
    <div>
      {isClient && isAdmin && (
        <div className="absolute flex flex-col items-end gap-1 top-7 left-14  sm:right-8 md:right-12 lg:right-14 lg:right-18 xl:right-20">
          <div
            className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center cursor-pointer text-white font-semibold"
            onClick={() => setLogOutBtn(!logoutBtn)}
          >
            <FaUserShield size={20} />
          </div>

          {logoutBtn && (
            <div
              className="bg-white px-3 py-1 hover:bg-black cursor-pointer duration-300 hover:text-white rounded-lg"
              onClick={logoutHandle}
            >
              Log out
            </div>
          )}
        </div>
      )}

      {isLogIn && (
        <div className="absolute flex flex-col items-end gap-1 top-7 left-14 sm:right-8 md:right-12 lg:right-14 lg:right-18 xl:right-20">
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
        </div>
      )}

      <Navbar />
      <div className="w-full flex items-center justify-center gap-10 pb-5">
        <select
          name="filterBy"
          onChange={handleChange}
          className="px-8 py-2 outline-purple-600 bg-transparent border-2 border-black rounded-xl"
        >
          <option value="">Select Filter</option>
          <option value="Name">Name</option>
          <option value="Roll">Roll</option>
          <option value="Session">Session</option>
          <option value="Semester">Semester</option>
          <option value="Skills">Skills</option>
          <option value="Blood">Blood</option>
        </select>

        <input
          type="text"
          name="check"
          value={shortBy.check}
          onChange={handleChange}
          placeholder="Enter keyword"
          className="px-8 py-2 bg-transparent border-2 border-black outline-purple-600 rounded-xl"
        />
      </div>

      <div className="grid grid-cols-6 justify-center w-full items-center py-6 border-black">
        {title.map((item, index) => (
          <div key={index} className="font-semibold text-lg">
            {item}
          </div>
        ))}
      </div>

      {filteredStudents?.map((item) =>
        item?.Name ? (
          <div
            key={item._id}
            className="grid grid-cols-6  justify-center w-full items-center py-6 border-black border-b-2 cursor-default relative hover:bg-purple-600 hover:text-white hover:scale-105 duration-300"
          >
            <div>{item.Name}</div>
            <div>{item.Roll}</div>
            <div>{item.Session}</div>
            <div>{item.Semester}</div>
            <div>{item.Skills}</div>
            <div>{item.Blood}</div>
            {isClient && isAdmin && (
              <div className="absolute top-1 right-6">
                <div className="flex flex-col gap-5">
                  <RxCross1
                    size={20}
                    className="hover:cursor-pointer hover:scale-110 duration-300"
                    onClick={() => handleDelete(item?._id)}
                  />
                  <MdOutlineArrowOutward
                    size={25}
                    className="hover:cursor-pointer hover:scale-110 duration-300"
                    onClick={()=>router.push(`/info/${item?._id}`)}
                  />
                </div>
              </div>
            )}
          </div>
        ) : null
      )}
    </div>
  );
};

export default Students;
