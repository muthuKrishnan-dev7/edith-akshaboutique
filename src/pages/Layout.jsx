import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Nav";
import SideMenu from "../components/common/SideMenu";
import Footer from "../components/common/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <SideMenu />
      <main className="pt-22 pb-3 min-h-[500px] w-full px-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
