import Link from "next/link";
import Image from "next/image";
import {
  Heart, Search, MessageCircle, Calendar, ArrowRight,
  TrendingUp, Bell, Star, Eye, MapPin, BedDouble,
  BadgeCheck, ChevronRight,
} from "lucide-react";
import { MOCK_PROPERTIES, formatPrice } from "@/lib/data";

const QUICK_STATS = [
  { label: "Saved Properties", value: "12", icon: Heart, color: "bg-rose-50 text-rose-600", change: "+3 this week" },
  { label: "Active Inquiries", value: "4", icon: MessageCircle, color: "bg-blue-50 text-blue-600", change: "2 awaiting reply" },
  { label: "Upcoming Viewings", value: "2", icon: Calendar, color: "bg-amber-50 text-amber-600", change: "Next: Tomorrow" },
  { label: "Saved Searches", value: "7", icon: Search, color: "bg-emerald-50 text-emerald-600", change: "3 new matches" },
];

const RECENT_ACTIVITY = [
  { text: "New response on your inquiry for Luxurious 4BHK Penthouse", time: "2h ago", icon: MessageCircle, color: "text-blue-500" },
  { text: "Price dropped on Agricultural Land in Rajkot", time: "5h ago", icon: TrendingUp, color: "text-emerald-500" },
  { text: "Viewing confirmed for Modern 3BHK in Prahlad Nagar", time: "1d ago", icon: Calendar, color: "text-amber-500" },
  { text: "3 new properties match your saved search in Ahmedabad", time: "2d ago", icon: Bell, color: "text-purple-500" },
];

export default function BuyerDashboardPage() {
  const recommended = MOCK_PROPERTIES.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-navy-900 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #C9A255 0%, transparent 60%)" }} />
        <div className="relative">
          <p className="text-gold-400 text-xs font-semibold tracking-wide uppercase mb-1">Good morning</p>
          <h1 className="font-display text-2xl font-bold text-white mb-1">Rajesh Kumar</h1>
          <p className="text-white/50 text-sm">You have 3 new matches for your saved searches today.</p>
          <div className="flex flex-wrap gap-2 mt-4">
            <Link href="/properties" className="btn-gold text-xs px-4 py-2">
              Browse Properties <ArrowRight size={13} />
            </Link>
            <Link href="/buyer-dashboard/saved-searches" className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/20 text-white text-xs hover:bg-white/10 transition-all">
              View Saved Searches
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {QUICK_STATS.map(({ label, value, icon: Icon, color, change }) => (
          <div key={label} className="card p-4">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center`}>
                <Icon size={16} />
              </div>
              <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded-full">
                {change}
              </span>
            </div>
            <p className="font-display text-2xl font-bold text-navy-900">{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Recommended Properties */}
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-navy-900">Recommended for You</h2>
            <Link href="/properties" className="text-xs font-semibold text-gold-600 flex items-center gap-1 hover:gap-2 transition-all">
              View all <ChevronRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {recommended.map((p) => (
              <Link key={p.id} href={`/properties/${p.slug}`}>
                <div className="flex gap-3 p-3 rounded-xl hover:bg-cream-50 transition-colors group cursor-pointer">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-navy-900 truncate group-hover:text-gold-600 transition-colors">
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-400">
                      <MapPin size={10} />
                      <span className="truncate">{p.locality}, {p.city}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="font-bold text-sm text-navy-900">{formatPrice(p.price, p.priceUnit)}</span>
                      {p.bedrooms && (
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <BedDouble size={10} />{p.bedrooms} Bed
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <button className="p-1.5 rounded-lg hover:bg-rose-50 text-gray-300 hover:text-rose-500 transition-colors">
                      <Heart size={14} />
                    </button>
                    {p.isFeatured && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-600 font-semibold">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Recent Activity */}
          <div className="card p-5">
            <h2 className="font-display text-lg font-semibold text-navy-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {RECENT_ACTIVITY.map(({ text, time, icon: Icon, color }) => (
                <div key={text} className="flex gap-3">
                  <div className={`w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5 ${color}`}>
                    <Icon size={12} />
                  </div>
                  <div>
                    <p className="text-xs text-navy-700 leading-snug">{text}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p-5">
            <h2 className="font-display text-lg font-semibold text-navy-900 mb-3">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { label: "Post a Property Request", href: "/buyer-dashboard/property-requests/new", icon: Search },
                { label: "Schedule a Viewing", href: "/buyer-dashboard/viewings", icon: Calendar },
                { label: "Compare Properties", href: "/buyer-dashboard/comparisons", icon: Eye },
                { label: "Write a Review", href: "/buyer-dashboard/reviews/new", icon: Star },
              ].map(({ label, href, icon: Icon }) => (
                <Link key={label} href={href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-cream-50 text-sm text-navy-700 hover:text-navy-900 transition-all group">
                  <Icon size={14} className="text-gold-500 flex-shrink-0" />
                  {label}
                  <ChevronRight size={12} className="ml-auto text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
