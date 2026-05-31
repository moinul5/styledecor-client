import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import axiosPublic from '../../api/axiosInstance';
import ServiceCard from '../../components/cards/ServiceCard';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'motion/react';

// Debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

const CATEGORIES = ['All', 'Wedding', 'Home Interior', 'Corporate', 'Birthday', 'Festival', 'Outdoor'];
const SORT_OPTIONS = [
  { value: 'popularityDesc', label: 'Most Popular' },
  { value: 'priceAsc', label: 'Price: Low to High' },
  { value: 'priceDesc', label: 'Price: High to Low' },
  { value: 'ratingDesc', label: 'Highest Rated' },
];

const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State for filters
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [sort, setSort] = useState(searchParams.get('sort') || 'popularityDesc');
  const [priceRange, setPriceRange] = useState([0, 10000]); // [min, max]
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const limit = 9;

  // Sync state to URL params
  useEffect(() => {
    const params = {};
    if (debouncedSearchTerm) params.search = debouncedSearchTerm;
    if (category !== 'All') params.category = category;
    if (sort !== 'popularityDesc') params.sort = sort;
    if (page > 1) params.page = page.toString();
    setSearchParams(params);
  }, [debouncedSearchTerm, category, sort, page, setSearchParams]);

  // Fetch Services
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['services', debouncedSearchTerm, category, sort, priceRange, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        page,
        limit,
        sort,
      });
      if (debouncedSearchTerm) params.append('search', debouncedSearchTerm);
      if (category !== 'All') params.append('category', category);
      params.append('minPrice', priceRange[0]);
      params.append('maxPrice', priceRange[1]);
      
      const res = await axiosPublic.get(`/services?${params.toString()}`);
      return res.data;
    }
  });

  const services = data?.services || [];
  const totalPages = data?.totalPages || 1;

  const handleReset = () => {
    setSearchTerm('');
    setCategory('All');
    setSort('popularityDesc');
    setPriceRange([0, 10000]);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-base-100 pb-20">
      {/* Page Header */}
      <section className="pt-32 pb-16 gradient-hero border-b border-base-300">
        <div className="container-custom text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-4">
            Our Premium <span className="gradient-text">Services</span>
          </h1>
          <p className="text-base-content/60 max-w-2xl mx-auto text-lg">
            Explore our curated selection of decoration packages. Find the perfect aesthetic for your next event or space.
          </p>
        </div>
      </section>

      <div className="container-custom py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 shrink-0 space-y-8">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-10 bg-base-200/50 focus:border-primary transition-colors"
              />
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" size={18} />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content">
                  <FiX size={16} />
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="glass-card p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <FiFilter className="text-primary" /> Categories
              </h3>
              <div className="flex flex-col gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      category === cat 
                        ? 'bg-primary/20 text-primary font-medium' 
                        : 'text-base-content/70 hover:bg-base-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="glass-card p-6">
              <h3 className="font-bold mb-4">Price Range</h3>
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="range range-primary range-xs"
              />
              <div className="flex justify-between text-xs text-base-content/60 mt-2 font-medium">
                <span>$0</span>
                <span>Up to ${priceRange[1].toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={handleReset}
              className="btn btn-outline btn-block text-base-content/50 hover:text-base-content"
            >
              Reset Filters
            </button>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar: Sort & Results count */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 bg-base-200/30 p-4 rounded-xl border border-base-300">
              <p className="text-sm text-base-content/60">
                Showing <span className="font-bold text-base-content">{services.length}</span> services
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-sm font-medium text-base-content/70 shrink-0">Sort by:</span>
                <select 
                  className="select select-bordered select-sm w-full sm:w-auto bg-base-200"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Services Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <div key={n} className="glass-card h-96 skeleton-shimmer"></div>
                ))}
              </div>
            ) : isError ? (
              <div className="text-center py-20">
                <p className="text-error mb-4">Failed to load services.</p>
                <p className="text-sm text-base-content/50">{error?.message}</p>
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-20 glass-card">
                <FiSearch className="mx-auto text-4xl text-base-content/20 mb-4" />
                <h3 className="text-xl font-bold mb-2">No Services Found</h3>
                <p className="text-base-content/60 text-sm">
                  We couldn't find any services matching your current filters. Try adjusting your search criteria.
                </p>
                <button onClick={handleReset} className="btn btn-primary mt-6">Clear Filters</button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {services.map((service, idx) => (
                      <ServiceCard key={service._id} service={service} index={idx} />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="join">
                      <button 
                        className="join-item btn btn-sm"
                        disabled={page === 1}
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                      >
                        «
                      </button>
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i}
                          className={`join-item btn btn-sm ${page === i + 1 ? 'btn-active btn-primary' : ''}`}
                          onClick={() => setPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button 
                        className="join-item btn btn-sm"
                        disabled={page === totalPages}
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      >
                        »
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
