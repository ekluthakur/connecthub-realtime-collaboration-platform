import { NavLink } from "react-router-dom";

const menus = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Meetings",
    path: "/meetings",
  },
  {
    name: "History",
    path: "/history",
  },
  {
    name: "Files",
    path: "/files",
  },
];

export default function DesktopMenu() {
  return (
    <div className="hidden lg:flex items-center gap-8">
      {menus.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `font-medium transition ${
              isActive
                ? "text-blue-600"
                : "text-slate-600 hover:text-blue-600"
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
}