"use client";
import { useRouter } from "next/navigation";
import Button from "../Button";
import { useContext, useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { GlobalContext } from "@/context";
import { FaUserShield } from "react-icons/fa6";
import { MdNetworkPing } from "react-icons/md";
import NoticeVeiw from "../view/NoticeVeiw";
import { FiUser } from "react-icons/fi";

const Notice = ({ allNotice }) => {
  const [storeData, setStoreData] = useState({ Title: "", Description: "" });
  const [popup, setPopUp] = useState(false);
  const { isAdmin, setIsAdmin, isLogIn, setIsLogIn, setCurrentId, currentId } =
    useContext(GlobalContext);
  const router = useRouter();
  const [logoutBtn, setLogOutBtn] = useState(false);
  const [edit, setEdit] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [btnDisable, setBtnDisable] = useState(true);
  const [noticePopUp, setNoticePopUp] = useState(false);
  const [noticeData, setNoticeData] = useState();


  useEffect(() => {
    setIsClient(true);
  }, []);
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
    const updateData = { ...storeData, [e.target.name]: e.target.value };
    setStoreData(updateData);
 
    if (updateData.Title?.length < 1 || updateData.Description?.length < 1) {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
  };
  const popUpHandle = () => {
    setPopUp(false);
    setStoreData({ Title: "", Description: "" });
  };
  const handlesubmit = async () => {
    const fetchRequest =
      edit !== null
        ? await fetch(`/api/dashboardedit?id=${edit}`, {
            method: "PUT",
            body: JSON.stringify(storeData),
          })
        : await fetch("/api/dashboardadd", {
            method: "POST",
            body: JSON.stringify(storeData),
          });
    const result = await fetchRequest.json();
    if (result?.success) {
      setPopUp(false);
      setEdit(null);
      setStoreData({ Title: "", Description: "" })
      router.refresh();
    } else {
      alert(result?.message);
    }
  };
  const handleEdit = (editId) => {
    setStoreData(editId);
    setEdit(editId?._id);
    setPopUp(true);
  };

  const handleDelete = async (deleteId) => {
    const deleteRequest = await fetch(`/api/dashboarddelete?id=${deleteId}`, {
      method: "DELETE",
    });
    await deleteRequest.json();
    router.refresh();
  };
  return (
    <div>
      {isClient && isAdmin && (
        <div className="absolute flex flex-col items-end gap-1 top-[70px] right-3 sm:right-8 ">
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
        <div className="absolute flex flex-col items-end gap-1 top-[70px] right-3 sm:right-8 md:right-12 lg:right-14 lg:right-18 xl:right-20">
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

      {noticePopUp && (
        <NoticeVeiw noticeData={noticeData} setNoticePopUp={setNoticePopUp} />
      )}

      {isClient && isAdmin && (
        <div className="flex w-full items-center justify-end">
          <Button onClick={() => setPopUp(true)}>Add Notice</Button>
        </div>
      )}

      {popup && (
        <div className="min-h-screen w-full fixed top-0 left-0 bg-gray-200 z-[999] flex items-center justify-center">
          <div className="flex flex-col w-[80%] md:w-[50%] lg:[45%] xl:w-[35%] mx-auto bg-white px-9 py-10 relative">
            <div
              className="absolute top-5 right-8 cursor-pointer"
              onClick={popUpHandle}
            >
              <RxCross1 />
            </div>
            <h1 className="text-4xl text-center font-semibold pb-10">Notice</h1>
            <input
              type="text"
              name="Title"
              value={storeData.Title || ""}
              className="outline-none h-12 rounded-full border-2 placeholder:text-sm bg-transparent border-black px-6"
              placeholder="Enter Title"
              onChange={(e) => handleChange(e)}
            />
            <textarea
              rows={5}
              name="Description"
              value={storeData.Description || ""}
              className="outline-none rounded-md border-2 placeholder:text-sm bg-transparent border-black px-6 py-2 my-8"
              placeholder="Enter Description"
              onChange={(e) => handleChange(e)}
            />
            <Button
              className=" disabled:bg-gray-400 disabled:border-none disabled:text-white"
              onClick={handlesubmit}
              disabled={btnDisable}
            >
              Add Notice
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-10 justify-around py-10">
        {allNotice?.map((item, index) => (
          <div
            key={index}
            className="w-[80%] md:w-[40%] lg:w-[30%] bg-white shadow-[2px_2px_5px_black] px-8 py-2 rotate-12"
          >
            <div className="flex justify-center py-4">
              <MdNetworkPing size={30} color="#9333EA" />
            </div>
            <div className="text-center font-semibold text-2xl ">
              {item?.Title}
            </div>
            <div className="py-6 flex flex-col w-full">
              <div>
                {item?.Description.substring(0, 60)}
                {item?.Description?.length > 60 && "..."}
              </div>
              {item?.Description?.length > 60 && (
                <div
                  className="pr-6 pt-4 text-purple-600 text-right cursor-pointer"
                  onClick={() => {
                    setNoticePopUp(true), setNoticeData(item);
                  }}
                >
                  see more
                </div>
              )}
            </div>
            {isClient && isAdmin && (
              <div className="flex w-full items-center justify-around pb-5">
                <Button className=" py-[3px]" onClick={() => handleEdit(item)}>
                  Edit
                </Button>
                <Button
                  className=" py-[3px]"
                  onClick={() => handleDelete(item?._id)}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notice;
