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
      <div className="absolute bottom-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent w-full">
        <h4 className="text-white font-semibold text-lg">{name}</h4>
        <p className="text-white/90 text-sm">{role}</p>
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
      <p>
        NIRD (Numérique Inclusif, Responsable et Durable) est un modèle de
        numérique éducatif qui vise à garantir l&#39;autonomie technologique des
        établissements scolaires en privilégiant les logiciels libres, le
        réemploi du matériel, la sobriété numérique et la maîtrise locale des
        outils. Il réunit différents acteurs du système éducatif qui collaborent
        pour construire un environnement numérique plus éthique, durable et
        accessible à tous.
      </p>

      <div className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory">
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
