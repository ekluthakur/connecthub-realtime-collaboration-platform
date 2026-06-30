import StatCard from "./StatCard";

export default function Statistics() {
  return (
    <section className="mt-10">

      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Overview
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Meetings"
          value="0"
          icon="📹"
        />

        <StatCard
          title="Hours"
          value="0"
          icon="⏱"
          color="bg-green-600"
        />

        <StatCard
          title="Files"
          value="0"
          icon="📁"
          color="bg-purple-600"
        />

        <StatCard
          title="Participants"
          value="0"
          icon="👥"
          color="bg-orange-500"
        />

      </div>

    </section>
  );
}