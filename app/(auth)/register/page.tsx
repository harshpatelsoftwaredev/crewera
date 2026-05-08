"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye, EyeOff, ArrowRight, Loader2, Mail, Lock, User, Phone,
  Home, Building2, HardHat, UserCheck, Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ROLES = [
  {
    value: "buyer",
    label: "Buyer",
    icon: Home,
    desc: "Looking to buy or rent a property",
    color: "text-blue-700 bg-blue-50 border-blue-200",
    activeColor: "border-blue-500 bg-blue-50",
  },
  {
    value: "agent",
    label: "Agent / Broker",
    icon: UserCheck,
    desc: "Represent buyers and sellers",
    color: "text-purple-700 bg-purple-50 border-purple-200",
    activeColor: "border-purple-500 bg-purple-50",
  },
  {
    value: "builder",
    label: "Builder",
    icon: HardHat,
    desc: "Develop and sell projects",
    color: "text-amber-700 bg-amber-50 border-amber-200",
    activeColor: "border-amber-500 bg-amber-50",
  },
  {
    value: "owner",
    label: "Property Owner",
    icon: Building2,
    desc: "List your own property",
    color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    activeColor: "border-emerald-500 bg-emerald-50",
  },
];

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", terms: false });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-navy-900 mb-1">Create account</h1>
        <p className="text-sm text-gray-500">Join PLOTIX Reality — it&apos;s free</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-7">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all",
              step >= s ? "bg-navy-900 text-white" : "bg-cream-200 text-gray-400"
            )}>
              {step > s ? <Check size={13} /> : s}
            </div>
            <span className={cn("text-xs font-medium", step >= s ? "text-navy-900" : "text-gray-400")}>
              {s === 1 ? "Your Details" : "Choose Role"}
            </span>
            {s < 2 && <div className={cn("flex-1 h-px w-8", step > s ? "bg-navy-900" : "bg-cream-300")} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 ? (
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-navy-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Rajesh Kumar" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-base pl-10" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-navy-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" placeholder="you@example.com" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-base pl-10" />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-navy-700 mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="tel" placeholder="+91 98765 43210" value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input-base pl-10" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-navy-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPw ? "text" : "password"} placeholder="Min. 8 characters" required
                  value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-base pl-10 pr-10" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2.5 cursor-pointer">
              <div className={cn(
                "w-4 h-4 rounded border flex items-center justify-center mt-0.5 flex-shrink-0 transition-all",
                form.terms ? "bg-navy-900 border-navy-900" : "border-gray-300"
              )} onClick={() => setForm({ ...form, terms: !form.terms })}>
                {form.terms && <Check size={10} className="text-white" />}
              </div>
              <span className="text-xs text-gray-500 leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-navy-700 hover:text-gold-600 font-medium">Terms of Service</Link>
                {" "}and{" "}
                <Link href="/privacy-policy" className="text-navy-700 hover:text-gold-600 font-medium">Privacy Policy</Link>
              </span>
            </label>

            <button type="submit" disabled={!form.terms} className="btn-primary w-full justify-center py-3">
              Continue <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
              I want to use PLOTIX as a…
            </p>
            {ROLES.map(({ value, label, icon: Icon, desc, activeColor, color }) => (
              <button key={value} type="button" onClick={() => setRole(value)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all",
                  role === value ? activeColor + " border-2" : "border-cream-200 hover:border-cream-300 bg-white"
                )}>
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", color)}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-navy-900">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
                  role === value ? "border-navy-900 bg-navy-900" : "border-gray-300"
                )}>
                  {role === value && <Check size={11} className="text-white" />}
                </div>
              </button>
            ))}

            <div className="flex gap-2 pt-2">
              <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1 justify-center">
                Back
              </button>
              <button type="submit" disabled={!role || loading} className="btn-primary flex-1 justify-center">
                {loading ? <Loader2 size={15} className="animate-spin" /> : <>Create Account <ArrowRight size={15} /></>}
              </button>
            </div>
          </div>
        )}
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-navy-900 hover:text-gold-600 transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}
