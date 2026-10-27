"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  
  const links = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full backdrop-blur-xl bg-black/60 border-b border-white/10 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold italic text-xl tracking-tighter text-brand hover:text-brand-hover transition-colors">
          POPCORN LAB.
        </Link>
        <nav className="flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`text-xs md:text-sm font-medium tracking-wide transition-colors ${pathname === link.href ? "text-white" : "text-gray-400 hover:text-white"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
