'use client';

import { motion } from 'framer-motion';
import { Flame, Swords, Trophy } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: 'easeOut' },
};

const rivalryFacts = [
  {
    icon: Flame,
    title: 'História Intensa',
    description: 'Desde os primeiros confrontos, o Clássico das Raízes se tornou um dos mais aguardados da região, com partidas marcadas pela intensidade e paixão de ambas as torcidas.',
  },
  {
    icon: Swords,
    title: 'Força contra Força',
    description: 'O azul do Piquiri contra o vermelho do Atlas FC — duas cores, duas filosofias, uma rivalidade que transcende o esporte e se tornou parte da identidade local.',
  },
  {
    icon: Trophy,
    title: 'Jogos Decisivos',
    description: 'Os confrontos entre ADP e Atlas já decidiram campeonatos e momentos históricos para o futebol regional, eternizando nomes e jogadas na memória dos torcedores.',
  },
];

export default function Rivalry() {
  return (
    <section id="rivalidade" className="section-blue relative py-16 md:py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#3FA9F5]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div {...fadeInUp} className="text-center mb-12 md:mb-16">
          <span className="text-[#3FA9F5] font-semibold text-sm tracking-widest uppercase mb-3 block">
            Rivalidade
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            Clássico das <span className="text-[#3FA9F5]">Raízes</span>
          </h2>
          <div className="w-20 h-1 bg-[#3FA9F5] mx-auto rounded-full mb-6" />
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base">
            Uma rivalidade que nasce da paixão pelo futebol e da força de duas comunidades unidas pelo esporte.
          </p>
        </motion.div>

        {/* VS Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-12 md:mb-16"
        >
          <div className="relative rounded-2xl overflow-hidden">
            {/* VS Background */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-0">
              {/* ADP Side */}
              <div className="bg-[#0A1F44] p-6 md:p-10 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A1F44]/50" />
                <div className="relative z-10">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center">
                    <span className="text-3xl md:text-4xl font-bold text-[#3FA9F5]">ADP</span>
                  </div>
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-2">Piquiri</h3>
                  <p className="text-white/50 text-sm">Associação Desportiva do Piquiri</p>
                  <div className="mt-4 flex justify-center">
                    <div className="w-16 h-1 bg-[#3FA9F5] rounded-full" />
                  </div>
                </div>
              </div>

              {/* VS Divider */}
              <div className="bg-[#0F2744] p-4 md:p-10 flex items-center justify-center relative">
                <div className="absolute inset-y-0 left-0 w-px bg-white/10" />
                <div className="absolute inset-y-0 right-0 w-px bg-white/10" />
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#3FA9F5] to-[#0A1F44] flex items-center justify-center animate-pulse-glow">
                  <span className="text-white font-bold text-xl md:text-2xl">VS</span>
                </div>
              </div>

              {/* Atlas Side */}
              <div className="bg-[#8B1A1A] p-6 md:p-10 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#8B1A1A]/50" />
                <div className="relative z-10">
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center">
                    <span className="text-3xl md:text-4xl font-bold text-white">ATL</span>
                  </div>
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-2">Atlas FC</h3>
                  <p className="text-white/50 text-sm">Clube rival tradicional</p>
                  <div className="mt-4 flex justify-center">
                    <div className="w-16 h-1 bg-white/30 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Rivalry Facts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-12 md:mb-16">
          {rivalryFacts.map((fact, index) => (
            <motion.div
              key={fact.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 text-center card-hover"
            >
              <div className="w-14 h-14 mx-auto mb-4 bg-[#3FA9F5]/10 rounded-xl flex items-center justify-center">
                <fact.icon className="text-[#3FA9F5]" size={28} />
              </div>
              <h3 className="font-bold text-lg text-white mb-2">{fact.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{fact.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Head-to-Head Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h3 className="text-xl md:text-2xl font-bold text-center text-white mb-6 md:mb-8">
            Confrontos Diretos
          </h3>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="space-y-4">
              {[
                { label: 'Vitórias ADP', value: '12', color: '#3FA9F5', width: '48%' },
                { label: 'Empates', value: '8', color: '#D4A843', width: '32%' },
                { label: 'Vitórias Atlas', value: '5', color: '#FF6B6B', width: '20%' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-white/70 text-sm">{stat.label}</span>
                    <span className="text-white font-bold text-sm">{stat.value}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: stat.width }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: stat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-white/30 text-xs text-center mt-4">* Dados ilustrativos da temporada 2026</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
