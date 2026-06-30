import { useNavigate } from "react-router-dom";
import ActionCard from "./ActionCard";

export default function QuickActions() {

  const navigate = useNavigate();

  return (
    <div
      className="
      grid
      gap-8
      mt-10
      md:grid-cols-2
      "
    >
      <ActionCard
        icon="📹"
        title="Create Meeting"
        description="Start an instant secure meeting."
        buttonText="Create"
        onClick={() => navigate("/meeting/new")}
      />

      <ActionCard
        icon="🔗"
        title="Join Meeting"
        description="Join using a Meeting ID."
        buttonText="Join"
        onClick={() => navigate("/meeting/join")}
      />
    </div>
  );
}