'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface Player {
  name: string;
  position: string;
  number: number;
  country: string;
  goals: number;
  assists: number;
  matches: number;
}

const players: Player[] = [
  { name: 'Lucas Mendes', position: 'Goleiro', number: 1, country: '🇧🇷', goals: 0, assists: 0, matches: 28 },
  { name: 'Rafael Torres', position: 'Lateral Direito', number: 2, country: '🇧🇷', goals: 2, assists: 7, matches: 30 },
  { name: 'Matheus Silva', position: 'Zagueiro', number: 4, country: '🇧🇷', goals: 3, assists: 1, matches: 32 },
  { name: 'Carlos Eduardo', position: 'Zagueiro', number: 5, country: '🇧🇷', goals: 1, assists: 0, matches: 29 },
  { name: 'Fernando Lima', position: 'Lateral Esquerdo', number: 6, country: '🇧🇷', goals: 1, assists: 9, matches: 31 },
  { name: 'André Santos', position: 'Volante', number: 8, country: '🇧🇷', goals: 4, assists: 6, matches: 33 },
  { name: 'Diego Alves', position: 'Volante', number: 10, country: '🇧🇷', goals: 8, assists: 12, matches: 34 },
  { name: 'Thiago Neves', position: 'Meia', number: 7, country: '🇧🇷', goals: 11, assists: 8, matches: 30 },
  { name: 'Pedro Henrique', position: 'Meia-Atacante', number: 14, country: '🇧🇷', goals: 15, assists: 10, matches: 32 },
  { name: 'Gustavo Barros', position: 'Extremo', number: 11, country: '🇧🇷', goals: 12, assists: 14, matches: 31 },
  { name: 'Victor Ramos', position: 'Centroavante', number: 9, country: '🇧🇷', goals: 22, assists: 5, matches: 33 },
  { name: 'Bruno Costa', position: 'Centroavante', number: 17, country: '🇧🇷', goals: 9, assists: 3, matches: 26 },
];

const stagger = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
};

export default function Team() {
  const [hoveredPlayer, setHoveredPlayer] = useState<number | null>(null);

  return (
    <section id="elenco" className="section-dark relative py-16 md:py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#3FA9F5]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#3FA9F5]/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-[#3FA9F5] font-semibold text-sm tracking-widest uppercase mb-3 block">
            Nosso Time
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            O <span className="text-[#3FA9F5]">Elenco</span> Piquiriense
          </h2>
          <div className="w-20 h-1 bg-[#3FA9F5] mx-auto rounded-full mb-6" />
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base">
            Atletas dedicados que vestem o manto azul e branco com orgulho e determinação.
            Cada jogador traz seu talento para construir a história do Piquiri.
          </p>
        </motion.div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 md:mb-16"
        >
          {[
            { label: 'Jogadores', value: '24' },
            { label: 'Gols na Temporada', value: '88' },
            { label: 'Assistências', value: '75' },
            { label: 'Jogos Disputados', value: '36' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-6 text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#3FA9F5] mb-1">{stat.value}</div>
              <div className="text-white/50 text-xs md:text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Players Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {players.map((player, index) => (
            <motion.div
              key={player.number}
              {...stagger}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="player-card bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredPlayer(player.number)}
              onMouseLeave={() => setHoveredPlayer(null)}
            >
              {/* Player Image */}
              <div className="relative aspect-[3/4] bg-gradient-to-b from-[#1E3A5F] to-[#0A1F44] overflow-hidden">
                <Image
                  src="/player-placeholder.jpg"
                  alt={player.name}
                  fill
                  className="object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-90"
                />
                {/* Number overlay */}
                <div className="absolute top-2 right-2 bg-[#3FA9F5] text-white font-bold text-xl w-9 h-9 rounded-lg flex items-center justify-center shadow-lg">
                  {player.number}
                </div>
                {/* Position badge */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A1F44] to-transparent p-3 pt-10">
                  <span className="text-[#3FA9F5] text-xs font-medium">{player.position}</span>
                </div>
              </div>

              {/* Player Info */}
              <div className="p-3 md:p-4">
                <h3 className="text-white font-semibold text-sm md:text-base truncate">{player.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm">{player.country}</span>
                </div>
              </div>

              {/* Stats on hover */}
              <motion.div
                initial={false}
                animate={{
                  height: hoveredPlayer === player.number ? 'auto' : 0,
                  opacity: hoveredPlayer === player.number ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-3 md:px-4 pb-3 md:pb-4 pt-1 border-t border-white/10">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-[#3FA9F5] font-bold text-sm">{player.goals}</div>
                      <div className="text-white/40 text-[10px]">GOLS</div>
                    </div>
                    <div>
                      <div className="text-[#3FA9F5] font-bold text-sm">{player.assists}</div>
                      <div className="text-white/40 text-[10px]">ASSIST</div>
                    </div>
                    <div>
                      <div className="text-[#3FA9F5] font-bold text-sm">{player.matches}</div>
                      <div className="text-white/40 text-[10px]">JOGOS</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
