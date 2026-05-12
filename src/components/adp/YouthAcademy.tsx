'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, Sprout, TrendingUp, Trophy } from 'lucide-react';

interface YouthPlayer {
  id: string;
  name: string;
  position: string;
  number: number;
  photo: string;
  sport: string;
  team: string;
  goals: number;
  assists: number;
  matches: number;
}

const sportConfig: Record<string, { label: string; icon: string; color: string; goalsLabel: string }> = {
  football: { label: 'Futebol', icon: '⚽', color: '#059669', goalsLabel: 'GOLS' },
  volleyball: { label: 'Vôlei', icon: '🏐', color: '#10B981', goalsLabel: 'ACES' },
  basketball: { label: 'Basquete', icon: '🏀', color: '#34D399', goalsLabel: 'PONTOS' },
};

const sportOrder = ['football', 'volleyball', 'basketball'];

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
};

export default function YouthAcademy() {
  const [players, setPlayers] = useState<YouthPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredPlayer, setHoveredPlayer] = useState<string | null>(null);

  useEffect(() => {
    async function fetchYouth() {
      try {
        const res = await fetch('/api/players?team=youth');
        if (res.ok) {
          const data = await res.json();
          setPlayers(data);
        }
      } catch (error) {
        console.error('Error fetching youth players:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchYouth();
  }, []);

  // Group players by sport
  const playersBySport = sportOrder.reduce((acc, sport) => {
    const filtered = players.filter(p => p.sport === sport);
    if (filtered.length > 0) {
      acc[sport] = filtered;
    }
    return acc;
  }, {} as Record<string, YouthPlayer[]>);

  const totalPlayers = players.length;
  const totalGoals = players.reduce((sum, p) => sum + p.goals, 0);
  const totalAssists = players.reduce((sum, p) => sum + p.assists, 0);
  const sportCount = Object.keys(playersBySport).length;

  return (
    <section id="base" className="relative overflow-hidden bg-gradient-to-b from-white to-emerald-50/50 dark:from-[#050E1F] dark:to-[#0A1F44]/50">
      {/* Wave Divider Top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path fill="#0A1F44" className="dark:fill-[#050E1F]" d="M0,0L1440,80L1440,0L0,0Z" />
        </svg>
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-10 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-10 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-8 md:pb-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
            <Sprout className="w-3.5 h-3.5" />
            Formação de Atletas
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Categoria de Base
          </h2>
          <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            O programa de formação da ADP identifica e desenvolve jovens talentos do oeste paranaense.
            Com acompanhamento técnico especializado, nossos atletas da base são preparados para
            competir em alto nível e, no futuro, integrar as equipes profissionais do clube.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16 max-w-3xl mx-auto"
        >
          {[
            { icon: Users, label: 'Atletas', value: totalPlayers || '—', color: 'text-emerald-600' },
            { icon: Trophy, label: 'Modalidades', value: sportCount || '—', color: 'text-emerald-600' },
            { icon: TrendingUp, label: 'Gols/Pontos', value: totalGoals || '0', color: 'text-emerald-600' },
            { icon: Users, label: 'Assistências', value: totalAssists || '0', color: 'text-emerald-600' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-[#0A1F44] border border-emerald-200/60 dark:border-white/10 rounded-xl p-4 md:p-5 text-center shadow-sm">
              <div className={`text-2xl md:text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
              <div className="text-muted-foreground text-[10px] md:text-xs font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Players by Sport */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-16 relative z-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-[#0A1F44] rounded-xl border border-emerald-200/60 dark:border-white/10 p-6">
                <Skeleton className="h-6 w-1/2 mb-4" />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j}>
                      <Skeleton className="aspect-square w-full rounded-lg mb-2" />
                      <Skeleton className="h-3 w-3/4" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : totalPlayers > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {sportOrder.map((sport) => {
              const sportPlayers = playersBySport[sport];
              if (!sportPlayers) return null;
              const config = sportConfig[sport];

              return (
                <motion.div
                  key={sport}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: sportOrder.indexOf(sport) * 0.1 }}
                  className="bg-white dark:bg-[#0A1F44] rounded-xl border border-emerald-200/60 dark:border-white/10 p-4 md:p-6 shadow-sm"
                >
                  {/* Sport Sub-header */}
                  <div className="text-center mb-5">
                    <span className="text-2xl md:text-3xl block mb-1">{config.icon}</span>
                    <h3 className="text-lg md:text-xl font-bold text-foreground">{config.label}</h3>
                    <p className="text-muted-foreground text-xs">{sportPlayers.length} atletas</p>
                  </div>

                  {/* Players */}
                  <div className="space-y-2.5">
                    {sportPlayers.map((player) => (
                      <motion.div
                        key={player.id}
                        {...stagger}
                        transition={{ duration: 0.3, delay: 0.05 }}
                        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-emerald-50/80 dark:hover:bg-emerald-500/10 transition-colors cursor-pointer group"
                        onMouseEnter={() => setHoveredPlayer(player.id)}
                        onMouseLeave={() => setHoveredPlayer(null)}
                      >
                        {/* Number Badge */}
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm"
                          style={{ backgroundColor: config.color }}
                        >
                          {player.number}
                        </div>
                        {/* Player Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-xs md:text-sm text-foreground truncate">{player.name}</h4>
                          <p className="text-muted-foreground text-[10px] md:text-xs truncate">{player.position}</p>
                        </div>
                        {/* Stats (shown on hover or always on md) */}
                        <div className={`flex gap-2 text-[10px] transition-opacity duration-200 ${hoveredPlayer === player.id ? 'opacity-100' : 'opacity-60 hidden md:flex'}`}>
                          <span className="font-bold" style={{ color: config.color }}>{player.goals}</span>
                          <span className="text-muted-foreground">{config.goalsLabel}</span>
                          <span className="text-muted-foreground mx-0.5">·</span>
                          <span className="font-bold text-emerald-600">{player.assists}</span>
                          <span className="text-muted-foreground">ASSIST</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <Sprout className="w-12 h-12 text-emerald-300 mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">
              Nenhum atleta da base cadastrado ainda.
            </p>
          </div>
        )}
      </div>

      {/* CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-xl p-6 md:p-8 text-center text-white shadow-lg"
        >
          <h3 className="text-lg md:text-xl font-bold mb-2">
            Quer fazer parte da base da ADP?
          </h3>
          <p className="text-emerald-100 text-sm max-w-lg mx-auto mb-4">
            Entre em contato conosco e descubra como participar das selecões
            de novas revelações do esporte piquiriense.
          </p>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            Entrar em Contato
          </a>
        </motion.div>
      </div>

      {/* Wave Divider Bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path fill="#0A1F44" className="dark:fill-[#050E1F]" d="M0,80L1440,0L1440,80L0,80Z" />
        </svg>
      </div>
    </section>
  );
}
