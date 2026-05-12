'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="bg-[#050E1F] text-white relative overflow-hidden">
      {/* Wave Top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 md:h-14">
          <path fill="#ffffff" className="dark:fill-[#0A1F44]" d="M0,60L48,52C96,44,192,28,288,24C384,20,480,28,576,36C672,44,768,52,864,48C960,44,1056,28,1152,24C1248,20,1344,28,1392,32L1440,36L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
        </svg>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#3FA9F5]/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 pb-8 relative z-10">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12">
                <Image src="/123.png" alt="Logo oficial ADP" fill className="object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">ADP</h3>
                <p className="text-white/40 text-xs">Associação Desportiva do Piquiri</p>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              &ldquo;Das águas nasce a força&rdquo; — Um clube nascido do coração do Paraná,
              conectado ao Rio Piquiri e à paixão do futebol brasileiro.
            </p>
            <div className="flex items-center gap-1 text-white/30 text-xs">
              <Heart size={12} className="text-[#3FA9F5]" />
              <span>Feito com amor pelo futebol</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-white mb-4 uppercase tracking-wider">O Clube</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Sobre o Clube', href: '/clube#clube' },
                { label: 'Escudo & Identidade', href: '/clube#escudo' },
                { label: 'Arena Piquiri', href: '/clube#arena' },
                { label: 'Rivalidade', href: '/clube#rivalidade' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-[#3FA9F5] text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="font-bold text-sm text-white mb-4 uppercase tracking-wider">Modalidades</h4>
            <ul className="space-y-2.5">
              {[
                { label: '⚽ Futebol', href: '/modalidades#futebol' },
                { label: '🏐 Vôlei', href: '/modalidades#volei' },
                { label: '🏀 Basquete', href: '/modalidades#basquete' },
                { label: '🌟 Categoria de Base', href: '/modalidades#base' },
                { label: '📰 Notícias', href: '/noticias' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-[#3FA9F5] text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-sm text-white mb-4 uppercase tracking-wider">Contato</h4>
            <div className="space-y-3 text-white/50 text-sm">
              <p>📍 Paraná, Brasil</p>
              <p>📧 contato@adpoficial.com.br</p>
              <p>📱 (44) 9999-0000</p>
            </div>
            <div className="flex items-center gap-3 mt-4">
              {['Instagram', 'Twitter', 'YouTube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 bg-white/5 hover:bg-[#3FA9F5]/20 rounded-lg flex items-center justify-center transition-colors text-white/50 hover:text-[#3FA9F5]"
                  aria-label={social}
                >
                  <span className="text-xs font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs text-center md:text-left">
            © {mounted ? new Date().getFullYear() : '2026'} Associação Desportiva do Piquiri. Todos os direitos reservados.
          </p>
          <p className="text-white/20 text-xs text-center md:text-right">
            Fundada em 19 de Abril de 2026 — Dia dos Povos Indígenas
          </p>
        </div>
      </div>
    </footer>
  );
}
