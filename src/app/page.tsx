'use client';

import Hero from '@/components/adp/Hero';
import MatchTicker from '@/components/adp/MatchTicker';
import { motion } from 'framer-motion';
import { Trophy, Users, Newspaper, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <MatchTicker />

      {/* Highlights / CTAs */}
      <section className="py-20 bg-white dark:bg-[#050E1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* O Clube */}
            <HighlightCard
              icon={<Trophy className="w-8 h-8 text-[#3FA9F5]" />}
              title="O Clube"
              description="Conheça a história e os valores da Associação Desportiva do Piquiri."
              link="/clube"
              label="Ver História"
            />
            {/* Modalidades */}
            <HighlightCard
              icon={<Users className="w-8 h-8 text-[#3FA9F5]" />}
              title="Modalidades"
              description="Explore nossos times de futebol, vôlei, basquete e muito mais."
              link="/modalidades"
              label="Ver Esportes"
            />
            {/* Notícias */}
            <HighlightCard
              icon={<Newspaper className="w-8 h-8 text-[#3FA9F5]" />}
              title="Portal de Notícias"
              description="Acompanhe as últimas novidades e atualizações oficiais do clube."
              link="/noticias"
              label="Ler Notícias"
            />
          </div>
        </div>
      </section>

      {/* Quick About / Quote */}
      <section className="py-24 bg-[#0A1F44] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/hero-bg.jpg')] bg-cover bg-center" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8 italic">
              &ldquo;Das águas nasce a força&rdquo;
            </h2>
            <p className="text-xl text-white/70 leading-relaxed mb-10">
              A ADP é um clube movido pela paixão e pela conexão com as nossas raízes. 
              Nascidos do Rio Piquiri, levamos a energia do interior paranaense para as quadras e campos.
            </p>
            <Link 
              href="/clube"
              className="inline-flex items-center gap-2 bg-[#3FA9F5] hover:bg-[#2B8FD4] text-white font-bold py-4 px-10 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#3FA9F5]/30"
            >
              Conheça Nossa História
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function HighlightCard({ icon, title, description, link, label }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  link: string,
  label: string 
}) {
  return (
    <div className="bg-[#0A1F44]/5 dark:bg-[#0A1F44]/40 border border-[#0A1F44]/10 dark:border-[#1E3A5F] rounded-2xl p-8 card-hover group">
      <div className="w-16 h-16 bg-[#3FA9F5]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#0A1F44] dark:text-white mb-3">{title}</h3>
      <p className="text-[#0A1F44]/60 dark:text-white/60 text-sm leading-relaxed mb-8">
        {description}
      </p>
      <Link 
        href={link}
        className="inline-flex items-center gap-2 text-[#3FA9F5] font-bold text-sm group-hover:gap-3 transition-all duration-200"
      >
        {label}
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
