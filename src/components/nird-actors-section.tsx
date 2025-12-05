import Image from "next/image";

interface ActorCardProps {
  name: string;
  role: string;
  image: string;
}

function ActorCard({ name, role, image }: ActorCardProps) {
  return (
    <div className="relative shrink-0 w-64 h-80 rounded-lg overflow-hidden">
      <Image src={image} alt={name} fill className="object-cover" />
      {/* Pink overlay */}
      <div className="absolute inset-0 bg-primary/20"></div>
      <div className="absolute bottom-0 right-0 p-4 w-full">
        <h4 className="text-background bg-primary font-semibold text-lg inline">
          {name}
        </h4>
        <p className="text-background bg-primary text-sm">{role}</p>
      </div>
    </div>
  );
}

export default function NirdActorsSection() {
  const actors = [
    {
      name: "Élèves",
      role: "Participent aux clubs numériques et apprennent à utiliser les outils libres",
      image: "/images/actors/student.jpg",
    },
    {
      name: "Enseignants",
      role: "Intègrent les outils libres dans leurs pratiques pédagogiques",
      image: "/images/actors/teacher.jpg",
    },
    {
      name: "Directions",
      role: "Portent le projet au sein de l'établissement",
      image: "/images/actors/admin.jpg",
    },
    {
      name: "Techniciens",
      role: "Assurent la maintenance et le déploiement des postes Linux",
      image: "/images/actors/it.jpg",
    },
    {
      name: "Associations",
      role: "Accompagnent la transition vers le numérique libre",
      image: "/images/actors/associations.jpg",
    },
    {
      name: "Collectivités",
      role: "Soutiennent financièrement et logistiquement le projet",
      image: "/images/actors/collectivites.jpg",
    },
    {
      name: "Services académiques",
      role: "Coordonnent et structurent la démarche au niveau territorial",
      image: "/images/actors/academic.jpg",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-5xl font-display text-primary">
        Les acteurs du modèle NIRD
      </h3>
      <div className="flex gap-6 overflow-x-auto pb-4 px-6 snap-x snap-mandatory rounded-lg no-scrollbar">
        {actors.map((actor, index) => (
          <div key={index} className="snap-start">
            <ActorCard
              name={actor.name}
              role={actor.role}
              image={actor.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
