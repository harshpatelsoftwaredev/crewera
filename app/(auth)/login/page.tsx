"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Loader2, Mail, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-navy-900 mb-1">Welcome back</h1>
        <p className="text-sm text-gray-500">Sign in to your PLOTIX account</p>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: "Google", icon: "G" },
          { label: "LinkedIn", icon: "in" },
        ].map(({ label, icon }) => (
          <button key={label} className="btn-secondary justify-center gap-2 py-2.5">
            <span className="w-5 h-5 rounded bg-gray-100 text-gray-600 text-xs font-bold flex items-center justify-center">
              {icon}
            </span>
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-cream-300" />
        <span className="text-xs text-gray-400">or continue with email</span>
        <div className="flex-1 h-px bg-cream-300" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-navy-700 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-base pl-10"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-navy-700">Password</label>
            <Link href="/forgot-password" className="text-xs text-gold-600 hover:text-gold-700 transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPw ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-base pl-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        {/* Remember me */}
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <div className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center group-hover:border-navy-400 transition-colors">
            <input type="checkbox" className="sr-only" />
          </div>
          <span className="text-xs text-gray-600">Remember me for 30 days</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full justify-center py-3 text-sm"
        >
          {loading ? (
            <><Loader2 size={15} className="animate-spin" /> Signing in…</>
          ) : (
            <>Sign In <ArrowRight size={15} /></>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-navy-900 hover:text-gold-600 transition-colors">
          Create one free
        </Link>
      </p>
    </div>
  );
}
