"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2, Clock, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy-900 py-16">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <p className="text-gold-400 text-xs font-semibold tracking-[0.15em] uppercase mb-3">Get in Touch</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-white/50 max-w-lg mx-auto">
            Have a question or need help? Our team is here to assist you.
          </p>
        </div>
      </section>

      <section className="py-16 bg-cream-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Info cards */}
            <div className="space-y-4">
              {[
                { icon: Phone, title: "Phone", lines: ["+91 80001 00200", "Mon–Fri, 9am–6pm IST"], color: "bg-blue-50 text-blue-700" },
                { icon: Mail, title: "Email", lines: ["hello@plotixreality.com", "support@plotixreality.com"], color: "bg-emerald-50 text-emerald-700" },
                { icon: MapPin, title: "Head Office", lines: ["GIFT City, Gandhinagar", "Gujarat — 382355"], color: "bg-amber-50 text-amber-700" },
                { icon: Clock, title: "Support Hours", lines: ["Mon–Sat: 9:00 AM – 7:00 PM", "Sun: 10:00 AM – 4:00 PM"], color: "bg-purple-50 text-purple-700" },
              ].map(({ icon: Icon, title, lines, color }) => (
                <div key={title} className="card p-5 flex gap-4">
                  <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={17} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-navy-900 mb-1">{title}</p>
                    {lines.map((l) => <p key={l} className="text-xs text-gray-500">{l}</p>)}
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2 card p-7">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
                    <MessageSquare size={24} className="text-emerald-600" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-navy-900 mb-2">Message Sent!</h3>
                  <p className="text-sm text-gray-500 max-w-xs">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-semibold text-navy-900 mb-6">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-navy-700 mb-1.5">Full Name *</label>
                        <input type="text" required placeholder="Rajesh Kumar" className="input-base" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-navy-700 mb-1.5">Email Address *</label>
                        <input type="email" required placeholder="you@example.com" className="input-base" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-navy-700 mb-1.5">Phone Number</label>
                        <input type="tel" placeholder="+91 98765 43210" className="input-base" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-navy-700 mb-1.5">Subject *</label>
                        <select className="input-base" required>
                          <option value="">Select a topic</option>
                          <option>Property Inquiry</option>
                          <option>Agent Registration</option>
                          <option>Technical Support</option>
                          <option>Billing</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-navy-700 mb-1.5">Message *</label>
                      <textarea rows={5} required placeholder="How can we help you?" className="input-base resize-none" />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary px-8 py-3">
                      {loading ? <><Loader2 size={15} className="animate-spin" /> Sending…</> : <><Send size={15} /> Send Message</>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
