import BeatsBrowser from "../../../components/music/BeatsBrowser";
import Section from "../../../components/ui/Section";

export const metadata = { title: "Beats", alternates: { canonical: "/music/beats" } };

export default function BeatsPage() {
  return (
  <Section>
      <div className="hud-card p-4">
        <BeatsBrowser />
      </div>
    </Section>
  );
}
