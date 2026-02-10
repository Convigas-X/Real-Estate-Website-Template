import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Home, DollarSign, Bed, Bath, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MlsSearchBox = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    beds: '',
    baths: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Build search URL with parameters for custom search results page
    const params = new URLSearchParams();
    
    // Map our parameter names to IDX Broker's expected parameters
    if (searchParams.location) params.set('city', searchParams.location);
    if (searchParams.minPrice) params.set('lp', searchParams.minPrice); // List Price minimum
    if (searchParams.maxPrice) params.set('hp', searchParams.maxPrice); // List Price maximum
    if (searchParams.beds) params.set('bd', searchParams.beds); // Bedrooms
    if (searchParams.baths) params.set('ba', searchParams.baths); // Bathrooms
    
    // Navigate to custom search results page with parameters
    const queryString = params.toString();
    if (queryString) {
      navigate(`/search?${queryString}`);
    } else {
      // If no search params, go to the search page
      navigate('/search');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="bg-gold-dark/10 backdrop-blur-xl rounded-lg p-3 sm:p-4 md:p-6 border border-gold-dark/20">
        {/* Main Search Row - Stacked on mobile, horizontal on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-3">
          
          {/* Location */}
          <div className="sm:col-span-2 lg:col-span-4 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="City, ZIP, or Address"
              value={searchParams.location}
              onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
              className="w-full bg-accent border border-accent rounded px-10 py-3 text-white placeholder:text-white/70 text-sm focus:outline-none focus:border-accent focus:bg-accent/90 transition-colors h-[46px]"
            />
          </div>

          {/* Price Range */}
          <div className="sm:col-span-1 lg:col-span-3 grid grid-cols-2 gap-2">
            <div className="relative">
              <select
                value={searchParams.minPrice}
                onChange={(e) => setSearchParams({ ...searchParams, minPrice: e.target.value })}
                className="w-full bg-accent border border-accent rounded px-3 py-3 text-transparent text-sm focus:outline-none focus:border-accent focus:bg-accent/90 transition-all appearance-none cursor-pointer h-[46px]"
              >
                <option value="" className="bg-gray-800 text-white">Min Price</option>
                <option value="100000" className="bg-gray-800 text-white">$100k</option>
                <option value="250000" className="bg-gray-800 text-white">$250k</option>
                <option value="500000" className="bg-gray-800 text-white">$500k</option>
                <option value="750000" className="bg-gray-800 text-white">$750k</option>
                <option value="1000000" className="bg-gray-800 text-white">$1M</option>
                <option value="2000000" className="bg-gray-800 text-white">$2M+</option>
              </select>
              <div className="absolute inset-0 flex items-center justify-center gap-1 pointer-events-none bg-transparent">
                <DollarSign className="w-5 h-5 text-white" />
                <Plus className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="relative">
              <select
                value={searchParams.maxPrice}
                onChange={(e) => setSearchParams({ ...searchParams, maxPrice: e.target.value })}
                className="w-full bg-accent border border-accent rounded px-3 py-3 text-transparent text-sm focus:outline-none focus:border-accent focus:bg-accent/90 transition-all appearance-none cursor-pointer h-[46px]"
              >
                <option value="" className="bg-gray-800 text-white">Max Price</option>
                <option value="250000" className="bg-gray-800 text-white">$250k</option>
                <option value="500000" className="bg-gray-800 text-white">$500k</option>
                <option value="750000" className="bg-gray-800 text-white">$750k</option>
                <option value="1000000" className="bg-gray-800 text-white">$1M</option>
                <option value="2000000" className="bg-gray-800 text-white">$2M</option>
                <option value="5000000" className="bg-gray-800 text-white">$5M+</option>
              </select>
              <div className="absolute inset-0 flex items-center justify-center gap-1 pointer-events-none bg-transparent">
                <DollarSign className="w-5 h-5 text-white" />
                <Minus className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Beds & Baths */}
          <div className="sm:col-span-1 lg:col-span-3 grid grid-cols-2 gap-2">
            {/* Beds */}
            <div className="relative">
              <select
                value={searchParams.beds}
                onChange={(e) => setSearchParams({ ...searchParams, beds: e.target.value })}
                className="w-full bg-accent border border-accent rounded px-3 py-3 text-transparent text-sm focus:outline-none focus:border-accent focus:bg-accent/90 transition-all appearance-none cursor-pointer h-[46px]"
              >
                <option value="" className="bg-gray-800 text-white">Beds</option>
                <option value="1" className="bg-gray-800 text-white">1+</option>
                <option value="2" className="bg-gray-800 text-white">2+</option>
                <option value="3" className="bg-gray-800 text-white">3+</option>
                <option value="4" className="bg-gray-800 text-white">4+</option>
                <option value="5" className="bg-gray-800 text-white">5+</option>
              </select>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-transparent">
                <Bed className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Baths */}
            <div className="relative">
              <select
                value={searchParams.baths}
                onChange={(e) => setSearchParams({ ...searchParams, baths: e.target.value })}
                className="w-full bg-accent border border-accent rounded px-3 py-3 text-transparent text-sm focus:outline-none focus:border-accent focus:bg-accent/90 transition-all appearance-none cursor-pointer h-[46px]"
              >
                <option value="" className="bg-gray-800 text-white">Baths</option>
                <option value="1" className="bg-gray-800 text-white">1+</option>
                <option value="2" className="bg-gray-800 text-white">2+</option>
                <option value="3" className="bg-gray-800 text-white">3+</option>
                <option value="4" className="bg-gray-800 text-white">4+</option>
              </select>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-transparent">
                <Bath className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="sm:col-span-1 lg:col-span-2">
            <button
              type="submit"
              className="w-full h-[46px] bg-accent hover:bg-gold-light text-white rounded flex items-center justify-center transition-colors duration-300"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MLS Badge */}
        <div className="mt-3 flex items-center gap-2 text-white/50 text-[10px] sm:text-xs">
          <Home className="w-3 h-3" />
          <span>Search Central Florida MLS Listings</span>
        </div>
      </form>
    </div>
  );
};
