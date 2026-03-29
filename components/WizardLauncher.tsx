"use client";

import React, { useState } from 'react';
import AiWizard from './AiWizard';
import { Tool } from '../types/types';

export default function WizardLauncher({ tools }: { tools: Tool[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex justify-center mt-10 mb-4 z-20 relative px-4">
        <div className="relative group">
          {/* Ambient Glow */}
          <div className="absolute inset-x-0 -bottom-2 top-0 bg-gradient-to-r from-blue-500/40 to-emerald-500/40 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
          
          <button 
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-3 px-8 py-4 rounded-full bg-slate-100 text-slate-900 font-bold text-lg hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300"
          >
            Help Me Choose ✨
          </button>
        </div>
      </div>

      {isOpen && <AiWizard tools={tools} onClose={() => setIsOpen(false)} />}
    </>
  );
}
