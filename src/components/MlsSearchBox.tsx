import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, DollarSign, Bed, Bath, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    navigate('/search');
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-0">
      <form 
        onSubmit={handleSearch} 
        className="bg-black/20 backdrop-blur-xl rounded-3xl md:rounded-full p-2 md:p-1.5 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-1"
      >
        {/* Location Input */}
        <div className="relative flex-[1.5] group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#FFD700] transition-colors">
            <MapPin className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="City, ZIP, or Address"
            value={searchParams.location}
            onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
            className="w-full bg-white/5 md:bg-transparent border-none rounded-2xl md:rounded-full pl-11 pr-4 py-3.5 md:py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:bg-white/10 transition-all h-[52px] md:h-[48px]"
          />
        </div>

        {/* Mobile Divider */}
        <div className="md:hidden h-px bg-white/5 mx-4" />
        {/* Desktop Divider */}
        <div className="hidden md:block w-px h-8 bg-white/10 mx-1" />

        {/* Filters Group */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 md:pb-0 px-1 md:px-0">
          
          {/* Price Range */}
          <div className="flex items-center gap-1 min-w-fit px-2">
            <div className="flex items-center gap-2">
              <DollarSign className="w-3.5 h-3.5 text-white/30" />
              <div className="flex items-center">
                <Select 
                  value={searchParams.minPrice} 
                  onValueChange={(value) => setSearchParams({ ...searchParams, minPrice: value })}
                >
                  <SelectTrigger className="w-[60px] bg-transparent border-none text-white/70 text-xs focus:ring-0 focus:ring-offset-0 h-auto p-0 hover:text-white transition-colors">
                    <SelectValue placeholder="Min" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900/95 border-white/10 text-white backdrop-blur-xl">
                    <SelectItem value="0">Min</SelectItem>
                    <SelectItem value="100000">$100k</SelectItem>
                    <SelectItem value="500000">$500k</SelectItem>
                    <SelectItem value="1000000">$1M</SelectItem>
                  </SelectContent>
                </Select>
                
                <span className="text-white/20 mx-0.5">-</span>

                <Select 
                  value={searchParams.maxPrice} 
                  onValueChange={(value) => setSearchParams({ ...searchParams, maxPrice: value })}
                >
                  <SelectTrigger className="w-[60px] bg-transparent border-none text-white/70 text-xs focus:ring-0 focus:ring-offset-0 h-auto p-0 hover:text-white transition-colors">
                    <SelectValue placeholder="Max" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900/95 border-white/10 text-white backdrop-blur-xl">
                    <SelectItem value="1000000">$1M</SelectItem>
                    <SelectItem value="5000000">$5M</SelectItem>
                    <SelectItem value="10000000">$10M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="hidden md:block w-px h-4 bg-white/10 mx-1" />

          {/* Beds & Baths */}
          <div className="flex items-center gap-3 px-2 min-w-fit">
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-white/30" />
              <Select 
                value={searchParams.beds} 
                onValueChange={(value) => setSearchParams({ ...searchParams, beds: value })}
              >
                <SelectTrigger className="w-[60px] bg-transparent border-none text-white/70 text-xs focus:ring-0 focus:ring-offset-0 h-auto p-0 hover:text-white transition-colors">
                  <SelectValue placeholder="Beds" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900/95 border-white/10 text-white backdrop-blur-xl">
                  <SelectItem value="0">Beds</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-white/30" />
              <Select 
                value={searchParams.baths} 
                onValueChange={(value) => setSearchParams({ ...searchParams, baths: value })}
              >
                <SelectTrigger className="w-[60px] bg-transparent border-none text-white/70 text-xs focus:ring-0 focus:ring-offset-0 h-auto p-0 hover:text-white transition-colors">
                  <SelectValue placeholder="Baths" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900/95 border-white/10 text-white backdrop-blur-xl">
                  <SelectItem value="0">Baths</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full md:w-auto h-[52px] md:h-[48px] px-8 bg-[#FFD700] hover:bg-[#F5C700] text-black rounded-2xl md:rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-[#FFD700]/10 hover:shadow-[#FFD700]/20 group mt-2 md:mt-0"
        >
          <Search className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span className="text-sm font-bold uppercase tracking-wider">Search</span>
        </button>
      </form>
    </div>
  );
};
