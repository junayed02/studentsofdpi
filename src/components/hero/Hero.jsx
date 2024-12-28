import Image from "next/image";
import Container from "../Container";
import bgImage from "../../../public/bgImage.png";
import Button from "../Button";
import Link from "next/link";

const Hero = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
        <div>
          <Image src={bgImage} alt="bgImage" priority />
        </div>
        <div className="flex flex-col justify-center pl-5">
          <div className="text-lg font-semibold">
            Join to stay connected with{" "}
            <span className="text-6xl font-semibold block text-purple-600 leading-tight">
              Dhaka Polytechnic Institute
            </span>
          </div>
          <Link href={"/login"} className="pt-5">
            <Button>Log In</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Hero;
