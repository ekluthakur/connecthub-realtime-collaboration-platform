import VideoPlayer from "./VideoPlayer";

export default function VideoGrid({
  localVideoRef,
  remoteVideoRef,
  participants,
  connectionStatus,
}) {
  return (
    <div className="mt-8">

      <div className="flex items-center justify-between mb-5">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Video Conference
          </h2>

          <p className="text-slate-500 mt-1">
            {connectionStatus}
          </p>

        </div>

        <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold">
          {participants.length} Participant
          {participants.length !== 1 ? "s" : ""}
        </div>

      </div>

      <div
        className={`
          grid gap-6
          ${
            participants.length <= 2
              ? "lg:grid-cols-2"
              : "lg:grid-cols-3"
          }
        `}
      >

        {/* Local */}

        <VideoPlayer
          videoRef={localVideoRef}
          muted={true}
          isLocal={true}
          name="You"
        />

        {/* Remote */}

        {participants.length > 1 ? (

          <VideoPlayer
            videoRef={remoteVideoRef}
            muted={false}
            name={
              participants.find(
                (p) => p.socketId !== undefined
              )?.username || "Participant"
            }
          />

        ) : (

          <div className="h-[420px] rounded-2xl bg-slate-900 text-white flex flex-col items-center justify-center shadow-xl">

            <div className="text-7xl">
              👤
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Waiting...
            </h3>

            <p className="mt-3 text-slate-300">
              Waiting for another participant
            </p>

          </div>

        )}

      </div>
    </div>
  );
}