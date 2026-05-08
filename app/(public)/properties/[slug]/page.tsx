import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin, BedDouble, Bath, Square, Car, Star, BadgeCheck,
  Heart, Share2, Phone, MessageCircle, Calendar, ArrowLeft,
  Check, Building2, Layers, Shield, ChevronRight,
} from "lucide-react";
import { MOCK_PROPERTIES, formatPrice, formatArea, getPropertyTypeBadgeColor } from "@/lib/data";
import { cn } from "@/lib/utils";
import PropertyCard from "@/components/properties/PropertyCard";

interface PropertyDetailPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return MOCK_PROPERTIES.map((p) => ({ slug: p.slug }));
}

export default function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const property = MOCK_PROPERTIES.find((p) => p.slug === params.slug);
  if (!property) notFound();

  const similar = MOCK_PROPERTIES.filter(
    (p) => p.id !== property.id && (p.city === property.city || p.propertyType === property.propertyType)
  ).slice(0, 3);

  const price = formatPrice(property.price, property.priceUnit);
  const area = formatArea(property.area, property.areaUnit);
  const typeColor = getPropertyTypeBadgeColor(property.propertyType);

  return (
    <div className="min-h-screen bg-cream-50">
      {/* ─── Breadcrumb ───────────────────────────────────── */}
      <div className="bg-white border-b border-cream-200 sticky top-16 z-20">
        <div className="max-w-[1400px] mx-auto px-6 h-12 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-navy-700 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/properties" className="hover:text-navy-700 transition-colors">Properties</Link>
          <ChevronRight size={12} />
          <span className="text-navy-700 font-medium truncate">{property.title}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-6">
        {/* ─── Back button ─────────────────────────────────── */}
        <Link
          href="/properties"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-navy-900 transition-colors mb-5"
        >
          <ArrowLeft size={14} />
          Back to listings
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ─── Left: Images + Details ─────────────────────── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Image Gallery */}
            <div className="grid grid-cols-3 gap-2 rounded-2xl overflow-hidden h-80 sm:h-96">
              <div className="col-span-2 relative">
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold", property.listingType === "sale" ? "bg-emerald-600 text-white" : "bg-blue-600 text-white")}>
                    For {property.listingType === "sale" ? "Sale" : "Rent"}
                  </span>
                  {property.isFeatured && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-400 text-amber-900">
                      ★ Featured
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-rows-2 gap-2">
                {property.images[1] ? (
                  <div className="relative">
                    <Image src={property.images[1]} alt="" fill className="object-cover" />
                  </div>
                ) : (
                  <div className="bg-cream-200 flex items-center justify-center">
                    <Layers size={20} className="text-gray-400" />
                  </div>
                )}
                <div className="relative bg-navy-900 flex items-center justify-center cursor-pointer group">
                  {property.images[2] ? (
                    <Image src={property.images[2] ?? property.images[0]} alt="" fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                  ) : null}
                  <span className="relative text-white text-sm font-semibold z-10">
                    +{property.images.length} photos
                  </span>
                </div>
              </div>
            </div>

            {/* Title row */}
            <div className="card p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={cn("px-2.5 py-0.5 rounded text-xs font-medium border capitalize", typeColor)}>
                      {property.propertyType}
                    </span>
                    {property.tags?.map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 rounded text-xs font-medium bg-gold-50 text-gold-700 border border-gold-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h1 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 leading-tight">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-500">
                    <MapPin size={13} />
                    {property.address}, {property.city}, {property.state}
                    {property.pincode && ` — ${property.pincode}`}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-display text-3xl font-bold text-navy-900">{price}</p>
                  {property.pricePerSqft && (
                    <p className="text-sm text-gray-400">₹{property.pricePerSqft.toLocaleString()}/sq.ft</p>
                  )}
                </div>
              </div>

              {/* Key specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-cream-200">
                {property.bedrooms !== undefined && (
                  <div className="text-center p-3 bg-cream-50 rounded-xl">
                    <BedDouble size={18} className="text-navy-700 mx-auto mb-1" />
                    <p className="font-bold text-sm text-navy-900">{property.bedrooms}</p>
                    <p className="text-xs text-gray-400">Bedrooms</p>
                  </div>
                )}
                {property.bathrooms !== undefined && (
                  <div className="text-center p-3 bg-cream-50 rounded-xl">
                    <Bath size={18} className="text-navy-700 mx-auto mb-1" />
                    <p className="font-bold text-sm text-navy-900">{property.bathrooms}</p>
                    <p className="text-xs text-gray-400">Bathrooms</p>
                  </div>
                )}
                <div className="text-center p-3 bg-cream-50 rounded-xl">
                  <Square size={18} className="text-navy-700 mx-auto mb-1" />
                  <p className="font-bold text-sm text-navy-900">{area}</p>
                  <p className="text-xs text-gray-400">Area</p>
                </div>
                {property.parking !== undefined && (
                  <div className="text-center p-3 bg-cream-50 rounded-xl">
                    <Car size={18} className="text-navy-700 mx-auto mb-1" />
                    <p className="font-bold text-sm text-navy-900">{property.parking}</p>
                    <p className="text-xs text-gray-400">Parking</p>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 mt-4">
                <button className="btn-secondary flex-1 justify-center">
                  <Heart size={15} /> Save
                </button>
                <button className="btn-secondary flex-1 justify-center">
                  <Share2 size={15} /> Share
                </button>
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <div className="card p-5">
                <h2 className="font-display text-xl font-semibold text-navy-900 mb-3">
                  About this Property
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">{property.description}</p>
              </div>
            )}

            {/* Amenities */}
            <div className="card p-5">
              <h2 className="font-display text-xl font-semibold text-navy-900 mb-4">
                Amenities & Features
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2.5 text-sm text-navy-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-emerald-600" />
                    </div>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="card overflow-hidden">
              <div className="p-5 border-b border-cream-200">
                <h2 className="font-display text-xl font-semibold text-navy-900">Location</h2>
                <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
                  <MapPin size={13} className="text-gold-500" />
                  {property.address}
                </div>
              </div>
              <div className="h-56 bg-cream-200 flex items-center justify-center">
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <MapPin size={16} />
                  Map: {property.lat.toFixed(4)}, {property.lng.toFixed(4)}
                </p>
              </div>
            </div>
          </div>

          {/* ─── Right: Agent Card + Inquiry ─────────────────── */}
          <div className="space-y-4 lg:sticky lg:top-[112px] lg:self-start">
            {/* Agent Card */}
            <div className="card p-5">
              <div className="flex items-center gap-3 pb-4 border-b border-cream-200 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-cream-200">
                  <Image src={property.agent.avatar} alt={property.agent.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-navy-900">{property.agent.name}</p>
                    {property.agent.verified === "verified" && (
                      <BadgeCheck size={15} className="text-emerald-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">Verified Real Estate Agent</p>
                  {property.agent.rating && (
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={11} className="fill-amber-400 text-amber-400" />
                      <span className="text-xs font-semibold text-navy-700">
                        {property.agent.rating}
                      </span>
                      <span className="text-xs text-gray-400">
                        ({property.agent.reviewCount} reviews)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm text-navy-900">Send Inquiry</h3>
                <input type="text" placeholder="Your Name" className="input-base text-sm" />
                <input type="email" placeholder="Email Address" className="input-base text-sm" />
                <input type="tel" placeholder="Phone Number" className="input-base text-sm" />
                <textarea
                  rows={3}
                  placeholder="I'm interested in this property…"
                  className="input-base text-sm resize-none"
                  defaultValue={`Hi, I'm interested in "${property.title}". Please contact me.`}
                />
                <button className="btn-primary w-full justify-center">
                  <MessageCircle size={15} />
                  Send Message
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="btn-secondary justify-center text-xs"
                >
                  <Phone size={13} />
                  Call Agent
                </a>
                <button className="btn-secondary justify-center text-xs">
                  <Calendar size={13} />
                  Schedule Visit
                </button>
              </div>
            </div>

            {/* Trust badges */}
            <div className="card p-4 space-y-2.5">
              {[
                { icon: Shield, text: "Secure & confidential inquiry" },
                { icon: BadgeCheck, text: "RERA verified listing" },
                { icon: Building2, text: "Legal documentation support" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-xs text-gray-500">
                  <Icon size={13} className="text-emerald-500 flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Similar Properties ──────────────────────────── */}
        {similar.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-2xl font-bold text-navy-900">
                Similar Properties
              </h2>
              <Link href="/properties" className="text-sm font-semibold text-gold-600 hover:text-gold-700 transition-colors flex items-center gap-1">
                View all <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
