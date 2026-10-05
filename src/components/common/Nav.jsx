import logo from "../../assets/logo.png";
import {
  IconUserCircle,
  IconShoppingBag,
  IconMenu2,
} from "@tabler/icons-react";
import { useContext } from "react";
import { AppContext } from "../../context/ContextProvider";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const { sidebarOpen, toggleSidebar } = useContext(AppContext);
  // const navigate = useNavigate();

  return (
    <header className="h-22 w-full bg-white fixed top-0 inset-0 z-999">
      <nav className="grid grid-cols-12 w-full h-full px-6">
        <div className="col-span-3 h-full flex items-center">
          <button onClick={() => toggleSidebar()}>
            <IconMenu2 stroke={1} size={33} />
          </button>
        </div>
        <div className="col-span-6 h-full flex justify-center items-center">
          <img src={logo} className="h-16" alt="LOGO" />
        </div>
        <div className="col-span-3 h-full flex justify-end items-center gap-2">
          <button>
            <IconShoppingBag stroke={1} size={33} />
          </button>
          <Link to={"/store/login"}>
            <IconUserCircle stroke={1} size={33} />
          </Link>
        </div>
      </nav>
    </header>
  );
}
