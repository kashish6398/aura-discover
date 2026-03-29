"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tool } from '../types/types';
import ToolCard from './ToolCard';

interface AiWizardProps {
  tools: Tool[];
  onClose: () => void;
}

export default function AiWizard({ tools, onClose }: AiWizardProps) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [budget, setBudget] = useState('');
  const [expertise, setExpertise] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [match, setMatch] = useState<Tool | null>(null);

  const handleSelectGoal = (g: string) => { setGoal(g); setStep(2); };
  const handleSelectBudget = (b: string) => { setBudget(b); setStep(3); };
  
  const handleSelectExpertise = (e: string) => {
    setExpertise(e);
    setIsSearching(true);
    setStep(4);
    
    setTimeout(() => {
      // Logic to find match based on options
      let bestMatch = tools.find(t => 
        (t.category.toLowerCase().includes(goal.toLowerCase()) || 
         (goal === 'Coding' && (t.category === 'Code Assistant' || t.category === 'Development')) ||
         (goal === 'Design' && t.category === 'Image Generation') ||
         (goal === 'Writing' && (t.category.includes('Writing') || t.category === 'Copywriting' || t.category === 'Chatbot')) ||
         (goal === 'Productivity' && t.category === 'Productivity')
        ) &&
        (b => {
          if (budget === 'Free') return t.pricing === 'Free' || t.pricing === 'Freemium';
          if (budget === 'Freemium') return t.pricing === 'Freemium';
          return true; // if paid, show anything, but prefer paid
        })(budget) &&
        (t.expertise === e || t.expertise === 'Any' || e === 'Any')
      );
      
      // Fallback guarantees we always return a tool
      if (!bestMatch) {
         if (goal === 'Coding') bestMatch = tools.find(t => t.name === 'GitHub Copilot');
         else if (goal === 'Design') bestMatch = tools.find(t => t.name === 'Midjourney');
         else if (goal === 'Writing') bestMatch = tools.find(t => t.name === 'Jasper');
         else bestMatch = tools.find(t => t.name === 'ChatGPT');
      }
      
      setMatch(bestMatch || tools[0]);
      setIsSearching(false);
    }, 1500);
  };

  const slideVariants = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl shadow-2xl p-8 overflow-hidden z-10 flex flex-col min-h-[440px]">
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3, ease: 'easeInOut' }} className="flex flex-col gap-6 w-full">
                <h2 className="text-2xl font-semibold text-white tracking-tight">What is your primary goal?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Coding', 'Writing', 'Design', 'Productivity'].map(option => (
                    <button 
                      key={option}
                      onClick={() => handleSelectGoal(option)}
                      className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 text-slate-200 font-medium transition-all text-left shadow-sm group"
                    >
                      <div className="flex justify-between items-center">
                        {option}
                        <div className="w-4 h-4 rounded-full border border-slate-600 group-hover:border-blue-400 group-hover:block transition-colors" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3, ease: 'easeInOut' }} className="flex flex-col gap-6 w-full">
                <h2 className="text-2xl font-semibold text-white tracking-tight">What is your budget?</h2>
                <div className="flex flex-col gap-4">
                  {['Free', 'Freemium', 'Paid'].map(option => (
                    <button 
                      key={option}
                      onClick={() => handleSelectBudget(option)}
                      className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 text-slate-200 font-medium transition-all text-left flex justify-between items-center shadow-sm group"
                    >
                      {option}
                      <div className="w-4 h-4 rounded-full border border-slate-600 group-hover:border-blue-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" variants={slideVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3, ease: 'easeInOut' }} className="flex flex-col gap-6 w-full">
                <h2 className="text-2xl font-semibold text-white tracking-tight">What is your expertise level?</h2>
                <div className="flex flex-col gap-4">
                  {['Beginner', 'Pro', 'Any'].map(option => (
                    <button 
                      key={option}
                      onClick={() => handleSelectExpertise(option)}
                      className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 text-slate-200 font-medium transition-all text-left flex justify-between items-center shadow-sm group"
                    >
                      {option}
                      <div className="w-4 h-4 rounded-full border border-slate-600 group-hover:border-blue-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && isSearching && (
              <motion.div key="loading" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col items-center justify-center gap-8 py-12">
                <div className="relative flex items-center justify-center">
                  <div className="w-20 h-20 border-[3px] border-white/5 rounded-full" />
                  <div className="absolute top-0 left-0 w-20 h-20 border-[3px] border-transparent border-t-emerald-400 rounded-full animate-spin" />
                  {/* Subtle inner pulse glow */}
                  <div className="absolute w-12 h-12 bg-emerald-500/20 blur-xl rounded-full animate-pulse" />
                </div>
                <h2 className="text-xl font-medium text-slate-300 animate-pulse tracking-wide">Finding your perfect AI match...</h2>
              </motion.div>
            )}

            {step === 4 && !isSearching && match && (
              <motion.div key="result" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-6 w-full">
                <div className="text-center mb-2">
                  <div className="inline-block px-3 py-1 mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    Top Match Discovered
                  </div>
                  <h2 className="text-3xl font-semibold text-white tracking-tight">Meet your new assistant</h2>
                </div>
                
                <div className="pointer-events-auto shadow-[0_0_40px_rgba(52,211,153,0.1)] rounded-2xl relative">
                  <ToolCard tool={match} />
                </div>
                
                <button 
                  onClick={() => {
                    setStep(1);
                    setGoal('');
                    setBudget('');
                    setExpertise('');
                  }}
                  className="mt-4 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white font-medium transition-all shadow-sm"
                >
                  Start Over
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {step < 4 && (
          <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center w-full">
             <div className="text-slate-500 text-xs font-semibold uppercase tracking-widest">Step {step} of 3</div>
             <div className="flex gap-2">
               {[1,2,3].map(i => (
                 <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${step >= i ? 'bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]' : 'bg-white/10'}`} />
               ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
