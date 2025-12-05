import Link from "next/link";
import Logo from "./logo";

export default function NavigationBar() {
  return (
    <nav className="flex mx-auto max-w-4xl w-full gap-2 items-center py-4">
      <Logo className="h-10 w-auto" />
      <div className="flex gap-6 mx-auto">
        <NavLink href="#">Accueil</NavLink>
        <NavLink href="/check">Vérif</NavLink>
        <NavLink href="https://faq-nine-olive.vercel.app">FAQ</NavLink>
      </div>
      <Link
        href="/quiz"
        className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors select-none"
      >
        Passer le Quiz
      </Link>
    </nav>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        className="flex items-center justify-center p-2 hover:text-primary/90 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="flex items-center justify-center p-2 hover:text-primary/90 transition-colors"
    >
      {children}
    </Link>
  );
}
