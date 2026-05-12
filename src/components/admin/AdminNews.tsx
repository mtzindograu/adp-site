'use client';

import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Skeleton } from '@/components/ui/skeleton';
import {
  Plus,
  Pencil,
  Trash2,
  Star,
  StarOff,
  Loader2,
  ImagePlus,
  X,
  Newspaper,
} from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  sport: string;
  featured: boolean;
  createdAt: string;
}

interface NewsForm {
  title: string;
  description: string;
  image: string;
  category: string;
  sport: string;
  featured: boolean;
}

const emptyForm: NewsForm = {
  title: '',
  description: '',
  image: '',
  category: 'Geral',
  sport: 'general',
  featured: false,
};

export default function AdminNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<NewsForm>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      setNews(Array.isArray(data) ? data : []);
    } catch {
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setForm(emptyForm);
    setEditId(null);
    setDialogOpen(true);
  };

  const openEdit = (item: NewsItem) => {
    setForm({
      title: item.title,
      description: item.description,
      image: item.image,
      category: item.category,
      sport: item.sport,
      featured: item.featured,
    });
    setEditId(item.id);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) return;
    setSaving(true);

    try {
      const url = editId ? '/api/news' : '/api/news';
      const method = editId ? 'PUT' : 'POST';
      const body = editId ? { id: editId, ...form } : form;

      const res = await fetch(url, {
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
      await loadNews();
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
      const res = await fetch(`/api/news?id=${deleteId}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Erro ao excluir');
        return;
      }
      setDeleteId(null);
      await loadNews();
    } catch {
      alert('Erro de conexão');
    } finally {
      setDeleting(false);
    }
  };

  const toggleFeatured = async (item: NewsItem) => {
    try {
      const res = await fetch('/api/news', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, featured: !item.featured }),
      });
      if (res.ok) {
        await loadNews();
      }
    } catch {
      // silently handle
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'news');

      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (res.ok) {
        setForm((prev) => ({ ...prev, image: data.url }));
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

  const sportLabels: Record<string, string> = {
    general: 'Geral',
    football: 'Futebol',
    volleyball: 'Vôlei',
    basketball: 'Basquete',
  };

  const sportBadgeColor: Record<string, string> = {
    general: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    football: 'bg-green-500/20 text-green-300 border-green-500/30',
    volleyball: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    basketball: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-[#3FA9F5]" />
            Notícias
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {news.length} publicação(ões) cadastrada(s)
          </p>
        </div>
        <Button
          onClick={openCreate}
          className="bg-[#3FA9F5] hover:bg-[#2B8FD4] text-white gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          Nova Notícia
        </Button>
      </div>

      {/* Table */}
      <div className="bg-[#0A1F44]/60 border border-[#1E3A5F] rounded-xl overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-[#1E3A5F] hover:bg-transparent">
                <TableHead className="text-slate-400 font-medium">Título</TableHead>
                <TableHead className="text-slate-400 font-medium">Categoria</TableHead>
                <TableHead className="text-slate-400 font-medium">Esporte</TableHead>
                <TableHead className="text-slate-400 font-medium">Data</TableHead>
                <TableHead className="text-slate-400 font-medium text-center">Destaque</TableHead>
                <TableHead className="text-slate-400 font-medium text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i} className="border-[#1E3A5F]/50">
                    <TableCell colSpan={6}>
                      <Skeleton className="h-8 bg-slate-700 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : news.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-slate-500">
                    <Newspaper className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p>Nenhuma notícia cadastrada</p>
                    <p className="text-xs mt-1">Clique em &quot;Nova Notícia&quot; para adicionar</p>
                  </TableCell>
                </TableRow>
              ) : (
                news.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-[#1E3A5F]/50 hover:bg-[#0D2A5C]/50 transition-colors"
                  >
                    <TableCell className="text-white font-medium max-w-[300px]">
                      <div className="truncate">{item.title}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600">
                        {item.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={sportBadgeColor[item.sport] || sportBadgeColor.general}
                      >
                        {sportLabels[item.sport] || item.sport}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-400 text-sm">
                      {formatDate(item.createdAt)}
                    </TableCell>
                    <TableCell className="text-center">
                      <button
                        onClick={() => toggleFeatured(item)}
                        className="inline-flex p-1 rounded hover:bg-slate-700/50 transition-colors"
                        title={item.featured ? 'Remover destaque' : 'Marcar como destaque'}
                      >
                        {item.featured ? (
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        ) : (
                          <StarOff className="w-4 h-4 text-slate-500" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(item)}
                          className="text-slate-400 hover:text-[#3FA9F5] hover:bg-[#3FA9F5]/10 h-8 w-8"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(item.id)}
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
              {editId ? 'Editar Notícia' : 'Nova Notícia'}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              {editId ? 'Atualize as informações da notícia' : 'Preencha os dados da nova notícia'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-slate-300 text-sm">Título *</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Título da notícia"
                className="bg-[#060F24] border-[#1E3A5F] text-white placeholder:text-slate-500 focus:border-[#3FA9F5]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 text-sm">Descrição *</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Conteúdo da notícia..."
                rows={5}
                className="bg-[#060F24] border-[#1E3A5F] text-white placeholder:text-slate-500 focus:border-[#3FA9F5] resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300 text-sm">Categoria</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm((prev) => ({ ...prev, category: v }))}
                >
                  <SelectTrigger className="bg-[#060F24] border-[#1E3A5F] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0A1F44] border-[#1E3A5F]">
                    <SelectItem value="Geral">Geral</SelectItem>
                    <SelectItem value="Futebol">Futebol</SelectItem>
                    <SelectItem value="Vôlei">Vôlei</SelectItem>
                    <SelectItem value="Basquete">Basquete</SelectItem>
                    <SelectItem value="Infraestrutura">Infraestrutura</SelectItem>
                    <SelectItem value="Social">Social</SelectItem>
                    <SelectItem value="Clássico">Clássico</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300 text-sm">Esporte</Label>
                <Select
                  value={form.sport}
                  onValueChange={(v) => setForm((prev) => ({ ...prev, sport: v }))}
                >
                  <SelectTrigger className="bg-[#060F24] border-[#1E3A5F] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0A1F44] border-[#1E3A5F]">
                    <SelectItem value="general">Geral</SelectItem>
                    <SelectItem value="football">Futebol</SelectItem>
                    <SelectItem value="volleyball">Vôlei</SelectItem>
                    <SelectItem value="basketball">Basquete</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="text-slate-300 text-sm">Imagem</Label>
              {form.image && (
                <div className="relative group mb-2">
                  <div className="w-full h-32 rounded-lg overflow-hidden border border-[#1E3A5F]">
                    <img
                      src={form.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => setForm((prev) => ({ ...prev, image: '' }))}
                    className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-red-500/80 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="news-image-upload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full border-[#1E3A5F] text-slate-300 hover:bg-[#1E3A5F]/50 hover:text-white"
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <ImagePlus className="mr-2 h-4 w-4" />
                    {form.image ? 'Alterar Imagem' : 'Enviar Imagem'}
                  </>
                )}
              </Button>
            </div>
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
              disabled={saving || !form.title.trim() || !form.description.trim()}
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
                'Criar Notícia'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-[#0A1F44] border-[#1E3A5F]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Excluir notícia?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Esta ação não pode ser desfeita. A notícia será permanentemente removida.
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
