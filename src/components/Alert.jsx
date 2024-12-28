import Link from "next/link";
import Button from "./Button";

const Alert = ({
  returnMessage,
  setReturnMessage,
  logReturnMessage,
  setLogReturnMessage,
}) => {
  return (
    <div className="fixed min-h-screen w-full top-0 left-0 flex items-center justify-center bg-transparent">
      <div className="w-[95%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] h-auto shadow-2xl bg-white text-purple-600 flex flex-col gap-5 items-center justify-center p-10">
        <h1>{returnMessage?.message}</h1>
        <h1>{logReturnMessage?.message}</h1>
        <div className="flex w-full justify-around">
          {returnMessage?.success === false && (
            <Button onClick={() => setReturnMessage(null)}>Go Back</Button>
          )}
          {logReturnMessage?.success === false && (
            <Button onClick={() => setLogReturnMessage(null)}>Go Back</Button>
          )}
          {logReturnMessage?.success === false ? null : (
            <Button>
              <Link href={"/login"}>
                {" "}
                {returnMessage?.success ? "Go to Log In" : "Log In"}
              </Link>{" "}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;
