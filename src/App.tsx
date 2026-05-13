import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Intro from './components/Intro';
import MainMenu from './components/MainMenu';
import TournamentBrackets from './components/TournamentBrackets';
import Customs from './components/Customs';
import { Shield, ChevronLeft, Terminal } from 'lucide-react';

type View = 'intro' | 'menu' | 'tourney' | 'customs';

export default function App() {
  const [view, setView] = useState<View>('intro');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-tactical-black text-white relative overflow-hidden font-sans">
      {/* Background Shooting Stars */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(168,85,247,0.1)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="shooting-star"
              style={{
                top: `${Math.random() * 50}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                transition: {
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 10,
                  ease: "easeIn"
                }
              }}
            />
          ))}
          {/* Static Stars */}
          {Array.from({ length: 100 }).map((_, i) => (
            <div 
              key={`star-${i}`} 
              className="absolute w-px h-px bg-white rounded-full opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'intro' && (
          <Intro key="intro" onComplete={() => setView('menu')} />
        )}

        {view !== 'intro' && (
          <motion.div
            key="interface"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 h-screen flex flex-col"
          >
            {/* Tactical Header */}
            <header className="h-16 border-b border-tactical-accent/10 bg-tactical-gray/80 backdrop-blur-md flex items-center px-8 justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-tactical-accent flex items-center justify-center hud-border cursor-pointer group" onClick={() => setView('menu')}>
                  <Shield className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h1 className="text-sm font-bold tracking-[0.2em] font-mono leading-none">R6 CUSTOMS</h1>
                  <p className="text-[10px] text-tactical-teal font-mono tracking-widest mt-1 uppercase">Region: EU-WEST-2 // Status: Secure</p>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-8 font-mono text-[11px] tracking-widest">
                <div className="flex flex-col items-end">
                  <span className="text-tactical-muted uppercase">Version</span>
                  <span className="text-tactical-teal">v2.4.0-STABLE</span>
                </div>
                <div className="flex flex-col items-end border-l border-tactical-teal/20 pl-8">
                  <span className="text-tactical-muted uppercase">Latency</span>
                  <span className="text-tactical-teal">14MS</span>
                </div>
              </div>

              {view !== 'menu' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setView('menu')}
                  className="flex items-center gap-2 px-4 py-2 bg-tactical-teal/10 border border-tactical-teal/30 hover:bg-tactical-teal/20 transition-colors rounded-sm text-xs font-bold uppercase tracking-widest"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Return
                </motion.button>
              )}
            </header>

            <main className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                {view === 'menu' && <MainMenu key="menu" onSelect={setView} />}
                {view === 'tourney' && <TournamentBrackets key="tourney" />}
                {view === 'customs' && <Customs key="customs" />}
              </AnimatePresence>
            </main>

            {/* Tactical Footer Overlay */}
            <footer className="h-10 border-t border-tactical-accent/10 bg-tactical-gray/50 flex items-center px-8 justify-between text-[9px] font-mono tracking-widest text-tactical-muted uppercase">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><Terminal className="w-3 h-3" /> VOID_PROTOCOL_ACTIVE</span>
                <span className="w-px h-3 bg-tactical-accent/20" />
                <span>Hyper-Secure Link Established</span>
              </div>
              <div className="flex items-center gap-4">
                <span>© 2026 R6 TACTICAL</span>
                <span className="text-tactical-accent animate-pulse">● CORE BYPASS</span>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Hud Elements */}
      <div className="fixed inset-0 pointer-events-none z-[60]">
        <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-tactical-accent/20 m-4" />
        <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-tactical-accent/20 m-4" />
        <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-tactical-accent/20 m-4" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-tactical-accent/20 m-4" />
        
        {/* Subtle Horizontal Scanlines overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-10" />
      </div>
    </div>
  );
}
