import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/dashboard"
      className="flex items-center gap-2 select-none"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white shadow-md">
        C
      </div>

      <div className="hidden sm:block">
        <h1 className="text-xl font-bold text-slate-800">
          ConnectHub
        </h1>

        <p className="text-xs text-slate-500">
          Real-Time Collaboration
        </p>
      </div>
    </Link>
  );
}