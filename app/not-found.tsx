import Link from "next/link";
import { Home, Search, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Graphic */}
        <div className="relative w-40 h-40 mx-auto mb-8">
          <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="80" cy="80" r="72" fill="#F2EFE8" stroke="#E4E1DB" strokeWidth="2"/>
            <path d="M48 100 L80 52 L112 100" fill="#0A1628" opacity="0.08"/>
            <rect x="56" y="78" width="48" height="30" rx="3" fill="#0A1628" opacity="0.12"/>
            <path d="M44 102 L80 50 L116 102" fill="none" stroke="#C9A255" strokeWidth="3" strokeLinejoin="round"/>
            <rect x="58" y="80" width="44" height="28" rx="2" fill="white" stroke="#E4E1DB" strokeWidth="1.5"/>
            <rect x="68" y="88" width="10" height="10" rx="1.5" fill="#C9A255" opacity="0.4"/>
            <rect x="82" y="88" width="10" height="10" rx="1.5" fill="#C9A255" opacity="0.4"/>
            <rect x="72" y="96" width="16" height="12" rx="1" fill="#0A1628" opacity="0.15"/>
            {/* 404 */}
            <text x="80" y="140" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fontWeight="700" fill="#0A1628" opacity="0.4" letterSpacing="3">PAGE NOT FOUND</text>
          </svg>
        </div>

        <h1 className="font-display text-6xl font-bold text-navy-900 mb-3">404</h1>
        <h2 className="font-display text-2xl font-semibold text-navy-900 mb-3">Page Not Found</h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          The property or page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary justify-center">
            <Home size={15} />
            Back to Home
          </Link>
          <Link href="/properties" className="btn-secondary justify-center">
            <Search size={15} />
            Browse Properties
          </Link>
        </div>
      </div>
    </div>
  );
}
