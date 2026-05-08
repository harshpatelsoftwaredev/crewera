"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  BedDouble,
  Bath,
  Square,
  Car,
  MapPin,
  Star,
  BadgeCheck,
  ArrowRight,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Property } from "@/lib/types";
import { formatPrice, formatArea, getPropertyTypeBadgeColor } from "@/lib/data";

interface PropertyCardProps {
  property: Property;
  view?: "grid" | "list";
  isHighlighted?: boolean;
}

export default function PropertyCard({
  property,
  view = "grid",
  isHighlighted = false,
}: PropertyCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const price = formatPrice(property.price, property.priceUnit);
  const area = formatArea(property.area, property.areaUnit);
  const typeColor = getPropertyTypeBadgeColor(property.propertyType);

  if (view === "list") {
    return (
      <Link href={`/properties/${property.slug}`}>
        <div
          className={cn(
            "card card-hover flex gap-0 overflow-hidden cursor-pointer group",
            isHighlighted && "ring-2 ring-gold-400"
          )}
        >
          {/* Image */}
          <div className="relative w-64 flex-shrink-0 property-img-wrap">
            <div className={cn("absolute inset-0 skeleton", imageLoaded && "hidden")} />
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover"
              onLoad={() => setImageLoaded(true)}
            />
            {/* Badges overlay */}
            <div className="absolute top-3 left-3 flex gap-1.5">
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-semibold",
                  property.listingType === "sale"
                    ? "bg-emerald-600 text-white"
                    : "bg-blue-600 text-white"
                )}
              >
                For {property.listingType === "sale" ? "Sale" : "Rent"}
              </span>
              {property.isFeatured && (
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-400 text-amber-900">
                  ★ Featured
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn("px-2 py-0.5 rounded text-xs font-medium border capitalize", typeColor)}>
                    {property.propertyType}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-navy-900 line-clamp-1 group-hover:text-gold-600 transition-colors">
                  {property.title}
                </h3>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500">
                  <MapPin size={11} />
                  <span>
                    {property.locality}, {property.city}
                  </span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-lg font-bold text-navy-900">{price}</p>
                {property.pricePerSqft && (
                  <p className="text-xs text-gray-400">
                    ₹{property.pricePerSqft.toLocaleString()}/sq.ft
                  </p>
                )}
              </div>
            </div>

            {/* Specs */}
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
              {property.bedrooms !== undefined && (
                <span className="flex items-center gap-1.5">
                  <BedDouble size={13} className="text-gray-400" />
                  {property.bedrooms} Bed
                </span>
              )}
              {property.bathrooms !== undefined && (
                <span className="flex items-center gap-1.5">
                  <Bath size={13} className="text-gray-400" />
                  {property.bathrooms} Bath
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Square size={13} className="text-gray-400" />
                {area}
              </span>
              {property.parking !== undefined && (
                <span className="flex items-center gap-1.5">
                  <Car size={13} className="text-gray-400" />
                  {property.parking}P
                </span>
              )}
            </div>

            {/* Agent row */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-cream-200">
              <div className="flex items-center gap-2">
                <div className="relative w-6 h-6 rounded-full overflow-hidden bg-cream-200">
                  <Image
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-xs text-gray-600 font-medium">{property.agent.name}</span>
                {property.agent.verified === "verified" && (
                  <BadgeCheck size={12} className="text-emerald-500" />
                )}
              </div>
              <span className="text-xs text-gold-500 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                View Details <ArrowRight size={11} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/properties/${property.slug}`}>
      <div
        className={cn(
          "card card-hover overflow-hidden cursor-pointer group h-full flex flex-col",
          isHighlighted && "ring-2 ring-gold-400 shadow-card-hover"
        )}
      >
        {/* Image */}
        <div className="relative h-52 property-img-wrap flex-shrink-0">
          <div className={cn("absolute inset-0 skeleton", imageLoaded && "hidden")} />
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover"
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, 400px"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm",
                property.listingType === "sale"
                  ? "bg-emerald-600/90 text-white"
                  : "bg-blue-600/90 text-white"
              )}
            >
              For {property.listingType === "sale" ? "Sale" : "Rent"}
            </span>
            {property.isFeatured && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-400/95 text-amber-900 flex items-center gap-1">
                ★ Featured
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className={cn(
              "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
              isWishlisted
                ? "bg-rose-500 text-white shadow-md"
                : "bg-white/90 backdrop-blur-sm text-gray-500 hover:bg-white hover:text-rose-500"
            )}
          >
            <Heart size={14} fill={isWishlisted ? "currentColor" : "none"} />
          </button>

          {/* Photo count */}
          {property.images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
              <Layers size={10} />
              +{property.images.length - 1}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          {/* Type + Price */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className={cn("px-2 py-0.5 rounded text-xs font-medium border capitalize", typeColor)}>
              {property.propertyType}
            </span>
            <div className="text-right">
              <p className="text-base font-bold text-navy-900 leading-tight">{price}</p>
              {property.pricePerSqft && (
                <p className="text-xs text-gray-400">
                  ₹{property.pricePerSqft.toLocaleString()}/sq.ft
                </p>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className="font-display text-lg font-semibold text-navy-900 line-clamp-2 leading-snug group-hover:text-gold-600 transition-colors duration-200">
            {property.title}
          </h3>

          {/* Address */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-500">
            <MapPin size={11} className="flex-shrink-0" />
            <span className="truncate">
              {property.locality}, {property.city}
            </span>
          </div>

          {/* Specs */}
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-3">
            {property.bedrooms !== undefined && (
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <BedDouble size={12} className="text-gray-400" />
                {property.bedrooms} Bed
              </span>
            )}
            {property.bathrooms !== undefined && (
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <Bath size={12} className="text-gray-400" />
                {property.bathrooms} Bath
              </span>
            )}
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <Square size={12} className="text-gray-400" />
              {area}
            </span>
            {property.parking !== undefined && (
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <Car size={12} className="text-gray-400" />
                {property.parking}P
              </span>
            )}
          </div>

          {/* Amenity chips */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {property.amenities.slice(0, 3).map((a) => (
              <span
                key={a}
                className="text-xs px-2 py-0.5 rounded-full bg-cream-100 text-gray-500 border border-cream-300"
              >
                {a}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-cream-100 text-gray-500 border border-cream-300">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>

          {/* Agent row */}
          <div className="flex items-center justify-between mt-auto pt-3.5 border-t border-cream-200 mt-4">
            <div className="flex items-center gap-2">
              <div className="relative w-7 h-7 rounded-full overflow-hidden bg-cream-200 flex-shrink-0">
                <Image
                  src={property.agent.avatar}
                  alt={property.agent.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium text-gray-700 truncate">{property.agent.name}</span>
                  {property.agent.verified === "verified" && (
                    <BadgeCheck size={11} className="text-emerald-500 flex-shrink-0" />
                  )}
                </div>
                {property.agent.rating && (
                  <div className="flex items-center gap-0.5 mt-0">
                    <Star size={9} className="text-amber-400 fill-amber-400" />
                    <span className="text-[10px] text-gray-400">{property.agent.rating}</span>
                  </div>
                )}
              </div>
            </div>
            <span className="text-xs font-semibold text-navy-900 flex items-center gap-1 group-hover:text-gold-600 group-hover:gap-2 transition-all duration-200">
              View Details
              <ArrowRight size={11} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
