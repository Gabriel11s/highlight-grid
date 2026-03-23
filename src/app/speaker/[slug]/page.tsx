import type { Metadata } from "next";
import SpeakerPageContent from "./SpeakerPageContent";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const name = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: name,
    description: `Conheça a história, o ecossistema e os eventos de ${name}. Perfil completo no NEWS.`,
    openGraph: {
      title: `${name} — NEWS`,
      description: `Perfil completo de ${name} no NEWS.`,
      type: "profile",
      siteName: "NEWS",
    },
  };
}

export default async function SpeakerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <SpeakerPageContent slug={slug} />;
}
