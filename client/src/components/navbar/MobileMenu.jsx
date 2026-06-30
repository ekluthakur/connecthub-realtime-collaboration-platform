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

export default function MobileMenu({
  open,
  setOpen,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">

      <div className="h-full w-72 bg-white p-6 shadow-xl">

        <h2 className="mb-8 text-2xl font-bold text-blue-600">
          ConnectHub
        </h2>

        <div className="space-y-5">

          {menus.map((item) => (

            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className="block rounded-lg p-3 hover:bg-slate-100"
            >
              {item.name}
            </NavLink>

          ))}

        </div>

      </div>

    </div>
  );
}