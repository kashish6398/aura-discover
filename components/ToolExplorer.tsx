"use client";

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { Tool } from '../types/types';
import ToolCard from './ToolCard';

interface ToolExplorerProps {
  initialTools: Tool[];
}

function ToolExplorerContent({ initialTools }: ToolExplorerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Initialize state from URL params
  const urlCategory = searchParams.get('category') || 'All';
  const urlSearch = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [debouncedTerm, setDebouncedTerm] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);

  // Debounce search input (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Sync state to URL in real-time silently
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (selectedCategory !== 'All') {
      params.set('category', selectedCategory);
    } else {
      params.delete('category');
    }

    if (debouncedTerm) {
      params.set('search', debouncedTerm);
    } else {
      params.delete('search');
    }

    const queryStr = params.toString() ? `?${params.toString()}` : '';
    router.replace(`${pathname}${queryStr}`, { scroll: false });
  }, [debouncedTerm, selectedCategory, pathname, router]);

  const categories = ['All', ...Array.from(new Set(initialTools.map((t) => t.category)))];

  const filteredTools = useMemo(() => {
    return initialTools.filter((tool) => {
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesSearch = 
        tool.name.toLowerCase().includes(debouncedTerm.toLowerCase()) || 
        tool.description.toLowerCase().includes(debouncedTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [initialTools, selectedCategory, debouncedTerm]);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Interaction Layout */}
      <div className="flex flex-col gap-6 w-full">
        
        {/* Category Pills / Filters Row */}
        <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide py-2 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          <div className="flex gap-3 justify-start lg:justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-out cursor-pointer flex-shrink-0 ${
                  selectedCategory === cat 
                    ? 'bg-slate-100 text-slate-900 shadow-[0_0_20px_rgba(255,255,255,0.15)] scale-105' 
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar Row */}
        <div className="relative w-full max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-slate-400" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="w-full pl-14 pr-6 py-3.5 rounded-full bg-white/[0.05] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all placeholder:text-slate-400 font-medium shadow-inner backdrop-blur-md"
            placeholder="Search AI tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8 min-h-[400px] mt-4">
        <AnimatePresence mode="popLayout">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </AnimatePresence>
        
        {filteredTools.length === 0 && (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 py-16 text-center">
            <p className="text-slate-400 text-lg">No tools found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ToolExplorer({ initialTools }: ToolExplorerProps) {
  return (
    <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-400 font-medium">Loading tools...</div>}>
      <ToolExplorerContent initialTools={initialTools} />
    </Suspense>
  );
}
