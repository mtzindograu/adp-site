'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Newspaper, Clock, Share2, Tag } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import Image from 'next/image';

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  sport: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

const sportLabels: Record<string, { label: string; icon: string; color: string }> = {
  general: { label: 'Geral', icon: '📰', color: '#0A1F44' },
  football: { label: 'Futebol', icon: '⚽', color: '#3FA9F5' },
  volleyball: { label: 'Vôlei', icon: '🏐', color: '#F59E0B' },
  basketball: { label: 'Basquete', icon: '🏀', color: '#EF4444' },
};

export default function NewsDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      if (!id) return;
      try {
        const res = await fetch(`/api/news?id=${id}`);
        if (res.ok) {
          setArticle(await res.json());
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [id]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#050E1F] pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Skeleton className="h-6 w-32 mb-8" />
          <Skeleton className="h-12 w-full mb-6" />
          <Skeleton className="h-12 w-3/4 mb-10" />
          <div className="flex gap-4 mb-10">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="aspect-video w-full rounded-2xl mb-10" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#050E1F] pt-28 pb-20 flex items-center justify-center">
        <div className="text-center">
          <Newspaper className="w-20 h-20 text-muted-foreground/30 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-foreground mb-4">Notícia não encontrada</h2>
          <p className="text-muted-foreground mb-8">O conteúdo que você procura pode ter sido removido ou o link está incorreto.</p>
          <Link 
            href="/noticias"
            className="inline-flex items-center gap-2 bg-[#3FA9F5] text-white px-6 py-3 rounded-xl font-bold transition-all hover:bg-[#2B8FD4]"
          >
            <ArrowLeft size={18} />
            Voltar para Notícias
          </Link>
        </div>
      </div>
    );
  }

  const sportInfo = sportLabels[article.sport] || sportLabels.general;

  return (
    <div className="min-h-screen bg-white dark:bg-[#050E1F] pt-28 pb-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            href="/noticias"
            className="inline-flex items-center gap-2 text-[#3FA9F5] hover:text-[#0A1F44] dark:hover:text-white font-medium transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Voltar para Notícias
          </Link>
        </motion.div>

        {/* Header Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-[#3FA9F5]/10 text-[#3FA9F5] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {article.category}
            </span>
            <span 
              className="text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5"
              style={{ backgroundColor: `${sportInfo.color}15`, color: sportInfo.color }}
            >
              {sportInfo.icon} {sportInfo.label}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A1F44] dark:text-white leading-tight mb-8">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-slate-100 dark:border-white/10">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Calendar size={18} className="text-[#3FA9F5]" />
                <span>{formatDate(article.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Clock size={18} className="text-[#3FA9F5]" />
                <span>Leitura rápida</span>
              </div>
            </div>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-[#3FA9F5] transition-colors text-sm font-medium">
              <Share2 size={18} />
              Compartilhar
            </button>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative aspect-video rounded-3xl overflow-hidden bg-slate-100 dark:bg-white/5 mb-12 shadow-2xl shadow-[#0A1F44]/10"
        >
          {article.image ? (
            <Image 
              src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                            priority
                          />          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Newspaper className="text-slate-300 dark:text-white/10" size={100} />
            </div>
          )}
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-slate dark:prose-invert max-w-none"
        >
          <div className="text-lg md:text-xl text-foreground/80 leading-relaxed space-y-6">
            {/* Split description by paragraphs if it contains multiple lines, otherwise just show it */}
            {article.description.split('\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 pt-10 border-t border-slate-100 dark:border-white/10"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#0A1F44] flex items-center justify-center border border-[#3FA9F5]/30">
              <Image src="/123.png" alt="Logo oficial ADP" width={24} height={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Comunicação ADP</p>
              <p className="text-xs text-muted-foreground">Associação Desportiva do Piquiri — Oficial</p>
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
