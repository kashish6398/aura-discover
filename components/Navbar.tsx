"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Share, Hexagon } from 'lucide-react';
import AiWizard from './AiWizard';
import toolsData from '../data/data.json';
import { Tool } from '../types/types';
import { useFavorites } from '../hooks/useFavorites';

export default function Navbar() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const tools: Tool[] = toolsData as Tool[];
  const { favorites, isMounted } = useFavorites();

  // Optional: add a tiny shadow or background opacity change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-[#09090b]/80 backdrop-blur-md border-b border-white/10 shadow-xl shadow-black/20' : 'bg-transparent border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Hexagon className="w-6 h-6 text-emerald-400 group-hover:text-blue-400 transition-colors" />
            <span className="text-xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent tracking-tight">
              Aura
            </span>
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Explore</Link>
            <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Categories</Link>
            <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
              Favorites
              {isMounted && favorites.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-md bg-rose-500/20 text-rose-400 text-[10px] font-bold">
                  {favorites.length}
                </span>
              )}
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsWizardOpen(true)}
              className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-slate-200 text-sm font-medium hover:bg-white/[0.08] hover:border-white/20 transition-all shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] flex items-center gap-1.5 group"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400 group-hover:text-emerald-400 transition-colors" />
              <span>Match</span>
            </button>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/[0.05]">
              <Share className="w-5 h-5" />
            </a>
          </div>

        </div>
      </nav>

      {/* AiWizard modal rendering */}
      {isWizardOpen && <AiWizard tools={tools} onClose={() => setIsWizardOpen(false)} />}
    </>
  );
}
