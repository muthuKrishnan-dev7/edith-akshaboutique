import { useContext } from "react";
import { NavLink } from "react-router-dom";

import {
  IconX,
  IconHome,
  IconShoppingBag,
  IconCategory,
  IconHeart,
  IconUser,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";

import { AppContext } from "../../context/ContextProvider";

const menuItems = [
  {
    label: "Home",
    path: "/store",
    icon: IconHome,
  },
  {
    label: "Categories",
    path: "/store/categories",
    icon: IconCategory,
  },
  {
    label: "Shop",
    path: "/store/shop",
    icon: IconShoppingBag,
  },
  {
    label: "Wishlist",
    path: "/store/wishlist",
    icon: IconHeart,
  },
  {
    label: "My Account",
    path: "/store/account",
    icon: IconUser,
  },
  {
    label: "Settings",
    path: "/store/settings",
    icon: IconSettings,
  },
];

export default function SideMenu() {
  const { sidebarOpen, toggleSidebar } = useContext(AppContext);

  return (
    <aside
      className={`
        fixed top-[88px] left-0 z-50
        flex min-h-[calc(100dvh-88px)]
        w-[300px] sm:w-[380px]
        flex-col
        border-r border-gray-200
        bg-white shadow-xl
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Header */}
      <div className="flex h-20 shrink-0 items-center justify-between border-b border-gray-200 px-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>

          <p className="text-xs text-gray-500">Explore our store</p>
        </div>

        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Close menu"
          className="
            flex h-10 w-10 items-center justify-center
            rounded-lg text-gray-500
            transition-colors duration-200
            hover:bg-gray-100 hover:text-gray-900
            focus:outline-none focus:ring-2 focus:ring-gray-300
          "
        >
          <IconX size={22} stroke={2} />
        </button>
      </div>

      {/* Navigation */}
      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.label}
            onClick={toggleSidebar}
            type="button"
            className="
    flex w-full items-center gap-3 rounded-lg
    px-4 py-5 text-sm font-medium
    text-gray-700

    transition-colors duration-200

    hover:bg-gray-100
    hover:text-gray-900

    active:bg-gray-900
    active:text-white
  "
          >
            <Icon size={21} stroke={1.8} />
            <span>{item.label}</span>
          </button>
        );
      })}

      {/* Bottom Section */}
      <div className="shrink-0 mt-auto border-t border-gray-200 p-4">
        <button
          type="button"
          className="
            group flex w-full items-center gap-3
            rounded-lg px-4 py-3
            text-sm font-medium text-gray-600
            transition-colors duration-200
            hover:bg-gray-100 hover:text-gray-900
            focus:outline-none focus:ring-2 focus:ring-gray-300
          "
        >
          <IconLogout size={21} stroke={1.8} className="shrink-0" />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
