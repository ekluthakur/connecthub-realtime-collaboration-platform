import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinMeeting() {
  const [meetingId, setMeetingId] = useState("");

  const navigate = useNavigate();

  const handleJoin = (e) => {
    e.preventDefault();

    if (!meetingId.trim()) {
      alert("Please enter Meeting ID");
      return;
    }

    navigate(`/meeting/${meetingId}`);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-5">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-slate-800">
          Join Meeting
        </h1>

        <p className="text-slate-500 mt-2">
          Enter the Meeting ID shared with you.
        </p>

        <form
          onSubmit={handleJoin}
          className="mt-8 space-y-5"
        >
          <input
            value={meetingId}
            onChange={(e) =>
              setMeetingId(e.target.value)
            }
            placeholder="Meeting ID"
            className="w-full border rounded-lg p-3"
          />

          <button
            className="
            w-full
            bg-blue-600
            text-white
            py-3
            rounded-lg
            hover:bg-blue-700
            transition
            "
          >
            Join Meeting
          </button>
        </form>

      </div>

    </div>
  );
}