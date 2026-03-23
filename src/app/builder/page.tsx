import type { Metadata } from "next";
import BuilderClient from "./BuilderClient";

export const metadata: Metadata = {
  title: "Visual Builder",
  description:
    "Crie seu perfil ou anúncio personalizado com blocos visuais. Arraste, edite e publique.",
  robots: { index: false, follow: false },
};

export default function BuilderPage() {
  return <BuilderClient />;
}
