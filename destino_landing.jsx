import React, { useState, useEffect } from 'react';
import {
  Instagram, Facebook, MessageCircle, Download, Smartphone, Zap,
  Palette, Megaphone, Users, Bot, CheckCircle2, ArrowRight,
  ShieldCheck, Sparkles, TrendingUp, X, Menu
} from 'lucide-react';

const C = {
  bg: '#0B0F17',
  surface: '#1E293B',
  surface2: '#151C2C',
  border: '#334155',
  green: '#15803D',
  greenDark: '#166534',
  greenLight: '#22A25A',
  blue: '#0284C7',
  blueDark: '#0369A1',
  orange: '#EA580C',
  orangeLight: '#F97316',
  text: '#F1F5F9',
  muted: '#94A3B8',
};

const WA_BASE = 'https://wa.me/244930747829';
const waLink = (msg) => `${WA_BASE}?text=${encodeURIComponent(msg)}`;

function SignalMark({ size = 40 }) {
  // Signature motif: the interlocking dual-arrow "signal" from the DESTINO mark —
  // a signal that bends and turns into an upward push. Used as brand seal + divider accent.
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M20 38 L50 18 L50 38 L80 18" stroke={C.blue} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M20 62 L50 82 L50 62 L80 82" stroke={C.orangeLight} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

function SignalDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '0 auto', width: 'fit-content' }}>
      <div style={{ width: 40, height: 1, background: `linear-gradient(90deg, transparent, ${C.border})` }} />
      <SignalMark size={22} />
      <div style={{ width: 40, height: 1, background: `linear-gradient(90deg, ${C.border}, transparent)` }} />
    </div>
  );
}

function Badge({ children, color = C.green }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '5px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600,
      letterSpacing: '0.04em', textTransform: 'uppercase',
      color, background: `${color}1a`, border: `1px solid ${color}40`,
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      {children}
    </span>
  );
}

function PrimaryButton({ children, href, icon: Icon, color = C.green, colorDark, style }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        padding: '14px 24px', borderRadius: 12, fontWeight: 700, fontSize: 15,
        color: '#fff', background: hover ? colorDark || color : color,
        textDecoration: 'none', transition: 'transform 0.15s ease, background 0.15s ease',
        transform: hover ? 'translateY(-2px)' : 'none',
        boxShadow: hover ? `0 10px 24px -8px ${color}80` : `0 4px 14px -6px ${color}60`,
        fontFamily: "'Sora', sans-serif", cursor: 'pointer', whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}{Icon && <Icon size={17} />}
    </a>
  );
}

function GhostButton({ children, href, icon: Icon }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        padding: '13px 22px', borderRadius: 12, fontWeight: 600, fontSize: 15,
        color: C.text, background: hover ? '#ffffff10' : 'transparent',
        border: `1px solid ${hover ? '#ffffff40' : C.border}`,
        textDecoration: 'none', transition: 'all 0.15s ease',
        fontFamily: "'Sora', sans-serif", cursor: 'pointer', whiteSpace: 'nowrap',
      }}
    >
      {children}{Icon && <Icon size={17} />}
    </a>
  );
}

function Reveal({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = React.useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

const MODULES = [
  { icon: Palette, color: C.blue, title: 'Brand Kit', desc: 'A tua paleta, o teu logótipo, o teu tom de voz. Cada arte gerada respeita a tua identidade — sem exceções.' },
  { icon: Megaphone, color: C.orangeLight, title: 'Anúncios Patrocinados', desc: 'Oferta, copy e criativo prontos para Meta Ads, direcionados às cidades e províncias que interessam ao teu negócio.' },
  { icon: MessageCircle, color: C.green, title: 'WhatsApp First', desc: 'Status, catálogo e respostas rápidas — porque é lá que o teu cliente decide comprar.' },
  { icon: Users, color: C.blue, title: 'CRM Simplificado', desc: 'Nome, contacto, histórico e estado de cada lead. Sem folhas de Excel perdidas.' },
  { icon: Bot, color: C.orangeLight, title: 'Autocorreção IA', desc: 'A IA identifica o que não está a vender e sugere o ajuste — imagem, horário ou oferta — em 1 clique.' },
];

const PLANS = [
  {
    name: 'Essencial', price: '30.000', highlight: false, color: C.blue,
    features: ['12 posts/anúncios por mês', 'Brand Kit', 'Módulo WhatsApp First', 'CRM de clientes', 'Relatórios simples'],
  },
  {
    name: 'Avançado', price: '50.000', highlight: true, color: C.green,
    features: ['30 posts/anúncios por mês', 'Brand Kit completo', '3 redes sociais + WhatsApp', 'CRM completo', 'Autocorreção IA de métricas', 'Atendente IA 24h', 'Suporte VIP DESTINO'],
  },
];

const FORMACOES = [
  { title: 'Mentorias VIP', desc: 'Acompanhamento estratégico individual com a equipa DESTINO.' },
  { title: 'Workshops', desc: 'Imersões mão na massa em criação de conteúdo e vendas.' },
  { title: 'Formações Corporativas', desc: 'Capacitação da tua equipa de marketing e vendas.' },
  { title: 'Palestras', desc: 'Marketing digital, IA e vendas — para inspirar equipas e eventos.' },
];

function useWidth() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return w;
}

export default function DestinoLanding() {
  const width = useWidth();

  return (
    <div style={{
      background: C.bg, color: C.text, fontFamily: "'Inter', sans-serif",
      minHeight: '100vh', overflowX: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; }
        a { -webkit-tap-highlight-color: transparent; }
        .destino-h1 { font-family: 'Sora', sans-serif; font-weight: 800; letter-spacing: -0.02em; }
        .destino-h2 { font-family: 'Sora', sans-serif; font-weight: 700; letter-spacing: -0.01em; }
        @keyframes bolt-pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes float-y { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes dash-flow { to { stroke-dashoffset: -200; } }
        .bolt-anim { animation: bolt-pulse 3.2s ease-in-out infinite; }
        .float-anim { animation: float-y 4.5s ease-in-out infinite; }
        .mock-card { animation: float-y 5.5s ease-in-out infinite; }
        ::selection { background: ${C.orange}55; }
        .plan-card:hover { transform: translateY(-6px); }
        .mod-card:hover { border-color: #ffffff30 !important; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(12px)',
        background: `${C.bg}cc`, borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <SignalMark size={30} />
            <span className="destino-h2" style={{ fontSize: 19 }}>DESTINO</span>
          </div>
          <div style={{ display: 'flex', gap: 28, fontSize: 14, fontWeight: 500 }} className="nav-links">
            <a href="#modulos" style={{ color: C.muted, textDecoration: 'none', display: width < 820 ? 'none' : 'block' }}>Módulos</a>
            <a href="#planos" style={{ color: C.muted, textDecoration: 'none', display: width < 820 ? 'none' : 'block' }}>Planos</a>
            <a href="#formacoes" style={{ color: C.muted, textDecoration: 'none', display: width < 820 ? 'none' : 'block' }}>Formações</a>
          </div>
          <div style={{ display: width < 640 ? 'none' : 'block' }}>
            <PrimaryButton href="#planos" color={C.green} colorDark={C.greenDark} style={{ padding: '10px 18px', fontSize: 14 }}>
              Experimentar
            </PrimaryButton>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: 'relative', padding: '76px 24px 60px', maxWidth: 1180, margin: '0 auto' }}>
        <div style={{
          position: 'absolute', top: -80, right: -120, width: 480, height: 480, borderRadius: '50%',
          background: `radial-gradient(circle, ${C.blue}22, transparent 70%)`, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -60, left: -100, width: 400, height: 400, borderRadius: '50%',
          background: `radial-gradient(circle, ${C.orange}1a, transparent 70%)`, pointerEvents: 'none',
        }} />

        <div style={{ display: 'grid', gridTemplateColumns: width > 940 ? '1.1fr 0.9fr' : '1fr', gap: 48, alignItems: 'center', position: 'relative' }}>
          <Reveal>
            <div>
              <Badge>Sistema DES+ · by Destino</Badge>
              <h1 className="destino-h1" style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.08, margin: '20px 0 20px' }}>
                Chega de rasgar dinheiro com marketing que{' '}
                <span style={{ color: C.orangeLight }}>não vende</span>.
              </h1>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: C.muted, maxWidth: 540 }}>
                A equipa da DESTINO desenvolveu a solução definitiva para o mercado angolano: por apenas{' '}
                <strong style={{ color: C.text, fontFamily: "'JetBrains Mono', monospace" }}>30.000 Kz/mês</strong>, tens uma Inteligência Artificial completa que cria artes fiéis à tua marca, gera textos de vendas adaptados ao público local, otimiza Anúncios Patrocinados e vende no WhatsApp 24/7 sem dores de cabeça.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 30 }}>
                <PrimaryButton href="#planos" color={C.green} colorDark={C.greenDark}>
                  Experimentar com Apenas 30.000 Kz
                </PrimaryButton>
                <GhostButton href="#app" icon={Download}>Baixar o App</GhostButton>
              </div>
              <div style={{ marginTop: 14 }}>
                <PrimaryButton
                  href={waLink('Olá DESTINO! Quero agendar uma mentoria/palestra.')}
                  color={C.orange} colorDark="#c2410c"
                  style={{ padding: '10px 18px', fontSize: 14 }}
                >
                  Agendar Mentoria / Palestra com a DESTINO
                </PrimaryButton>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 28, color: C.muted, fontSize: 13 }}>
                <ShieldCheck size={18} color={C.greenLight} />
                Garantia Incondicional DESTINO de 7 dias ou o teu dinheiro de volta.
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mock-card" style={{
              background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20,
              padding: 20, boxShadow: '0 30px 60px -30px #000000aa', position: 'relative',
            }}>
              <div style={{ position: 'absolute', top: -18, right: -18, opacity: 0.9 }} className="bolt-anim">
                <SignalMark size={54} />
              </div>
              <div style={{ fontSize: 12, color: C.muted, fontFamily: "'JetBrains Mono', monospace", marginBottom: 12 }}>
                brand_kit.painel · ao vivo
              </div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 54, height: 54, borderRadius: 12, background: `linear-gradient(135deg, ${C.green}, ${C.blue})`, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Arte gerada — Promoção de Sexta</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>Fiel ao Brand Kit · pronta para publicar</div>
                </div>
              </div>
              <div style={{ background: C.surface2, borderRadius: 12, padding: 14, marginBottom: 10, border: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.muted, marginBottom: 6 }}>
                  <span>Anúncio · Instagram</span><span style={{ color: C.greenLight }}>Otimizado</span>
                </div>
                <div style={{ display: 'flex', gap: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>
                  <span>CTR <b style={{ color: C.text }}>4.8%</b></span>
                  <span>CPA <b style={{ color: C.text }}>320 Kz</b></span>
                  <span>ROAS <b style={{ color: C.greenLight }}>3.6x</b></span>
                </div>
              </div>
              <div style={{ background: C.surface2, borderRadius: 12, padding: 14, border: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: C.muted, marginBottom: 8 }}>
                  <MessageCircle size={14} color={C.greenLight} /> WhatsApp · resposta automática
                </div>
                <div style={{ fontSize: 13, color: C.muted, fontStyle: 'italic' }}>"Qual é o preço do plano avançado?"</div>
                <div style={{ fontSize: 13, marginTop: 6, background: `${C.green}22`, borderRadius: 8, padding: '6px 10px', display: 'inline-block' }}>
                  Enviado em 2 segundos ✓
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Low-data strip */}
        <Reveal delay={0.2}>
          <div style={{
            marginTop: 56, display: 'flex', flexWrap: 'wrap', gap: 28, justifyContent: 'center',
            padding: '18px 24px', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`,
          }}>
            {[
              [Zap, 'Baixo consumo de dados — feito para 3G/4G'],
              [Smartphone, 'Instala no telemóvel como app'],
              [Sparkles, 'Processos complexos em menos de 3 cliques'],
            ].map(([Icon, label], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.muted }}>
                <Icon size={16} color={C.orangeLight} /> {label}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* MODULES */}
      <section id="modulos" style={{ maxWidth: 1180, margin: '0 auto', padding: '80px 24px 40px' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 46 }}>
            <SignalDivider />
            <h2 className="destino-h2" style={{ fontSize: 'clamp(26px, 4vw, 36px)', margin: '18px 0 10px' }}>Tudo que o teu negócio precisa, num só sistema</h2>
            <p style={{ color: C.muted, maxWidth: 520, margin: '0 auto' }}>Cinco módulos que fazem o trabalho que hoje toma o teu dia inteiro.</p>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: width > 900 ? 'repeat(3, 1fr)' : width > 600 ? 'repeat(2,1fr)' : '1fr', gap: 16 }}>
          {MODULES.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.06}>
              <div className="mod-card" style={{
                background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 22,
                height: '100%', transition: 'border-color 0.2s ease',
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `${m.color}1f`, marginBottom: 14,
                }}>
                  <m.icon size={21} color={m.color} />
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, fontFamily: "'Sora', sans-serif" }}>{m.title}</div>
                <div style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.55 }}>{m.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="planos" style={{ maxWidth: 1180, margin: '0 auto', padding: '70px 24px 40px' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 46 }}>
            <SignalDivider />
            <h2 className="destino-h2" style={{ fontSize: 'clamp(26px, 4vw, 36px)', margin: '18px 0 10px' }}>Planos pensados para Angola</h2>
            <p style={{ color: C.muted }}>Sem contratos escondidos. Cancela quando quiseres.</p>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: width > 720 ? 'repeat(2,1fr)' : '1fr', gap: 20, maxWidth: 760, margin: '0 auto' }}>
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <div className="plan-card" style={{
                background: p.highlight ? `linear-gradient(180deg, ${C.surface}, ${C.surface2})` : C.surface,
                border: `1px solid ${p.highlight ? p.color : C.border}`,
                borderRadius: 18, padding: 28, position: 'relative', transition: 'transform 0.25s ease',
                boxShadow: p.highlight ? `0 20px 50px -24px ${p.color}70` : 'none',
              }}>
                {p.highlight && (
                  <div style={{
                    position: 'absolute', top: -12, left: 24, background: p.color, color: '#fff',
                    fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 999,
                    fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.03em',
                  }}>MAIS ESCOLHIDO</div>
                )}
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{p.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 20 }}>
                  <span className="destino-h1" style={{ fontSize: 34 }}>{p.price}</span>
                  <span style={{ color: C.muted, fontSize: 14 }}>Kz / mês</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: 'flex', gap: 8, fontSize: 13.5, color: C.text }}>
                      <CheckCircle2 size={16} color={p.color} style={{ flexShrink: 0, marginTop: 1 }} /> {f}
                    </div>
                  ))}
                </div>
                <PrimaryButton
                  href={waLink(`Olá DESTINO! Quero aderir ao plano ${p.name} (${p.price} Kz/mês).`)}
                  color={p.color} colorDark={p.highlight ? C.greenDark : C.blueDark}
                  style={{ width: '100%' }}
                >
                  Escolher {p.name} <ArrowRight size={16} />
                </PrimaryButton>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FORMAÇÕES */}
      <section id="formacoes" style={{ maxWidth: 1180, margin: '0 auto', padding: '70px 24px 40px' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <SignalDivider />
            <h2 className="destino-h2" style={{ fontSize: 'clamp(26px, 4vw, 36px)', margin: '18px 0 10px' }}>Braço educacional DESTINO</h2>
            <p style={{ color: C.muted, maxWidth: 520, margin: '0 auto' }}>Para quem quer ir além do software e formar a própria equipa.</p>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: width > 900 ? 'repeat(4,1fr)' : width > 560 ? 'repeat(2,1fr)' : '1fr', gap: 14, marginBottom: 32 }}>
          {FORMACOES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div style={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 14, padding: 18, height: '100%' }}>
                <div style={{ fontWeight: 700, fontSize: 14.5, marginBottom: 6, fontFamily: "'Sora', sans-serif", color: C.orangeLight }}>{f.title}</div>
                <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div style={{ textAlign: 'center' }}>
            <PrimaryButton href={waLink('Olá DESTINO! Quero saber mais sobre formações e mentorias.')} color={C.orange} colorDark="#c2410c" icon={MessageCircle}>
              Falar com a DESTINO no WhatsApp
            </PrimaryButton>
          </div>
        </Reveal>
      </section>

      {/* APP DOWNLOAD */}
      <section id="app" style={{ maxWidth: 1180, margin: '0 auto', padding: '50px 24px 90px' }}>
        <Reveal>
          <div style={{
            background: `linear-gradient(120deg, ${C.greenDark}, ${C.blueDark})`, borderRadius: 22,
            padding: '44px 32px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24,
          }}>
            <div style={{ maxWidth: 480 }}>
              <div className="destino-h2" style={{ fontSize: 24, marginBottom: 8 }}>Leva o Sistema DES+ no bolso</div>
              <div style={{ color: '#e2e8f0', fontSize: 14 }}>Instala como app no teu telemóvel em 5 segundos — sem loja, sem espaço ocupado.</div>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <GhostButton href="#" icon={Download}>Baixar App na Play Store</GhostButton>
              <GhostButton href="#" icon={Smartphone}>Instalar no Telemóvel</GhostButton>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: '40px 24px 28px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <SignalMark size={26} />
            <span className="destino-h2" style={{ fontSize: 16 }}>DESTINO</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <a href="https://www.instagram.com/destino6485" target="_blank" rel="noreferrer" style={{ color: C.muted }}><Instagram size={19} /></a>
            <a href="https://www.facebook.com/profile.php?id=61571300865837" target="_blank" rel="noreferrer" style={{ color: C.muted }}><Facebook size={19} /></a>
            <a href={waLink('Olá DESTINO!')} target="_blank" rel="noreferrer" style={{ color: C.muted }}><MessageCircle size={19} /></a>
          </div>
        </div>
        <div style={{ maxWidth: 1180, margin: '20px auto 0', fontSize: 12.5, color: C.muted, textAlign: 'center' }}>
          SISTEMA DES+ © Criado e Desenvolvido pela DESTINO — Líder em Soluções Digitais em Angola.
        </div>
      </footer>
    </div>
  );
}
