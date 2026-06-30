export default function StatCard({
  title,
  value,
  icon,
  color = "bg-blue-600",
}) {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-lg
      p-6
      border
      border-slate-200
      hover:-translate-y-1
      hover:shadow-xl
      transition-all
      duration-300
      "
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-slate-500 text-sm">

            {title}

          </p>

          <h2 className="text-3xl font-bold text-slate-800 mt-2">

            {value}

          </h2>

        </div>

        <div
          className={`
          ${color}
          w-14
          h-14
          rounded-xl
          flex
          items-center
          justify-center
          text-3xl
          text-white
          `}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}