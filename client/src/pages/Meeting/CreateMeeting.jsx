import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

export default function CreateMeeting() {
  const navigate = useNavigate();

  useEffect(() => {
    const meetingId = uuid();

    navigate(`/meeting/${meetingId}`, {
      replace: true,
    });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <h1 className="text-2xl font-semibold text-slate-700">
        Creating Secure Meeting...
      </h1>
    </div>
  );
}