export default function ActionCard({
  icon,
  title,
  description,
  buttonText,
  onClick,
}) {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-lg
      p-6
      hover:-translate-y-1
      hover:shadow-xl
      transition-all
      duration-300
      border
      border-slate-200
      "
    >
      <div className="text-5xl mb-5">
        {icon}
      </div>

      <h2 className="text-2xl font-bold text-slate-800">
        {title}
      </h2>

      <p className="mt-2 text-slate-500">
        {description}
      </p>

      <button
        onClick={onClick}
        className="
        mt-6
        w-full
        rounded-xl
        bg-blue-600
        py-3
        font-semibold
        text-white
        hover:bg-blue-700
        transition
        "
      >
        {buttonText}
      </button>
    </div>
  );
}