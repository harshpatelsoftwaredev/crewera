import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, TrendingUp, Users, Award, MapPin, Building2, BadgeCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy-900 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" alt="" fill className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 to-navy-900" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 text-center">
          <p className="text-gold-400 text-xs font-semibold tracking-[0.15em] uppercase mb-4">Our Story</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
            Building Trust in<br />
            <span className="text-gold-400 italic">Indian Real Estate</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            PLOTIX Reality was founded with a single mission: to make property transactions in India
            transparent, efficient, and accessible to everyone.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold text-gold-500 tracking-[0.15em] uppercase mb-3">Who We Are</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 mb-5">
                India&apos;s Most Transparent Real Estate Platform
              </h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                Founded in 2020 in Ahmedabad, PLOTIX Reality has grown from a small startup to one of India&apos;s
                most trusted property platforms, serving over 500,000 buyers, sellers, and agents every month.
              </p>
              <p className="text-gray-500 leading-relaxed mb-6">
                We believe that buying or selling a property should be a joyful experience — not a stressful one.
                That&apos;s why we built a platform that puts transparency, verification, and customer trust at its core.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[["500K+","Monthly Users"],["15,000+","Active Listings"],["120+","Cities"],["3,200+","Verified Agents"]].map(([val, label]) => (
                  <div key={label} className="p-4 bg-cream-50 rounded-xl border border-cream-200">
                    <p className="font-display text-2xl font-bold text-navy-900">{val}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 h-96">
              <div className="relative rounded-2xl overflow-hidden row-span-2">
                <Image src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&q=80" alt="Office" fill className="object-cover" />
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80" alt="Team" fill className="object-cover" />
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80" alt="Meeting" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-gold-500 tracking-[0.15em] uppercase mb-3">Our Values</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900">What Drives Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: ShieldCheck, title: "Transparency", desc: "No hidden fees, no misleading listings. Every property is exactly what we say it is.", color: "bg-blue-50 text-blue-700" },
              { icon: BadgeCheck, title: "Verification", desc: "Every agent, property and builder is thoroughly verified before being listed.", color: "bg-emerald-50 text-emerald-700" },
              { icon: TrendingUp, title: "Innovation", desc: "We constantly improve our platform with AI-powered search, market insights, and smart tools.", color: "bg-purple-50 text-purple-700" },
              { icon: Users, title: "Community", desc: "We build lasting relationships between buyers, sellers, agents and builders.", color: "bg-amber-50 text-amber-700" },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card p-6 text-center group card-hover">
                <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-lg font-semibold text-navy-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-gold-500 tracking-[0.15em] uppercase mb-3">Leadership</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900">Meet the Team</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { name: "Arjun Sharma", role: "CEO & Co-Founder", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" },
              { name: "Priya Patel", role: "CTO & Co-Founder", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80" },
              { name: "Vikram Joshi", role: "Chief Revenue Officer", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80" },
              { name: "Meera Reddy", role: "Head of Operations", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80" },
            ].map(({ name, role, img }) => (
              <div key={name} className="text-center group">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-3 bg-cream-200">
                  <Image src={img} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-semibold text-sm text-navy-900">{name}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-navy-900 mb-4">
            Ready to Find Your Property?
          </h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Join 500,000+ users who trust PLOTIX Reality for their property needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/properties" className="btn-primary">
              Browse Properties <ArrowRight size={15} />
            </Link>
            <Link href="/register" className="btn-secondary">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
