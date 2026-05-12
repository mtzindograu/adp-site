'use client';

import SportSection from '@/components/adp/SportSection';
import YouthAcademy from '@/components/adp/YouthAcademy';
import { motion } from 'framer-motion';

export default function ModalidadesPage() {
  return (
    <div className="flex flex-col">
      {/* Banner de Cabeçalho */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-[#0A1F44]">
        <div className="absolute inset-0 opacity-30">
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
            Nossas <span className="text-[#3FA9F5]">Modalidades</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            A ADP vai muito além do futebol. Conheça todos os esportes e categorias do nosso clube.
          </motion.p>
        </div>
      </section>

      <div id="futebol">
        <SportSection
          sport="football"
          title="Futebol Masculino"
          icon="⚽"
          description="O futebol é o coração da ADP. Nosso time principal defende as cores azul e branco com paixão e determinação nos campeonatos paranaenses, levando a força do Rio Piquiri para cada partida."
          isMain={true}
        />
      </div>
      
      <div id="volei">
        <SportSection
          sport="volleyball"
          title="Vôlei Feminino"
          icon="🏐"
          description="O vôlei da ADP cresce como uma das modalidades de destaque do clube, formando atletas competitivos que representam o orgulho piquiriense nas quadras do Paraná."
          isMain={false}
        />
      </div>

      <div id="basquete">
        <SportSection
          sport="basketball"
          title="Basquete"
          icon="🏀"
          description="O basquete da ADP une velocidade e técnica, com times masculino e misto que disputam os campeonatos regionais e formam jovens talentos do oeste paranaense."
          isMain={false}
        />
      </div>

      <div id="base">
        <YouthAcademy />
      </div>
    </div>
  );
}
