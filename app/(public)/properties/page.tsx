"use client";

import { useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  LayoutGrid,
  List,
  SlidersHorizontal,
  MapIcon,
  X,
  ChevronDown,
  ArrowUpDown,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { PropertyFilters, SortOption, ViewMode } from "@/lib/types";
import { MOCK_PROPERTIES } from "@/lib/data";
import FilterSidebar from "@/components/properties/FilterSidebar";
import PropertyCard from "@/components/properties/PropertyCard";

// Dynamically import map to avoid SSR issues
const MapView = dynamic(
  () => import("@/components/properties/MapView"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-cream-100 rounded-2xl">
        <Loader2 className="animate-spin text-navy-400" size={24} />
      </div>
    ),
  }
);

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "area-asc", label: "Area: Small to Large" },
  { value: "area-desc", label: "Area: Large to Small" },
];

const DEFAULT_FILTERS: PropertyFilters = {
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
};

export default function PropertiesPage() {
  const [filters, setFilters] = useState<PropertyFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showMap, setShowMap] = useState(true);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [highlightedPropertyId, setHighlightedPropertyId] = useState<string | null>(null);

  // ─── Filter Logic ─────────────────────────────────────────────────
  const filteredProperties = useMemo(() => {
    let result = [...MOCK_PROPERTIES];

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.locality.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q)
      );
    }

    // Listing type
    if (filters.listingType !== "all") {
      result = result.filter((p) => p.listingType === filters.listingType);
    }

    // City
    if (filters.city) {
      result = result.filter((p) =>
        p.city.toLowerCase() === filters.city.toLowerCase()
      );
    }

    // Property type
    if (filters.propertyType) {
      result = result.filter((p) => p.propertyType === filters.propertyType);
    }

    // Bedrooms
    if (filters.bedrooms) {
      const bedsFilter = filters.bedrooms;
      if (bedsFilter === "5+") {
        result = result.filter((p) => (p.bedrooms ?? 0) >= 5);
      } else {
        result = result.filter((p) => p.bedrooms === parseInt(bedsFilter));
      }
    }

    // Price (convert to crores for comparison)
    result = result.filter((p) => {
      let priceInCr = p.price;
      if (p.priceUnit === "l") priceInCr = p.price / 100;
      if (p.priceUnit === "k") priceInCr = p.price / 10000;
      return priceInCr >= filters.minPrice && priceInCr <= filters.maxPrice;
    });

    // Amenities
    if (filters.amenities.length > 0) {
      result = result.filter((p) =>
        filters.amenities.every((a) => p.amenities.includes(a))
      );
    }

    // Verified
    if (filters.verified) {
      result = result.filter((p) => p.agent.verified === "verified");
    }

    // Featured
    if (filters.featured) {
      result = result.filter((p) => p.isFeatured);
    }

    // Sort
    result.sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "area-asc":
          return a.area - b.area;
        case "area-desc":
          return b.area - a.area;
        case "oldest":
          return new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime();
        case "newest":
        default:
          return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      }
    });

    return result;
  }, [filters, sort]);

  const handlePropertyHover = useCallback((id: string | null) => {
    setHighlightedPropertyId(id);
  }, []);

  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Sort";

  return (
    <div className="min-h-screen bg-cream-50">
      {/* ─── Page Header ─────────────────────────────────────────────── */}
      <div className="bg-white border-b border-cream-200 sticky top-16 z-30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 gap-3">
            {/* Left: title + count */}
            <div className="flex items-center gap-3">
              <div>
                <h1 className="font-display text-xl font-semibold text-navy-900">
                  All Properties
                </h1>
              </div>
              <span className="text-xs text-gray-400 font-medium hidden sm:block">
                {filteredProperties.length} propert
                {filteredProperties.length === 1 ? "y" : "ies"} found
              </span>
            </div>

            {/* Right: controls */}
            <div className="flex items-center gap-2">
              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-all",
                    showSortDropdown
                      ? "border-navy-300 bg-navy-50 text-navy-900"
                      : "border-cream-300 bg-white text-navy-700 hover:border-navy-200"
                  )}
                >
                  <ArrowUpDown size={13} />
                  <span className="hidden sm:inline">{currentSortLabel}</span>
                  <ChevronDown size={12} className={cn("transition-transform", showSortDropdown && "rotate-180")} />
                </button>
                {showSortDropdown && (
                  <div className="absolute top-full right-0 mt-1 w-52 bg-white rounded-xl shadow-card-hover border border-cream-200 py-1.5 z-40 animate-fade-in">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSort(opt.value);
                          setShowSortDropdown(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-2 text-xs transition-colors",
                          sort === opt.value
                            ? "bg-navy-900 text-white font-semibold"
                            : "text-navy-700 hover:bg-cream-100"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* View mode */}
              <div className="hidden sm:flex items-center rounded-lg border border-cream-300 overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 transition-colors",
                    viewMode === "grid"
                      ? "bg-navy-900 text-white"
                      : "bg-white text-gray-500 hover:bg-cream-100"
                  )}
                  aria-label="Grid view"
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2 transition-colors",
                    viewMode === "list"
                      ? "bg-navy-900 text-white"
                      : "bg-white text-gray-500 hover:bg-cream-100"
                  )}
                  aria-label="List view"
                >
                  <List size={15} />
                </button>
              </div>

              {/* Mobile filter button */}
              <button
                onClick={() => setShowFiltersMobile(true)}
                className="lg:hidden btn-secondary text-xs px-3 py-2 flex items-center gap-1.5"
              >
                <SlidersHorizontal size={13} />
                Filters
              </button>

              {/* Toggle Map */}
              <button
                onClick={() => setShowMap(!showMap)}
                className={cn(
                  "hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all border",
                  showMap
                    ? "bg-navy-900 text-white border-navy-900"
                    : "bg-white text-navy-700 border-cream-300 hover:border-navy-200"
                )}
              >
                <MapIcon size={13} />
                {showMap ? "Hide Map" : "Show Map"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Content ─────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-5">
        <div className="flex gap-4">
          {/* ─── Filter Sidebar (Desktop) ─────────────────────── */}
          <div className="hidden lg:block w-72 flex-shrink-0 sticky top-[112px] self-start max-h-[calc(100vh-128px)] overflow-hidden flex flex-col">
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              resultCount={filteredProperties.length}
            />
          </div>

          {/* ─── Map + Cards Area ─────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {showMap ? (
              /* Map visible: side-by-side layout */
              <div className="flex gap-4 h-[calc(100vh-140px)]">
                {/* Map */}
                <div className="flex-1 min-w-0 sticky top-[112px] h-[calc(100vh-140px)]">
                  <MapView
                    properties={filteredProperties}
                    highlightedId={highlightedPropertyId}
                    onPropertyHover={handlePropertyHover}
                    className="h-full"
                  />
                </div>

                {/* Cards (scrollable column) */}
                <div className="w-[420px] flex-shrink-0 overflow-y-auto scroll-hide pr-0.5">
                  {filteredProperties.length === 0 ? (
                    <EmptyState onReset={() => setFilters(DEFAULT_FILTERS)} />
                  ) : (
                    <div className="flex flex-col gap-4 pb-6">
                      {filteredProperties.map((property) => (
                        <div
                          key={property.id}
                          onMouseEnter={() => handlePropertyHover(property.id)}
                          onMouseLeave={() => handlePropertyHover(null)}
                        >
                          <PropertyCard
                            property={property}
                            view="grid"
                            isHighlighted={highlightedPropertyId === property.id}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Map hidden: full-width grid */
              <>
                {filteredProperties.length === 0 ? (
                  <EmptyState onReset={() => setFilters(DEFAULT_FILTERS)} />
                ) : (
                  <div
                    className={cn(
                      "gap-4",
                      viewMode === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                        : "flex flex-col"
                    )}
                  >
                    {filteredProperties.map((property) => (
                      <div
                        key={property.id}
                        onMouseEnter={() => handlePropertyHover(property.id)}
                        onMouseLeave={() => handlePropertyHover(null)}
                      >
                        <PropertyCard
                          property={property}
                          view={viewMode}
                          isHighlighted={highlightedPropertyId === property.id}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* ─── Mobile Filter Drawer ──────────────────────────────────────── */}
      {showFiltersMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowFiltersMobile(false)}
          />
          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl animate-slide-in flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-cream-200">
              <h2 className="font-semibold text-navy-900 flex items-center gap-2">
                <SlidersHorizontal size={16} />
                Filters
              </h2>
              <button
                onClick={() => setShowFiltersMobile(false)}
                className="p-1.5 rounded-lg hover:bg-cream-100 text-gray-500 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <FilterSidebar
                filters={filters}
                onFiltersChange={(f) => {
                  setFilters(f);
                  setShowFiltersMobile(false);
                }}
                resultCount={filteredProperties.length}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-cream-200 flex items-center justify-center mb-4">
        <MapIcon size={24} className="text-gray-400" />
      </div>
      <h3 className="font-display text-xl font-semibold text-navy-900 mb-2">
        No properties found
      </h3>
      <p className="text-sm text-gray-500 mb-5 max-w-xs">
        Try adjusting your filters or expanding your search area.
      </p>
      <button onClick={onReset} className="btn-primary">
        Clear all filters
      </button>
    </div>
  );
}
