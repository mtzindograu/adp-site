'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Clock, Users, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

type SportKey = 'football' | 'volleyball' | 'basketball';

interface Player {
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

interface Match {
  id: string;
  homeTeam: string;
  opponent: string;
  date: string;
  time: string;
  competition: string;
  venue: string;
  sport: string;
  team: string;
  homeScore: number | null;
  awayScore: number | null;
  status: string;
}

interface SportSectionProps {
  sport: SportKey;
  title: string;
  icon: string;
  description: string;
  isMain: boolean;
  team?: string;
}

const sportLabels: Record<SportKey, string> = {
  football: 'Futebol',
  volleyball: 'Vôlei',
  basketball: 'Basquete',
};

const sportColors: Record<SportKey, { primary: string; secondary: string }> = {
  football: { primary: '#3FA9F5', secondary: '#0A1F44' },
  volleyball: { primary: '#F59E0B', secondary: '#1E3A5F' },
  basketball: { primary: '#EF4444', secondary: '#1E3A5F' },
};

const statLabels: Record<SportKey, { goals: string; assists: string; matches: string }> = {
  football: { goals: 'GOLS', assists: 'ASSIST', matches: 'JOGOS' },
  volleyball: { goals: 'ACES', assists: 'ASSIST', matches: 'SETS' },
  basketball: { goals: 'PONTOS', assists: 'ASSIST', matches: 'JOGOS' },
};

const stagger = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
};

export default function SportSection({ sport, title, icon, description, isMain, team }: SportSectionProps) {
  const [malePlayers, setMalePlayers] = useState<Player[]>([]);
  const [mixedPlayers, setMixedPlayers] = useState<Player[]>([]);
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredPlayer, setHoveredPlayer] = useState<string | null>(null);
  const colors = sportColors[sport];

  const isBasketballDual = sport === 'basketball';

  useEffect(() => {
    async function fetchData() {
      try {
        if (isBasketballDual) {
          // Fetch both basketball teams
          const [maleRes, mixedRes, matchesMaleRes, matchesMixedRes] = await Promise.all([
            fetch('/api/players?sport=basketball&team=basketball_male'),
            fetch('/api/players?sport=basketball&team=basketball_mixed'),
            fetch('/api/matches?sport=basketball&team=basketball_male&status=upcoming'),
            fetch('/api/matches?sport=basketball&team=basketball_mixed&status=upcoming'),
          ]);
          if (maleRes.ok) setMalePlayers(await maleRes.json());
          if (mixedRes.ok) setMixedPlayers(await mixedRes.json());
          const maleMatches = matchesMaleRes.ok ? await matchesMaleRes.json() : [];
          const mixedMatches = matchesMixedRes.ok ? await matchesMixedRes.json() : [];
          setMatches([...maleMatches, ...mixedMatches]);
        } else {
          const teamParam = team || 'professional';
          const [playersRes, matchesRes] = await Promise.all([
            fetch(`/api/players?sport=${sport}&team=${teamParam}`),
            fetch(`/api/matches?sport=${sport}&team=${teamParam}&status=upcoming`),
          ]);
          if (playersRes.ok) {
            const data = await playersRes.json();
            setAllPlayers(data);
          }
          if (matchesRes.ok) setMatches(await matchesRes.json());
        }
      } catch (error) {
        console.error(`Error fetching ${sport} data:`, error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [sport, team, isBasketballDual]);

  const displayPlayers = isBasketballDual ? [...malePlayers, ...mixedPlayers] : allPlayers;
  const totalGoals = displayPlayers.reduce((sum, p) => sum + p.goals, 0);
  const totalAssists = displayPlayers.reduce((sum, p) => sum + p.assists, 0);
  const totalMatches = displayPlayers.reduce((sum, p) => sum + p.matches, 0);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
  };

  if (isMain) {
    return (
      <section id={sport === 'football' ? 'futebol' : sport} className="section-dark relative py-16 md:py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#3FA9F5]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#3FA9F5]/3 rounded-full blur-3xl" />
        </div>

        {/* Wave Divider Top */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
            <path fill="#ffffff" className="dark:fill-[#0A1F44]" d="M0,80L1440,0L1440,80L0,80Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-8 md:pb-16 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="text-4xl md:text-5xl mb-3 block">{icon}</span>
            <span className="text-[#3FA9F5] font-semibold text-sm tracking-widest uppercase mb-3 block">
              Modalidade Principal
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
              {title}
            </h2>
            <div className="w-20 h-1 bg-[#3FA9F5] mx-auto rounded-full mb-6" />
            <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base">
              {description}
            </p>
          </motion.div>

          {/* Sport Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 md:mb-16"
          >
            {[
              { icon: Users, label: 'Atletas', value: displayPlayers.length || '—' },
              { icon: Trophy, label: statLabels[sport].goals, value: totalGoals || '0' },
              { icon: Trophy, label: statLabels[sport].assists, value: totalAssists || '0' },
              { icon: Calendar, label: 'Jogos', value: totalMatches || '0' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-6 text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#3FA9F5] mb-1">{stat.value}</div>
                <div className="text-white/50 text-xs md:text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Players Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-16 relative z-10">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <Skeleton className="aspect-[3/4] w-full" />
                  <div className="p-3 md:p-4 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : displayPlayers.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
              {displayPlayers.map((player, index) => (
                <motion.div
                  key={player.id}
                  {...stagger}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="player-card bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer"
                  onMouseEnter={() => setHoveredPlayer(player.id)}
                  onMouseLeave={() => setHoveredPlayer(null)}
                >
                  {/* Player Image */}
                  <div className="relative aspect-[3/4] bg-gradient-to-b from-[#1E3A5F] to-[#0A1F44] overflow-hidden">
                    {player.photo ? (
                      <Image
                        src={player.photo}
                        alt={player.name}
                        fill
                        className="object-cover opacity-70"
                      />
                    ) : (
                      <Image
                        src="/player-placeholder.jpg"
                        alt={player.name}
                        fill
                        className="object-cover opacity-70"
                      />
                    )}
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
                  </div>

                  {/* Stats on hover */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: hoveredPlayer === player.id ? 'auto' : 0,
                      opacity: hoveredPlayer === player.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 md:px-4 pb-3 md:pb-4 pt-1 border-t border-white/10">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-[#3FA9F5] font-bold text-sm">{player.goals}</div>
                          <div className="text-white/40 text-[10px]">{statLabels[sport].goals}</div>
                        </div>
                        <div>
                          <div className="text-[#3FA9F5] font-bold text-sm">{player.assists}</div>
                          <div className="text-white/40 text-[10px]">{statLabels[sport].assists}</div>
                        </div>
                        <div>
                          <div className="text-[#3FA9F5] font-bold text-sm">{player.matches}</div>
                          <div className="text-white/40 text-[10px]">{statLabels[sport].matches}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/40 text-sm">
                {icon} Nenhum atleta cadastrado no {sportLabels[sport]} ainda.
              </p>
            </div>
          )}
        </div>

        {/* Upcoming Matches */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-center text-white mb-6 md:mb-8">
              Próximos Jogos — <span className="text-[#3FA9F5]">{sportLabels[sport]}</span>
            </h3>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <Skeleton className="h-5 w-1/3 mx-auto mb-4" />
                    <Skeleton className="h-4 w-2/3 mx-auto mb-2" />
                    <Skeleton className="h-3 w-1/2 mx-auto" />
                  </div>
                ))}
              </div>
            ) : matches.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {matches.map((match, index) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-6 text-center card-hover"
                  >
                    <div className="flex items-center justify-center gap-3 md:gap-4 mb-3">
                      <div className="text-center">
                        <span className={`font-bold text-base md:text-lg ${
                          match.venue === 'Casa' ? 'text-[#3FA9F5]' : 'text-white'
                        }`}>
                          {match.homeTeam}
                        </span>
                      </div>
                      <span className="text-white/30 font-bold text-sm">VS</span>
                      <div className="text-center">
                        <span className={`font-bold text-base md:text-lg ${
                          match.venue === 'Fora' ? 'text-[#3FA9F5]' : 'text-white'
                        }`}>
                          {match.opponent}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-white/50 text-xs">{match.competition}</p>
                      <p className="text-white font-semibold text-sm">{formatDate(match.date)} · {match.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-white/40 text-sm">
                  Nenhum jogo agendado no momento.
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Wave Divider Bottom */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
            <path fill="#ffffff" className="dark:fill-[#0A1F44]" d="M0,0L1440,80L1440,0L0,0Z" />
          </svg>
        </div>
      </section>
    );
  }

  // Compact version for volleyball / basketball
  return (
    <section id={sport === 'volleyball' ? 'volei' : sport} className="section-light water-texture relative">
      {/* Wave Divider Top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path fill="#0A1F44" className="dark:fill-[#050E1F]" d="M0,0L1440,80L1440,0L0,0Z" />
        </svg>
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
          <span className="text-3xl md:text-4xl mb-2 block">{icon}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 md:mb-4">
            {title}
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full mb-4" style={{ backgroundColor: colors.primary }} />
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            {description}
          </p>
        </motion.div>

        {/* Compact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 gap-3 md:gap-4 mb-10 md:mb-14 max-w-2xl mx-auto"
        >
          {[
            { label: 'Atletas', value: displayPlayers.length || '—' },
            { label: statLabels[sport].goals, value: totalGoals || '0' },
            { label: statLabels[sport].assists, value: totalAssists || '0' },
          ].map((stat) => (
            <div key={stat.label} className="border border-border rounded-xl p-3 md:p-4 text-center bg-card">
              <div className="text-xl md:text-2xl font-bold mb-0.5" style={{ color: colors.primary }}>{stat.value}</div>
              <div className="text-muted-foreground text-[10px] md:text-xs">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Players Grid - Compact (with basketball dual-team support) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12 relative z-10">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
                <Skeleton className="aspect-square w-full" />
                <div className="p-2 space-y-1">
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-2 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : isBasketballDual ? (
          /* Basketball: Two sub-sections */
          <div className="space-y-10 md:space-y-14">
            {/* Male Team */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-6"
              >
                <h3 className="text-xl md:text-2xl font-bold text-foreground">
                  Time Masculino
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm mt-1">
                  {malePlayers.length} atletas · Equipe de elite do basquete ADP
                </p>
              </motion.div>
              {malePlayers.length > 0 ? (
                <PlayerGrid players={malePlayers} sport={sport} colors={colors} hoveredPlayer={hoveredPlayer} setHoveredPlayer={setHoveredPlayer} />
              ) : (
                <p className="text-center text-muted-foreground text-sm py-8">Nenhum atleta cadastrado.</p>
              )}
            </div>

            {/* Mixed Team */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-6"
              >
                <h3 className="text-xl md:text-2xl font-bold text-foreground">
                  Time Misto
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm mt-1">
                  {mixedPlayers.length} atletas · Integrando talentos masculinos e femininos
                </p>
              </motion.div>
              {mixedPlayers.length > 0 ? (
                <PlayerGrid players={mixedPlayers} sport={sport} colors={colors} hoveredPlayer={hoveredPlayer} setHoveredPlayer={setHoveredPlayer} />
              ) : (
                <p className="text-center text-muted-foreground text-sm py-8">Nenhum atleta cadastrado.</p>
              )}
            </div>
          </div>
        ) : displayPlayers.length > 0 ? (
          <PlayerGrid players={displayPlayers} sport={sport} colors={colors} hoveredPlayer={hoveredPlayer} setHoveredPlayer={setHoveredPlayer} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-sm">
              {icon} Nenhum atleta cadastrado no {sportLabels[sport]} ainda.
            </p>
          </div>
        )}
      </div>

      {/* Upcoming Matches - Compact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-16 relative z-10">
        {matches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg md:text-xl font-bold text-center text-foreground mb-4 md:mb-6">
              Próximos Jogos
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto">
              {matches.map((match) => (
                <div key={match.id} className="bg-card border border-border rounded-xl p-4 text-center card-hover">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className={`font-bold text-sm ${match.venue === 'Casa' ? '' : 'text-muted-foreground'}`} style={match.venue === 'Casa' ? { color: colors.primary } : undefined}>
                      {match.homeTeam}
                    </span>
                    <span className="text-muted-foreground text-xs font-bold">VS</span>
                    <span className={`font-bold text-sm ${match.venue === 'Fora' ? '' : 'text-muted-foreground'}`} style={match.venue === 'Fora' ? { color: colors.primary } : undefined}>
                      {match.opponent}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs">{match.competition}</p>
                  <p className="text-foreground text-xs font-medium">{formatDate(match.date)} · {match.time}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
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

/* Reusable Player Grid Component for compact view */
function PlayerGrid({
  players,
  sport,
  colors,
  hoveredPlayer,
  setHoveredPlayer,
}: {
  players: Player[];
  sport: SportKey;
  colors: { primary: string; secondary: string };
  hoveredPlayer: string | null;
  setHoveredPlayer: (id: string | null) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {players.map((player, index) => (
        <motion.div
          key={player.id}
          {...stagger}
          transition={{ duration: 0.4, delay: index * 0.04 }}
          className="bg-card border border-border rounded-xl overflow-hidden card-hover group"
          onMouseEnter={() => setHoveredPlayer(player.id)}
          onMouseLeave={() => setHoveredPlayer(null)}
        >
          {/* Player Image - Square */}
          <div className="relative aspect-square bg-gradient-to-b from-muted to-card overflow-hidden">
            {player.photo ? (
              <Image src={player.photo} alt={player.name} fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-card">
                <span className="text-3xl font-bold text-muted-foreground/30">#{player.number}</span>
              </div>
            )}
            {/* Number badge */}
            <div className="absolute top-1.5 right-1.5 w-7 h-7 rounded-md flex items-center justify-center text-white text-sm font-bold shadow-md" style={{ backgroundColor: colors.primary }}>
              {player.number}
            </div>
          </div>
          {/* Info */}
          <div className="p-2.5">
            <h4 className="font-semibold text-xs md:text-sm text-foreground truncate">{player.name}</h4>
            <p className="text-muted-foreground text-[10px] md:text-xs truncate">{player.position}</p>
            {/* Stats on hover */}
            <motion.div
              initial={false}
              animate={{
                height: hoveredPlayer === player.id ? 'auto' : 0,
                opacity: hoveredPlayer === player.id ? 1 : 0,
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-2 mt-2 border-t border-border grid grid-cols-3 gap-1 text-center">
                <div>
                  <div className="font-bold text-xs" style={{ color: colors.primary }}>{player.goals}</div>
                  <div className="text-muted-foreground text-[8px]">{statLabels[sport].goals}</div>
                </div>
                <div>
                  <div className="font-bold text-xs" style={{ color: colors.primary }}>{player.assists}</div>
                  <div className="text-muted-foreground text-[8px]">{statLabels[sport].assists}</div>
                </div>
                <div>
                  <div className="font-bold text-xs" style={{ color: colors.primary }}>{player.matches}</div>
                  <div className="text-muted-foreground text-[8px]">{statLabels[sport].matches}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
