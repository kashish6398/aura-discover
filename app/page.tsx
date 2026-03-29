import ToolExplorer from '../components/ToolExplorer';
import WizardLauncher from '../components/WizardLauncher';
import toolsData from '../data/data.json';
import { Tool } from '../types/types';

export default function Home() {
  const tools: Tool[] = toolsData as Tool[];

  return (
    <main className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 flex justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] sm:w-[1000px] sm:h-[500px] absolute -top-[200px] opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500 via-purple-500/20 to-transparent blur-3xl rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 relative">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
            Discover the <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Future of AI</span>
          </h1>
          <p className="text-lg text-slate-300 font-light leading-relaxed">
            Explore the most innovative and powerful AI tools available today. Find the perfect solution for your workflow, from chatbots to code assistants.
          </p>
          <WizardLauncher tools={tools} />
        </div>

        {/* Explorer Section */}
        <ToolExplorer initialTools={tools} />
      </div>
    </main>
  );
}
