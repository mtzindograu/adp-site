'use client';

import { useState, useEffect, useSyncExternalStore, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavChild {
  label: string;
  href: string;
  icon?: string;
}

interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

const navStructure: NavItem[] = [
  { label: 'Início', href: '/' },
  {
    label: 'Modalidades',
    href: '/modalidades',
    children: [
      { label: 'Futebol Masculino', href: '/modalidades#futebol', icon: '⚽' },
      { label: 'Vôlei Feminino', href: '/modalidades#volei', icon: '🏐' },
      { label: 'Basquete', href: '/modalidades#basquete', icon: '🏀' },
      { label: 'Categoria de Base', href: '/modalidades#base', icon: '🌟' },
    ],
  },
  {
    label: 'Clube',
    href: '/clube',
    children: [
      { label: 'Sobre o Clube', href: '/clube#clube' },
      { label: 'Escudo & Identidade', href: '/clube#escudo' },
      { label: 'Arena Piquiri', href: '/clube#arena' },
      { label: 'Rivalidade', href: '/clube#rivalidade' },
    ],
  },
  { label: 'Notícias', href: '/noticias' },
  { label: 'Contato', href: '/contato' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpenMenus, setMobileOpenMenus] = useState<string[]>([]);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
    setMobileOpenMenus([]);
  };

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileMenu = (label: string) => {
    setMobileOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((m) => m !== label) : [...prev, label],
    );
  };

  const isLinkActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || pathname !== '/'
            ? 'bg-[#0A1F44]/95 backdrop-blur-md shadow-lg shadow-[#0A1F44]/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-3 group"
            >
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                <Image
                  src="/123.png"
                  alt="Logo oficial ADP"
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm md:text-base tracking-wider leading-tight">
                  ADP
                </span>
                <span className="text-[#3FA9F5] text-[10px] md:text-xs tracking-wide hidden sm:block">
                  ASSOCIAÇÃO DESPORTIVA DO PIQUIRI
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navStructure.map((item) => {
                const active = isLinkActive(item.href || '');
                
                if (item.children) {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link
                        href={item.href || '#'}
                        className={`px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 ${
                          active ? 'text-[#3FA9F5]' : 'text-white/80 hover:text-white'
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            activeDropdown === item.label ? 'rotate-180' : ''
                          }`}
                        />
                      </Link>

                      {/* Active underline */}
                      {(active || activeDropdown === item.label) && (
                        <motion.div
                          layoutId="activeUnderline"
                          className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#3FA9F5] rounded-full"
                        />
                      )}

                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            onMouseEnter={() => handleMouseEnter(item.label)}
                            onMouseLeave={handleMouseLeave}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                          >
                            <div className="bg-white dark:bg-[#0A1F44] rounded-xl shadow-xl shadow-black/20 border border-gray-100 dark:border-[#1E3A5F] p-2 min-w-[220px]">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={closeMenu}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-[#3FA9F5]/10 hover:text-[#3FA9F5] transition-colors duration-150"
                                >
                                  {child.icon && (
                                    <span className="text-base flex-shrink-0">{child.icon}</span>
                                  )}
                                  <span>{child.label}</span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 relative group ${
                      active ? 'text-[#3FA9F5]' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {item.label}
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#3FA9F5] transition-all duration-300 rounded-full ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </Link>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="text-white/80 hover:text-white p-2 rounded-full transition-colors duration-200 hover:bg-white/10"
                  aria-label="Toggle dark mode"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60" onClick={closeMenu} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-[#0A1F44] shadow-2xl overflow-y-auto"
            >
              <div className="pt-20 px-4 pb-6">
                <div className="flex flex-col gap-1">
                  {navStructure.map((item, index) => {
                    const active = isLinkActive(item.href || '');
                    
                    if (item.children) {
                      const isMenuOpen = mobileOpenMenus.includes(item.label);
                      return (
                        <div key={item.label}>
                          <button
                            onClick={() => toggleMobileMenu(item.label)}
                            className={`w-full hover:bg-white/10 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 flex items-center justify-between ${
                              active ? 'text-[#3FA9F5]' : 'text-white/80'
                            }`}
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isMenuOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {isMenuOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 py-1 space-y-0.5">
                                  {item.children.map((child) => (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      onClick={closeMenu}
                                      className="flex items-center gap-3 text-white/60 hover:text-[#3FA9F5] hover:bg-white/5 px-4 py-2.5 rounded-lg text-sm transition-all duration-200"
                                    >
                                      {child.icon && (
                                        <span className="text-base">{child.icon}</span>
                                      )}
                                      <span>{child.label}</span>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={item.label}
                        href={item.href!}
                        onClick={closeMenu}
                        className={`hover:bg-white/10 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                          active ? 'text-[#3FA9F5]' : 'text-white/80'
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
