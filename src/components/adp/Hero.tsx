'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image & Gradient Overlays */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt="Arena Piquiri"
          fill
          className="object-cover"
          priority
        />
        <div className="hero-gradient absolute inset-0" />
      </div>

      {/* Animated Waves */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute bottom-0 w-[200%] animate-wave-move-slow opacity-20"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ height: '120px' }}
        >
          <path
            fill="#3FA9F5"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        <svg
          className="absolute bottom-0 w-[200%] animate-wave-move-slow opacity-10"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ height: '80px', animationDelay: '-5s', animationDuration: '15s' }}
        >
          <path
            fill="#3FA9F5"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Animated Crest/Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6 md:mb-8"
        >
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto animate-float">
            <Image
              src="/123.png"
              alt="Logo oficial ADP"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </motion.div>

        {/* Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-2 md:mb-4 tracking-tight">
            ASSOCIAÇÃO DESPORTIVA
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 tracking-tight">
            <span className="gradient-text">DO PIQUIRI</span>
          </h2>
        </motion.div>

        {/* Motto */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-[#3FA9F5] font-light italic mb-8 md:mb-12 tracking-wide"
        >
          &ldquo;Das águas nasce a força&rdquo;
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => scrollTo('#clube')}
            className="bg-[#3FA9F5] hover:bg-[#2D8FD4] text-white font-semibold px-8 py-3 md:px-10 md:py-4 rounded-lg text-sm md:text-base transition-all duration-300 hover:shadow-lg hover:shadow-[#3FA9F5]/30 hover:-translate-y-0.5"
          >
            Conheça o Clube
          </button>
          <button
            onClick={() => scrollTo('#noticias')}
            className="border-2 border-white/30 hover:border-[#3FA9F5] text-white hover:text-[#3FA9F5] font-semibold px-8 py-3 md:px-10 md:py-4 rounded-lg text-sm md:text-base transition-all duration-300 hover:-translate-y-0.5"
          >
            Ver Notícias
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="cursor-pointer"
          onClick={() => scrollTo('#clube')}
        >
          <ChevronDown size={28} className="text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
