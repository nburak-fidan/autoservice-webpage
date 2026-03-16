import type { Metadata } from "next";
import { ChipTuningPageContent } from "./chip-tuning-page";

export const metadata: Metadata = {
  title: "Dr.Şair Chip Tuning Hesaplama | GM Opel Garage",
  description:
    "Dr.Şair yazılım teknolojisi ile aracınızın performansını hesaplayın. Tüm marka ve modeller için chip tuning, güç artışı ve yakıt tasarrufu hesaplama aracı.",
  keywords: [
    "chip tuning hesaplama",
    "Dr.Şair",
    "yazılım",
    "performans artışı",
    "yakıt tasarrufu",
    "ECU yazılım",
    "stage 1",
    "stage 2",
    "araç yazılım",
  ],
  openGraph: {
    title: "Dr.Şair Chip Tuning Hesaplama | GM Opel Garage",
    description: "Aracınızın gizli potansiyelini keşfedin. Tüm markalar için chip tuning hesaplama.",
  },
};

export default function ChipTuningPage() {
  return <ChipTuningPageContent />;
}
