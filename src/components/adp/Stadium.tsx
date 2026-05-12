'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Users, Calendar, Maximize } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: 'easeOut' },
};

const stadiumStats = [
  { icon: Users, label: 'Capacidade', value: '15.000' },
  { icon: Calendar, label: 'Inauguração', value: '2026' },
  { icon: Maximize, label: 'Dimensão do Campo', value: '105 x 68m' },
  { icon: MapPin, label: 'Localização', value: 'Paraná, Brasil' },
];

export default function Stadium() {
  return (
    <section id="arena" className="section-dark relative py-16 md:py-24 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#3FA9F5]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-60 h-60 bg-[#3FA9F5]/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div {...fadeInUp} className="text-center mb-12 md:mb-16">
          <span className="text-[#3FA9F5] font-semibold text-sm tracking-widest uppercase mb-3 block">
            Nossa Casa
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            Arena <span className="text-[#3FA9F5]">Piquiri</span>
          </h2>
          <div className="w-20 h-1 bg-[#3FA9F5] mx-auto rounded-full mb-6" />
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base">
            A casa do Piquiri, onde a magia acontece e a torcida faz a diferença.
            Um estádio moderno, construído com paixão e orgulho paranaense.
          </p>
        </motion.div>

        {/* Stadium Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-16 rounded-2xl overflow-hidden relative"
        >
          <div className="relative aspect-video md:aspect-[21/9]">
            <Image
              src="/stadium.jpg"
              alt="Arena Piquiri"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F44]/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
              <h3 className="text-white text-xl md:text-3xl font-bold">Arena Piquiri</h3>
              <p className="text-white/60 text-sm md:text-base">Paraná, Brasil</p>
            </div>
          </div>
        </motion.div>

        {/* Stadium Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-16">
          {stadiumStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-6 text-center card-hover"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-[#3FA9F5]/10 rounded-xl flex items-center justify-center">
                <stat.icon className="text-[#3FA9F5]" size={24} />
              </div>
              <div className="text-white font-bold text-lg md:text-xl mb-1">{stat.value}</div>
              <div className="text-white/50 text-xs md:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 text-center">
              Sobre a Arena
            </h3>
            <div className="space-y-4 text-white/60 text-sm md:text-base leading-relaxed">
              <p>
                A Arena Piquiri é mais do que um estádio de futebol — é o coração pulsante de uma comunidade inteira.
                Inaugurada em 2026, a arena foi projetada para oferecer a melhor experiência possível para jogadores
                e torcedores, combinando infraestrutura moderna com a atmosfera única do futebol brasileiro.
              </p>
              <p>
                Com capacidade para 15.000 espectadores, a arena conta com arquibancadas confortáveis, camarotes vip,
                estacionamento amplo, restaurante temático e loja oficial do clube. O campo de dimensões oficiais FIFA
                (105 x 68m) é mantido com tecnologia de ponta, garantindo condições ideais para o desenvolvimento do futebol.
              </p>
              <p>
                Localizada no coração do Paraná, a Arena Piquiri é facilmente acessível e se tornou um ponto de encontro
                para a comunidade, sediando não apenas jogos de futebol, mas também eventos culturais, shows e atividades
                sociais que fortalecem os laços entre o clube e seus torcedores.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
