import GlobalState from "@/context";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-myFont">

        <GlobalState>{children}</GlobalState>
      </body>
    </html>
  );
}
