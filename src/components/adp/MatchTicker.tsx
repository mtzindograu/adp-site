'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface Match {
  id: string;
  homeTeam: string;
  opponent: string;
  date: string;
  time: string;
  competition: string;
  venue: string;
  sport: string;
  homeScore: number | null;
  awayScore: number | null;
  status: string;
}

const sportLabels: Record<string, { label: string; icon: string; color: string }> = {
  football: { label: 'Futebol', icon: '⚽', color: '#3FA9F5' },
  volleyball: { label: 'Vôlei', icon: '🏐', color: '#F59E0B' },
  basketball: { label: 'Basquete', icon: '🏀', color: '#EF4444' },
};

export default function MatchTicker() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const sports = ['football', 'volleyball', 'basketball'];
        const results = await Promise.all(
          sports.map(async (sport) => {
            const res = await fetch(`/api/matches?sport=${sport}&status=upcoming`);
            if (res.ok) {
              const data = await res.json();
              return data.map((m: Match) => ({ ...m, sport }));
            }
            return [];
          })
        );
        setMatches(results.flat().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchMatches();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
  };

  return (
    <section className="bg-gradient-to-r from-[#0A1F44] via-[#0F2744] to-[#0A1F44] py-10 md:py-14 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#3FA9F5]/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-8"
        >
          <span className="text-[#3FA9F5] font-semibold text-sm tracking-widest uppercase mb-2 block">
            Próximos Jogos
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-white">
            Jogos da <span className="text-[#3FA9F5]">Semana</span>
          </h3>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-6">
                <Skeleton className="h-5 w-1/4 mx-auto mb-4" />
                <Skeleton className="h-4 w-2/3 mx-auto mb-2" />
                <Skeleton className="h-3 w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        ) : matches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {matches.map((match, index) => {
              const sportInfo = sportLabels[match.sport] || sportLabels.football;
              return (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-6 text-center card-hover"
                >
                  {/* Sport Badge */}
                  <span
                    className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-3 uppercase tracking-wider text-white"
                    style={{ backgroundColor: `${sportInfo.color}40`, color: sportInfo.color }}
                  >
                    {sportInfo.icon} {sportInfo.label}
                  </span>

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
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-white/40 text-sm">
              Nenhum jogo agendado no momento.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
