"use client";

import { useState } from "react";
import {
  Search,
  X,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { PropertyFilters } from "@/lib/types";
import { INDIAN_CITIES, AMENITIES_LIST } from "@/lib/data";

interface FilterSidebarProps {
  filters: PropertyFilters;
  onFiltersChange: (filters: PropertyFilters) => void;
  resultCount: number;
}

const PROPERTY_TYPES = [
  { value: "", label: "All Types" },
  { value: "residential", label: "Residential" },
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "penthouse", label: "Penthouse" },
  { value: "commercial", label: "Commercial" },
  { value: "plot", label: "Plot" },
  { value: "agricultural", label: "Agricultural" },
  { value: "studio", label: "Studio" },
];

const BEDROOM_OPTIONS = ["Any", "1", "2", "3", "4", "5+"];

type SectionKey = "listing" | "city" | "type" | "price" | "area" | "beds" | "amenities";

export default function FilterSidebar({
  filters,
  onFiltersChange,
  resultCount,
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    listing: true,
    city: true,
    type: true,
    price: false,
    area: false,
    beds: false,
    amenities: false,
  });

  function toggleSection(section: SectionKey) {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  }

  function update(partial: Partial<PropertyFilters>) {
    onFiltersChange({ ...filters, ...partial });
  }

  function resetFilters() {
    onFiltersChange({
      search: "",
      listingType: "all",
      city: "",
      propertyType: "",
      minPrice: 0,
      maxPrice: 50,
      minArea: 0,
      maxArea: 50000,
      bedrooms: "",
      bathrooms: "",
      amenities: [],
      verified: false,
      featured: false,
    });
  }

  const hasActiveFilters =
    filters.search ||
    filters.listingType !== "all" ||
    filters.city ||
    filters.propertyType ||
    filters.bedrooms ||
    filters.amenities.length > 0 ||
    filters.verified ||
    filters.featured;

  return (
    <aside className="w-full flex flex-col bg-white rounded-2xl border border-cream-200 shadow-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-cream-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={15} className="text-navy-700" />
          <span className="font-semibold text-sm text-navy-900">Filters</span>
          {hasActiveFilters && (
            <span className="w-5 h-5 rounded-full bg-gold-500 text-white text-xs flex items-center justify-center font-bold">
              ✓
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-navy-700 transition-colors"
          >
            <RotateCcw size={11} />
            Reset
          </button>
        )}
      </div>

      <div className="overflow-y-auto flex-1">
        {/* ─── Search ──────────────────────────────────────── */}
        <div className="px-4 py-3.5 border-b border-cream-200">
          <p className="text-xs font-semibold tracking-[0.08em] uppercase text-gray-400 mb-2.5">
            Search
          </p>
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Title, locality..."
              value={filters.search}
              onChange={(e) => update({ search: e.target.value })}
              className="input-base pl-8 pr-8 text-xs py-2"
            />
            {filters.search && (
              <button
                onClick={() => update({ search: "" })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        {/* ─── Listing Type ─────────────────────────────────── */}
        <FilterSection
          label="Listing Type"
          sectionKey="listing"
          open={openSections.listing}
          onToggle={() => toggleSection("listing")}
        >
          <div className="flex gap-1.5">
            {(["all", "sale", "rent"] as const).map((type) => (
              <button
                key={type}
                onClick={() => update({ listingType: type })}
                className={cn(
                  "flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize",
                  filters.listingType === type
                    ? "bg-navy-900 text-white shadow-sm"
                    : "bg-cream-100 text-navy-700 hover:bg-cream-200"
                )}
              >
                {type === "all" ? "All" : type === "sale" ? "Buy" : "Rent"}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* ─── City ────────────────────────────────────────── */}
        <FilterSection
          label="City"
          sectionKey="city"
          open={openSections.city}
          onToggle={() => toggleSection("city")}
        >
          <div className="relative">
            <select
              value={filters.city}
              onChange={(e) => update({ city: e.target.value })}
              className="input-base text-xs py-2 pr-8 appearance-none"
            >
              <option value="">All Cities</option>
              {INDIAN_CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </FilterSection>

        {/* ─── Property Type ────────────────────────────────── */}
        <FilterSection
          label="Property Type"
          sectionKey="type"
          open={openSections.type}
          onToggle={() => toggleSection("type")}
        >
          <div className="space-y-0.5">
            {PROPERTY_TYPES.map((pt) => (
              <button
                key={pt.value}
                onClick={() => update({ propertyType: pt.value })}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-xs transition-all",
                  filters.propertyType === pt.value
                    ? "bg-navy-900 text-white font-semibold"
                    : "text-navy-700 hover:bg-cream-100"
                )}
              >
                {pt.label}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* ─── Price Range ──────────────────────────────────── */}
        <FilterSection
          label="Price Range"
          sectionKey="price"
          open={openSections.price}
          onToggle={() => toggleSection("price")}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>₹{filters.minPrice} Cr</span>
              <span>₹{filters.maxPrice} Cr</span>
            </div>
            <div className="relative h-1.5 bg-cream-200 rounded-full">
              <div
                className="absolute h-full bg-navy-900 rounded-full"
                style={{
                  left: `${(filters.minPrice / 50) * 100}%`,
                  right: `${100 - (filters.maxPrice / 50) * 100}%`,
                }}
              />
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={0.5}
              value={filters.maxPrice}
              onChange={(e) => update({ maxPrice: parseFloat(e.target.value) })}
              className="w-full"
            />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-gray-400 mb-1 block">Min (₹ Cr)</label>
                <input
                  type="number"
                  min={0}
                  max={filters.maxPrice}
                  value={filters.minPrice}
                  onChange={(e) => update({ minPrice: parseFloat(e.target.value) || 0 })}
                  className="input-base text-xs py-1.5"
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-400 mb-1 block">Max (₹ Cr)</label>
                <input
                  type="number"
                  min={filters.minPrice}
                  max={100}
                  value={filters.maxPrice}
                  onChange={(e) => update({ maxPrice: parseFloat(e.target.value) || 50 })}
                  className="input-base text-xs py-1.5"
                />
              </div>
            </div>
          </div>
        </FilterSection>

        {/* ─── Bedrooms ─────────────────────────────────────── */}
        <FilterSection
          label="Bedrooms"
          sectionKey="beds"
          open={openSections.beds}
          onToggle={() => toggleSection("beds")}
        >
          <div className="flex flex-wrap gap-1.5">
            {BEDROOM_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => update({ bedrooms: opt === "Any" ? "" : opt })}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                  (filters.bedrooms === opt || (opt === "Any" && !filters.bedrooms))
                    ? "bg-navy-900 text-white border-navy-900"
                    : "border-cream-300 text-navy-700 hover:border-navy-300 bg-white"
                )}
              >
                {opt === "Any" ? "Any" : `${opt} BHK`}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* ─── Amenities ────────────────────────────────────── */}
        <FilterSection
          label="Amenities"
          sectionKey="amenities"
          open={openSections.amenities}
          onToggle={() => toggleSection("amenities")}
        >
          <div className="grid grid-cols-2 gap-1.5">
            {AMENITIES_LIST.slice(0, 12).map((amenity) => {
              const checked = filters.amenities.includes(amenity);
              return (
                <label
                  key={amenity}
                  className={cn(
                    "flex items-center gap-1.5 text-xs cursor-pointer px-2 py-1.5 rounded-lg transition-all",
                    checked ? "bg-navy-50 text-navy-900" : "text-gray-600 hover:bg-cream-100"
                  )}
                >
                  <div
                    className={cn(
                      "w-3.5 h-3.5 rounded flex items-center justify-center border flex-shrink-0 transition-all",
                      checked ? "bg-navy-900 border-navy-900" : "border-gray-300"
                    )}
                  >
                    {checked && (
                      <svg viewBox="0 0 10 8" className="w-2.5 h-2.5 text-white fill-white">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => {
                      update({
                        amenities: checked
                          ? filters.amenities.filter((a) => a !== amenity)
                          : [...filters.amenities, amenity],
                      });
                    }}
                  />
                  {amenity}
                </label>
              );
            })}
          </div>
        </FilterSection>

        {/* ─── Other Toggles ────────────────────────────────── */}
        <div className="px-4 py-3.5 border-b border-cream-200 space-y-2.5">
          <ToggleRow
            label="Verified only"
            checked={filters.verified}
            onChange={(v) => update({ verified: v })}
          />
          <ToggleRow
            label="Featured only"
            checked={filters.featured}
            onChange={(v) => update({ featured: v })}
          />
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-4 py-3.5 bg-cream-50 border-t border-cream-200">
        <button className="btn-primary w-full justify-center text-sm">
          Show {resultCount} Results
        </button>
      </div>
    </aside>
  );
}

// ─── Sub-Components ───────────────────────────────────────────────────────────

function FilterSection({
  label,
  sectionKey,
  open,
  onToggle,
  children,
}: {
  label: string;
  sectionKey: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-cream-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-cream-50 transition-colors"
      >
        <span className="text-xs font-semibold tracking-[0.08em] uppercase text-gray-500">
          {label}
        </span>
        {open ? (
          <ChevronUp size={13} className="text-gray-400" />
        ) : (
          <ChevronDown size={13} className="text-gray-400" />
        )}
      </button>
      {open && <div className="px-4 pb-3.5">{children}</div>}
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="text-xs text-navy-700 group-hover:text-navy-900 transition-colors">
        {label}
      </span>
      <div
        onClick={() => onChange(!checked)}
        className={cn(
          "w-9 h-5 rounded-full transition-all duration-200 relative",
          checked ? "bg-navy-900" : "bg-gray-200"
        )}
      >
        <div
          className={cn(
            "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200",
            checked ? "left-[18px]" : "left-0.5"
          )}
        />
      </div>
    </label>
  );
}
