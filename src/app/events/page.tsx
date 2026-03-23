import type { Metadata } from "next";
import EventsPageContent from "./EventsPageContent";

export const metadata: Metadata = {
  title: "Eventos",
  description:
    "Descubra eventos, palestras e imersões do mercado automotivo. Método DSM Acelera, networking e muito mais.",
  openGraph: {
    title: "Eventos — NEWS",
    description: "Eventos, palestras e imersões do mercado automotivo.",
    type: "website",
    siteName: "NEWS",
  },
};

export default function EventsPage() {
  return <EventsPageContent />;
}
