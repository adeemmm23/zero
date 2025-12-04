import Image from "next/image";

export default function ImageShowcase() {
  return (
    <figure className="flex flex-col items-center gap-6">
      <Image
        src="/images/no_big_tech.gif"
        alt="Village numérique résistant"
        width={1200}
        height={600}
        className="mx-auto rounded-2xl"
      />
      <figcaption className="text-center text-foreground/70">
        &ldquo;Résistance contre les géants du numérique&rdquo;
      </figcaption>
    </figure>
  );
}
