import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProfileMenu() {

  const [open, setOpen] = useState(false);

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white"
      >
        {user?.username?.charAt(0).toUpperCase()}
      </button>

      {open && (

        <div className="absolute right-0 mt-3 w-56 rounded-xl bg-white shadow-xl">

          <div className="border-b p-4">

            <h3 className="font-semibold">

              {user?.username}

            </h3>

            <p className="text-sm text-slate-500">

              {user?.email}

            </p>

          </div>

          <button
            onClick={() => navigate("/profile")}
            className="w-full p-3 text-left hover:bg-slate-100"
          >
            Profile
          </button>

          <button
            onClick={() => navigate("/settings")}
            className="w-full p-3 text-left hover:bg-slate-100"
          >
            Settings
          </button>

          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="w-full p-3 text-left text-red-500 hover:bg-red-50"
          >
            Logout
          </button>

        </div>

      )}

    </div>
  );
}