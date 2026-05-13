import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Users, Play, Trash2, Edit3, Save, Trophy, Search, Monitor, Gamepad2 } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  platform: 'pc' | 'xbox' | 'psn';
}

interface ParticipantSlotProps {
  p: Participant;
  i: number;
  onUpdate: (id: string, updates: Partial<Participant>) => void;
}

const ParticipantSlot = ({ p, i, onUpdate }: ParticipantSlotProps) => (
  <div className="bg-tactical-gray/20 border border-tactical-accent/5 p-3 flex flex-col gap-2 hud-border group hover:border-tactical-accent/30">
    <div className="flex items-center gap-4">
      <span className="text-[8px] font-mono text-tactical-accent bg-tactical-accent/5 w-5 h-5 flex items-center justify-center">{i + 1}</span>
      <input
        value={p.name}
        onChange={(e) => onUpdate(p.id, { name: e.target.value })}
        className="bg-transparent border-none outline-none font-bold text-[11px] tracking-widest text-white uppercase flex-1"
      />
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {(['pc', 'xbox', 'psn'] as const).map((plat) => (
          <button
            key={plat}
            onClick={() => onUpdate(p.id, { platform: plat })}
            className={`p-1 border hud-border transition-all ${p.platform === plat ? 'bg-tactical-accent text-white border-tactical-accent' : 'border-white/10 text-white/20'}`}
          >
            {plat === 'pc' ? <Monitor className="w-2.5 h-2.5" /> : <Gamepad2 className="w-2.5 h-2.5" />}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const BracketParticipantSlot = ({ p, i, participantCount, onUpdate }: { p: Participant, i: number, participantCount: number, onUpdate: (id: string, updates: Partial<Participant>) => void }) => (
  <div key={p.id} className="relative group">
    <div className="w-56 bg-tactical-black border-l-2 border-tactical-accent p-1.5 px-3 hud-border flex flex-col justify-center text-[10px] font-bold tracking-widest uppercase shadow-xl focus-within:border-tactical-accent transition-colors">
      <div className="flex items-center justify-between">
        <input
          value={p.name}
          onChange={(e) => onUpdate(p.id, { name: e.target.value })}
          className="bg-transparent border-none outline-none w-full mr-2 truncate text-white"
        />
        <span className="text-tactical-accent/40 shrink-0">RD1</span>
      </div>
    </div>
    {i % 2 === 0 && i < participantCount - 1 && (
      <div className="absolute left-full top-[18px] w-8 h-[36px] mt-2 border-t border-r border-b border-tactical-accent/20" />
    )}
  </div>
);

export default function TournamentBrackets() {
  const [teamSize, setTeamSize] = useState<1 | 2 | 3>(1);
  const [participantCount, setParticipantCount] = useState<number>(4);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    // Persistent sync: preserve existing names when count changes
    setParticipants(prev => {
      const next = Array.from({ length: participantCount }).map((_, i) => {
        const existing = prev[i];
        return existing || {
          id: (i + 1).toString(),
          name: `TEAM ${String.fromCharCode(65 + i)}`,
          platform: 'pc'
        };
      });
      return next;
    });
  }, [participantCount]);

  const updateParticipant = (id: string, updates: Partial<Participant>) => {
    setParticipants(participants.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  return (
    <div className="h-full overflow-y-auto p-8 max-w-7xl mx-auto custom-scrollbar">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
        {/* Configuration Section */}
        <div className="xl:col-span-1 space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-tactical-accent">Tournament Setup</h2>
            <div className="p-4 bg-tactical-gray/30 border border-tactical-accent/10 hud-border space-y-6">
              {/* Mode Selector */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-tactical-muted uppercase tracking-widest">Operation Scale</span>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map(size => (
                    <button
                      key={size}
                      onClick={() => setTeamSize(size as any)}
                      className={`py-3 border hud-border text-[10px] font-black uppercase tracking-widest transition-all ${teamSize === size ? 'bg-tactical-accent text-white border-tactical-accent' : 'border-tactical-accent/20 text-tactical-accent hover:bg-tactical-accent/10'}`}
                    >
                      {size}v{size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Participant Count Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-mono text-tactical-muted uppercase tracking-widest">Active Units</span>
                  <span className="text-xl font-black text-tactical-accent">{participantCount}</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="32" 
                  value={participantCount} 
                  onChange={(e) => setParticipantCount(parseInt(e.target.value))}
                  className="w-full accent-tactical-accent"
                />
                <div className="flex justify-between text-[8px] font-mono text-tactical-muted">
                  <span>MIN: 02</span>
                  <span>MAX: 32</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsStarted(true)}
                className="w-full bg-tactical-accent py-4 flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all hud-border"
              >
                <Play className="w-4 h-4 fill-white" />
                {isStarted ? "REGENERATE" : "INITIALIZE"}
              </motion.button>
            </div>
          </div>

          <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
             <span className="text-[10px] font-mono text-tactical-muted uppercase tracking-widest">Manifest</span>
             {participants.map((p, i) => (
                <ParticipantSlot key={p.id} p={p} i={i} onUpdate={updateParticipant} />
             ))}
          </div>
        </div>

        {/* Bracket Visualization */}
        <div className="xl:col-span-3 min-h-[600px] border border-tactical-accent/5 bg-tactical-gray/20 hud-border relative p-8 flex flex-col items-center justify-center overflow-x-auto custom-scrollbar">
          {/* Tactical Background Grid */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #a855f7 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <AnimatePresence mode="wait">
            {!isStarted ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-4"
              >
                <Users className="w-16 h-16 text-tactical-accent/10 mx-auto" />
                <p className="text-[10px] font-mono tracking-widest uppercase text-tactical-muted">Establish operation parameters to sync... </p>
              </motion.div>
            ) : (
              <motion.div
                key="bracket-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-16 py-12"
              >
                {/* Round 1 */}
                <div className="flex flex-col justify-around gap-4">
                  {participants.map((p, i) => (
                    <BracketParticipantSlot key={p.id} p={p} i={i} participantCount={participantCount} onUpdate={updateParticipant} />
                  ))}
                </div>

                {/* Next Rounds (Simplified visual representation for many teams) */}
                <div className="flex flex-col justify-around gap-16">
                  {Array.from({ length: Math.ceil(participantCount / 2) }).map((_, i) => (
                    <div key={i} className="w-48 h-10 bg-tactical-gray/40 border border-tactical-accent/10 flex items-center justify-center relative">
                      <span className="text-[8px] font-mono text-tactical-muted uppercase tracking-widest">PENDING</span>
                      <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-tactical-accent" />
                      {i % 2 === 0 && participantCount > 2 && (
                        <div className="absolute left-full top-[19px] w-8 h-[76px] border-t border-r border-b border-tactical-accent/10" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Final Winner Slot */}
                <div className="flex items-center">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-64 bg-tactical-accent/5 border-2 border-tactical-accent/40 p-8 hud-border flex flex-col items-center gap-4 relative overflow-hidden"
                  >
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-tactical-accent/10 blur-[50px] rounded-full" />
                    <Trophy className="w-12 h-12 text-tactical-accent" />
                    <div className="text-center">
                      <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-tactical-accent mb-2">CHAMPIONS</h4>
                      <div className="h-px w-24 bg-tactical-accent/20 mx-auto" />
                      <p className="text-[10px] font-mono text-tactical-muted mt-4 uppercase">Waiting for Victor</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
