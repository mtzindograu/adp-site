'use client';

import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Calendar,
  MapPin,
  Trophy,
  Clock,
  Home,
  Plane,
  Shirt,
  Volleyball,
  CircleDot,
} from 'lucide-react';

interface MatchItem {
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

interface MatchForm {
  opponent: string;
  date: string;
  time: string;
  competition: string;
  venue: string;
  sport: string;
  team: string;
  homeScore: string;
  awayScore: string;
  status: string;
}

const emptyForm: MatchForm = {
  opponent: '',
  date: '',
  time: '16:00',
  competition: '',
  venue: 'Casa',
  sport: 'football',
  team: 'professional',
  homeScore: '',
  awayScore: '',
  status: 'upcoming',
};

interface TabConfig {
  value: string;
  label: string;
  sport: string;
  team: string;
  icon: React.ReactNode;
}

const matchTabs: TabConfig[] = [
  { value: 'football', label: 'Futebol', sport: 'football', team: 'professional', icon: <Shirt className="w-4 h-4" /> },
  { value: 'volleyball', label: 'Vôlei', sport: 'volleyball', team: 'professional', icon: <Volleyball className="w-4 h-4" /> },
  { value: 'basketball_male', label: 'Basq. Masculino', sport: 'basketball', team: 'basketball_male', icon: <CircleDot className="w-4 h-4" /> },
  { value: 'basketball_mixed', label: 'Basq. Misto', sport: 'basketball', team: 'basketball_mixed', icon: <CircleDot className="w-4 h-4" /> },
];

const teamOptions: Record<string, { value: string; label: string }[]> = {
  football: [
    { value: 'professional', label: 'Profissional' },
    { value: 'youth', label: 'Base' },
  ],
  volleyball: [
    { value: 'professional', label: 'Profissional' },
    { value: 'youth', label: 'Base' },
  ],
  basketball: [
    { value: 'basketball_male', label: 'Masculino' },
    { value: 'basketball_mixed', label: 'Misto' },
    { value: 'youth', label: 'Base' },
  ],
};

export default function AdminMatches() {
  const [activeTab, setActiveTab] = useState('football');
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState<MatchForm>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const loadMatches = useCallback(async (tabValue: string) => {
    setLoading(true);
    try {
      const tab = matchTabs.find((t) => t.value === tabValue);
      if (!tab) {
        setMatches([]);
        setLoading(false);
        return;
      }
      const res = await fetch(`/api/matches?sport=${tab.sport}&team=${tab.team}`);
      const data = await res.json();
      setMatches(Array.isArray(data) ? data : []);
    } catch {
      setMatches([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMatches(activeTab);
  }, [activeTab, loadMatches]);

  const openCreate = () => {
    const tab = matchTabs.find((t) => t.value === activeTab);
    setForm({ ...emptyForm, sport: tab!.sport, team: tab!.team });
    setEditId(null);
    setDialogOpen(true);
  };

  const openEdit = (item: MatchItem) => {
    setForm({
      opponent: item.opponent,
      date: new Date(item.date).toISOString().split('T')[0],
      time: item.time,
      competition: item.competition,
      venue: item.venue,
      sport: item.sport,
      team: item.team,
      homeScore: item.homeScore !== null ? String(item.homeScore) : '',
      awayScore: item.awayScore !== null ? String(item.awayScore) : '',
      status: item.status,
    });
    setEditId(item.id);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.opponent.trim() || !form.date) return;
    setSaving(true);

    try {
      const method = editId ? 'PUT' : 'POST';
      const body: Record<string, unknown> = editId
        ? {
            id: editId,
            opponent: form.opponent,
            date: form.date,
            time: form.time,
            competition: form.competition,
            venue: form.venue,
            sport: form.sport,
            team: form.team,
            homeScore: form.homeScore ? parseInt(form.homeScore) : null,
            awayScore: form.awayScore ? parseInt(form.awayScore) : null,
            status: form.status,
          }
        : {
            opponent: form.opponent,
            date: form.date,
            time: form.time,
            competition: form.competition,
            venue: form.venue,
            sport: form.sport,
            team: form.team,
          };

      const res = await fetch('/api/matches', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Erro ao salvar');
        return;
      }

      setDialogOpen(false);
      await loadMatches(activeTab);
    } catch {
      alert('Erro de conexão');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/matches?id=${deleteId}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Erro ao excluir');
        return;
      }
      setDeleteId(null);
      await loadMatches(activeTab);
    } catch {
      alert('Erro de conexão');
    } finally {
      setDeleting(false);
    }
  };

  const statusConfig: Record<string, { label: string; color: string }> = {
    upcoming: {
      label: 'Próximo',
      color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    },
    live: {
      label: 'Ao Vivo',
      color: 'bg-red-500/20 text-red-300 border-red-500/30',
    },
    finished: {
      label: 'Encerrado',
      color: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    },
    postponed: {
      label: 'Adiado',
      color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    },
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const currentTab = matchTabs.find((t) => t.value === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#3FA9F5]" />
            Jogos
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {matches.length} jogo(s) de {currentTab?.label}
          </p>
        </div>
        <Button
          onClick={openCreate}
          className="bg-[#3FA9F5] hover:bg-[#2B8FD4] text-white gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          Novo Jogo
        </Button>
      </div>

      {/* Sport Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#0A1F44] border border-[#1E3A5F] flex-wrap h-auto gap-1">
          {matchTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:bg-[#3FA9F5] data-[state=active]:text-white text-slate-400 gap-1.5 text-xs sm:text-sm"
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Table */}
      <div className="bg-[#0A1F44]/60 border border-[#1E3A5F] rounded-xl overflow-hidden">
        <div className="max-h-[500px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-[#1E3A5F] hover:bg-transparent">
                <TableHead className="text-slate-400 font-medium">Adversário</TableHead>
                <TableHead className="text-slate-400 font-medium">Data</TableHead>
                <TableHead className="text-slate-400 font-medium hidden sm:table-cell">Horário</TableHead>
                <TableHead className="text-slate-400 font-medium hidden md:table-cell">Competição</TableHead>
                <TableHead className="text-slate-400 font-medium hidden md:table-cell">Local</TableHead>
                <TableHead className="text-slate-400 font-medium text-center">Placar</TableHead>
                <TableHead className="text-slate-400 font-medium text-center">Status</TableHead>
                <TableHead className="text-slate-400 font-medium text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i} className="border-[#1E3A5F]/50">
                    <TableCell colSpan={8}>
                      <Skeleton className="h-10 bg-slate-700 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : matches.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12 text-slate-500">
                    <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p>Nenhum jogo cadastrado</p>
                  </TableCell>
                </TableRow>
              ) : (
                matches.map((match) => (
                  <TableRow
                    key={match.id}
                    className="border-[#1E3A5F]/50 hover:bg-[#0D2A5C]/50 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {match.homeTeam === 'ADP' ? (
                          <span className="text-white font-medium">vs {match.opponent}</span>
                        ) : (
                          <span className="text-slate-300">
                            <span className="text-[#3FA9F5] font-medium">{match.homeTeam}</span> vs{' '}
                            <span className="text-white font-medium">ADP</span>
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300 text-sm">
                      {formatDate(match.date)}
                    </TableCell>
                    <TableCell className="text-slate-300 text-sm hidden sm:table-cell">
                      {match.time}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge
                        variant="outline"
                        className="bg-purple-500/10 text-purple-300 border-purple-500/20"
                      >
                        <Trophy className="w-3 h-3 mr-1" />
                        {match.competition}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-1.5 text-slate-300 text-sm">
                        {match.venue === 'Casa' ? (
                          <Home className="w-3.5 h-3.5 text-green-400" />
                        ) : (
                          <Plane className="w-3.5 h-3.5 text-orange-400" />
                        )}
                        {match.venue}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {match.homeScore !== null && match.awayScore !== null ? (
                        <span className="font-mono font-bold text-white">
                          {match.homeTeam === 'ADP'
                            ? `${match.homeScore} × ${match.awayScore}`
                            : `${match.homeScore} × ${match.awayScore}`}
                        </span>
                      ) : (
                        <span className="text-slate-500 text-sm">— × —</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="outline"
                        className={statusConfig[match.status]?.color || statusConfig.upcoming.color}
                      >
                        {match.status === 'live' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-1.5 animate-pulse" />
                        )}
                        {statusConfig[match.status]?.label || match.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(match)}
                          className="text-slate-400 hover:text-[#3FA9F5] hover:bg-[#3FA9F5]/10 h-8 w-8"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(match.id)}
                          className="text-slate-400 hover:text-red-400 hover:bg-red-400/10 h-8 w-8"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#0A1F44] border-[#1E3A5F] max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editId ? 'Editar Jogo' : 'Novo Jogo'}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              {editId ? 'Atualize as informações do jogo' : 'Preencha os dados do novo jogo'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-slate-300 text-sm">Adversário *</Label>
              <Input
                value={form.opponent}
                onChange={(e) => setForm((prev) => ({ ...prev, opponent: e.target.value }))}
                placeholder="Nome do adversário"
                className="bg-[#060F24] border-[#1E3A5F] text-white placeholder:text-slate-500 focus:border-[#3FA9F5]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300 text-sm flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Data *
                </Label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                  className="bg-[#060F24] border-[#1E3A5F] text-white focus:border-[#3FA9F5] [color-scheme:dark]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 text-sm flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Horário
                </Label>
                <Input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm((prev) => ({ ...prev, time: e.target.value }))}
                  className="bg-[#060F24] border-[#1E3A5F] text-white focus:border-[#3FA9F5] [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 text-sm flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5" /> Competição
              </Label>
              <Input
                value={form.competition}
                onChange={(e) => setForm((prev) => ({ ...prev, competition: e.target.value }))}
                placeholder="Ex: Campeonato Paranaense"
                className="bg-[#060F24] border-[#1E3A5F] text-white placeholder:text-slate-500 focus:border-[#3FA9F5]"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300 text-sm flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Local
                </Label>
                <Select
                  value={form.venue}
                  onValueChange={(v) => setForm((prev) => ({ ...prev, venue: v }))}
                >
                  <SelectTrigger className="bg-[#060F24] border-[#1E3A5F] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0A1F44] border-[#1E3A5F]">
                    <SelectItem value="Casa">Casa</SelectItem>
                    <SelectItem value="Fora">Fora</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 text-sm">Esporte</Label>
                <Select
                  value={form.sport}
                  onValueChange={(v) => {
                    const defaultTeam = teamOptions[v]?.[0]?.value || 'professional';
                    setForm((prev) => ({ ...prev, sport: v, team: defaultTeam }));
                  }}
                >
                  <SelectTrigger className="bg-[#060F24] border-[#1E3A5F] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0A1F44] border-[#1E3A5F]">
                    <SelectItem value="football">Futebol</SelectItem>
                    <SelectItem value="volleyball">Vôlei</SelectItem>
                    <SelectItem value="basketball">Basquete</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 text-sm">Equipe</Label>
                <Select
                  value={form.team}
                  onValueChange={(v) => setForm((prev) => ({ ...prev, team: v }))}
                >
                  <SelectTrigger className="bg-[#060F24] border-[#1E3A5F] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0A1F44] border-[#1E3A5F]">
                    {(teamOptions[form.sport] || teamOptions.football).map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Score and Status (edit mode) */}
            {editId && (
              <>
                <div className="space-y-2">
                  <Label className="text-slate-300 text-sm">Placar</Label>
                  <div className="grid grid-cols-3 gap-3 items-end">
                    <div>
                      <label className="text-xs text-slate-500">ADP</label>
                      <Input
                        type="number"
                        value={form.homeScore}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, homeScore: e.target.value }))
                        }
                        placeholder="-"
                        className="bg-[#060F24] border-[#1E3A5F] text-white text-center focus:border-[#3FA9F5]"
                      />
                    </div>
                    <div className="flex items-center justify-center pb-2">
                      <span className="text-slate-500 text-lg font-bold">×</span>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500">Adversário</label>
                      <Input
                        type="number"
                        value={form.awayScore}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, awayScore: e.target.value }))
                        }
                        placeholder="-"
                        className="bg-[#060F24] border-[#1E3A5F] text-white text-center focus:border-[#3FA9F5]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300 text-sm">Status</Label>
                  <Select
                    value={form.status}
                    onValueChange={(v) => setForm((prev) => ({ ...prev, status: v }))}
                  >
                    <SelectTrigger className="bg-[#060F24] border-[#1E3A5F] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0A1F44] border-[#1E3A5F]">
                      <SelectItem value="upcoming">Próximo</SelectItem>
                      <SelectItem value="live">Ao Vivo</SelectItem>
                      <SelectItem value="finished">Encerrado</SelectItem>
                      <SelectItem value="postponed">Adiado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              onClick={() => setDialogOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving || !form.opponent.trim() || !form.date}
              className="bg-[#3FA9F5] hover:bg-[#2B8FD4] text-white"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : editId ? (
                'Atualizar'
              ) : (
                'Criar Jogo'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-[#0A1F44] border-[#1E3A5F]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Excluir jogo?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Esta ação não pode ser desfeita. O jogo será permanentemente removido.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-slate-400 hover:text-white border-[#1E3A5F]">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                'Excluir'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
