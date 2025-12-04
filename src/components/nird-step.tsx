interface NirdStepProps {
  number: number;
  title: string;
  description: string;
}

export default function NirdStep({
  number,
  title,
  description,
}: NirdStepProps) {
  return (
    <div className="flex gap-2">
      {/* Number block - square */}
      <div className="flex items-center justify-center aspect-square rounded-lg bg-primary text-white font-bold text-4xl shrink-0">
        {number}
      </div>

      {/* Content card with same height */}
      <div className="flex flex-col gap-2 p-6 rounded-lg bg-foreground/5 flex-1 justify-center">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
