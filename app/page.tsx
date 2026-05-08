import Link from "next/link";
import Image from "next/image";
import {
  Search,
  ArrowRight,
  MapPin,
  TrendingUp,
  ShieldCheck,
  BadgeCheck,
  Star,
  Building2,
  Home,
  Landmark,
  TreePine,
  ChevronRight,
  Phone,
} from "lucide-react";
import { MOCK_PROPERTIES, formatPrice } from "@/lib/data";
import PropertyCard from "@/components/properties/PropertyCard";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  const featuredProperties = MOCK_PROPERTIES.filter((p) => p.isFeatured).slice(0, 6);

  return (
    <>
      <Header />
      <main>
        {/* ─── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-navy-900">
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=85"
              alt="Luxury property"
              fill
              className="object-cover opacity-25"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-900/40 to-navy-900/80" />
          </div>

          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(rgba(201,162,85,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,85,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative max-w-[1400px] mx-auto px-6 py-20 w-full">
            <div className="max-w-3xl">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs font-medium tracking-wide mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse-soft" />
                India&apos;s Premier Real Estate Platform
              </div>

              {/* Headline */}
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6">
                Find Your{" "}
                <span className="text-gold-400 italic">Perfect</span>
                <br />
                Property in India
              </h1>

              <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-xl">
                Browse thousands of verified listings across residential, commercial and
                agricultural properties. Expert agents, transparent pricing.
              </p>

              {/* Search bar */}
              <div className="bg-white rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row gap-2 max-w-2xl">
                <div className="flex-1 flex items-center gap-2 px-3">
                  <Search size={16} className="text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search by city, locality or property name…"
                    className="flex-1 py-2.5 text-sm text-navy-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
                  />
                </div>
                {/* Divider */}
                <div className="hidden sm:block w-px bg-cream-200 my-1.5" />
                {/* City select */}
                <select className="sm:w-36 px-3 py-2.5 text-sm text-navy-700 focus:outline-none bg-transparent border-0 cursor-pointer">
                  <option value="">All Cities</option>
                  <option>Ahmedabad</option>
                  <option>Mumbai</option>
                  <option>Bangalore</option>
                  <option>Delhi</option>
                  <option>Pune</option>
                  <option>Surat</option>
                </select>
                <Link
                  href="/properties"
                  className="btn-primary rounded-xl px-6 justify-center"
                >
                  Search
                  <ArrowRight size={15} />
                </Link>
              </div>

              {/* Quick links */}
              <div className="flex flex-wrap gap-2 mt-5">
                {["Apartments", "Villas", "Commercial", "Plots", "New Projects"].map((tag) => (
                  <Link
                    key={tag}
                    href={`/properties?type=${tag.toLowerCase()}`}
                    className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/70 text-xs hover:bg-white/20 hover:text-white transition-all"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute bottom-10 right-6 hidden xl:block">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 text-white w-56">
                <p className="text-xs text-white/50 mb-3 font-medium tracking-wide uppercase">
                  Live Platform Stats
                </p>
                {[
                  { label: "Active Listings", value: "15,000+" },
                  { label: "Verified Agents", value: "3,200+" },
                  { label: "Cities Covered", value: "120+" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                    <span className="text-xs text-white/50">{s.label}</span>
                    <span className="text-sm font-bold text-gold-400">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Stats Bar ────────────────────────────────────────────────── */}
        <section className="bg-white border-b border-cream-200">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-cream-200">
              {[
                { value: "₹2,500+ Cr", label: "Properties Listed", icon: Building2 },
                { value: "15,000+", label: "Active Listings", icon: Home },
                { value: "3,200+", label: "Verified Agents", icon: BadgeCheck },
                { value: "4.9 / 5.0", label: "Platform Rating", icon: Star },
              ].map(({ value, label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-4 px-6 py-6">
                  <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-navy-700" />
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-navy-900 leading-tight">
                      {value}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Property Types ───────────────────────────────────────────── */}
        <section className="py-16 bg-cream-50">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs font-semibold text-gold-500 tracking-[0.15em] uppercase mb-2">
                  Browse by Category
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900">
                  Find the Right Property Type
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                {
                  label: "Apartments",
                  count: "6,200+",
                  icon: Building2,
                  color: "bg-blue-50 text-blue-700",
                  href: "/properties?type=apartment",
                },
                {
                  label: "Villas",
                  count: "1,800+",
                  icon: Home,
                  color: "bg-rose-50 text-rose-700",
                  href: "/properties?type=villa",
                },
                {
                  label: "Commercial",
                  count: "3,400+",
                  icon: Landmark,
                  color: "bg-purple-50 text-purple-700",
                  href: "/properties?type=commercial",
                },
                {
                  label: "Plots",
                  count: "2,100+",
                  icon: MapPin,
                  color: "bg-amber-50 text-amber-700",
                  href: "/properties?type=plot",
                },
                {
                  label: "Agricultural",
                  count: "980+",
                  icon: TreePine,
                  color: "bg-emerald-50 text-emerald-700",
                  href: "/properties?type=agricultural",
                },
                {
                  label: "Penthouses",
                  count: "540+",
                  icon: TrendingUp,
                  color: "bg-indigo-50 text-indigo-700",
                  href: "/properties?type=penthouse",
                },
              ].map(({ label, count, icon: Icon, color, href }) => (
                <Link key={label} href={href}>
                  <div className="card card-hover p-5 text-center group cursor-pointer">
                    <div
                      className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon size={20} />
                    </div>
                    <p className="font-semibold text-sm text-navy-900 group-hover:text-gold-600 transition-colors">
                      {label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{count}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Featured Properties ──────────────────────────────────────── */}
        <section className="py-16 bg-white">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs font-semibold text-gold-500 tracking-[0.15em] uppercase mb-2">
                  Hand-picked for you
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900">
                  Featured Properties
                </h2>
              </div>
              <Link
                href="/properties"
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-gold-600 transition-colors group"
              >
                View all listings
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link href="/properties" className="btn-secondary">
                View All Properties
                <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Why Choose Us ────────────────────────────────────────────── */}
        <section className="py-16 bg-cream-50">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs font-semibold text-gold-500 tracking-[0.15em] uppercase mb-3">
                  Why PLOTIX Reality
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 mb-5 leading-tight">
                  Real Estate Made <br />
                  <span className="italic text-gold-500">Simple & Transparent</span>
                </h2>
                <p className="text-gray-500 leading-relaxed mb-8 max-w-lg">
                  We connect buyers, sellers, builders, and agents on a single trusted
                  platform — with verified listings, live pricing, and zero hidden fees.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      icon: ShieldCheck,
                      title: "100% Verified Listings",
                      desc: "Every property undergoes thorough legal and physical verification before listing.",
                    },
                    {
                      icon: BadgeCheck,
                      title: "RERA Compliant",
                      desc: "All agents and projects are registered and compliant with RERA guidelines.",
                    },
                    {
                      icon: TrendingUp,
                      title: "Live Market Insights",
                      desc: "Real-time price analytics and market trends to help you invest wisely.",
                    },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={18} className="text-navy-700" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-navy-900 mb-0.5">{title}</p>
                        <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link href="/about" className="btn-primary">
                    Learn About PLOTIX
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Image mosaic */}
              <div className="relative hidden lg:grid grid-cols-2 gap-3 h-[480px]">
                <div className="relative rounded-2xl overflow-hidden row-span-2">
                  <Image
                    src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80"
                    alt="Luxury property"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80"
                    alt="Modern apartment"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80"
                    alt="City apartments"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-card-hover p-4 border border-cream-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-white font-bold text-sm">
                      4.9
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-navy-900">Excellent Rating</p>
                      <div className="flex gap-0.5 mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Testimonials ─────────────────────────────────────────────── */}
        <section className="py-16 bg-navy-900 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold text-gold-400 tracking-[0.15em] uppercase mb-3">
                What Our Clients Say
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                Trusted by Thousands
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  text: "Found our dream home in Ahmedabad within two weeks. The verified listings and transparent pricing made the whole process stress-free.",
                  author: "Rajan & Priya Mehta",
                  role: "Home Buyers, Ahmedabad",
                  avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&q=80",
                  rating: 5,
                },
                {
                  text: "As a builder, PLOTIX's broker network has been invaluable. We sold 40% of our project in the first month after listing.",
                  author: "Harshil Developers",
                  role: "Builder, Surat",
                  avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&q=80",
                  rating: 5,
                },
                {
                  text: "The analytics dashboard and lead management tools have tripled my conversion rate. Best investment I've made for my agency.",
                  author: "Meenakshi Iyer",
                  role: "Real Estate Agent, Bangalore",
                  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
                  rating: 5,
                },
              ].map(({ text, author, role, avatar, rating }) => (
                <div
                  key={author}
                  className="bg-white/8 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
                >
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(rating)].map((_, i) => (
                      <Star key={i} size={13} className="fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-5 italic">
                    &ldquo;{text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-navy-700">
                      <Image src={avatar} alt={author} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-white">{author}</p>
                      <p className="text-xs text-white/40">{role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ──────────────────────────────────────────────────────── */}
        <section className="py-16 bg-cream-50">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="bg-navy-900 rounded-3xl p-10 sm:p-14 flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden">
              {/* BG decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-32 w-32 h-32 bg-gold-500/5 rounded-full translate-y-1/3 blur-2xl pointer-events-none" />

              <div className="relative">
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
                  Ready to list your property?
                </h2>
                <p className="text-white/50 max-w-md">
                  Join 3,200+ agents and builders. Get instant inquiries, qualified
                  leads and detailed analytics.
                </p>
              </div>
              <div className="relative flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link href="/register" className="btn-gold px-8 py-3 text-sm">
                  List for Free
                  <ArrowRight size={15} />
                </Link>
                <a
                  href="tel:+918000100200"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all"
                >
                  <Phone size={15} />
                  Talk to us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
