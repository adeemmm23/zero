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
    <div className="group relative overflow-hidden rounded-lg">
      <div className="absolute top-0 left-0 h-full w-0 bg-primary flex items-center justify-center text-white text-4xl font-bold transition-all duration-500 ease-in-out group-hover:w-30 overflow-hidden rounded-lg">
        {number}
      </div>
      <div className="flex flex-col gap-2 p-6 rounded-lg bg-foreground/5 transition-transform duration-500 ease-in-out group-hover:translate-x-32">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
