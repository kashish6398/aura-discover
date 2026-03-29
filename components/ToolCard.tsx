"use client";

import React from 'react';
import { Tool } from '../types/types';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const { toggleFavorite, isFavorite, isMounted } = useFavorites();
  const favorited = isMounted ? isFavorite(tool.id) : false;
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1, y: [-4, 4, -4], rotate: [-0.5, 0.5, -0.5] }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ 
        y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        layout: { type: "spring", bounce: 0.2, duration: 0.6 },
        default: { type: "spring", bounce: 0.2, duration: 0.6 }
      }}
      whileHover={{ scale: 1.02, rotate: 0 }}
      className="relative group flex flex-col h-full justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 transition-all duration-500 hover:border-white/[0.2] hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
    >
      <div className="flex flex-col flex-1">
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl flex shrink-0 items-center justify-center p-2 h-16 w-16 shadow-[inset_0_0_15px_rgba(255,255,255,0.02)]">
            <img 
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=020617&color=60a5fa&size=128&rounded=true&font-size=0.6`} 
              alt={`${tool.name} avatar`} 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1 pr-8">
            <h3 className="text-xl font-medium tracking-tight text-slate-100 group-hover:text-white transition-colors">
              {tool.name}
            </h3>
            <span className="mt-1.5 inline-block rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[11px] font-medium text-slate-300">
              {tool.category}
            </span>
          </div>
          
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(tool.id); }}
            className={`absolute top-6 right-6 p-2 rounded-full transition-all duration-300 z-20 ${favorited ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20' : 'text-slate-500 hover:text-rose-400 hover:bg-white/5'}`}
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          >
             <Heart className={`w-5 h-5 transition-transform duration-300 ${favorited ? 'fill-rose-500 stroke-rose-500 scale-110 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]' : ''}`} />
          </button>
        </div>
        
        <p className="flex-grow text-sm text-slate-300 font-light leading-relaxed mb-6">
          {tool.description}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-[11px] font-medium uppercase tracking-widest text-slate-400">
          {tool.pricing}
        </span>
        <a 
          href={tool.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1 group/link"
        >
          Visit site <span aria-hidden="true" className="group-hover/link:translate-x-0.5 transition-transform">&rarr;</span>
        </a>
      </div>
    </motion.div>
  );
}