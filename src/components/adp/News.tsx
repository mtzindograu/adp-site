'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Newspaper } from 'lucide-react';
import { useState, useEffect } from 'react';
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

const stagger = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
};

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('/api/news?limit=10');
        if (res.ok) {
          setArticles(await res.json());
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const featured = articles.find((n) => n.featured);
  const regularNews = featured 
    ? articles.filter((n) => n.id !== featured.id)
    : articles;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <section id="noticias" className="section-light water-texture relative py-16 md:py-24">
      {/* Wave Top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path fill="#0A1F44" className="dark:fill-[#050E1F]" d="M0,0L1440,80L1440,0L0,0Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-[#3FA9F5] font-semibold text-sm tracking-widest uppercase mb-3 block">
            Últimas Notícias
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Portal de <span className="gradient-text">Notícias</span>
          </h2>
          <div className="w-20 h-1 bg-[#3FA9F5] mx-auto rounded-full" />
        </motion.div>

        {loading ? (
          <div className="space-y-8">
            {/* Featured skeleton */}
            <div className="bg-gradient-to-br from-[#0A1F44] to-[#1E3A5F] rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <Skeleton className="aspect-video md:aspect-auto min-h-[200px] md:min-h-[350px]" />
                <div className="p-6 md:p-10 space-y-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-7 w-full" />
                  <Skeleton className="h-7 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
            {/* Grid skeletons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
                  <Skeleton className="aspect-video w-full" />
                  <div className="p-4 md:p-6 space-y-3">
                    <Skeleton className="h-3 w-1/3" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Featured News */}
            {featured && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mb-10 md:mb-14"
              >
                <div className="bg-gradient-to-br from-[#0A1F44] to-[#1E3A5F] rounded-2xl overflow-hidden card-hover">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {/* Featured Image Placeholder */}
                    <div className="relative aspect-video md:aspect-auto bg-gradient-to-br from-[#3FA9F5]/20 to-[#0A1F44] min-h-[200px] md:min-h-[350px] overflow-hidden group">
                      {featured.image ? (
                        <Image 
                          src={featured.image} 
                          alt={featured.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Newspaper className="text-white/20" size={80} />
                        </div>
                      )}
                      <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                        <span className="bg-[#3FA9F5] text-white text-xs font-semibold px-3 py-1 rounded-full">
                          DESTAQUE
                        </span>
                        {featured.sport && featured.sport !== 'general' && (
                          <span
                            className="text-xs font-semibold px-2.5 py-1 rounded-full"
                            style={{
                              backgroundColor: `${sportLabels[featured.sport]?.color || '#0A1F44'}30`,
                              color: sportLabels[featured.sport]?.color || '#fff',
                            }}
                          >
                            {sportLabels[featured.sport]?.icon} {sportLabels[featured.sport]?.label}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Featured Content */}
                    <div className="p-6 md:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-white/10 text-white/80 text-xs px-3 py-1 rounded-full">
                          {featured.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-white/40 text-xs">
                          <Calendar size={12} />
                          <span>{formatDate(featured.createdAt)}</span>
                        </div>
                      </div>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                        {featured.title}
                      </h3>
                      <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
                        {featured.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-white/40 text-xs">
                          <Clock size={12} />
                          <span>Notícia do clube</span>
                        </div>
                        <Link 
                          href={`/noticias/${featured.id}`}
                          className="text-[#3FA9F5] hover:text-white font-medium text-sm flex items-center gap-2 transition-colors group"
                        >
                          Ler Mais
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {regularNews.map((article, index) => {
                const sportInfo = sportLabels[article.sport] || sportLabels.general;
                return (
                  <motion.article
                    key={article.id}
                    {...stagger}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="bg-card border border-border rounded-xl overflow-hidden card-hover group cursor-pointer"
                  >
                    <Link href={`/noticias/${article.id}`} className="block h-full">
                      {/* Article Image */}
                      <div className="relative aspect-video bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        {article.image ? (
                          <Image 
                            src={article.image} 
                            alt={article.title} 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                            <Newspaper className="text-foreground" size={48} />
                          </div>
                        )}
                        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                          <span className="bg-[#0A1F44] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full dark:bg-[#3FA9F5]">
                            {article.category}
                          </span>
                          {article.sport && article.sport !== 'general' && (
                            <span
                              className="text-[10px] font-semibold px-2 py-1 rounded-full"
                              style={{
                                backgroundColor: `${sportInfo.color}20`,
                                color: sportInfo.color,
                              }}
                            >
                              {sportInfo.icon} {sportInfo.label}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Article Content */}
                      <div className="p-4 md:p-6">
                        <div className="flex items-center gap-3 text-muted-foreground text-xs mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span>{formatDate(article.createdAt)}</span>
                          </div>
                        </div>
                        <h3 className="font-bold text-foreground text-base md:text-lg mb-2 leading-snug group-hover:text-[#3FA9F5] transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                          {article.description}
                        </p>
                        <div className="text-[#3FA9F5] group-hover:text-foreground font-medium text-sm flex items-center gap-2 transition-colors group/link">
                          Ler Mais
                          <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </div>

            {/* Empty state */}
            {articles.length === 0 && (
              <div className="text-center py-16">
                <Newspaper className="text-muted-foreground/30 mx-auto mb-4" size={48} />
                <p className="text-muted-foreground text-sm">
                  Nenhuma notícia publicada ainda.
                </p>
              </div>
            )}

            {/* Load More */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-10 md:mt-14"
            >
              <button className="border-2 border-[#0A1F44] dark:border-[#3FA9F5] text-foreground dark:text-[#3FA9F5] hover:bg-[#0A1F44] hover:text-white dark:hover:bg-[#3FA9F5] dark:hover:text-[#0A1F44] font-semibold px-8 py-3 rounded-lg text-sm transition-all duration-300">
                Ver Todas as Notícias
              </button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
