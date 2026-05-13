import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Users, ArrowRight } from 'lucide-react';

interface MainMenuProps {
  onSelect: (view: any) => void;
}

export default function MainMenu({ onSelect }: MainMenuProps) {
  const menuItems = [
    {
      id: 'tourney',
      title: 'Tourney Brackets',
      description: 'Generate and manage competitive tournament structures.',
      icon: Trophy,
      color: 'tactical-accent',
      bgImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'customs',
      title: 'Customs',
      description: 'Host localized 5v5 matches with specialized rulesets.',
      icon: Users,
      color: 'tactical-accent',
      bgImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="h-full flex items-center justify-center p-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full h-[60vh]">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10 }}
            onClick={() => onSelect(item.id)}
            className="group relative cursor-pointer overflow-hidden hud-border border-tactical-accent/20"
          >
            {/* Background Image with Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-30 group-hover:opacity-50"
              style={{ backgroundImage: `url(${item.bgImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-tactical-black via-tactical-black/60 to-transparent" />
            
            {/* Hover Glow Effect */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-tactical-accent/50 to-transparent group-hover:via-tactical-accent transition-all duration-500" />
            
            <div className="relative h-full p-8 flex flex-col justify-end gap-4 z-10 transition-transform duration-500">
              <div className={`p-4 w-fit bg-tactical-gray/80 backdrop-blur-sm border border-tactical-accent/30 transform group-hover:-translate-y-2 transition-transform`}>
                <item.icon className={`w-8 h-8 text-tactical-accent`} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-black uppercase tracking-tight leading-none group-hover:text-tactical-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-tactical-muted font-mono leading-relaxed max-w-[200px]">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <span className="text-[10px] font-mono tracking-[0.3em] font-bold text-tactical-accent uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Enter Module
                </span>
                <ArrowRight className="w-4 h-4 text-tactical-accent transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
              </div>
            </div>

            {/* Tactical UI Decals */}
            <div className="absolute top-4 right-4 text-[10px] font-mono text-tactical-accent/20 pointer-events-none uppercase">
              MOD_{item.id.toUpperCase()}_0{index + 1}
            </div>
            <div className="absolute bottom-4 right-4 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
              <svg width="40" height="40" viewBox="0 0 40 40">
                <rect x="0" y="0" width="4" height="4" fill="currentColor" />
                <rect x="36" y="0" width="4" height="4" fill="currentColor" />
                <rect x="0" y="36" width="4" height="4" fill="currentColor" />
                <rect x="36" y="36" width="4" height="4" fill="currentColor" />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
