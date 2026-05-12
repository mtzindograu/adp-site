'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Droplets, Shield } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: 'easeOut' },
};

export default function Crest() {
  return (
    <section id="escudo" className="section-light water-texture relative py-16 md:py-24">
      {/* Wave Top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path fill="#0A1F44" className="dark:fill-[#050E1F]" d="M0,0L60,10.7C120,21,240,43,360,53.3C480,64,600,64,720,53.3C840,43,960,21,1080,16C1200,11,1320,21,1380,26.7L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 relative z-10">
        {/* Section Header */}
        <motion.div {...fadeInUp} className="text-center mb-12 md:mb-16">
          <span className="text-[#3FA9F5] font-semibold text-sm tracking-widest uppercase mb-3 block">
            Identidade Visual
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Nosso <span className="gradient-text">Escudo</span>
          </h2>
          <div className="w-20 h-1 bg-[#3FA9F5] mx-auto rounded-full" />
        </motion.div>

        {/* Crest Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-12 md:mb-20"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[#3FA9F5]/20 rounded-full blur-3xl scale-110 animate-pulse-glow" />
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80">
              <Image
                src="/123.png"
                alt="Logo oficial ADP"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </motion.div>

        {/* Identity Elements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mb-12 md:mb-16">
          {[
            {
              icon: Droplets,
              title: 'Azul Escuro — #0A1F44',
              subtitle: 'A Profundidade das Águas',
              description:
                'O azul escuro representa a profundidade do Rio Piquiri e a serenidade de nossas águas. É a cor principal do clube, simbolizando a força silenciosa que carrega o time adiante. Também representa a noite paranaense, sob a qual nossos torcedores se reúnem para apoiar o time.',
              color: '#0A1F44',
            },
            {
              icon: Star,
              title: 'Azul Claro — #3FA9F5',
              subtitle: 'O Movimento das Águas',
              description:
                'O azul claro representa a superfície do rio, refletindo a luz e a energia do movimento constante das águas. Esta cor traz modernidade e vivacidade ao clube, representando o espírito jovem e a energia renovável que impulsiona a ADP. É a cor do futuro, da inovação e da esperança.',
              color: '#3FA9F5',
            },
            {
              icon: Shield,
              title: 'Branco — #FFFFFF',
              subtitle: 'A Pureza da Intenção',
              description:
                'O branco representa a pureza dos nossos ideais e a transparência na gestão do clube. Simboliza também a paz e a unidade que buscamos construir na comunidade. Nas ondas do escudo, representa a espuma das águas do Piquiri, completando a identidade visual aquática do clube.',
              color: '#FFFFFF',
            },
          ].map((element, index) => (
            <motion.div
              key={element.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-card border border-border rounded-xl p-6 md:p-8 card-hover"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${element.color}20` }}
              >
                <element.icon
                  size={28}
                  style={{ color: element.color === '#FFFFFF' ? '#0A1F44' : element.color }}
                />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-1">{element.title}</h3>
              <p className="text-[#3FA9F5] font-medium text-sm mb-3">{element.subtitle}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{element.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Wave Symbol Explanation */}
        <motion.div
          {...fadeInUp}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-r from-[#0A1F44]/5 via-[#3FA9F5]/5 to-[#0A1F44]/5 dark:from-[#3FA9F5]/5 dark:via-[#3FA9F5]/10 dark:to-[#3FA9F5]/5 rounded-2xl p-8 md:p-10 border border-border text-center">
            <div className="flex justify-center mb-4">
              <svg width="80" height="40" viewBox="0 0 80 40" className="text-[#3FA9F5]">
                <path
                  d="M0,20 Q10,5 20,20 Q30,35 40,20 Q50,5 60,20 Q70,35 80,20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              O Símbolo das Ondas
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              As ondas presentes no escudo não são apenas um elemento estético — elas representam a essência 
              do Rio Piquiri e o espírito inabalável do nosso povo. Cada onda carrega a memória de quem veio 
              antes e a promessa de quem virá depois. Assim como as águas do rio nunca param de fluir, a ADP 
              nunca para de lutar. A estrela acima do escudo ilumina nosso caminho, guiando-nos rumo à grandeza.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path fill="#0A1F44" className="dark:fill-[#050E1F]" d="M0,80L60,69.3C120,59,240,37,360,32C480,27,600,37,720,48C840,59,960,69,1080,64C1200,59,1320,37,1380,26.7L1440,16L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z" />
        </svg>
      </div>
    </section>
  );
}
