"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Heart,
  Bell,
  ChevronDown,
  Menu,
  X,
  MapPin,
  Home,
  Building2,
  UserCircle,
  LogOut,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  {
    label: "Properties",
    href: "/properties",
    dropdown: [
      { label: "All Properties", href: "/properties", icon: Home },
      { label: "Buy", href: "/properties?type=sale", icon: Home },
      { label: "Rent", href: "/properties?type=rent", icon: Home },
      { label: "Commercial", href: "/properties?category=commercial", icon: Building2 },
    ],
  },
  { label: "Buy", href: "/properties?type=sale" },
  { label: "Rent", href: "/properties?type=rent" },
  { label: "Agents", href: "/agents" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-nav border-b border-cream-200"
            : "bg-white border-b border-cream-200"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center"
              onClick={() => setMobileOpen(false)}
            >
              <div className="flex items-center gap-2.5">
                {/* SVG Icon Mark */}
                <div className="relative w-8 h-8">
                  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <rect width="32" height="32" rx="7" fill="#0A1628"/>
                    <path d="M6 19 L16 7 L26 19" fill="#C9A255"/>
                    <rect x="9" y="18" width="14" height="11" rx="1.5" fill="white" opacity="0.92"/>
                    <rect x="13.5" y="22" width="5" height="7" rx="1" fill="#0A1628" opacity="0.35"/>
                    <rect x="10" y="19.5" width="3" height="3" rx="0.5" fill="#C9A255" opacity="0.6"/>
                    <rect x="19" y="19.5" width="3" height="3" rx="0.5" fill="#C9A255" opacity="0.6"/>
                  </svg>
                </div>
                <div className="hidden sm:flex flex-col leading-none">
                  <span
                    className="font-display text-navy-900 tracking-[0.12em] font-bold"
                    style={{ fontSize: "18px", letterSpacing: "0.12em" }}
                  >
                    PLOTIX
                  </span>
                  <span
                    className="text-gold-500 font-body font-medium tracking-[0.32em] uppercase"
                    style={{ fontSize: "7px", letterSpacing: "0.32em", marginTop: "-1px" }}
                  >
                    REALITY
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                      "text-navy-700 hover:text-navy-900 hover:bg-cream-100",
                      activeDropdown === link.label && "bg-cream-100 text-navy-900"
                    )}
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform duration-200",
                          activeDropdown === link.label && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.dropdown && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1.5 w-52 bg-white rounded-xl shadow-card-hover border border-cream-200 py-1.5 animate-fade-in">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-navy-700 hover:bg-cream-100 hover:text-navy-900 transition-colors"
                        >
                          <item.icon size={15} className="text-gold-500" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={cn(
                  "p-2 rounded-lg transition-all duration-150",
                  "text-navy-600 hover:bg-cream-100 hover:text-navy-900",
                  searchOpen && "bg-cream-100 text-navy-900"
                )}
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              {/* Wishlist */}
              <button
                className="hidden sm:flex p-2 rounded-lg text-navy-600 hover:bg-cream-100 hover:text-navy-900 transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={18} />
              </button>

              {/* Notifications */}
              <button
                className="hidden sm:flex relative p-2 rounded-lg text-navy-600 hover:bg-cream-100 hover:text-navy-900 transition-colors"
                aria-label="Notifications"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold-500 rounded-full ring-2 ring-white" />
              </button>

              {/* Divider */}
              <div className="hidden sm:block w-px h-6 bg-cream-300 mx-1" />

              {/* Login */}
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-navy-700 hover:text-navy-900 hover:bg-cream-100 transition-colors"
              >
                Log in
              </Link>

              {/* List Property CTA */}
              <Link
                href="/register"
                className="btn-primary text-xs sm:text-sm px-3 sm:px-4 py-2"
              >
                <span className="hidden sm:inline">List Property</span>
                <span className="sm:hidden">List</span>
              </Link>

              {/* Mobile menu */}
              <button
                className="lg:hidden p-2 rounded-lg text-navy-700 hover:bg-cream-100 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Search Bar (expandable) */}
          {searchOpen && (
            <div className="pb-3 animate-fade-in">
              <div className="relative max-w-lg">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search by city, locality, property name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-base pl-10 pr-4"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-cream-200 animate-fade-in">
            <nav className="max-w-[1400px] mx-auto px-4 py-3 flex flex-col gap-0.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium text-navy-700 hover:bg-cream-100 hover:text-navy-900 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown size={14} />}
                </Link>
              ))}
              <div className="divider my-2" />
              <Link
                href="/login"
                className="flex items-center gap-2 px-3 py-3 rounded-lg text-sm font-medium text-navy-700 hover:bg-cream-100 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <UserCircle size={16} />
                Log In
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
