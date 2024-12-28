"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Button from "./Button";
import { RxCross1 } from "react-icons/rx";

const Form = ({ setPopUp, details }) => {
  const [formData, setFormData] = useState({});
  const [btnDisable, setBtnDisable] = useState(true);
  const param = useParams();
  const router = useRouter();
  const userId = param.id;

  useEffect(() => {
    if (details) {
      setFormData(details);
    }
  }, [details]);

 
  const checkFormValidity = (updatedData) => {
 
    const isPhoneValid = updatedData.Phone?.trim().length === 11;
    return (
      updatedData.Name?.trim() &&
      updatedData.Phone?.trim() &&
      updatedData.Email?.trim() &&
      updatedData.Session?.trim() &&
      updatedData.Roll?.trim() &&
      updatedData.Reg?.trim() &&
      updatedData.Semester?.trim() &&
      updatedData.Blood?.trim() &&
      updatedData.Skills?.trim() &&
      updatedData.Group?.trim() &&
      isPhoneValid
    );
  };

  const handleChange = (e) => {
    const updatedData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedData);

  
    if (checkFormValidity(updatedData)) {
      setBtnDisable(false); 
    } else {
      setBtnDisable(true); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchRequest = await fetch(`/api/datastor?id=${userId}`, {
      method: "PUT",
      body: JSON.stringify(formData),
    });
    const result = await fetchRequest.json();
    if (result?.success) {
      router.refresh();
      setPopUp(false);
    } else {
      alert("Error updating data");
    }
  };

  return (
    <div className="fixed min-h-screen w-full top-0 left-0 bg-gray-200 overflow-auto">
      <div
        className="absolute top-4 right-7 cursor-pointer sm:hidden"
        onClick={() => setPopUp(false)}
      >
        <RxCross1 size={30} />
      </div>
      <h1 className="text-3xl text-center py-10">Personal Details</h1>
      <form
        className="grid grid-cols-1 gap-y-4 lg:grid-cols-2 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[85%] xl:w-[80%] mx-auto max-h-[70vh] overflow-auto custom-scrollbar"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="pr-5">Name: </label>
          <input
            name="Name"
            value={formData?.Name || ""}
            placeholder="Enter Your Name"
            onChange={handleChange}
            type="text"
            className="border-2 border-black bg-gray-200 h-10 rounded-full px-5 outline-purple-600 w-[60%] mt-2 placeholder:text-sm"
          />
        </div>
        <div>
          <label className="pr-5">Session: </label>
          <input
            name="Session"
            value={formData?.Session || ""}
            placeholder="Enter Session (ex: 2020-21)"
            onChange={handleChange}
            type="text"
            className="border-2 border-black bg-gray-200 h-10 rounded-full px-5 outline-purple-600 w-[60%] mt-2 placeholder:text-sm"
          />
        </div>
        <div>
          <label className="pr-5">Phone: </label>
          <input
            name="Phone"
            value={formData?.Phone || ""}
            placeholder="Enter Phone Number"
            onChange={handleChange}
            type="text"
            className="border-2 border-black bg-gray-200 h-10 rounded-full px-5 outline-purple-600 w-[60%] mt-2 placeholder:text-sm"
          />
        </div>
        <div>
          <label className="pr-5">Email: </label>
          <input
            name="Email"
            value={formData?.Email || ""}
            placeholder="Enter Email Adress"
            onChange={handleChange}
            type="text"
            className="border-2 border-black bg-gray-200 h-10 rounded-full px-5 outline-purple-600 w-[60%] mt-2 placeholder:text-sm"
          />
        </div>
        <div>
          <label className="pr-5">Roll: </label>
          <input
            name="Roll"
            value={formData?.Roll || ""}
            placeholder="Enter Roll Number"
            onChange={handleChange}
            type="text"
            className="border-2 border-black bg-gray-200 h-10 rounded-full px-5 outline-purple-600 w-[60%] mt-2 placeholder:text-sm"
          />
        </div>
        <div>
          <label className="pr-5">Reg. No: </label>
          <input
            name="Reg"
            value={formData?.Reg || ""}
            placeholder="Enter Reg Number"
            onChange={handleChange}
            type="text"
            className="border-2 border-black bg-gray-200 h-10 rounded-full px-5 outline-purple-600 w-[60%] mt-2 placeholder:text-sm"
          />
        </div>
        <div>
          <label className="pr-5">Semester: </label>
          <select
            name="Semester"
            onChange={handleChange}
            className="border-2 border-black bg-gray-200 h-10 rounded-full px-5 outline-purple-600 w-[60%] mt-2 appearance-none"
            value={formData?.Semester || ""}
          >
            <option disabled value="">
              Select One
            </option>
            <option>1st</option>
            <option>2nd</option>
            <option>3rd</option>
            <option>4th</option>
            <option>5th</option>
            <option>6th</option>
            <option>7th</option>
            <option>8th</option>
            <option>Complete</option>
          </select>
        </div>
        <div>
          <label className="pr-5">Group: </label>
          <select
            name="Group"
            onChange={handleChange}
            className="border-2 border-black bg-gray-200 h-10 rounded-full px-5 outline-purple-600 w-[60%] mt-2 appearance-none"
            value={formData?.Group || ""}
          >
            <option disabled value="">
              Select One
            </option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        </div>
        <div>
          <label className="pr-5">Blood: </label>
          <select
            name="Blood"
            onChange={handleChange}
            className="border-2 border-black bg-gray-200 h-10 rounded-full px-5 outline-purple-600 w-[60%] mt-2 appearance-none"
            value={formData?.Blood || ""}
          >
            <option disabled value="">
              Select One
            </option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>O+</option>
            <option>O-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>Unknown</option>
          </select>
        </div>
        <div>
          <label className="pr-5">Skills: </label>
          <input
            name="Skills"
            value={formData?.Skills || ""}
            placeholder="Enter your skills"
            onChange={handleChange}
            type="text"
            className="border-2 border-black bg-gray-200 h-10 rounded-full px-5 outline-purple-600 w-[60%] mt-2 placeholder:text-sm"
          />
        </div>
        <div className="flex w-full items-center justify-center col-span-1 lg:col-span-2">
          <div className="flex mt-6 gap-10">
            <Button
              disabled={btnDisable}
              className=" disabled:bg-gray-400 disabled:border-gray-400 disabled:text-white"
            >
              Submit
            </Button>
            <Button className="hidden sm:block" onClick={() => setPopUp(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
