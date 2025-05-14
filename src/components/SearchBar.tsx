import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (location: string) => void;
  onGetCurrentLocation: () => void;
  theme: 'light' | 'dark';
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onGetCurrentLocation, theme }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className={`mb-6 p-4 rounded-lg shadow-md ${
      theme === 'light' ? 'bg-white' : 'bg-slate-800'
    }`}>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter city, zip code, or place..."
            className={`w-full py-3 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 ${
              theme === 'light' 
                ? 'bg-slate-100 text-slate-800 focus:ring-blue-400 placeholder-slate-500'
                : 'bg-slate-700 text-white focus:ring-blue-500 placeholder-slate-400'
            }`}
          />
          <Search 
            size={20} 
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
              theme === 'light' ? 'text-slate-500' : 'text-slate-400'
            }`} 
          />
        </div>
        
        <div className="flex gap-2">
          <button
            type="submit"
            className={`px-4 py-3 rounded-lg transition-colors font-medium ${
              theme === 'light'
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Search
          </button>
          
          <button
            type="button"
            onClick={onGetCurrentLocation}
            className={`flex items-center justify-center px-4 py-3 rounded-lg transition-colors ${
              theme === 'light'
                ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
            }`}
            aria-label="Get current location"
          >
            <MapPin size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;