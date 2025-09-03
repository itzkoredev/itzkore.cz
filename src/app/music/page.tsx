import { redirect } from "next/navigation";

export const metadata = { title: "Music" };

export default function MusicRedirectPage() {
  redirect("/music/intro");
}
