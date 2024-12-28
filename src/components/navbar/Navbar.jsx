import Link from "next/link";
import Container from "../Container";


const Navbar = () => {
  const navlist = [
    { title: "Notice", path: "/notice" },
    { title: "Students", path: "/students" },
  ];

  return (
    <Container>
      <div className="flex items-center justify-center gap-28 py-6 text-xl">
        {navlist.map((item, index) => {
          return (
            <div
              key={index}

              className="cursor-pointer py-2 px-3 font-semibold hover:text-purple-600 duration-300 relative group"
            >
              <Link href={item.path}>{item.title}</Link>
              <div
                className="absolute bottom-[120%] left-0 w-full h-1 group-hover:bottom-0 group-hover:bg-purple-600 duration-300"
              ></div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default Navbar;
