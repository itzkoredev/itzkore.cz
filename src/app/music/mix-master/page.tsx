export const metadata = {
  title: "Mix & Master — Music Services",
  description: "Professional mixing and mastering for drill, trap, and hip-hop",
  alternates: { canonical: "/music/mix-master" }
};

import MixMasterClient from "../../../components/music/MixMasterClient";

export default function MixMasterPage() {
  return <MixMasterClient />;
}
