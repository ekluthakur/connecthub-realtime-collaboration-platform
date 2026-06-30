import Navbar from "../../components/navbar/Navbar";
import HeroSection from "../../components/dashboard/HeroSection";
import QuickActions from "../../components/dashboard/QuickActions";

export default function Dashboard() {

  return (
    <>
      <Navbar />

      <main
        className="
        max-w-7xl
        mx-auto
        px-6
        py-8
        "
      >
        <HeroSection />

        <QuickActions />
      </main>
    </>
  );
}