"use client";

import { useState } from "react";
import Image from "next/image";

const reasons = [
  {
    id: 1,
    title: "Inclusion",
    description:
      "Accès équitable au numérique, réduction de la fracture numérique.",
    image: "/images/inclusion.jpg",
  },
  {
    id: 2,
    title: "Responsabilité",
    description:
      "Usage raisonné et réflexif de technologies souveraines et respectueuses des données personnelles.",
    image: "/images/privacy.jpg",
  },
  {
    id: 3,
    title: "Durabilité",
    description:
      "Lutte contre l’obsolescence programmée par le choix de Linux pour l’équipement, maîtrise des coûts.",
    image: "/images/durability.webp",
  },
];

export default function WhyJoinSection() {
  const [selectedReason, setSelectedReason] = useState(reasons[0]);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-5xl font-display text-primary">
        Pourquoi rejoindre notre village numérique résistant ?
      </h2>
      <p>
        Dans un monde dominé par les géants du numérique, il est crucial de
        protéger nos données et notre vie privée.
      </p>
      <div className="flex gap-6">
        {/* Left side - Image showcase */}
        <div className="w-2/3 relative aspect-video rounded-lg overflow-hidden bg-foreground/5">
          <Image
            src={selectedReason.image}
            alt={selectedReason.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Right side - Clickable cards */}
        <div className="w-1/3 flex flex-col gap-6">
          {reasons.map((reason) => (
            <button
              key={reason.id}
              onClick={() => setSelectedReason(reason)}
              className={`flex flex-col gap-2 p-4 rounded-lg text-left transition-all cursor-pointer ${
                selectedReason.id === reason.id
                  ? "bg-primary text-white"
                  : "bg-foreground/5 hover:bg-foreground/10"
              }`}
            >
              <p className="text-xl font-semibold">{reason.title}</p>
              <p className="text-sm opacity-90">{reason.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
