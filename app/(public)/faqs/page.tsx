"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  { category: "Buying", q: "How do I search for properties on PLOTIX?", a: "Use our advanced search on the Properties page. Filter by city, property type, price range, bedrooms, and amenities. You can also toggle the map view to see properties with price pins on a live map." },
  { category: "Buying", q: "Are all listings verified?", a: "Yes. Every property on PLOTIX goes through a physical and legal verification process. Verified listings display a green 'Verified' badge on the agent profile." },
  { category: "Buying", q: "Can I compare multiple properties?", a: "Absolutely. Use the Compare button on any property card. You can add up to 4 properties to your comparison table, which shows a side-by-side breakdown of specs, price, amenities, and more." },
  { category: "Buying", q: "How do I schedule a property viewing?", a: "Click 'Schedule Visit' on any property detail page. Choose from the agent's available time slots and confirm. You'll receive a confirmation email with the viewing details." },
  { category: "Selling", q: "How do I list my property?", a: "Register as a Property Owner or Agent, then click 'List Property' from your dashboard. Fill in the property details, upload images and documents, and submit for admin approval. Most listings are approved within 24 hours." },
  { category: "Selling", q: "What documents do I need to list a property?", a: "For residential properties, you'll need the title deed, encumbrance certificate, and property tax receipts. For commercial properties, additional trade-related documents may be required." },
  { category: "Selling", q: "Is there a fee to list property?", a: "Basic listings are free. Premium and featured listings that appear at the top of search results and on the map are available at affordable subscription rates. Visit our pricing page for details." },
  { category: "Agents", q: "How do I become a verified agent on PLOTIX?", a: "Register as an Agent and submit your RERA registration number, Aadhaar, and PAN. Our team verifies the documents within 2 business days. Verified agents get a badge and higher visibility." },
  { category: "Agents", q: "What marketing tools are available for agents?", a: "Agents get access to email campaign builders, social media schedulers, landing page creators, lead management CRM, buyer database, and detailed analytics on listings." },
  { category: "Platform", q: "Is PLOTIX available on mobile?", a: "Yes! PLOTIX works seamlessly on mobile browsers. A dedicated iOS and Android app is coming soon with push notifications, live chat, and map search." },
  { category: "Platform", q: "How do I reset my password?", a: "Click 'Forgot Password' on the login page. Enter your registered email, and we'll send a secure password reset link within a few minutes." },
];

const CATEGORIES = ["All", "Buying", "Selling", "Agents", "Platform"];

export default function FAQsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = FAQS.filter((f) => {
    const matchesCategory = category === "All" || f.category === category;
    const matchesSearch = !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-900 py-16">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <p className="text-gold-400 text-xs font-semibold tracking-[0.15em] uppercase mb-3">Help Centre</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-white/50 mb-8">Find quick answers about buying, selling, and using PLOTIX.</p>
          <div className="relative max-w-lg mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search questions…" value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500/40 transition-all" />
          </div>
        </div>
      </section>

      <section className="py-12 bg-cream-50">
        <div className="max-w-3xl mx-auto px-6">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-semibold transition-all",
                  category === cat ? "bg-navy-900 text-white shadow-sm" : "bg-white text-navy-700 border border-cream-200 hover:border-navy-200"
                )}>
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion */}
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No results found for &ldquo;{search}&rdquo;</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((faq, i) => (
                <div key={i} className={cn("card overflow-hidden transition-all", openIndex === i && "ring-1 ring-navy-200")}>
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-cream-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gold-50 text-gold-700 border border-gold-100 mt-0.5 flex-shrink-0">
                        {faq.category}
                      </span>
                      <span className="font-semibold text-sm text-navy-900">{faq.q}</span>
                    </div>
                    <ChevronDown size={16} className={cn("text-gray-400 flex-shrink-0 mt-0.5 transition-transform", openIndex === i && "rotate-180")} />
                  </button>
                  {openIndex === i && (
                    <div className="px-5 pb-5 pt-0 border-t border-cream-100">
                      <p className="text-sm text-gray-600 leading-relaxed pt-4">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Still need help */}
          <div className="mt-10 card p-6 text-center bg-navy-900 border-0">
            <MessageCircle size={24} className="text-gold-400 mx-auto mb-3" />
            <h3 className="font-display text-xl font-bold text-white mb-2">Still have questions?</h3>
            <p className="text-white/50 text-sm mb-4">Our support team is ready to help you.</p>
            <Link href="/contactus" className="btn-gold px-6">Contact Support</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
