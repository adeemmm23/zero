import NirdStep from "./nird-step";

export default function NirdApproachSection() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-5xl font-display text-primary">La Démarche NIRD</h2>
      <p className="text-lg">
        La Démarche NIRD (Numérique Inclusif, Responsable et Durable) propose
        aux établissements scolaires un cheminement progressif en trois jalons
        pour adopter un numérique libre basé sur Linux.
      </p>

      <div className="flex flex-col gap-6">
        <NirdStep
          number={1}
          title="Mobilisation"
          description="Sensibiliser l'équipe éducative aux enjeux du numérique libre, identifier un Contact NIRD volontaire pour porter le projet, et informer la direction ainsi que la collectivité territoriale de la démarche."
        />
        <NirdStep
          number={2}
          title="Expérimentation"
          description="Installer et utiliser concrètement des postes Linux reconditionnés, impliquer les élèves à travers des clubs numériques, et assurer un suivi régulier des usages pour évaluer l'adoption et les besoins."
        />
        <NirdStep
          number={3}
          title="Intégration"
          description="Pérenniser la démarche en l'inscrivant dans le projet d'établissement, établir une coopération structurée avec la collectivité de rattachement, et garantir la continuité du service et l'extension du parc informatique."
        />
      </div>
    </div>
  );
}
