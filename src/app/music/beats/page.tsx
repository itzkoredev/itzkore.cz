export const metadata = {
  title: "Beats — Music Portfolio",
  description: "Browse and play original beats with custom visualizer",
  alternates: { canonical: "/music/beats" }
};

import BeatsBrowser from "../../../components/music/BeatsBrowser";

export default function BeatsPage() {
  return (
    <div className="min-h-screen bg-bg-primary py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
          Beat Library
        </h1>
        <BeatsBrowser />
      </div>
    </div>
  );
}
