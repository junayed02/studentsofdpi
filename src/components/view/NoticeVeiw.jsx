import { RxCross1 } from "react-icons/rx";
const NoticeVeiw = ({ noticeData,setNoticePopUp }) => {
  return (
    <div className="fixed min-h-screen w-full top-0 left-0 bg-gray-200 z-[999] flex flex-col items-center justify-center">
      <div className="absolute top-7 right-6 md:right-10 lg:right-14 xl:right-16 cursor-pointer z-[999]" onClick={()=>setNoticePopUp(false)}>
        <RxCross1 size={25} />
      </div>
      <h1 className="text-5xl text-white absolute top-0 left-0 flex justify-center w-full">
        <div className="px-14 py-3 rounded-tl-full rounded-br-full bg-purple-600">
          Notice
        </div>
      </h1>
      <div>
        <div className="w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="text-4xl text-center py-4">{noticeData?.Title}</div>
          <div>{noticeData?.Description}</div>
        </div>
      </div>
    </div>
  );
};

export default NoticeVeiw;
