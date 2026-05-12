'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Youtube, MessageCircle } from 'lucide-react';
import { useState, type FormEvent } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: 'easeOut' },
};

const socialLinks = [
  { icon: Instagram, label: 'Instagram', handle: '@adp_oficial', color: '#E4405F' },
  { icon: Twitter, label: 'Twitter / X', handle: '@adp_oficial', color: '#1DA1F2' },
  { icon: Youtube, label: 'YouTube', handle: 'ADP Oficial', color: '#FF0000' },
  { icon: MessageCircle, label: 'WhatsApp', handle: 'Contato', color: '#25D366' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contato" className="section-light water-texture relative py-16 md:py-24">
      {/* Wave Top */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path fill="#0A1F44" className="dark:fill-[#050E1F]" d="M0,0L1440,80L1440,0L0,0Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 relative z-10">
        {/* Section Header */}
        <motion.div {...fadeInUp} className="text-center mb-12 md:mb-16">
          <span className="text-[#3FA9F5] font-semibold text-sm tracking-widest uppercase mb-3 block">
            Fale Conosco
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
            Entre em <span className="gradient-text">Contato</span>
          </h2>
          <div className="w-20 h-1 bg-[#3FA9F5] mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Tem alguma dúvida, sugestão ou quer se tornar parceiro do clube?
            Entre em contato com a equipe da ADP.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Envie sua Mensagem</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Nome</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#3FA9F5] focus:border-transparent transition-all"
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">E-mail</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#3FA9F5] focus:border-transparent transition-all"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Assunto</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#3FA9F5] focus:border-transparent transition-all"
                    placeholder="Assunto da mensagem"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Mensagem</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#3FA9F5] focus:border-transparent transition-all resize-none"
                    placeholder="Escreva sua mensagem..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#3FA9F5] hover:bg-[#2D8FD4] text-white font-semibold py-3 rounded-lg text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#3FA9F5]/30 flex items-center justify-center gap-2"
                >
                  {submitted ? (
                    <>Mensagem Enviada! ✓</>
                  ) : (
                    <>
                      Enviar Mensagem
                      <Send size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {/* Contact Cards */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Informações de Contato</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#3FA9F5]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-[#3FA9F5]" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">E-mail</p>
                    <p className="text-muted-foreground text-sm">contato@adpoficial.com.br</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#3FA9F5]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-[#3FA9F5]" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Telefone</p>
                    <p className="text-muted-foreground text-sm">(44) 9999-0000</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#3FA9F5]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[#3FA9F5]" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Endereço</p>
                    <p className="text-muted-foreground text-sm">Paraná, Brasil — Arena Piquiri</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Redes Sociais</h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-[#3FA9F5]/30 transition-all duration-300 card-hover group"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                      style={{ backgroundColor: `${social.color}15` }}
                    >
                      <social.icon size={20} style={{ color: social.color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{social.label}</p>
                      <p className="text-muted-foreground text-xs truncate">{social.handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="block bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/30 card-hover"
            >
              <MessageCircle size={32} className="mx-auto mb-3" />
              <h4 className="font-bold text-lg mb-1">Fale pelo WhatsApp</h4>
              <p className="text-white/80 text-sm">
                Atendimento rápido e direto com a equipe do clube
              </p>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
