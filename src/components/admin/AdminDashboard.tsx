'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
  Users,
  Newspaper,
  Trophy,
  Calendar,
  Volleyball,
  CircleDot,
  TrendingUp,
  Star,
  Plus,
  FileText,
  Clock,
  Shirt,
} from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  sport: string;
  createdAt: string;
  featured: boolean;
}

interface MatchItem {
  id: string;
  opponent: string;
  date: string;
  time: string;
  sport: string;
  competition: string;
  status: string;
}

interface DashboardStats {
  footballPlayers: number;
  volleyballPlayers: number;
  basketballMalePlayers: number;
  basketballMixedPlayers: number;
  basePlayers: number;
  totalAthletes: number;
  totalNews: number;
  featuredNews: number;
  upcomingFootball: number;
  upcomingVolleyball: number;
  upcomingBasketball: number;
  totalUpcoming: number;
}

const sportBadgeColors: Record<string, string> = {
  football: 'bg-green-500/20 text-green-300 border-green-500/30',
  volleyball: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  basketball: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  general: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
};

const sportLabels: Record<string, string> = {
  football: 'Futebol',
  volleyball: 'Vôlei',
  basketball: 'Basquete',
  general: 'Geral',
};

const sportIcons: Record<string, React.ReactNode> = {
  football: <Shirt className="w-3 h-3" />,
  volleyball: <Volleyball className="w-3 h-3" />,
  basketball: <CircleDot className="w-3 h-3" />,
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentNews, setRecentNews] = useState<NewsItem[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<MatchItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const [
        footballP,
        volleyballP,
        basketballMaleP,
        basketballMixedP,
        baseFootballP,
        baseVolleyballP,
        baseBasketballP,
        news,
        footballM,
        volleyballM,
        basketballMaleM,
        basketballMixedM,
      ] = await Promise.all([
        fetch('/api/players?sport=football&team=professional').then((r) => r.json()),
        fetch('/api/players?sport=volleyball&team=professional').then((r) => r.json()),
        fetch('/api/players?sport=basketball&team=basketball_male').then((r) => r.json()),
        fetch('/api/players?sport=basketball&team=basketball_mixed').then((r) => r.json()),
        fetch('/api/players?sport=football&team=youth').then((r) => r.json()),
        fetch('/api/players?sport=volleyball&team=youth').then((r) => r.json()),
        fetch('/api/players?sport=basketball&team=youth').then((r) => r.json()),
        fetch('/api/news').then((r) => r.json()),
        fetch('/api/matches?sport=football&status=upcoming').then((r) => r.json()),
        fetch('/api/matches?sport=volleyball&status=upcoming').then((r) => r.json()),
        fetch('/api/matches?sport=basketball&status=upcoming&team=basketball_male').then((r) => r.json()),
        fetch('/api/matches?sport=basketball&status=upcoming&team=basketball_mixed').then((r) => r.json()),
      ]);

      const toArr = (v: unknown) => (Array.isArray(v) ? v : []);
      const fP = toArr(footballP);
      const vP = toArr(volleyballP);
      const bmP = toArr(basketballMaleP);
      const bxP = toArr(basketballMixedP);
      const baseP = toArr(baseFootballP).concat(toArr(baseVolleyballP), toArr(baseBasketballP));
      const newsArr = toArr(news);
      const fM = toArr(footballM);
      const vM = toArr(volleyballM);
      const bmM = toArr(basketballMaleM);
      const bxM = toArr(basketballMixedM);
      const allMatches = [...fM, ...vM, ...bmM, ...bxM].sort(
        (a: MatchItem, b: MatchItem) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

      const totalAthletes = fP.length + vP.length + bmP.length + bxP.length + baseP.length;

      setStats({
        footballPlayers: fP.length,
        volleyballPlayers: vP.length,
        basketballMalePlayers: bmP.length,
        basketballMixedPlayers: bxP.length,
        basePlayers: baseP.length,
        totalAthletes,
        totalNews: newsArr.length,
        featuredNews: newsArr.filter((n: NewsItem) => n.featured).length,
        upcomingFootball: fM.length,
        upcomingVolleyball: vM.length,
        upcomingBasketball: bmM.length + bxM.length,
        totalUpcoming: allMatches.length,
      });

      setRecentNews(
        newsArr
          .sort((a: NewsItem, b: NewsItem) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 3),
      );
      setUpcomingMatches(allMatches.slice(0, 3));
    } catch {
      // silently handle
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-64 mb-2 bg-slate-700" />
          <Skeleton className="h-4 w-96 max-w-full bg-slate-700" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl bg-slate-700/50" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Trophy className="w-6 h-6 text-[#3FA9F5]" />
          Painel de Controle
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl">
          Gerencie todo o conteúdo do site ADP. Adicione jogadores, crie notícias, agende jogos e acompanhe
          estatísticas do clube em tempo real.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Button
          className="h-auto py-4 bg-[#3FA9F5] hover:bg-[#2B8FD4] text-white flex flex-col items-center gap-2 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#3FA9F5]/20"
        >
          <Plus className="w-6 h-6" />
          <span className="text-sm font-semibold">Novo Jogador</span>
        </Button>
        <Button
          className="h-auto py-4 bg-amber-500 hover:bg-amber-600 text-white flex flex-col items-center gap-2 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/20"
        >
          <FileText className="w-6 h-6" />
          <span className="text-sm font-semibold">Nova Notícia</span>
        </Button>
        <Button
          className="h-auto py-4 bg-green-500 hover:bg-green-600 text-white flex flex-col items-center gap-2 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-green-500/20"
        >
          <Clock className="w-6 h-6" />
          <span className="text-sm font-semibold">Novo Jogo</span>
        </Button>
      </div>

      {/* Stats Overview */}
      <div>
        <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">
          Jogadores por Esporte
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard
            icon={<Users className="w-5 h-5" />}
            iconColor="text-[#3FA9F5]"
            iconBg="bg-[#3FA9F5]/10"
            label="Total Atletas"
            value={stats?.totalAthletes ?? 0}
          />
          <StatCard
            icon={<CircleDot className="w-5 h-5" />}
            iconColor="text-green-400"
            iconBg="bg-green-400/10"
            label="Futebol"
            value={stats?.footballPlayers ?? 0}
          />
          <StatCard
            icon={<Volleyball className="w-5 h-5" />}
            iconColor="text-yellow-400"
            iconBg="bg-yellow-400/10"
            label="Vôlei"
            value={stats?.volleyballPlayers ?? 0}
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5" />}
            iconColor="text-orange-400"
            iconBg="bg-orange-400/10"
            label="Basq. Masc."
            value={stats?.basketballMalePlayers ?? 0}
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5" />}
            iconColor="text-pink-400"
            iconBg="bg-pink-400/10"
            label="Basq. Misto"
            value={stats?.basketballMixedPlayers ?? 0}
          />
          <StatCard
            icon={<Star className="w-5 h-5" />}
            iconColor="text-purple-400"
            iconBg="bg-purple-400/10"
            label="Base"
            value={stats?.basePlayers ?? 0}
          />
        </div>
      </div>

      {/* Content & Matches */}
      <div>
        <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">
          Conteúdo & Jogos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<Newspaper className="w-5 h-5" />}
            iconColor="text-[#3FA9F5]"
            iconBg="bg-[#3FA9F5]/10"
            label="Notícias"
            value={stats?.totalNews ?? 0}
          />
          <StatCard
            icon={<Star className="w-5 h-5" />}
            iconColor="text-amber-400"
            iconBg="bg-amber-400/10"
            label="Destaque"
            value={stats?.featuredNews ?? 0}
          />
          <StatCard
            icon={<Calendar className="w-5 h-5" />}
            iconColor="text-green-400"
            iconBg="bg-green-400/10"
            label="Próx. Jogos"
            value={stats?.totalUpcoming ?? 0}
          />
          <StatCard
            icon={<Trophy className="w-5 h-5" />}
            iconColor="text-purple-400"
            iconBg="bg-purple-400/10"
            label="Total Atletas"
            value={stats?.totalAthletes ?? 0}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent News */}
        <Card className="bg-[#0A1F44]/60 border-[#1E3A5F]">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2 text-base">
              <Newspaper className="w-4 h-4 text-[#3FA9F5]" />
              Últimas Notícias
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentNews.length === 0 ? (
              <p className="text-slate-500 text-sm py-4 text-center">Nenhuma notícia cadastrada</p>
            ) : (
              <div className="space-y-3">
                {recentNews.map((news) => (
                  <div
                    key={news.id}
                    className="flex items-start justify-between gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white truncate">{news.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {new Date(news.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border flex-shrink-0 ${
                        sportBadgeColors[news.sport] || sportBadgeColors.general
                      }`}
                    >
                      {sportLabels[news.sport] || news.sport}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Matches */}
        <Card className="bg-[#0A1F44]/60 border-[#1E3A5F]">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2 text-base">
              <Calendar className="w-4 h-4 text-green-400" />
              Próximos Jogos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingMatches.length === 0 ? (
              <p className="text-slate-500 text-sm py-4 text-center">Nenhum jogo agendado</p>
            ) : (
              <div className="space-y-3">
                {upcomingMatches.map((match) => (
                  <div
                    key={match.id}
                    className="flex items-start justify-between gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white truncate">
                        ADP vs {match.opponent}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {new Date(match.date).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}{' '}
                        · {match.time}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border flex-shrink-0 ${
                        sportBadgeColors[match.sport] || sportBadgeColors.general
                      }`}
                    >
                      {sportIcons[match.sport] && <span className="mr-0.5 inline">{sportIcons[match.sport]}</span>}
                      {sportLabels[match.sport] || match.sport}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Info Card */}
      <Card className="bg-gradient-to-br from-[#0A1F44] to-[#0D2A5C] border-[#1E3A5F]">
        <CardContent className="p-5">
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-[#3FA9F5]/10 flex-shrink-0 mt-0.5">
              <Users className="w-5 h-5 text-[#3FA9F5]" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm mb-1">Sobre o Painel Administrativo</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                O painel administrativo permite gerenciar todos os conteúdos do site da ADP. Utilize o menu
                lateral para navegar entre as seções: Notícias, Jogadores e Jogos. Todas as alterações são
                refletidas em tempo real no site público.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  icon,
  iconColor,
  iconBg,
  label,
  value,
}: {
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
  label: string;
  value: number;
}) {
  return (
    <Card className="bg-[#0A1F44]/60 border-[#1E3A5F] hover:border-[#3FA9F5]/30 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${iconBg}`}>
            <div className={iconColor}>{icon}</div>
          </div>
          <div>
            <p className="text-xl font-bold text-white">{value}</p>
            <p className="text-xs font-medium text-slate-400">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
