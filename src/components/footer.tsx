import Logo from "./logo";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-6 py-12 mt-12">
      <div className="flex mx-auto max-w-4xl w-full gap-12">
        {/* Logo and description */}
        <div className="flex flex-col gap-4 flex-1 items-start">
          <Logo className="h-10 w-auto" />
          <p className="text-sm text-foreground/70">
            Village numérique résistant pour un numérique inclusif, responsable
            et durable.
          </p>
        </div>

        {/* Links section */}
        <div className="flex gap-12">
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Navigation</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <a
                href="#"
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                Accueil
              </a>
              <a
                href="#"
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                À propos
              </a>
              <a
                href="#"
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                Quiz
              </a>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Ressources</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <a
                href="https://nird.forge.apps.education.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                Site NIRD officiel
              </a>
              <a
                href="#"
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                Documentation
              </a>
              <a
                href="#"
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="flex mx-auto max-w-4xl w-full pt-6 border-t border-foreground/10">
        <p className="text-sm text-foreground/70">
          © {new Date().getFullYear()} 0% Big Tech. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
