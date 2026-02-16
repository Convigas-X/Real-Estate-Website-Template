import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Home, 
  DollarSign, 
  Bed, 
  Bath, 
  Search, 
  Filter,
  X,
  SlidersHorizontal,
  Heart,
  Share2,
  Maximize2
} from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  stateFull: string;
  zipcode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
  lat: number;
  lng: number;
  status: 'For Sale' | 'Sold' | 'Pending';
  propertyType: string;
}

interface SearchFilters {
  location: string;
  minPrice: string;
  maxPrice: string;
  beds: string;
  baths: string;
  propertyType: string;
  status: string;
}

// Florida cities with coordinates
const FLORIDA_CITIES = [
  { name: 'Orlando', lat: 28.5384, lng: -81.3789, zip: '32801' },
  { name: 'Winter Park', lat: 28.5970, lng: -81.3517, zip: '32789' },
  { name: 'Windermere', lat: 28.4956, lng: -81.5348, zip: '34786' },
  { name: 'Winter Garden', lat: 28.5653, lng: -81.5862, zip: '34787' },
  { name: 'Oviedo', lat: 28.6700, lng: -81.2081, zip: '32765' },
  { name: 'Maitland', lat: 28.6278, lng: -81.3631, zip: '32751' },
  { name: 'Altamonte Springs', lat: 28.6611, lng: -81.3656, zip: '32701' },
  { name: 'Kissimmee', lat: 28.2920, lng: -81.4076, zip: '34747' },
  { name: 'Lake Mary', lat: 28.7589, lng: -81.3178, zip: '32746' },
  { name: 'Sanford', lat: 28.8027, lng: -81.2695, zip: '32771' },
  { name: 'Clermont', lat: 28.5494, lng: -81.7729, zip: '34711' },
  { name: 'Apopka', lat: 28.6761, lng: -81.5117, zip: '32703' },
  { name: 'Longwood', lat: 28.7031, lng: -81.3384, zip: '32750' },
  { name: 'Casselberry', lat: 28.6775, lng: -81.3278, zip: '32707' },
  { name: 'Ocoee', lat: 28.5692, lng: -81.5440, zip: '34761' },
  { name: 'Gotha', lat: 28.5278, lng: -81.5231, zip: '34734' },
  { name: 'Bay Lake', lat: 28.4206, lng: -81.5812, zip: '32836' },
  { name: 'Celebration', lat: 28.3153, lng: -81.5336, zip: '34747' },
  { name: 'Doctor Phillips', lat: 28.4494, lng: -81.4923, zip: '32819' },
  { name: 'Horizon West', lat: 28.4264, lng: -81.6176, zip: '34787' },
];

// Array of high-quality Unsplash property images
const propertyImages = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
  'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',
  'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800&q=80',
  'https://images.unsplash.com/photo-1500382017468-9049fee74a52?w=800&q=80',
  'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80',
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80',
  'https://images.unsplash.com/photo-1472224311454-fa056b7ad33e?w=800&q=80',
  'https://images.unsplash.com/photo-1513584684032-2979244001b6?w=800&q=80',
  'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=800&q=80',
  'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80',
  'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80',
  'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&q=80',
  'https://images.unsplash.com/photo-1512918766671-ad62eb27bd0f?w=800&q=80',
  'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&q=80',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
  'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
  'https://images.unsplash.com/photo-1501183007986-d0d080b147f9?w=800&q=80',
  'https://images.unsplash.com/photo-1430285561322-7808604715df?w=800&q=80',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
  'https://images.unsplash.com/photo-1505691722218-269ff0602029?w=800&q=80',
  'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?w=800&q=80',
  'https://images.unsplash.com/photo-1507089947368-19c1da977535?w=800&q=80',
  'https://images.unsplash.com/photo-1475855581690-80accde3ae2b?w=800&q=80',
  'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80',
  'https://images.unsplash.com/photo-1501862700950-18382cd41497?w=800&q=80',
  'https://images.unsplash.com/photo-1510254430417-513bc874814d?w=800&q=80',
  'https://images.unsplash.com/photo-1432303496139-c7b5bab9970d?w=800&q=80',
  'https://images.unsplash.com/photo-1472224311454-fa056b7ad33e?w=800&q=80',
  'https://images.unsplash.com/photo-1512915922686-57c11f9ad6b3?w=800&q=80',
  'https://images.unsplash.com/photo-1513584684032-2979244001b6?w=800&q=80',
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',
  'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800&q=80',
  'https://images.unsplash.com/photo-1500382017468-9049fee74a52?w=800&q=80',
  'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80',
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80',
  'https://images.unsplash.com/photo-1472224311454-fa056b7ad33e?w=800&q=80',
  'https://images.unsplash.com/photo-1513584684032-2979244001b6?w=800&q=80',
  'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=800&q=80',
];

const streetNames = [
  'Oak Street', 'Maple Avenue', 'Sunset Boulevard', 'Highland Drive', 'Park Road',
  'Lake Shore Drive', 'Palm Avenue', 'Magnolia Lane', 'Cypress Street', 'Birch Road',
  'Cedar Lane', 'Pine Street', 'Willow Avenue', 'Elm Drive', 'Spruce Road',
  'Lakeview Drive', 'Ocean Avenue', 'Beach Boulevard', 'Bay Street', 'River Road',
];

const generateAllProperties = (): Property[] => {
  const properties: Property[] = [];

  for (let i = 0; i < 100; i++) {
    const city = FLORIDA_CITIES[i % FLORIDA_CITIES.length];
    const street = streetNames[i % streetNames.length];
    const price = 250000 + (Math.random() * 400000);
    const beds = 2 + Math.floor(Math.random() * 4);
    const baths = 2 + Math.floor(Math.random() * 3);
    const sqft = 1200 + Math.floor(Math.random() * 2000);
    const lat = city.lat + (Math.random() - 0.5) * 0.1;
    const lng = city.lng + (Math.random() - 0.5) * 0.1;

    properties.push({
      id: `prop-${i}`,
      address: `${1000 + i * 11} ${street}`,
      city: city.name,
      state: 'FL',
      stateFull: 'Florida',
      zipcode: city.zip,
      price: Math.floor(price),
      bedrooms: beds,
      bathrooms: baths,
      sqft: sqft,
      image: propertyImages[i],
      lat: lat,
      lng: lng,
      status: i % 10 === 0 ? 'Pending' : i % 15 === 0 ? 'Sold' : 'For Sale',
      propertyType: ['Single Family', 'Condo', 'Townhouse', 'Estate'][i % 4]
    });
  }
  return properties;
};

const ALL_PROPERTIES = generateAllProperties();

const priceRanges = [
  { value: '0', label: 'No Min' },
  { value: '250000', label: '$250,000' },
  { value: '500000', label: '$500,000' },
  { value: '750000', label: '$750,000' },
  { value: '1000000', label: '$1,000,000' },
  { value: '2000000', label: '$2,000,000' },
];

const maxPriceRanges = [
  { value: '999999999', label: 'No Max' },
  { value: '500000', label: '$500,000' },
  { value: '1000000', label: '$1,000,000' },
  { value: '2000000', label: '$2,000,000' },
  { value: '5000000', label: '$5,000,000' },
  { value: '10000000', label: '$10,000,000' },
];

const bedOptions = [{ value: '0', label: 'Any' }, { value: '1', label: '1+' }, { value: '2', label: '2+' }, { value: '3', label: '3+' }, { value: '4', label: '4+' }, { value: '5', label: '5+' }];
const bathOptions = [{ value: '0', label: 'Any' }, { value: '1', label: '1+' }, { value: '2', label: '2+' }, { value: '3', label: '3+' }, { value: '4', label: '4+' }];

const PropertyCard = ({ property, isSelected, onClick }: { property: Property; isSelected: boolean; onClick: () => void }) => {
  const formatPrice = (price: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border ${isSelected ? 'border-accent ring-1 ring-accent' : 'border-gray-100'}`}
      onClick={onClick}
    >
      <div className="relative h-44 sm:h-48 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.address} 
          className="w-full h-full object-cover" 
          loading="lazy" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80';
          }}
        />
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase backdrop-blur-md ${property.status === 'For Sale' ? 'bg-emerald-500/90 text-white' : property.status === 'Pending' ? 'bg-amber-500/90 text-white' : 'bg-gray-800/90 text-white'}`}>
            {property.status}
          </span>
        </div>
        <div className="absolute bottom-2 left-2 text-white">
          <p className="font-serif text-lg font-medium tracking-tight drop-shadow-md">{formatPrice(property.price)}</p>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm text-gray-900 truncate">{property.address}</h3>
        <p className="text-gray-500 text-[10px] font-light">{property.city}, {property.state}</p>
        <div className="h-px w-full bg-gray-50 my-2" />
        <div className="flex items-center justify-between text-gray-600 text-[10px]">
          <div className="flex items-center gap-1"><Bed className="w-3 h-3 text-accent" /> <span>{property.bedrooms} bd</span></div>
          <div className="flex items-center gap-1"><Bath className="w-3 h-3 text-accent" /> <span>{property.bathrooms} ba</span></div>
          <div className="flex items-center gap-1"><Maximize2 className="w-3 h-3 text-accent" /> <span>{property.sqft.toLocaleString()} ft²</span></div>
        </div>
      </div>
    </motion.div>
  );
};

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(24);
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [filters, setFilters] = useState<SearchFilters>({
    location: searchParams.get('location') || searchParams.get('city') || '',
    minPrice: searchParams.get('lp') || '0',
    maxPrice: searchParams.get('hp') || '999999999',
    beds: searchParams.get('bd') || '0',
    baths: searchParams.get('ba') || '0',
    propertyType: 'all',
    status: 'all',
  });

  const filteredProperties = useMemo(() => {
    const searchTerm = filters.location.toLowerCase().trim();
    return ALL_PROPERTIES.filter(p => {
      const matchLoc = !searchTerm || 
        p.address.toLowerCase().includes(searchTerm) ||
        p.city.toLowerCase().includes(searchTerm) ||
        p.state.toLowerCase() === searchTerm ||
        p.stateFull.toLowerCase().includes(searchTerm) ||
        p.zipcode.includes(searchTerm);
      
      const matchPrice = p.price >= parseInt(filters.minPrice) && p.price <= parseInt(filters.maxPrice);
      const matchBeds = parseInt(filters.beds) === 0 || p.bedrooms >= parseInt(filters.beds);
      const matchBaths = parseInt(filters.baths) === 0 || p.bathrooms >= parseInt(filters.baths);
      
      return matchLoc && matchPrice && matchBeds && matchBaths;
    });
  }, [filters]);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      // Default focus on Florida
      mapRef.current = L.map(mapContainerRef.current, { zoomControl: false }).setView([27.6648, -81.5158], 7);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(mapRef.current);
      L.control.zoom({ position: 'topright' }).addTo(mapRef.current);
      markersLayerRef.current = L.layerGroup().addTo(mapRef.current);
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !markersLayerRef.current) return;
    markersLayerRef.current.clearLayers();

    // To prevent map lag, only render top 150 markers on map if many results
    const mapMarkers = filteredProperties.slice(0, 150);
    
    mapMarkers.forEach(p => {
      const marker = L.marker([p.lat, p.lng])
        .bindPopup(`
          <div style="font-family: 'Inter', sans-serif; width: 140px;">
            <div style="height: 80px; border-radius: 4px; overflow: hidden; margin-bottom: 4px;">
              <img src="${p.image}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <p style="font-weight: 700; font-size: 13px; margin: 0;">$${p.price.toLocaleString()}</p>
            <p style="margin: 0; font-size: 10px; color: #666;">${p.address}</p>
          </div>
        `);
      marker.on('click', () => setSelectedProperty(p.id));
      markersLayerRef.current?.addLayer(marker);
    });

    if (mapMarkers.length > 0) {
      const group = new L.FeatureGroup(markersLayerRef.current.getLayers() as L.Marker[]);
      mapRef.current.fitBounds(group.getBounds().pad(0.2), { animate: true });
    }
  }, [filteredProperties]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, [filters]);

  const handleFilterChange = useCallback((key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setVisibleCount(24); // Reset visible count on filter change
  }, []);

  const clearFilters = () => {
    setFilters({ location: '', minPrice: '0', maxPrice: '999999999', beds: '0', baths: '0', propertyType: 'all', status: 'all' });
    setSearchParams(new URLSearchParams());
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.location) count++;
    if (filters.minPrice !== '0') count++;
    if (filters.maxPrice !== '999999999') count++;
    if (filters.beds !== '0') count++;
    if (filters.baths !== '0') count++;
    return count;
  }, [filters]);

  return (
    <div className="h-screen overflow-hidden bg-white flex flex-col font-sans">
      <Navigation forceDark={true} />
      <div className="h-20 flex-none" />
      <div className="flex-none bg-white/95 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm z-30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-accent" />
              <input
                placeholder="Search City, State, or ZIP..."
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest hidden sm:inline-block">
                {filteredProperties.length} Properties Found
              </span>
              <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                <SheetTrigger asChild>
                  <Button className="h-9 rounded-full px-5 bg-gray-900 hover:bg-black text-white flex items-center gap-2 shadow-sm">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold">Filters</span>
                    {activeFiltersCount > 0 && <span className="ml-1 bg-accent text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px]">{activeFiltersCount}</span>}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-[350px] p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b">
                      <h3 className="text-lg font-serif">Filters</h3>
                      <button onClick={clearFilters} className="text-xs text-red-500 font-bold uppercase">Reset</button>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-gray-400">Min Price</label>
                        <Select value={filters.minPrice} onValueChange={(v) => handleFilterChange('minPrice', v)}>
                          <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>{priceRanges.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-gray-400">Max Price</label>
                        <Select value={filters.maxPrice} onValueChange={(v) => handleFilterChange('maxPrice', v)}>
                          <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>{maxPriceRanges.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase text-gray-400">Beds</label>
                          <Select value={filters.beds} onValueChange={(v) => handleFilterChange('beds', v)}>
                            <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
                            <SelectContent>{bedOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase text-gray-400">Baths</label>
                          <Select value={filters.baths} onValueChange={(v) => handleFilterChange('baths', v)}>
                            <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
                            <SelectContent>{bathOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <Button onClick={() => setIsFiltersOpen(false)} className="w-full bg-gray-900 text-white">View Results</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden bg-gray-50">
        <div className="hidden lg:block w-[45%] h-full relative p-3 pr-1.5">
           <div ref={mapContainerRef} className="h-full w-full bg-white rounded-[1.5rem] overflow-hidden shadow-sm border border-gray-100" />
        </div>
        <div className="flex-1 h-full overflow-y-auto bg-transparent p-3 pl-1.5">
           {isLoading ? (
             <div className="flex items-center justify-center h-full"><div className="w-8 h-8 border-2 border-gray-200 border-t-accent rounded-full animate-spin"></div></div>
           ) : filteredProperties.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-full text-center px-6">
               <h3 className="text-lg font-serif text-gray-900">No properties found</h3>
                <Button onClick={clearFilters} className="mt-4 bg-accent text-white rounded-full h-9">Clear All</Button>
             </div>
           ) : (
             <div className="bg-white rounded-[1.5rem] shadow-sm border border-gray-100 min-h-full p-5">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProperties.slice(0, visibleCount).map(p => (
                    <PropertyCard key={p.id} property={p} isSelected={selectedProperty === p.id} onClick={() => setSelectedProperty(p.id)} />
                  ))}
               </div>
               {visibleCount < filteredProperties.length && (
                 <div className="flex justify-center mt-8 pb-8">
                    <Button onClick={() => setVisibleCount(prev => prev + 24)} variant="outline" className="rounded-full px-8 border-gray-200 text-xs font-bold uppercase tracking-widest hover:bg-gray-50">Load More Listings</Button>
                 </div>
               )}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
