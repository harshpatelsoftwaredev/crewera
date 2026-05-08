// ─── Property Types ──────────────────────────────────────────────────────────

export type ListingType = "sale" | "rent";
export type PropertyType =
  | "residential"
  | "commercial"
  | "agricultural"
  | "plot"
  | "villa"
  | "apartment"
  | "penthouse"
  | "studio";
export type PropertyStatus = "active" | "sold" | "rented" | "pending";
export type VerificationStatus = "verified" | "unverified" | "pending";

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  verified: VerificationStatus;
  phone?: string;
  rating?: number;
  reviewCount?: number;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  description?: string;
  listingType: ListingType;
  propertyType: PropertyType;
  status: PropertyStatus;
  isFeatured?: boolean;
  price: number;
  priceUnit: "cr" | "l" | "k" | "month";
  pricePerSqft?: number;
  area: number;
  areaUnit: "sqft" | "sqm" | "acre" | "gaj";
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  floor?: number;
  totalFloors?: number;
  address: string;
  locality: string;
  city: string;
  state: string;
  pincode?: string;
  lat: number;
  lng: number;
  images: string[];
  amenities: string[];
  agent: Agent;
  postedAt: string;
  tags?: string[];
}

// ─── Filter Types ─────────────────────────────────────────────────────────────

export interface PropertyFilters {
  search: string;
  listingType: "all" | "sale" | "rent";
  city: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  bedrooms: string;
  bathrooms: string;
  amenities: string[];
  verified: boolean;
  featured: boolean;
}

export type SortOption =
  | "newest"
  | "oldest"
  | "price-asc"
  | "price-desc"
  | "area-asc"
  | "area-desc";

export type ViewMode = "grid" | "list";
