export default function VideoPlayer({
  videoRef,
  name,
  muted = false,
  isLocal = false,
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-xl border border-slate-200">

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={muted}
        className="w-full h-[420px] object-cover"
      />

      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-xl flex items-center gap-2">

        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>

        <span className="font-medium">
          {name}
          {isLocal && " (You)"}
        </span>

      </div>

    </div>
  );
}