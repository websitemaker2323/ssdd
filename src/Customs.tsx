import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Crosshair, Users, RotateCcw, Swords, Cpu, Eye, Zap, Wind, UserPlus, Map as MapIcon, Search, Monitor, Gamepad2 } from 'lucide-react';

interface Player {
  name: string;
  platform: 'pc' | 'xbox' | 'psn';
}

const MAPS = [
  "Bank", "Border", "Chalet", "Clubhouse", "Coastline", "Consulate", 
  "Emerald Plains", "Fortress", "Kafe Dostoyevsky", "Kanal", "Lair", 
  "Nighthaven Labs", "Oregon", "Outback", "Skyscraper", "Theme Park", "Villa"
];

interface Operator {
  id: string;
  name: string;
  role: 'attacker' | 'defender';
  icon: any;
  color: string;
}

interface PlayerSlotProps {
  side: 'atk' | 'def' | 'queue';
  index: number;
  player: Player;
  theme: 'purple' | 'teal';
  onUpdate: (side: 'atk' | 'def' | 'queue', index: number, updates: Partial<Player>) => void;
}

const PlayerSlot = ({ side, index, player, theme, onUpdate }: PlayerSlotProps) => (
  <div className={`border ${theme === 'purple' ? 'border-tactical-purple/20 focus-within:border-tactical-purple' : 'border-tactical-accent/20 focus-within:border-tactical-accent'} bg-tactical-gray/40 flex flex-col hud-border group transition-all`}>
    <div className="h-12 flex items-center px-4 gap-3">
      <span className={`text-[10px] font-mono ${theme === 'purple' ? 'text-tactical-purple/30' : 'text-tactical-accent/30'} font-bold`}>0{index+1}</span>
      <input
        placeholder="ASSIGN NAME..."
        className="flex-1 bg-transparent border-none outline-none text-xs font-black uppercase tracking-widest placeholder:text-tactical-muted/30 text-white"
        value={player.name}
        onChange={(e) => onUpdate(side, index, { name: e.target.value })}
      />
      <div className="flex items-center gap-1">
        {(['pc', 'xbox', 'psn'] as const).map((p) => (
          <button
            key={p}
            onClick={() => onUpdate(side, index, { platform: p })}
            className={`p-1.5 border hud-border transition-all ${player.platform === p ? (theme === 'purple' ? 'bg-tactical-purple text-white border-tactical-purple' : 'bg-tactical-accent text-white border-tactical-accent') : 'border-white/10 text-white/20 hover:text-white/40'}`}
            title={p.toUpperCase()}
          >
            {p === 'pc' ? <Monitor className="w-2.5 h-2.5" /> : <Gamepad2 className="w-2.5 h-2.5" />}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const OPERATORS: Operator[] = [
  { id: '1', name: 'VANGUARD', role: 'attacker', icon: Crosshair, color: 'text-tactical-accent' },
  { id: '2', name: 'BREACH', role: 'attacker', icon: Zap, color: 'text-tactical-accent' },
  { id: '3', name: 'GHOST', role: 'attacker', icon: Wind, color: 'text-tactical-accent' },
  { id: '4', name: 'SIGNAL', role: 'attacker', icon: Cpu, color: 'text-tactical-accent' },
  { id: '5', name: 'SCOPE', role: 'attacker', icon: Eye, color: 'text-tactical-accent' },
  { id: '6', name: 'SENTINEL', role: 'defender', icon: Shield, color: 'text-tactical-accent' },
  { id: '7', name: 'FORTRESS', role: 'defender', icon: Swords, color: 'text-tactical-accent' },
  { id: '8', name: 'RADAR', role: 'defender', icon: Eye, color: 'text-tactical-accent' },
  { id: '9', name: 'CIRCUIT', role: 'defender', icon: Cpu, color: 'text-tactical-accent' },
  { id: '10', name: 'PULSE', role: 'defender', icon: Zap, color: 'text-tactical-accent' },
];

const INITIAL_PLAYER: Player = { name: '', platform: 'pc' };

export default function Customs() {
  const [attackers, setAttackers] = useState<Player[]>(Array(5).fill(null).map(() => ({ ...INITIAL_PLAYER })));
  const [defenders, setDefenders] = useState<Player[]>(Array(5).fill(null).map(() => ({ ...INITIAL_PLAYER })));
  const [queue, setQueue] = useState<Player[]>(Array(10).fill(null).map(() => ({ ...INITIAL_PLAYER })));
  const [activeTab, setActiveTab] = useState<'roster' | 'queue' | 'maps'>('roster');
  const [selectedMap, setSelectedMap] = useState<string>('');

  const updatePlayer = (side: 'atk' | 'def' | 'queue', index: number, updates: Partial<Player>) => {
    if (side === 'atk') {
      const next = [...attackers];
      next[index] = { ...next[index], ...updates };
      setAttackers(next);
    } else if (side === 'def') {
      const next = [...defenders];
      next[index] = { ...next[index], ...updates };
      setDefenders(next);
    } else {
      const next = [...queue];
      next[index] = { ...next[index], ...updates };
      setQueue(next);
    }
  };

  const clearMatch = () => {
    setAttackers(Array(5).fill(null).map(() => ({ ...INITIAL_PLAYER })));
    setDefenders(Array(5).fill(null).map(() => ({ ...INITIAL_PLAYER })));
    setQueue(Array(10).fill(null).map(() => ({ ...INITIAL_PLAYER })));
  };

  return (
    <div className="h-full flex flex-col bg-tactical-black relative overflow-hidden">
      {/* View Toggle */}
      <div className="flex bg-tactical-gray/50 border-b border-tactical-accent/10">
        <button 
          onClick={() => setActiveTab('roster')}
          className={`px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all border-r border-tactical-accent/10 ${activeTab === 'roster' ? 'bg-tactical-accent/20 text-white border-b-2 border-b-tactical-accent' : 'text-tactical-muted hover:text-white'}`}
        >
          Active Roster
        </button>
        <button 
          onClick={() => setActiveTab('queue')}
          className={`px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all border-r border-tactical-accent/10 ${activeTab === 'queue' ? 'bg-tactical-accent/20 text-white border-b-2 border-b-tactical-accent' : 'text-tactical-muted hover:text-white'}`}
        >
          Operations Queue
        </button>
        <button 
          onClick={() => setActiveTab('maps')}
          className={`px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all border-r border-tactical-accent/10 ${activeTab === 'maps' ? 'bg-tactical-accent/20 text-white border-b-2 border-b-tactical-accent' : 'text-tactical-muted hover:text-white'}`}
        >
          Map Selection
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'roster' ? (
            <motion.div 
              key="roster"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full grid grid-cols-1 md:grid-cols-2 gap-px bg-tactical-accent/10 relative"
            >
              {/* Central Divider Decor */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-tactical-accent/50 via-tactical-purple/50 to-tactical-accent/50 hidden md:block z-20" />
              
              {/* DEFENDERS (LEFT) */}
              <div className="bg-tactical-black p-8 flex flex-col gap-6 relative overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-tactical-purple/10 border-2 border-tactical-purple p-2 hud-border">
                      <Shield className="w-full h-full text-tactical-purple" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black uppercase italic tracking-tighter text-tactical-purple">Defenders</h2>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {defenders.map((player, i) => (
                    <PlayerSlot key={`def-${i}`} side="def" index={i} player={player} theme="purple" onUpdate={updatePlayer} />
                  ))}
                </div>
              </div>

              {/* ATTACKERS (RIGHT) */}
              <div className="bg-tactical-black p-8 flex flex-col gap-6 relative overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between md:flex-row-reverse">
                  <div className="flex items-center gap-4 md:flex-row-reverse md:text-right">
                    <div className="w-12 h-12 bg-tactical-accent/10 border-2 border-tactical-accent p-2 hud-border">
                      <Crosshair className="w-full h-full text-tactical-accent" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black uppercase italic tracking-tighter text-tactical-accent">Attackers</h2>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {attackers.map((player, i) => (
                    <PlayerSlot key={`atk-${i}`} side="atk" index={i} player={player} theme="teal" onUpdate={updatePlayer} />
                  ))}
                </div>
              </div>
            </motion.div>
          ) : activeTab === 'queue' ? (
            <motion.div 
              key="queue"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full bg-tactical-black p-8 overflow-y-auto custom-scrollbar"
            >
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-tactical-purple/10 border-2 border-tactical-purple p-2 hud-border">
                      <Users className="w-full h-full text-tactical-purple" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black uppercase italic tracking-tighter text-tactical-purple">Operations Queue</h2>
                      <p className="text-[10px] font-mono tracking-widest text-tactical-muted uppercase">Waiting for field deployment // ID confirmation.</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setQueue(Array(10).fill(null).map(() => ({ ...INITIAL_PLAYER })))}
                      className="px-4 py-2 border border-tactical-purple/20 text-tactical-purple text-[10px] font-black uppercase tracking-widest hover:bg-tactical-purple/10 transition-all hud-border"
                    >
                      Clear All
                    </button>
                    <button 
                      onClick={() => setQueue([...queue].sort(() => Math.random() - 0.5))}
                      className="px-4 py-2 bg-tactical-purple text-white text-[10px] font-black uppercase tracking-widest hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all hud-border"
                    >
                      Shuffle Queue
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {queue.map((player, i) => (
                    <PlayerSlot key={`queue-${i}`} side="queue" index={i} player={player} theme="teal" onUpdate={updatePlayer} />
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="maps"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="h-full bg-tactical-black p-8 overflow-y-auto custom-scrollbar"
            >
              <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-tactical-accent/10 border-2 border-tactical-accent p-2 hud-border">
                    <MapIcon className="w-full h-full text-tactical-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter text-tactical-accent">Tactical Sites</h2>
                    <p className="text-[10px] font-mono tracking-widest text-tactical-muted uppercase">Selection required for breach operation.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {MAPS.map((map) => (
                    <motion.div
                      key={map}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedMap(map)}
                      className={`relative aspect-video hud-border border cursor-pointer overflow-hidden group transition-all duration-300 ${selectedMap === map ? 'border-tactical-accent bg-tactical-accent/10 shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'border-tactical-accent/20 bg-tactical-gray/40 hover:border-tactical-accent/50'}`}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)] z-10" />
                      
                      {/* Placeholder for map visual style */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                        <MapIcon className="w-12 h-12 text-tactical-accent" />
                      </div>

                      <div className="absolute inset-0 p-4 flex flex-col justify-end z-20">
                        <span className={`text-[10px] font-mono tracking-widest uppercase mb-1 transition-colors ${selectedMap === map ? 'text-white' : 'text-tactical-accent/60'}`}>
                          {selectedMap === map ? 'SELECTED_SITE' : 'AVAILABLE_SITE'}
                        </span>
                        <h3 className={`text-sm font-black uppercase tracking-tighter transition-colors ${selectedMap === map ? 'text-white' : 'text-tactical-accent'}`}>
                          {map}
                        </h3>
                      </div>

                      {selectedMap === map && (
                        <motion.div 
                          layoutId="map-selection-glow"
                          className="absolute inset-0 border-2 border-tactical-accent z-30 pointer-events-none"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>

                {selectedMap && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-tactical-accent/5 border border-tactical-accent/20 hud-border text-center"
                  >
                    <p className="text-[10px] font-mono tracking-[0.5em] text-tactical-accent uppercase mb-2">Confirmed Objective</p>
                    <h3 className="text-4xl font-black uppercase italic tracking-tighter text-white">{selectedMap}</h3>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Controls */}
      <div className="p-4 bg-tactical-gray/30 border-t border-tactical-accent/10 flex items-center justify-center gap-4 z-30">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearMatch}
          className="bg-tactical-gray/80 border border-tactical-accent/20 text-tactical-muted hover:text-white px-6 py-2 hud-border flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all"
        >
          <RotateCcw className="w-3 h-3" /> Reset Session
        </motion.button>
      </div>
    </div>
  );
}
