'use client';

import { motion } from 'framer-motion';
import { Calendar, Target, Heart, Users } from 'lucide-react';

const timeline = [
  {
    year: '19 de Abril, 2026',
    title: 'Fundação do Clube',
    description: 'No Dia dos Povos Indígenas, a Associação Desportiva do Piquiri nasce com a missão de unir a comunidade paranaense através do futebol, honrando as raízes culturais e a força das águas do Rio Piquiri.',
  },
  {
    year: '2026',
    title: 'Inscrição nas Competições',
    description: 'ADP se inscreve nos campeonatos regionais do Paraná, dando os primeiros passos rumo à profissionalização e ao reconhecimento no cenário do futebol brasileiro.',
  },
  {
    year: '2026',
    title: 'Inauguração da Arena Piquiri',
    description: 'A casa do Piquiri é inaugurada, oferecendo infraestrutura moderna e uma experiência única para torcedores, com capacidade para milhares de passionate adeptos.',
  },
  {
    year: 'Futuro',
    title: 'Rumo à Elite',
    description: 'Com determinação e trabalho, a ADP busca ascender nas divisões do futebol paranaense e brasileiro, construindo uma história de superação e glórias.',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: 'easeOut' },
};

const stagger = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
};

export default function About() {
  return (
    <section id="clube" className="section-light water-texture relative">
      {/* Wave Divider Top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path fill="#0A1F44" className="dark:fill-[#050E1F]" d="M0,0L1440,80L1440,0L0,0Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-16 md:pb-24">
        {/* Section Header */}
        <motion.div
          {...fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-[#3FA9F5] font-semibold text-sm tracking-widest uppercase mb-3 block">
            Sobre Nós
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
            A História do <span className="gradient-text">Piquiri</span>
          </h2>
          <div className="w-20 h-1 bg-[#3FA9F5] mx-auto rounded-full" />
        </motion.div>

        {/* Philosophy Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-24">
          {[
            {
              icon: Calendar,
              title: 'Fundação',
              text: '19 de Abril de 2026, Dia dos Povos Indígenas — uma data que carrega o peso da resistência e da identidade cultural do nosso povo.',
            },
            {
              icon: Target,
              title: 'Missão',
              text: 'Promover o esporte como ferramenta de transformação social, formando atletas de caráter e unindo a comunidade paranaense.',
            },
            {
              icon: Heart,
              title: 'Identidade',
              text: 'Conectados ao Rio Piquiri, nossa essência flui como as águas — sempre em movimento, sempre fortes, sempre juntos.',
            },
            {
              icon: Users,
              title: 'Comunidade',
              text: 'Mais que um clube, somos uma família. Cada torcedor é parte fundamental da grande força que nos move adiante.',
            },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              {...stagger}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 card-hover text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 bg-[#3FA9F5]/10 rounded-xl flex items-center justify-center">
                <card.icon className="text-[#3FA9F5]" size={28} />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Foundation Story */}
        <motion.div
          {...fadeInUp}
          className="max-w-3xl mx-auto mb-16 md:mb-24"
        >
          <div className="bg-gradient-to-br from-[#0A1F44] to-[#1E3A5F] rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#3FA9F5]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#3FA9F5]/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Nossa Fundação
              </h3>
              <p className="text-white/80 leading-relaxed mb-4">
                A Associação Desportiva do Piquiri foi fundada em 19 de abril de 2026, uma data profundamente simbólica para o Brasil — o Dia dos Povos Indígenas. Escolhemos essa data deliberadamente, pois nosso clube nasce com o propósito de honrar as raízes originais da nossa terra e celebrar a diversidade cultural que define o Paraná.
              </p>
              <p className="text-white/80 leading-relaxed mb-4">
                O nome &ldquo;Piquiri&rdquo; tem origem tupi-guarani, significando &ldquo;rio dos peixes&rdquo;, uma referência direta ao importante rio que banha o oeste paranaense. Assim como o rio que dá nome ao clube, a ADP busca ser uma força constante, moldando o esporte e a comunidade com fluidez, resiliência e poder.
              </p>
              <p className="text-white/80 leading-relaxed">
                Do interior do Paraná, trazemos a paixão genuína do futebol brasileiro — um futebol de coração, de entrega, de comunidade. Cada jogador que veste a camisa azul e branco carrega não apenas o nome do clube, mas o orgulho de uma região inteira.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div {...fadeInUp}>
          <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10 md:mb-14">
            Nossa <span className="gradient-text">Trajetória</span>
          </h3>
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#3FA9F5] to-[#0A1F44] -translate-x-1/2 hidden md:block" />
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#3FA9F5] to-[#0A1F44] md:hidden" />

            <div className="space-y-8 md:space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={`${item.year}-${index}`}
                  {...stagger}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative flex flex-col md:flex-row items-start gap-4 md:gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-5 md:left-1/2 w-3 h-3 bg-[#3FA9F5] rounded-full -translate-x-1/2 mt-2 animate-pulse-glow z-10" />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                    <span className="text-[#3FA9F5] font-semibold text-sm tracking-wide">{item.year}</span>
                    <h4 className="font-bold text-lg text-foreground mt-1 mb-2">{item.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Wave Divider Bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path fill="#0A1F44" className="dark:fill-[#050E1F]" d="M0,80L1440,0L1440,80L0,80Z" />
        </svg>
      </div>
    </section>
  );
}
