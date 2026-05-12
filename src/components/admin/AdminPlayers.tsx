'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
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
  ImagePlus,
  X,
  Users,
  Target,
  Handshake,
  Shirt,
  Star,
} from 'lucide-react';

interface PlayerItem {
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

interface PlayerForm {
  name: string;
  position: string;
  number: string;
  photo: string;
  sport: string;
  team: string;
  goals: string;
  assists: string;
  matches: string;
}

const emptyForm: PlayerForm = {
  name: '',
  position: '',
  number: '',
  photo: '',
  sport: 'football',
  team: 'professional',
  goals: '0',
  assists: '0',
  matches: '0',
};

interface TabConfig {
  value: string;
  label: string;
  sport: string;
  team: string;
  icon: React.ReactNode;
}

const sportTabs: TabConfig[] = [
  { value: 'football', label: 'Futebol', sport: 'football', team: 'professional', icon: <Shirt className="w-4 h-4" /> },
  { value: 'volleyball', label: 'Vôlei', sport: 'volleyball', team: 'professional', icon: <Users className="w-4 h-4" /> },
  { value: 'basketball_male', label: 'Basq. Masculino', sport: 'basketball', team: 'basketball_male', icon: <Target className="w-4 h-4" /> },
  { value: 'basketball_mixed', label: 'Basq. Misto', sport: 'basketball', team: 'basketball_mixed', icon: <Target className="w-4 h-4" /> },
  { value: 'base', label: 'Categoria de Base', sport: 'all', team: 'youth', icon: <Star className="w-4 h-4" /> },
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

const teamLabels: Record<string, string> = {
  professional: 'Profissional',
  youth: 'Base',
  basketball_male: 'Masculino',
  basketball_mixed: 'Misto',
};

const teamBadgeColors: Record<string, string> = {
  professional: 'bg-green-500/20 text-green-300 border-green-500/30',
  youth: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  basketball_male: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  basketball_mixed: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
};

export default function AdminPlayers() {
  const [activeTab, setActiveTab] = useState('football');
  const [players, setPlayers] = useState<PlayerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<PlayerForm>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadPlayers = useCallback(async (tabValue: string) => {
    setLoading(true);
    try {
      const tab = sportTabs.find((t) => t.value === tabValue);
      if (!tab) {
        setPlayers([]);
        setLoading(false);
        return;
      }

      if (tabValue === 'base') {
        // Fetch from all sports with team=youth
        const [footballRes, volleyballRes, basketballRes] = await Promise.all([
          fetch('/api/players?sport=football&team=youth').then((r) => r.json()),
          fetch('/api/players?sport=volleyball&team=youth').then((r) => r.json()),
          fetch('/api/players?sport=basketball&team=youth').then((r) => r.json()),
        ]);
        const all = [
          ...(Array.isArray(footballRes) ? footballRes : []),
          ...(Array.isArray(volleyballRes) ? volleyballRes : []),
          ...(Array.isArray(basketballRes) ? basketballRes : []),
        ];
        setPlayers(all);
      } else {
        const res = await fetch(`/api/players?sport=${tab.sport}&team=${tab.team}`);
        const data = await res.json();
        setPlayers(Array.isArray(data) ? data : []);
      }
    } catch {
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPlayers(activeTab);
  }, [activeTab, loadPlayers]);

  const openCreate = () => {
    const tab = sportTabs.find((t) => t.value === activeTab);
    const sport = tab?.sport === 'all' ? 'football' : tab!.sport;
    const team = tab?.team === 'youth' && tab?.value === 'base' ? 'youth' : tab!.team;
    setForm({ ...emptyForm, sport, team });
    setEditId(null);
    setDialogOpen(true);
  };

  const openEdit = (item: PlayerItem) => {
    setForm({
      name: item.name,
      position: item.position,
      number: String(item.number),
      photo: item.photo,
      sport: item.sport,
      team: item.team,
      goals: String(item.goals),
      assists: String(item.assists),
      matches: String(item.matches),
    });
    setEditId(item.id);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.position.trim() || !form.number) return;
    setSaving(true);

    try {
      const method = editId ? 'PUT' : 'POST';
      const body: Record<string, unknown> = editId
        ? {
            id: editId,
            name: form.name,
            position: form.position,
            number: form.number,
            photo: form.photo,
            sport: form.sport,
            team: form.team,
            goals: form.goals,
            assists: form.assists,
            matches: form.matches,
          }
        : {
            name: form.name,
            position: form.position,
            number: form.number,
            photo: form.photo,
            sport: form.sport,
            team: form.team,
          };

      const res = await fetch('/api/players', {
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
      await loadPlayers(activeTab);
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
      const res = await fetch(`/api/players?id=${deleteId}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Erro ao excluir');
        return;
      }
      setDeleteId(null);
      await loadPlayers(activeTab);
    } catch {
      alert('Erro de conexão');
    } finally {
      setDeleting(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'players');

      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (res.ok) {
        setForm((prev) => ({ ...prev, photo: data.url }));
      } else {
        alert('Erro ao fazer upload');
      }
    } catch {
      alert('Erro de conexão');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const positionColors: Record<string, string> = {
    Goleiro: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    Levantador: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    Líbero: 'bg-red-500/20 text-red-300 border-red-500/30',
    Armador: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    Pivô: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  };

  const getPositionBadge = (position: string) => {
    return positionColors[position] || 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  };

  const currentTab = sportTabs.find((t) => t.value === activeTab);
  const showTeamBadge = activeTab === 'base';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-[#3FA9F5]" />
            Jogadores
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {players.length} jogador(es) no {currentTab?.label}
          </p>
        </div>
        <Button
          onClick={openCreate}
          className="bg-[#3FA9F5] hover:bg-[#2B8FD4] text-white gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          Novo Jogador
        </Button>
      </div>

      {/* Sport Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#0A1F44] border border-[#1E3A5F] flex-wrap h-auto gap-1">
          {sportTabs.map((tab) => (
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
                <TableHead className="text-slate-400 font-medium w-12">#</TableHead>
                <TableHead className="text-slate-400 font-medium">Nome</TableHead>
                <TableHead className="text-slate-400 font-medium">Posição</TableHead>
                {showTeamBadge && (
                  <TableHead className="text-slate-400 font-medium hidden sm:table-cell">Equipe</TableHead>
                )}
                <TableHead className="text-slate-400 font-medium text-center">
                  <Target className="w-4 h-4 inline" /> {currentTab?.sport === 'football' ? 'G' : 'P'}
                </TableHead>
                <TableHead className="text-slate-400 font-medium text-center">
                  <Handshake className="w-4 h-4 inline" /> A
                </TableHead>
                <TableHead className="text-slate-400 font-medium text-center">
                  <Shirt className="w-4 h-4 inline" /> J
                </TableHead>
                <TableHead className="text-slate-400 font-medium text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <TableRow key={i} className="border-[#1E3A5F]/50">
                    <TableCell colSpan={showTeamBadge ? 8 : 7}>
                      <Skeleton className="h-10 bg-slate-700 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : players.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={showTeamBadge ? 8 : 7} className="text-center py-12 text-slate-500">
                    <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p>Nenhum jogador cadastrado</p>
                  </TableCell>
                </TableRow>
              ) : (
                players.map((player) => (
                  <TableRow
                    key={player.id}
                    className="border-[#1E3A5F]/50 hover:bg-[#0D2A5C]/50 transition-colors"
                  >
                    <TableCell className="text-[#3FA9F5] font-bold">{player.number}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {player.photo ? (
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-700 flex-shrink-0">
                            <img
                              src={player.photo}
                              alt={player.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#3FA9F5]/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[#3FA9F5] text-xs font-bold">
                              {player.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <span className="text-white font-medium">{player.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getPositionBadge(player.position)}
                      >
                        {player.position}
                      </Badge>
                    </TableCell>
                    {showTeamBadge && (
                      <TableCell className="hidden sm:table-cell">
                        <Badge
                          variant="outline"
                          className={teamBadgeColors[player.team] || teamBadgeColors.youth}
                        >
                          {teamLabels[player.team] || player.team}
                        </Badge>
                      </TableCell>
                    )}
                    <TableCell className="text-center text-slate-300 font-medium">
                      {player.goals}
                    </TableCell>
                    <TableCell className="text-center text-slate-300 font-medium">
                      {player.assists}
                    </TableCell>
                    <TableCell className="text-center text-slate-300 font-medium">
                      {player.matches}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(player)}
                          className="text-slate-400 hover:text-[#3FA9F5] hover:bg-[#3FA9F5]/10 h-8 w-8"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(player.id)}
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
              {editId ? 'Editar Jogador' : 'Novo Jogador'}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              {editId ? 'Atualize os dados do jogador' : 'Preencha os dados do novo jogador'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Photo */}
            <div className="space-y-2">
              <Label className="text-slate-300 text-sm">Foto</Label>
              <div className="flex items-center gap-4">
                {form.photo ? (
                  <div className="relative group">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#3FA9F5]">
                      <img
                        src={form.photo}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => setForm((prev) => ({ ...prev, photo: '' }))}
                      className="absolute -top-1 -right-1 p-0.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[#1E3A5F] flex items-center justify-center">
                    <Shirt className="w-6 h-6 text-slate-500" />
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="player-photo-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="border-[#1E3A5F] text-slate-300 hover:bg-[#1E3A5F]/50 hover:text-white"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <ImagePlus className="mr-2 h-3 w-3" />
                      {form.photo ? 'Alterar' : 'Upload'}
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300 text-sm">Nome *</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Nome do jogador"
                  className="bg-[#060F24] border-[#1E3A5F] text-white placeholder:text-slate-500 focus:border-[#3FA9F5]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 text-sm">Número *</Label>
                <Input
                  type="number"
                  value={form.number}
                  onChange={(e) => setForm((prev) => ({ ...prev, number: e.target.value }))}
                  placeholder="0"
                  className="bg-[#060F24] border-[#1E3A5F] text-white placeholder:text-slate-500 focus:border-[#3FA9F5]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 text-sm">Posição *</Label>
              <Input
                value={form.position}
                onChange={(e) => setForm((prev) => ({ ...prev, position: e.target.value }))}
                placeholder="Ex: Goleiro, Atacante..."
                className="bg-[#060F24] border-[#1E3A5F] text-white placeholder:text-slate-500 focus:border-[#3FA9F5]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
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

            {/* Stats (shown in edit mode) */}
            {editId && (
              <div className="space-y-2">
                <Label className="text-slate-300 text-sm">Estatísticas</Label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-slate-500">
                      {form.sport === 'football' ? 'Gols' : 'Pontos'}
                    </label>
                    <Input
                      type="number"
                      value={form.goals}
                      onChange={(e) => setForm((prev) => ({ ...prev, goals: e.target.value }))}
                      className="bg-[#060F24] border-[#1E3A5F] text-white focus:border-[#3FA9F5]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Assistências</label>
                    <Input
                      type="number"
                      value={form.assists}
                      onChange={(e) => setForm((prev) => ({ ...prev, assists: e.target.value }))}
                      className="bg-[#060F24] border-[#1E3A5F] text-white focus:border-[#3FA9F5]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Jogos</label>
                    <Input
                      type="number"
                      value={form.matches}
                      onChange={(e) => setForm((prev) => ({ ...prev, matches: e.target.value }))}
                      className="bg-[#060F24] border-[#1E3A5F] text-white focus:border-[#3FA9F5]"
                    />
                  </div>
                </div>
              </div>
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
              disabled={saving || !form.name.trim() || !form.position.trim() || !form.number}
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
                'Cadastrar'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-[#0A1F44] border-[#1E3A5F]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Excluir jogador?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Esta ação não pode ser desfeita. O jogador será permanentemente removido.
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
