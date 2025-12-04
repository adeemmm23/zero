import Logo from "./logo";

export default function NavigationBar() {
  return (
    <nav className="flex mx-auto max-w-4xl w-full gap-2 items-center py-4">
      <Logo className="h-10 w-auto" />
      <div className="flex gap-6 mx-auto">
        <NavLink href="#">Home</NavLink>
        <NavLink href="#">About</NavLink>
        <NavLink href="#">Features</NavLink>
      </div>
      <a
        href="#"
        className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors select-none"
      >
        Take the Quiz
      </a>
    </nav>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  return (
    <a
      href={href}
      className="flex items-center justify-center p-2 hover:text-primary/90 transition-colors"
    >
      {children}
    </a>
  );
}
