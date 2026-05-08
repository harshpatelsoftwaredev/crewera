import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Form */}
      <div className="flex flex-col bg-white">
        {/* Logo bar */}
        <div className="px-8 py-6 border-b border-cream-200">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-8 h-8">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <rect width="32" height="32" rx="7" fill="#0A1628"/>
                <path d="M6 19 L16 7 L26 19" fill="#C9A255"/>
                <rect x="9" y="18" width="14" height="11" rx="1.5" fill="white" opacity="0.92"/>
                <rect x="13.5" y="22" width="5" height="7" rx="1" fill="#0A1628" opacity="0.35"/>
                <rect x="10" y="19.5" width="3" height="3" rx="0.5" fill="#C9A255" opacity="0.6"/>
                <rect x="19" y="19.5" width="3" height="3" rx="0.5" fill="#C9A255" opacity="0.6"/>
              </svg>
            </div>
            <div>
              <div className="font-display font-bold tracking-[0.12em] text-navy-900 text-lg leading-none">PLOTIX</div>
              <div className="text-gold-500 font-medium tracking-[0.3em] text-[7px] uppercase">REALITY</div>
            </div>
          </Link>
        </div>
        {/* Form content */}
        <div className="flex-1 flex items-center justify-center px-8 py-10">
          <div className="w-full max-w-sm">{children}</div>
        </div>
        <div className="px-8 py-4 text-center text-xs text-gray-400 border-t border-cream-200">
          © 2025 PLOTIX Reality Pvt. Ltd.
        </div>
      </div>

      {/* Right: Visual */}
      <div className="hidden lg:flex relative overflow-hidden bg-navy-900">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85"
          alt="Luxury property"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/80 via-navy-900/50 to-navy-800/70" />
        <div className="relative flex flex-col justify-end p-14 text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-300 text-xs font-medium mb-6 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            15,000+ Active Listings
          </div>
          <h2 className="font-display text-4xl xl:text-5xl font-bold leading-tight mb-4">
            India&apos;s Most Trusted
            <br />
            <span className="text-gold-400 italic">Real Estate</span> Platform
          </h2>
          <p className="text-white/50 leading-relaxed max-w-sm mb-8">
            Connect with verified buyers, sellers, agents and builders across India.
          </p>
          <div className="flex gap-6">
            {[["3,200+","Verified Agents"],["120+","Cities"],["4.9★","Rating"]].map(([val, label]) => (
              <div key={label}>
                <p className="font-bold text-xl text-gold-400">{val}</p>
                <p className="text-xs text-white/40 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
