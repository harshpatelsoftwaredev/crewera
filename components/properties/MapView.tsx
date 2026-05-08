"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "@googlemaps/js-api-loader";
import {
  Maximize2,
  Minimize2,
  MapPin,
  BedDouble,
  Square,
  X,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Property } from "@/lib/types";
import { GOOGLE_MAPS_API_KEY, formatPrice, formatMapPrice, formatArea } from "@/lib/data";

interface MapViewProps {
  properties: Property[];
  highlightedId?: string | null;
  onPropertyHover?: (id: string | null) => void;
  className?: string;
}

export default function MapView({
  properties,
  highlightedId,
  onPropertyHover,
  className,
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<Map<string, google.maps.marker.AdvancedMarkerElement | google.maps.Marker>>(new Map());
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const loaderRef = useRef<Loader | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [mapError, setMapError] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: ["marker", "geometry"],
    });

    loaderRef.current = loader;

    loader
      .load()
      .then(async () => {
        if (!mapRef.current) return;

        const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;

        const mapInstance = new Map(mapRef.current, {
          center: { lat: 22.5, lng: 74.5 },
          zoom: 5.5,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER,
          },
          styles: MAP_STYLES,
          gestureHandling: "greedy",
        });

        mapInstanceRef.current = mapInstance;
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error("Maps failed to load", err);
        setMapError(true);
      });

    return () => {
      markersRef.current.forEach((m: any) => {
        if (m.map) m.map = null;
        else if (m.setMap) m.setMap(null);
      });
      markersRef.current.clear();
    };
  }, []);

  // Render markers when map is loaded or properties change
  useEffect(() => {
    if (!isLoaded || !mapInstanceRef.current) return;

    // Clear old markers
    markersRef.current.forEach((m: any) => {
      if (m.map !== undefined) m.map = null;
      else if (m.setMap) m.setMap(null);
    });
    markersRef.current.clear();

    // Close any open popup
    if (infoWindowRef.current) {
      infoWindowRef.current.close();
      infoWindowRef.current = null;
    }
    setSelectedProperty(null);

    properties.forEach((property) => {
      const pinEl = document.createElement("div");
      pinEl.className = "map-price-pin";
      pinEl.setAttribute("data-id", property.id);
      pinEl.textContent = formatMapPrice(property.price, property.priceUnit);
      pinEl.style.cssText = `
        background: #0A1628;
        color: white;
        padding: 5px 11px;
        border-radius: 20px;
        font-family: 'Outfit', sans-serif;
        font-size: 12px;
        font-weight: 600;
        box-shadow: 0 3px 12px rgba(10, 22, 40, 0.35);
        white-space: nowrap;
        cursor: pointer;
        transition: all 0.2s ease;
        border: 2px solid transparent;
        position: relative;
        user-select: none;
        transform-origin: bottom center;
      `;

      let marker: google.maps.Marker;
      try {
        marker = new google.maps.Marker({
          position: { lat: property.lat, lng: property.lng },
          map: mapInstanceRef.current!,
          icon: {
            url:
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(
                createPinSVG(
                  formatMapPrice(property.price, property.priceUnit),
                  property.isFeatured ? "#C9A255" : "#0A1628"
                )
              ),
            anchor: new google.maps.Point(40, 36),
          },
          title: property.title,
          zIndex: property.isFeatured ? 2 : 1,
        });

        // Click handler
        marker.addListener("click", () => {
          setSelectedProperty(property);
          onPropertyHover?.(property.id);

          // Pan map slightly up to show popup
          const pos = marker.getPosition();
          if (pos && mapInstanceRef.current) {
            const projection = mapInstanceRef.current.getProjection();
            if (projection) {
              const point = projection.fromLatLngToPoint(pos);
              if (point) {
                point.y -= 60 / Math.pow(2, mapInstanceRef.current.getZoom() || 5);
                const newLatLng = projection.fromPointToLatLng(point);
                if (newLatLng) {
                  mapInstanceRef.current.panTo({ lat: newLatLng.lat(), lng: pos.lng() });
                }
              }
            } else {
              mapInstanceRef.current.panTo({ lat: pos.lat(), lng: pos.lng() });
            }
          }
        });

        markersRef.current.set(property.id, marker as any);
      } catch (e) {
        // fallback to basic marker
      }
    });
  }, [isLoaded, properties, onPropertyHover]);

  // Highlight active marker
  useEffect(() => {
    markersRef.current.forEach((marker: any, id) => {
      const isActive = id === highlightedId;
      if (marker.setIcon) {
        const property = properties.find((p) => p.id === id);
        if (property) {
          marker.setIcon({
            url:
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(
                createPinSVG(
                  formatMapPrice(property.price, property.priceUnit),
                  isActive ? "#C9A255" : property.isFeatured ? "#C9A255" : "#0A1628",
                  isActive
                )
              ),
            anchor: new google.maps.Point(40, 36),
          });
          marker.setZIndex(isActive ? 10 : property.isFeatured ? 2 : 1);
        }
      }
    });
  }, [highlightedId, properties]);

  // Map click closes popup
  const handleMapClick = useCallback(() => {
    setSelectedProperty(null);
    onPropertyHover?.(null);
  }, [onPropertyHover]);

  useEffect(() => {
    if (!isLoaded || !mapInstanceRef.current) return;
    const listener = mapInstanceRef.current.addListener("click", handleMapClick);
    return () => google.maps.event.removeListener(listener);
  }, [isLoaded, handleMapClick]);

  return (
    <div
      className={cn(
        "relative bg-cream-100 rounded-2xl overflow-hidden border border-cream-200",
        isFullscreen && "fixed inset-0 z-50 rounded-none",
        className
      )}
    >
      {/* Map */}
      <div ref={mapRef} className="absolute inset-0" />

      {/* Loading overlay */}
      {!isLoaded && !mapError && (
        <div className="absolute inset-0 bg-cream-100 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-navy-900 border-t-gold-500 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-gray-500 font-medium">Loading map…</p>
          </div>
        </div>
      )}

      {/* Error fallback */}
      {mapError && (
        <div className="absolute inset-0 bg-cream-100 flex items-center justify-center z-10">
          <div className="text-center p-6">
            <MapPin size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500 mb-1">Map unavailable</p>
            <p className="text-xs text-gray-400">Check your internet connection</p>
          </div>
        </div>
      )}

      {/* Controls overlay */}
      {isLoaded && (
        <>
          {/* Property count badge */}
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-card px-3 py-1.5 flex items-center gap-1.5 text-sm font-semibold text-navy-900 border border-cream-200">
              <MapPin size={13} className="text-gold-500" />
              {properties.length} propert{properties.length === 1 ? "y" : "ies"}
            </div>
          </div>

          {/* Fullscreen toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/95 backdrop-blur-sm rounded-lg shadow-card border border-cream-200 flex items-center justify-center text-navy-600 hover:text-navy-900 hover:bg-white transition-all"
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </>
      )}

      {/* Property popup card */}
      {selectedProperty && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-72 animate-fade-up">
          <div className="bg-white rounded-2xl shadow-card-hover border border-cream-200 overflow-hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProperty(null);
                onPropertyHover?.(null);
              }}
              className="absolute top-2.5 right-2.5 z-10 w-6 h-6 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-white transition-all shadow-sm"
            >
              <X size={12} />
            </button>

            {/* Image */}
            <div className="relative h-36">
              <Image
                src={selectedProperty.images[0]}
                alt={selectedProperty.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              {/* Badge */}
              <div className="absolute top-2 left-2">
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-semibold",
                    selectedProperty.listingType === "sale"
                      ? "bg-emerald-600/90 text-white"
                      : "bg-blue-600/90 text-white"
                  )}
                >
                  {selectedProperty.listingType === "sale" ? "Sale" : "Rent"}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-sm font-semibold text-navy-900 line-clamp-2 leading-snug flex-1">
                  {selectedProperty.title}
                </h3>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-navy-900">
                    {formatPrice(selectedProperty.price, selectedProperty.priceUnit)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                <MapPin size={10} />
                <span className="truncate">
                  {selectedProperty.locality}, {selectedProperty.city}
                </span>
              </div>

              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                {selectedProperty.bedrooms !== undefined && (
                  <span className="flex items-center gap-1">
                    <BedDouble size={11} />
                    {selectedProperty.bedrooms} Bed
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Square size={11} />
                  {formatArea(selectedProperty.area, selectedProperty.areaUnit)}
                </span>
              </div>

              <Link
                href={`/properties/${selectedProperty.slug}`}
                className="mt-3 flex items-center justify-center gap-1.5 w-full py-2 bg-navy-900 text-white text-xs font-semibold rounded-lg hover:bg-navy-800 transition-colors"
              >
                <ExternalLink size={12} />
                View Property
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Helper: SVG Pin ─────────────────────────────────────────────────────────

function createPinSVG(label: string, bgColor: string, isActive = false): string {
  const textColor = "#FFFFFF";
  const width = Math.max(label.length * 7.5 + 20, 60);
  const height = 36;
  const rx = height / 2;
  const shadowOpacity = isActive ? 0.5 : 0.3;

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height + 7}">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="${bgColor}" flood-opacity="${shadowOpacity}"/>
    </filter>
  </defs>
  <g filter="url(#shadow)">
    <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="${rx}" fill="${bgColor}" ${isActive ? `stroke="white" stroke-width="2"` : ""}/>
    <text x="${width / 2}" y="${height / 2 + 5}" text-anchor="middle" font-family="Outfit, sans-serif" font-size="12" font-weight="600" fill="${textColor}">${label}</text>
  </g>
  <polygon points="${width / 2 - 4},${height} ${width / 2 + 4},${height} ${width / 2},${height + 6}" fill="${bgColor}"/>
</svg>`.trim();
}

// ─── Map Styles ───────────────────────────────────────────────────────────────

const MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#f5f3ef" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#0A1628" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#fdfcfa" }] },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#d8d3c8" }],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [{ color: "#8a8070" }],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [{ color: "#dfd9cc" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#e8e2d8" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#8a7c6b" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [{ color: "#c9dfc4" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#f0ece4" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#e8e0d4" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#d8d0c4" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#e8e2d8" }],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [{ color: "#b0cfe0" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#5a8fa8" }],
  },
];
