'use client'
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import emptyImage from "../../../public/emptyImage.png";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Container from "@/components/Container";
import Navbar from "@/components/navbar/Navbar";

const NoData = ({ myId }) => {
  const [popUp, setPopUp] = useState(false);
  const [isClient, setIsClient] = useState(false); 
  const router = useRouter();
  const { isLogIn, currentId } = useContext(GlobalContext);

  useEffect(() => {
    setIsClient(true); 
  }, []);


  if (!isClient) return null;

  if (isLogIn && currentId === myId) {
    return (
      <div className="w-full min-h-screen bg-gray-200">
        <Container>
          <div className="flex items-center justify-center flex-col min-h-screen">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center">
              <Image src={emptyImage} alt="emptyImage" className="w-[30%]" />
              <div className="py-10 text-3xl">No Data Found</div>
              <Button onClick={() => setPopUp(true)}>Add</Button>
              {popUp && <Form setPopUp={setPopUp} />}
            </div>
          </div>
        </Container>
      </div>
    );
  } else {
    router.push("/login");
  }
};

export default NoData;
