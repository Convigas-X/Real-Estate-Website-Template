import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  ExternalLink,
  ChevronLeft,
  ChevronRight,
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

let DefaultIcon = L.icon({
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

// Sample properties data with coordinates (Orlando area) - Affordable prices
const sampleProperties: Property[] = [
  {
    id: '1',
    address: '1234 Lakeview Dr',
    city: 'Orlando',
    state: 'FL',
    zipcode: '32801',
    price: 225000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1250,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
    lat: 28.5383,
    lng: -81.3792,
    status: 'For Sale',
    propertyType: 'Single Family'
  },
  {
    id: '2',
    address: '5678 Park Ave',
    city: 'Winter Park',
    state: 'FL',
    zipcode: '32789',
    price: 275000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1650,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    lat: 28.5975,
    lng: -81.3514,
    status: 'For Sale',
    propertyType: 'Single Family'
  },
  {
    id: '3',
    address: '9012 Downtown Blvd',
    city: 'Orlando',
    state: 'FL',
    zipcode: '32801',
    price: 185000,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 850,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80',
    lat: 28.5421,
    lng: -81.3745,
    status: 'For Sale',
    propertyType: 'Condo'
  },
  {
    id: '4',
    address: '3456 Lake Nona Way',
    city: 'Orlando',
    state: 'FL',
    zipcode: '32827',
    price: 245000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1450,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop&q=80',
    lat: 28.3607,
    lng: -81.2464,
    status: 'Pending',
    propertyType: 'Townhouse'
  },
  {
    id: '5',
    address: '7890 Windermere Ln',
    city: 'Windermere',
    state: 'FL',
    zipcode: '34786',
    price: 295000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1750,
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop&q=80',
    lat: 28.4953,
    lng: -81.5348,
    status: 'For Sale',
    propertyType: 'Single Family'
  },
  {
    id: '6',
    address: '2468 College Park Cir',
    city: 'Orlando',
    state: 'FL',
    zipcode: '32804',
    price: 195000,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1150,
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&auto=format&fit=crop&q=80',
    lat: 28.5702,
    lng: -81.3904,
    status: 'For Sale',
    propertyType: 'Single Family'
  },
  {
    id: '7',
    address: '1357 Thornton Park',
    city: 'Orlando',
    state: 'FL',
    zipcode: '32801',
    price: 215000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop&q=80',
    lat: 28.5415,
    lng: -81.3689,
    status: 'Sold',
    propertyType: 'Condo'
  },
  {
    id: '8',
    address: '8642 Dr Phillips Blvd',
    city: 'Orlando',
    state: 'FL',
    zipcode: '32819',
    price: 595000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2300,
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=80',
    lat: 28.4506,
    lng: -81.4924,
    status: 'For Sale',
    propertyType: 'Single Family'
  }
];

const propertyTypes = [
  { value: 'all', label: 'All Property Types' },
  { value: 'single-family', label: 'Single Family' },
  { value: 'condo', label: 'Condominium' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'land', label: 'Land/Lot' },
  { value: 'commercial', label: 'Commercial' },
];

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'sold', label: 'Sold' },
];

const priceRanges = [
  { value: '0', label: 'No Min' },
  { value: '100000', label: '$100,000' },
  { value: '250000', label: '$250,000' },
  { value: '500000', label: '$500,000' },
  { value: '750000', label: '$750,000' },
  { value: '1000000', label: '$1,000,000' },
];

const maxPriceRanges = [
  { value: '999999999', label: 'No Max' },
  { value: '250000', label: '$250,000' },
  { value: '500000', label: '$500,000' },
  { value: '750000', label: '$750,000' },
  { value: '1000000', label: '$1,000,000' },
  { value: '2000000', label: '$2,000,000' },
];

const bedOptions = [
  { value: '0', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
  { value: '5', label: '5+' },
];

const bathOptions = [
  { value: '0', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
];

// Property Card Component
const PropertyCard = ({ property, isSelected, onClick }: { 
  property: Property; 
  isSelected: boolean;
  onClick: () => void;
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 ${
        isSelected ? 'border-accent ring-2 ring-accent/20' : 'border-transparent'
      }`}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.image}
          alt={property.address}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            property.status === 'For Sale' ? 'bg-green-500 text-white' :
            property.status === 'Pending' ? 'bg-yellow-500 text-white' :
            'bg-gray-500 text-white'
          }`}>
            {property.status}
          </span>
        </div>
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
            <Share2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        {/* Price Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-2xl font-bold text-white">{formatPrice(property.price)}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate">
          {property.address}
        </h3>
        <p className="text-gray-500 text-sm mb-3">
          {property.city}, {property.state} {property.zipcode}
        </p>
        
        {/* Property Details */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{property.bedrooms} bd</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{property.bathrooms} ba</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize2 className="w-4 h-4" />
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Property Type */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {property.propertyType}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isDesktopFiltersOpen, setIsDesktopFiltersOpen] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(sampleProperties);
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Initialize filters from URL params
  const [filters, setFilters] = useState<SearchFilters>({
    location: searchParams.get('city') || searchParams.get('location') || '',
    minPrice: searchParams.get('lp') || '0',
    maxPrice: searchParams.get('hp') || '999999999',
    beds: searchParams.get('bd') || '0',
    baths: searchParams.get('ba') || '0',
    propertyType: searchParams.get('pt') || 'all',
    status: searchParams.get('status') || 'all',
  });

  // Initialize map
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([28.5383, -81.3792], 11);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update markers when filtered properties change
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    filteredProperties.forEach(property => {
      const marker = L.marker([property.lat, property.lng])
        .addTo(mapRef.current!)
        .bindPopup(`
          <div style="min-width: 200px;">
            <img src="${property.image}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 4px; margin-bottom: 8px;" />
            <h3 style="font-weight: bold; margin-bottom: 4px;">${property.address}</h3>
            <p style="color: #666; font-size: 14px; margin-bottom: 4px;">$${property.price.toLocaleString()}</p>
            <p style="font-size: 12px; color: #888;">${property.bedrooms} bd | ${property.bathrooms} ba | ${property.sqft.toLocaleString()} sqft</p>
          </div>
        `);
      
      marker.on('click', () => {
        setSelectedProperty(property.id);
      });
      
      markersRef.current.push(marker);
    });

    // Fit bounds to show all markers
    if (markersRef.current.length > 0) {
      const group = new L.FeatureGroup(markersRef.current);
      mapRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  }, [filteredProperties]);

  // Filter properties based on filters
  useEffect(() => {
    let filtered = sampleProperties;

    if (filters.location) {
      const searchTerm = filters.location.toLowerCase();
      filtered = filtered.filter(p => 
        p.address.toLowerCase().includes(searchTerm) ||
        p.city.toLowerCase().includes(searchTerm) ||
        p.zipcode.includes(searchTerm)
      );
    }

    if (filters.minPrice && filters.minPrice !== '0') {
      filtered = filtered.filter(p => p.price >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice && filters.maxPrice !== '999999999') {
      filtered = filtered.filter(p => p.price <= parseInt(filters.maxPrice));
    }

    if (filters.beds && filters.beds !== '0') {
      filtered = filtered.filter(p => p.bedrooms >= parseInt(filters.beds));
    }

    if (filters.baths && filters.baths !== '0') {
      filtered = filtered.filter(p => p.bathrooms >= parseInt(filters.baths));
    }

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(p => p.status.toLowerCase() === filters.status.toLowerCase());
    }

    setFilteredProperties(filtered);
    setIsLoading(false);

    // Count active filters
    let count = 0;
    if (filters.location) count++;
    if (filters.minPrice && filters.minPrice !== '0') count++;
    if (filters.maxPrice && filters.maxPrice !== '999999999') count++;
    if (filters.beds && filters.beds !== '0') count++;
    if (filters.baths && filters.baths !== '0') count++;
    if (filters.propertyType && filters.propertyType !== 'all') count++;
    if (filters.status && filters.status !== 'all') count++;
    setActiveFiltersCount(count);
  }, [filters]);

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (filters.location) params.set('city', filters.location);
    if (filters.minPrice && filters.minPrice !== '0') params.set('lp', filters.minPrice);
    if (filters.maxPrice && filters.maxPrice !== '999999999') params.set('hp', filters.maxPrice);
    if (filters.beds && filters.beds !== '0') params.set('bd', filters.beds);
    if (filters.baths && filters.baths !== '0') params.set('ba', filters.baths);
    if (filters.propertyType && filters.propertyType !== 'all') params.set('pt', filters.propertyType);
    if (filters.status && filters.status !== 'all') params.set('status', filters.status);
    
    setSearchParams(params);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      minPrice: '0',
      maxPrice: '999999999',
      beds: '0',
      baths: '0',
      propertyType: 'all',
      status: 'all',
    });
    setSearchParams(new URLSearchParams());
  };

  const FilterContent = () => (
    <div className="space-y-5">
      {/* Location */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-700" />
          Location
        </label>
        <Input
          type="text"
          placeholder="City, ZIP, or Address"
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-accent focus:ring-accent"
        />
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-gray-700" />
          Price Range
        </label>
        <div className="grid grid-cols-2 gap-2">
          <Select value={filters.minPrice} onValueChange={(value) => handleFilterChange('minPrice', value)}>
            <SelectTrigger className="bg-white border-gray-300 text-gray-900">
              <SelectValue placeholder="Min Price" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              {priceRanges.map((range) => (
                <SelectItem key={range.value} value={range.value} className="text-gray-900 hover:bg-gray-100">
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filters.maxPrice} onValueChange={(value) => handleFilterChange('maxPrice', value)}>
            <SelectTrigger className="bg-white border-gray-300 text-gray-900">
              <SelectValue placeholder="Max Price" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              {maxPriceRanges.map((range) => (
                <SelectItem key={range.value} value={range.value} className="text-gray-900 hover:bg-gray-100">
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bedrooms */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900 flex items-center gap-2">
          <Bed className="w-4 h-4 text-gray-700" />
          Bedrooms
        </label>
        <Select value={filters.beds} onValueChange={(value) => handleFilterChange('beds', value)}>
          <SelectTrigger className="bg-white border-gray-300 text-gray-900">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200">
            {bedOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-gray-900 hover:bg-gray-100">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bathrooms */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900 flex items-center gap-2">
          <Bath className="w-4 h-4 text-gray-700" />
          Bathrooms
        </label>
        <Select value={filters.baths} onValueChange={(value) => handleFilterChange('baths', value)}>
          <SelectTrigger className="bg-white border-gray-300 text-gray-900">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200">
            {bathOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-gray-900 hover:bg-gray-100">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Property Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900 flex items-center gap-2">
          <Home className="w-4 h-4 text-gray-700" />
          Property Type
        </label>
        <Select value={filters.propertyType} onValueChange={(value) => handleFilterChange('propertyType', value)}>
          <SelectTrigger className="bg-white border-gray-300 text-gray-900">
            <SelectValue placeholder="All Property Types" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200">
            {propertyTypes.map((type) => (
              <SelectItem key={type.value} value={type.value} className="text-gray-900 hover:bg-gray-100">
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900">Status</label>
        <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
          <SelectTrigger className="bg-white border-gray-300 text-gray-900">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200">
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-gray-900 hover:bg-gray-100">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 space-y-2">
        <Button 
          onClick={handleSearch}
          className="w-full bg-accent hover:bg-accent/90 text-white"
        >
          <Search className="w-4 h-4 mr-2" />
          Update Search
        </Button>
        {activeFiltersCount > 0 && (
          <Button 
            variant="outline" 
            onClick={clearFilters}
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            <X className="w-4 h-4 mr-2" />
            Clear All Filters
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation forceDark={true} />
      
      {/* Search Header */}
      <div className="pt-20 pb-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Quick Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
            <div className="flex-1 w-full lg:w-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by city, ZIP, or address..."
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 h-12"
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  className="bg-accent hover:bg-accent/90 text-white h-12 px-8"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {/* Mobile Filters */}
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="lg:hidden border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="ml-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {activeFiltersCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-96 bg-white border-gray-200">
                  <SheetHeader>
                    <SheetTitle className="text-gray-900 flex items-center gap-2">
                      <Filter className="w-5 h-5" />
                      Filters
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredProperties.length}</span> properties
              {filters.location && ` in "${filters.location}"`}
            </p>
            {activeFiltersCount > 0 && (
              <button 
                onClick={clearFilters}
                className="text-sm text-accent hover:text-accent/80 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className="flex h-[calc(100vh-180px)]">
        {/* Map Section - Left Side */}
        <div className="hidden lg:block w-1/2 relative bg-gray-100">
          <div ref={mapContainerRef} className="absolute inset-0" />
          
          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
            <button 
              className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
              onClick={() => mapRef.current?.zoomIn()}
            >
              <span className="text-xl font-bold text-gray-700">+</span>
            </button>
            <button 
              className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
              onClick={() => mapRef.current?.zoomOut()}
            >
              <span className="text-xl font-bold text-gray-700">−</span>
            </button>
          </div>
        </div>

        {/* Properties List - Right Side */}
        <div className="flex-1 lg:w-1/2 bg-gray-50 overflow-y-auto">
          {/* Desktop Filters Toggle */}
          <div className="hidden lg:flex sticky top-0 z-10 bg-white border-b border-gray-200 p-4 items-center justify-between">
            <button
              onClick={() => setIsDesktopFiltersOpen(!isDesktopFiltersOpen)}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-5 py-2.5 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {isDesktopFiltersOpen ? 'Hide Filters' : 'Show Filters'}
              {activeFiltersCount > 0 && (
                <span className="ml-1 bg-white text-accent text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            
            {activeFiltersCount > 0 && (
              <button 
                onClick={clearFilters}
                className="text-sm text-gray-600 hover:text-gray-900 font-medium"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Desktop Filters Panel - Collapsible */}
          <div className={`hidden lg:block bg-gray-50 border-b border-gray-200 overflow-hidden transition-all duration-300 ${isDesktopFiltersOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-4">
              <FilterContent />
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
                <p className="text-gray-600">Loading properties...</p>
              </div>
            </div>
          )}

          {/* Properties Grid */}
          {!isLoading && (
            <div className="p-4">
              {filteredProperties.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-2">No properties found</p>
                  <p className="text-gray-400">Try adjusting your filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      isSelected={selectedProperty === property.id}
                      onClick={() => setSelectedProperty(property.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchResults;