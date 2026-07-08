"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lock body scroll when mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const close = () => setIsMenuOpen(false);

  return (
    <>
      {/* ── Sticky header bar ─────────────────────────────────── */}
      <header className="sticky top-0 w-full z-40 bg-surface/80 backdrop-blur-md border-b border-white/15 py-4">
        <div className="w-full max-w-7xl mx-auto px-4 flex justify-between items-center">

          {/* Brand Logo */}
          <h1 className="font-headline-md text-headline-md tracking-tighter text-primary uppercase select-none">
            wearveyro
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <Link
              className="font-label-bold text-base tracking-widest text-primary-fixed hover:line-through transition-all whitespace-nowrap"
              href="/"
            >
              NEW DROPS
            </Link>
            <Link
              className="font-label-bold text-base tracking-widest text-secondary hover:text-primary transition-all hover:line-through whitespace-nowrap"
              href="/shop"
            >
              TEES
            </Link>
            <Link
              className="font-label-bold text-base tracking-widest text-secondary hover:text-primary transition-all hover:line-through whitespace-nowrap"
              href="/shop"
            >
              BOTTOMS
            </Link>
            <Link
              className="font-label-bold text-base tracking-widest text-secondary hover:text-primary transition-all hover:line-through whitespace-nowrap"
              href="/shop"
            >
              ARCHIVE
            </Link>
          </nav>

          {/* Desktop Utility Icons */}
          <div className="hidden md:flex items-center gap-6 text-primary flex-shrink-0">
            {/* Search */}
            <button className="hover:text-primary-fixed transition-colors cursor-pointer" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            {/* Favorites */}
            <button className="hover:text-primary-fixed transition-colors cursor-pointer" aria-label="Favorites">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </button>
            {/* Shopping Bag */}
            <div className="relative">
              <button className="hover:text-primary-fixed transition-colors cursor-pointer" aria-label="Shopping Bag">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </button>
              <span className="absolute -top-1.5 -right-1.5 bg-primary-fixed text-on-primary-fixed text-[10px] font-bold px-1.5 py-0.5 select-none leading-none">
                0
              </span>
            </div>
          </div>

          {/* Mobile Row: utility icons + hamburger */}
          <div className="flex md:hidden items-center gap-4 text-primary flex-shrink-0">
            {/* Search */}
            <button className="hover:text-primary-fixed transition-colors cursor-pointer" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            {/* Shopping Bag */}
            <div className="relative">
              <button className="hover:text-primary-fixed transition-colors cursor-pointer" aria-label="Shopping Bag">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </button>
              <span className="absolute -top-1 -right-1 bg-primary-fixed text-on-primary-fixed text-[8px] font-bold px-1 py-0.5 select-none leading-none">
                0
              </span>
            </div>
            {/* Hamburger / X toggle — only when overlay is closed */}
            {!isMenuOpen && (
              <button
                onClick={() => setIsMenuOpen(true)}
                className="hover:text-primary-fixed transition-colors cursor-pointer"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            )}
          </div>

        </div>
      </header>

      {/* ── Mobile full-screen overlay (sibling to header, NOT inside it) ── */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
          {/* Close button — absolutely anchored to the overlay corner */}
          <button
            onClick={close}
            className="absolute top-5 right-5 text-white hover:text-primary-fixed transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X size={28} />
          </button>

          {/* Navigation links */}
          <nav className="flex flex-col items-center gap-8">
            <Link
              className="font-label-bold text-2xl tracking-widest text-primary-fixed hover:line-through transition-all"
              href="/"
              onClick={close}
            >
              NEW DROPS
            </Link>
            <Link
              className="font-label-bold text-2xl tracking-widest text-white hover:text-primary-fixed hover:line-through transition-all"
              href="/shop"
              onClick={close}
            >
              TEES
            </Link>
            <Link
              className="font-label-bold text-2xl tracking-widest text-white hover:text-primary-fixed hover:line-through transition-all"
              href="/shop"
              onClick={close}
            >
              BOTTOMS
            </Link>
            <Link
              className="font-label-bold text-2xl tracking-widest text-white hover:text-primary-fixed hover:line-through transition-all"
              href="/shop"
              onClick={close}
            >
              ARCHIVE
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
