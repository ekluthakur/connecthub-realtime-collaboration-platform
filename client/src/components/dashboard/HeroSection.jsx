import { useAuth } from "../../context/AuthContext";
import { getGreeting } from "../../utils/greeting";

export default function HeroSection() {

  const { user } = useAuth();

  const greeting = getGreeting();

  return (
    <div
      className="
      rounded-3xl
      bg-gradient-to-r
      from-blue-600
      to-indigo-600
      p-8
      text-white
      shadow-lg
      "
    >
      <h2 className="text-4xl font-bold">

        {greeting.emoji} {greeting.text},{" "}

        {user?.username}

      </h2>

      <p className="mt-4 text-blue-100 text-lg">

        Ready to collaborate today?

      </p>
    </div>
  );
}