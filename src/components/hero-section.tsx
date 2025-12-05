import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="flex items-center justify-center flex-col py-32 gap-6">
      <h1 className="flex flex-wrap text-8xl text-center max-w-3xl gap-4 items-center justify-center font-display ">
        <span>Bienvenue</span>
        <span>dans</span>
        <span>le</span>
        <span>village</span>
        <span>numerique</span>
        <span className="text-primary">resistant</span>
      </h1>
      <p>
        Rejoignez la quête : protégez vos données, réparez vos machines, libérez
        votre école.
      </p>
      <Link
        href="/quiz"
        className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors select-none"
      >
        Commencez le défi
      </Link>
    </div>
  );
}
