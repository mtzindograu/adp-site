'use client';

import News from '@/components/adp/News';
import { motion } from 'framer-motion';

export default function NoticiasPage() {
  return (
    <div className="flex flex-col">
      {/* Banner de Cabeçalho */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-[#0A1F44]">
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(/hero-bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1F44]/0 to-[#0A1F44]" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Portal de <span className="text-[#3FA9F5]">Notícias</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Fique por dentro de tudo o que acontece na ADP e no mundo dos esportes piquirienses.
          </motion.p>
        </div>
      </section>

      <News />
    </div>
  );
}
