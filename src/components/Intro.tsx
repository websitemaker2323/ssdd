import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4500);

    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 1200);

    return () => {
      clearTimeout(timer);
      clearInterval(glitchInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-tactical-black flex items-center justify-center overflow-hidden"
    >
      {/* Background Strips */}
      <div className="absolute inset-0 flex flex-col pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: i * 0.05, duration: 0.8, ease: "circOut" }}
            className="flex-1 border-b border-tactical-teal/5 bg-tactical-gray/20"
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={`space-y-4 ${glitch ? 'glitch-text' : ''}`}
        >
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-px w-12 bg-tactical-accent" />
            <span className="text-xs font-mono tracking-[0.4em] text-tactical-accent uppercase">Verifying_Credentials</span>
            <div className="h-px w-12 bg-tactical-accent" />
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic leading-none overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="inline-block"
            >
              R6
            </motion.span>
            <br />
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1 }}
              className="inline-block text-tactical-accent"
            >
              Customs
            </motion.span>
          </h1>

          <div className="mt-8 flex flex-col items-center">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 2, ease: "easeInOut", delay: 1.5 }}
              className="h-1 bg-tactical-accent/30 relative"
            >
              <motion.div
                animate={{ left: ["0%", "100%", "0%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-12 bg-tactical-accent shadow-[0_0_15px_rgba(168,85,247,0.5)]"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0, 1] }}
              transition={{ duration: 0.2, delay: 2.5 }}
              className="text-[10px] font-mono tracking-widest text-tactical-muted uppercase mt-4"
            >
              Loading Combat Interface...
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Decorative corners during intro */}
      <div className="absolute inset-12 border-tactical-accent/10 border pointer-events-none">
        <div className="absolute -top-1 -left-1 w-4 h-4 bg-tactical-accent" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-tactical-accent" />
        <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-tactical-accent" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-tactical-accent" />
      </div>

      {/* Static overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
    </motion.div>
  );
}
