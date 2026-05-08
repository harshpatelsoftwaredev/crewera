import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Linkedin, Twitter, Facebook, ArrowRight } from "lucide-react";

const FOOTER_LINKS = {
  Properties: [
    { label: "Buy Property", href: "/properties?type=sale" },
    { label: "Rent Property", href: "/properties?type=rent" },
    { label: "Commercial", href: "/properties?category=commercial" },
    { label: "New Projects", href: "/projects" },
    { label: "Plot & Land", href: "/properties?category=plot" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#team" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Press", href: "/press" },
  ],
  Support: [
    { label: "Contact Us", href: "/contactus" },
    { label: "FAQs", href: "/faqs" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Sitemap", href: "/sitemap" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      {/* Newsletter Band */}
      <div className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-display text-2xl font-semibold text-white">
                Stay ahead in real estate
              </p>
              <p className="text-white/50 text-sm mt-1">
                Weekly market insights, new listings & investment tips.
              </p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 md:w-72 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500/50 transition-all"
              />
              <button className="btn-gold px-4 py-2.5 flex-shrink-0">
                Subscribe
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 flex-shrink-0">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <rect width="32" height="32" rx="7" fill="white" opacity="0.1"/>
                  <path d="M6 19 L16 7 L26 19" fill="#C9A255"/>
                  <rect x="9" y="18" width="14" height="11" rx="1.5" fill="white" opacity="0.92"/>
                  <rect x="13.5" y="22" width="5" height="7" rx="1" fill="#0A1628" opacity="0.6"/>
                  <rect x="10" y="19.5" width="3" height="3" rx="0.5" fill="#C9A255" opacity="0.6"/>
                  <rect x="19" y="19.5" width="3" height="3" rx="0.5" fill="#C9A255" opacity="0.6"/>
                </svg>
              </div>
              <div>
                <div className="font-display font-bold tracking-[0.12em] text-white text-lg">PLOTIX</div>
                <div className="text-gold-400 font-medium tracking-[0.32em] text-[7px] uppercase -mt-0.5">REALITY</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5 max-w-xs">
              India&apos;s premier real estate platform connecting buyers, sellers,
              agents and builders across the nation.
            </p>
            <div className="space-y-2.5">
              <a href="mailto:hello@plotixreality.com" className="flex items-center gap-2.5 text-white/50 hover:text-gold-400 text-sm transition-colors">
                <Mail size={14} />
                hello@plotixreality.com
              </a>
              <a href="tel:+918000100200" className="flex items-center gap-2.5 text-white/50 hover:text-gold-400 text-sm transition-colors">
                <Phone size={14} />
                +91 80001 00200
              </a>
              <span className="flex items-center gap-2.5 text-white/50 text-sm">
                <MapPin size={14} />
                Ahmedabad, Gujarat, India
              </span>
            </div>
            {/* Social */}
            <div className="flex items-center gap-2 mt-6">
              {[
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Facebook, href: "#" },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-white/50 hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-gold-400 mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/35 text-xs">
            © 2025 PLOTIX Reality Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/35 text-xs">RERA Registered</span>
            <span className="text-white/20">·</span>
            <span className="text-white/35 text-xs">ISO 9001:2015</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
