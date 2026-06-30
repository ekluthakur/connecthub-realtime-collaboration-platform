export default function RecentMeetings() {

  return (
    <section className="mt-10">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-slate-800">

          Recent Meetings

        </h2>

      </div>

      <div
        className="
        bg-white
        rounded-2xl
        shadow-lg
        p-10
        border
        border-slate-200
        text-center
        "
      >

        <div className="text-6xl">

          📅

        </div>

        <h3 className="mt-4 text-xl font-semibold text-slate-800">

          No meetings yet

        </h3>

        <p className="mt-2 text-slate-500">

          Create your first meeting and start collaborating.

        </p>

      </div>

    </section>
  );
}