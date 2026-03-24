import { redirect } from "next/navigation";

export const metadata = {
  title: "Builder — NEWS",
  robots: { index: false, follow: false },
};

/** Builder is now integrated inside the dashboard — redirect legacy URL */
export default function BuilderPage() {
  redirect("/dashboard");
}
