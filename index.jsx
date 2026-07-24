import React, { useState, useMemo } from 'react';
import {
  Users, ShoppingBag, UserCheck, UserX, Search, Plus, MessageCircle, X, Lock,
  CheckCircle2, Copy, Send, TrendingUp, BarChart3, ShieldCheck, CreditCard,
  Check, XCircle, ChevronRight, AlertTriangle, Sparkles, Wand2, Palette,
  LayoutDashboard, Megaphone, LineChart as LineChartIcon,
} from 'lucide-react';

const C = {
  bg: '#0B0F17', surface: '#1E293B', surface2: '#151C2C', border: '#334155',
  green: '#15803D', greenDark: '#166534', greenLight: '#22A25A',
  blue: '#0284C7', blueDark: '#0369A1',
  orange: '#EA580C', orangeLight: '#F97316',
  text: '#F1F5F9', muted: '#94A3B8', red: '#EF4444',
};
const FONT_D = "'Sora', sans-serif";
const FONT_M = "'JetBrains Mono', monospace";

// ---------- MOCK DATA ----------
const INITIAL_LEADS = [
  { id: '1', name: 'Carla Ndongala', whatsapp: '+244 923 111 222', status: 'buyer', notes: 'Cliente recorrente.', spent: 20000 },
  { id: '2', name: 'Miguel Sapalo', whatsapp: '+244 912 445 890', status: 'contacted', notes: 'Interessado em eventos corporativos.', spent: 0 },
  { id: '3', name: 'Joana Ferreira', whatsapp: '+244 934 778 001', status: 'lead', notes: '', spent: 0 },
  { id: '4', name: 'Tio Zeca Comércio Lda', whatsapp: '+244 941 220 034', status: 'buyer', notes: 'Compra mensal para refeitório.', spent: 90000 },
  { id: '5', name: 'Amélia dos Santos', whatsapp: '+244 999 302 771', status: 'inactive', notes: 'Sem resposta há 2 meses.', spent: 6500 },
];

const STATUS_LABEL = { lead: 'Lead', contacted: 'Contactado', buyer: 'Comprador', inactive: 'Inativo' };
const STATUS_COLOR = { lead: C.blue, contacted: C.orangeLight, buyer: C.greenLight, inactive: C.muted };

const QUICK_REPLIES = [
  { title: 'Saudação inicial', text: 'Olá! Obrigado por contactares a nossa loja 😊 Em que posso ajudar-te hoje?' },
  { title: 'Enviar tabela de preços', text: 'Claro! Aqui tens a nossa tabela de preços atualizada. Qualquer dúvida, é só chamar.' },
  { title: 'Confirmar encomenda', text: 'A tua encomenda está confirmada ✅ Vamos avisar-te assim que estiver pronta.' },
  { title: 'Pedir comprovativo', text: 'Para avançarmos, envia-nos por favor o comprovativo do pagamento. Obrigado!' },
];

const MOCK_POSTS = [
  { id: 'p1', label: '17 Jul', reach: 3200, perf: 'alto' },
  { id: 'p2', label: '15 Jul', reach: 1800, perf: 'medio' },
  { id: 'p3', label: '13 Jul', reach: 950, perf: 'baixo' },
  { id: 'p4', label: '11 Jul', reach: 2650, perf: 'alto' },
  { id: 'p5', label: '9 Jul', reach: 1200, perf: 'baixo' },
  { id: 'p6', label: '6 Jul', reach: 2100, perf: 'medio' },
];

const DIAGNOSIS_SUMMARY = 'Esta semana, os posts com fotos reais e horário noturno (19h–21h) tiveram o dobro do alcance dos restantes. Os dois posts de menor desempenho partilham o mesmo problema: horário de publicação e ausência de urgência na oferta.';

const INITIAL_RECOMMENDATIONS = [
  { id: 'a1', title: 'Reagendar publicações de baixo desempenho', desc: 'Republica "Horário especial de fim de semana" às 19h de quinta — horário com 2.3x mais alcance histórico.', applied: false },
  { id: 'a2', title: 'Reforçar a oferta com urgência', desc: 'Adiciona um prazo limite ("só esta semana") ao anúncio de entrega grátis para aumentar a conversão.', applied: false },
  { id: 'a3', title: 'Trocar imagem por foto de produto real', desc: 'Posts com fotos reais têm, em média, 40% mais engajamento no teu histórico.', applied: false },
];

const INITIAL_CLIENTS = [
  { id: 'c1', name: 'Padaria Bom Dia', plan: 'Essencial', amount: 30000, status: 'active', since: '20 Mai 2026' },
  { id: 'c2', name: 'Salão Beleza Rainha', plan: 'Avançado', amount: 50000, status: 'active', since: '02 Jun 2026' },
  { id: 'c3', name: 'AutoPeças Kianda', plan: 'Essencial', amount: 30000, status: 'inactive', since: '11 Mar 2026' },
  { id: 'c4', name: 'Boutique Nzinga', plan: 'Essencial', amount: 30000, status: 'inactive', since: '28 Jun 2026' },
];

const INITIAL_RECEIPTS = [
  { id: 'r1', client: 'Boutique Nzinga', plan: 'Essencial', amount: 30000, date: '22 Jul 2026', status: 'pending' },
  { id: 'r2', client: 'AutoPeças Kianda', plan: 'Essencial', amount: 30000, date: '21 Jul 2026', status: 'pending' },
  { id: 'r3', client: 'Salão Beleza Rainha', plan: 'Avançado', amount: 50000, date: '18 Jul 2026', status: 'approved' },
];

// ---------- SHARED UI ----------
function SignalMark({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M20 38 L50 18 L50 38 L80 18" stroke={C.blue} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M20 62 L50 82 L50 62 L80 82" stroke={C.orangeLight} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function Badge({ children, color }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999,
      fontSize: 11, fontWeight: 700, color, background: `${color}22`, border: `1px solid ${color}50`,
    }}>{children}</span>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div style={{ borderRadius: 16, border: `1px solid ${C.border}`, background: C.surface, padding: 16 }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${color}22`, marginBottom: 8 }}>
        <Icon size={16} color={color} />
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, fontFamily: FONT_M, color: C.text }}>{value}</div>
      <div style={{ fontSize: 11, color: C.muted }}>{label}</div>
    </div>
  );
}

// ---------- SUBSCRIPTION BANNER ----------
function SubscriptionBanner({ status }) {
  const active = status === 'active';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, borderRadius: 16, padding: '14px 18px', marginBottom: 20,
      background: active ? `${C.green}18` : `${C.orange}18`,
      border: `1px solid ${active ? C.green : C.orange}50`,
    }}>
      {active ? <ShieldCheck size={20} color={C.greenLight} /> : <Lock size={20} color={C.orangeLight} />}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>
          {active ? 'Assinatura ativa — 30.000 Kz/mês' : 'Assinatura inativa / expirada'}
        </div>
        <div style={{ fontSize: 12, color: C.muted }}>
          {active
            ? 'Publicação automática simultânea e automações completas de IA disponíveis.'
            : 'Modo manual: cria os posts normalmente, mas terás de copiar e publicar rede por rede. Regulariza o pagamento para desbloquear a automação.'}
        </div>
      </div>
    </div>
  );
}

// ---------- CRM MODULE ----------
function CrmModule({ subStatus }) {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [autoPublish, setAutoPublish] = useState(false);

  const stats = useMemo(() => ({
    total: leads.length,
    buyers: leads.filter(l => l.status === 'buyer').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    inactive: leads.filter(l => l.status === 'inactive').length,
  }), [leads]);

  const filtered = leads.filter(l =>
    (filter === 'all' || l.status === filter) &&
    (l.name.toLowerCase().includes(search.toLowerCase()) || l.whatsapp.includes(search))
  );

  const canAutomate = subStatus === 'active';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
          <StatCard icon={Users} label="Total de clientes" value={stats.total} color={C.blue} />
          <StatCard icon={ShoppingBag} label="Compradores" value={stats.buyers} color={C.greenLight} />
          <StatCard icon={UserCheck} label="Contactados" value={stats.contacted} color={C.orangeLight} />
          <StatCard icon={UserX} label="Inativos" value={stats.inactive} color={C.muted} />
        </div>

        {/* Automação multi-rede — respeita a regra de assinatura */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14, borderRadius: 16, padding: 16,
          border: `1px solid ${canAutomate ? C.border : C.orange + '50'}`, background: C.surface,
        }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${C.green}22`, flexShrink: 0 }}>
            {canAutomate ? <Send size={18} color={C.greenLight} /> : <Lock size={18} color={C.orangeLight} />}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Publicação automática simultânea</div>
            <div style={{ fontSize: 11.5, color: C.muted }}>
              {canAutomate ? 'Instagram, Facebook e Status WhatsApp publicados ao mesmo tempo.' : 'Bloqueado — disponível apenas com assinatura ativa.'}
            </div>
          </div>
          <button
            onClick={() => canAutomate && setAutoPublish(v => !v)}
            disabled={!canAutomate}
            title={!canAutomate ? 'Ative a assinatura para desbloquear' : ''}
            style={{
              position: 'relative', width: 44, height: 24, borderRadius: 999, flexShrink: 0,
              background: autoPublish && canAutomate ? C.green : C.border,
              cursor: canAutomate ? 'pointer' : 'not-allowed', opacity: canAutomate ? 1 : 0.6, border: 'none',
            }}
          >
            <span style={{ position: 'absolute', top: 2, left: autoPublish && canAutomate ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.15s' }} />
          </button>
        </div>

        {/* Search + filter */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 160, border: `1px solid ${C.border}`, borderRadius: 12, padding: '8px 12px', background: C.surface }}>
            <Search size={14} color={C.muted} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Procurar cliente..." style={{ background: 'transparent', border: 'none', outline: 'none', color: C.text, fontSize: 13, width: '100%' }} />
          </div>
          {['all', 'lead', 'contacted', 'buyer', 'inactive'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '8px 12px', borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              background: filter === f ? C.green : 'transparent', color: filter === f ? '#fff' : C.muted,
              border: `1px solid ${filter === f ? C.green : C.border}`,
            }}>{f === 'all' ? 'Todos' : STATUS_LABEL[f]}</button>
          ))}
        </div>

        {/* Table */}
        <div style={{ borderRadius: 16, border: `1px solid ${C.border}`, background: C.surface, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}`, textAlign: 'left' }}>
                {['Nome', 'WhatsApp', 'Estado', ''].map(h => (
                  <th key={h} style={{ padding: '10px 14px', fontSize: 11, color: C.muted, textTransform: 'uppercase', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(lead => (
                <tr key={lead.id} onClick={() => setSelected(lead)} style={{ borderBottom: `1px solid ${C.border}`, cursor: 'pointer' }}>
                  <td style={{ padding: '10px 14px', color: C.text, fontWeight: 500 }}>{lead.name}</td>
                  <td style={{ padding: '10px 14px', color: C.muted, fontFamily: FONT_M, fontSize: 12 }}>{lead.whatsapp}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <Badge color={STATUS_COLOR[lead.status]}>{STATUS_LABEL[lead.status]}</Badge>
                  </td>
                  <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                    <ChevronRight size={15} color={C.muted} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick replies sidebar */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: 'uppercase', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
          <MessageCircle size={13} color={C.greenLight} /> Respostas Rápidas
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {QUICK_REPLIES.map(r => <QuickReplyCard key={r.title} reply={r} />)}
        </div>
      </div>

      {selected && <LeadDrawer lead={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function QuickReplyCard({ reply }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ borderRadius: 12, border: `1px solid ${C.border}`, background: C.surface2, padding: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{reply.title}</span>
        <button onClick={() => { navigator.clipboard?.writeText(reply.text); setCopied(true); setTimeout(() => setCopied(false), 1200); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          {copied ? <Check size={13} color={C.greenLight} /> : <Copy size={13} color={C.muted} />}
        </button>
      </div>
      <p style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.5, margin: 0 }}>{reply.text}</p>
    </div>
  );
}

function LeadDrawer({ lead, onClose }) {
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: '#000000a0', zIndex: 40 }} />
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 340, background: C.bg, borderLeft: `1px solid ${C.border}`, zIndex: 50, padding: 20, overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: C.text, fontFamily: FONT_D }}>{lead.name}</div>
            <div style={{ fontSize: 12, color: C.muted }}>{lead.whatsapp}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} color={C.muted} /></button>
        </div>
        <Badge color={STATUS_COLOR[lead.status]}>{STATUS_LABEL[lead.status]}</Badge>
        <div style={{ marginTop: 16, fontSize: 12, color: C.muted }}>Total gasto</div>
        <div style={{ fontSize: 20, fontWeight: 700, fontFamily: FONT_M, color: C.greenLight }}>{lead.spent.toLocaleString('pt-AO')} Kz</div>
        <div style={{ marginTop: 16, fontSize: 12, color: C.muted, marginBottom: 6 }}>Anotações</div>
        <div style={{ fontSize: 13, color: C.text, background: C.surface2, borderRadius: 10, padding: 10, minHeight: 50 }}>{lead.notes || 'Sem anotações.'}</div>
        <a href={`https://wa.me/${lead.whatsapp.replace(/[^\d]/g, '')}`} target="_blank" rel="noreferrer" style={{
          marginTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: C.green,
          color: '#fff', borderRadius: 10, padding: '11px 0', fontSize: 13, fontWeight: 700, textDecoration: 'none',
        }}>
          <MessageCircle size={15} /> Abrir no WhatsApp
        </a>
      </div>
    </>
  );
}

// ---------- ANALYTICS MODULE ----------
function AnalyticsModule({ subStatus }) {
  const [recs, setRecs] = useState(INITIAL_RECOMMENDATIONS);
  const canAutomate = subStatus === 'active';
  const max = Math.max(...MOCK_POSTS.map(p => p.reach));
  const barColor = perf => perf === 'alto' ? C.greenLight : perf === 'medio' ? C.blue : C.orangeLight;

  function applyAction(id) {
    setRecs(prev => prev.map(r => r.id === id ? { ...r, applied: true } : r));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
        <StatCard icon={TrendingUp} label="Alcance total (7 posts)" value="11.900" color={C.blue} />
        <StatCard icon={BarChart3} label="Engajamento médio" value="3.8%" color={C.greenLight} />
        <StatCard icon={AlertTriangle} label="Posts de baixo desempenho" value="2" color={C.orangeLight} />
      </div>

      {/* Chart */}
      <div style={{ borderRadius: 16, border: `1px solid ${C.border}`, background: C.surface, padding: 18 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 14, fontFamily: FONT_D }}>Alcance por publicação</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 140 }}>
          {MOCK_POSTS.map(p => (
            <div key={p.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: '100%', height: `${Math.max(8, (p.reach / max) * 100)}%`, background: barColor(p.perf), borderRadius: '4px 4px 0 0', display: 'flex', alignItems: 'flex-end' }} />
              <span style={{ fontSize: 10, color: C.muted }}>{p.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Diagnosis */}
      <div style={{ borderRadius: 16, border: `1px solid ${C.border}`, background: C.surface, padding: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Sparkles size={16} color={C.orangeLight} />
          <span style={{ fontSize: 13, fontWeight: 700, color: C.text, fontFamily: FONT_D }}>Diagnóstico da IA</span>
        </div>
        <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, margin: 0 }}>{DIAGNOSIS_SUMMARY}</p>
      </div>

      {/* Recommendations */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: 'uppercase', marginBottom: 10 }}>
          Motor de Autocorreção — ações sugeridas
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {recs.map(r => (
            <div key={r.id} style={{ borderRadius: 14, border: `1px solid ${C.border}`, background: C.surface2, padding: 16, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 4 }}>{r.title}</div>
                <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{r.desc}</div>
              </div>
              {r.applied ? (
                <Badge color={C.greenLight}><Check size={12} /> Aplicado</Badge>
              ) : canAutomate ? (
                <button onClick={() => applyAction(r.id)} style={{
                  flexShrink: 0, background: C.green, color: '#fff', border: 'none', borderRadius: 10,
                  padding: '9px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
                }}>
                  Aplicar em 1 clique
                </button>
              ) : (
                <button title="Disponível apenas com assinatura ativa" style={{
                  flexShrink: 0, background: 'transparent', color: C.muted, border: `1px solid ${C.border}`, borderRadius: 10,
                  padding: '9px 14px', fontSize: 12, fontWeight: 700, cursor: 'not-allowed', display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <Lock size={12} /> Bloqueado
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- ADMIN MODULE ----------
function AdminModule({ clients, setClients }) {
  const [receipts, setReceipts] = useState(INITIAL_RECEIPTS);

  const revenue = clients.filter(c => c.status === 'active').reduce((s, c) => s + c.amount, 0);
  const pendingCount = receipts.filter(r => r.status === 'pending').length;

  function toggleClientStatus(id) {
    setClients(prev => prev.map(c => c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c));
  }

  function approveReceipt(r) {
    setReceipts(prev => prev.map(x => x.id === r.id ? { ...x, status: 'approved' } : x));
    setClients(prev => prev.map(c => c.name === r.client ? { ...c, status: 'active' } : c));
  }

  function rejectReceipt(r) {
    setReceipts(prev => prev.map(x => x.id === r.id ? { ...x, status: 'rejected' } : x));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
        <StatCard icon={CreditCard} label="Receita mensal (ativos)" value={`${revenue.toLocaleString('pt-AO')} Kz`} color={C.greenLight} />
        <StatCard icon={AlertTriangle} label="Pagamentos pendentes" value={pendingCount} color={C.orangeLight} />
        <StatCard icon={UserCheck} label="Clientes ativos" value={clients.filter(c => c.status === 'active').length} color={C.blue} />
        <StatCard icon={UserX} label="Clientes inativos" value={clients.filter(c => c.status === 'inactive').length} color={C.muted} />
      </div>

      {/* Pending receipts */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: 'uppercase', marginBottom: 10 }}>
          Comprovativos por aprovar
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {receipts.map(r => (
            <div key={r.id} style={{ borderRadius: 14, border: `1px solid ${C.border}`, background: C.surface, padding: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${C.blue}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CreditCard size={17} color={C.blue} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{r.client}</div>
                <div style={{ fontSize: 11.5, color: C.muted }}>Plano {r.plan} · {r.date}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, fontFamily: FONT_M, color: C.text, whiteSpace: 'nowrap' }}>
                {r.amount.toLocaleString('pt-AO')} Kz
              </div>
              {r.status === 'pending' ? (
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => approveReceipt(r)} style={{ background: C.green, color: '#fff', border: 'none', borderRadius: 8, padding: '8px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Check size={13} /> Aprovar
                  </button>
                  <button onClick={() => rejectReceipt(r)} style={{ background: 'transparent', color: C.red, border: `1px solid ${C.red}60`, borderRadius: 8, padding: '8px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <XCircle size={13} /> Rejeitar
                  </button>
                </div>
              ) : (
                <Badge color={r.status === 'approved' ? C.greenLight : C.red}>
                  {r.status === 'approved' ? 'Aprovado' : 'Rejeitado'}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Clients / subscriptions */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: 'uppercase', marginBottom: 10 }}>
          Clientes &amp; Assinaturas
        </div>
        <div style={{ borderRadius: 16, border: `1px solid ${C.border}`, background: C.surface, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}`, textAlign: 'left' }}>
                {['Cliente', 'Plano', 'Valor', 'Estado', 'Ação'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', fontSize: 11, color: C.muted, textTransform: 'uppercase', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clients.map(c => (
                <tr key={c.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: '10px 14px', color: C.text, fontWeight: 500 }}>
                    {c.name}
                    {c.name === 'Padaria Bom Dia' && (
                      <span style={{ marginLeft: 8, fontSize: 10, color: C.blue }}>(vista no Painel Cliente)</span>
                    )}
                  </td>
                  <td style={{ padding: '10px 14px', color: C.muted }}>{c.plan}</td>
                  <td style={{ padding: '10px 14px', color: C.text, fontFamily: FONT_M }}>{c.amount.toLocaleString('pt-AO')} Kz</td>
                  <td style={{ padding: '10px 14px' }}>
                    <Badge color={c.status === 'active' ? C.greenLight : C.orangeLight}>
                      {c.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <button onClick={() => toggleClientStatus(c.id)} style={{
                      background: 'transparent', border: `1px solid ${C.border}`, color: C.text, borderRadius: 8,
                      padding: '6px 10px', fontSize: 11.5, fontWeight: 600, cursor: 'pointer',
                    }}>
                      {c.status === 'active' ? 'Inativar' : 'Ativar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------- APP ----------
export default function DestinoDashboardPreview() {
  const [view, setView] = useState('client'); // 'client' | 'admin'
  const [clientTab, setClientTab] = useState('crm');
  const [clients, setClients] = useState(INITIAL_CLIENTS);

  // A "Padaria Bom Dia" é o cliente demo cuja assinatura controla o Painel Cliente.
  const demoClient = clients.find(c => c.name === 'Padaria Bom Dia');
  const subStatus = demoClient ? demoClient.status : 'active';

  function toggleDemoClientStatus() {
    setClients(prev => prev.map(c => c.name === 'Padaria Bom Dia' ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c));
  }

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "'Inter', sans-serif", minHeight: '100vh', padding: 0 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        table { width: 100%; }
        button { font-family: inherit; }
      `}</style>

      {/* Top nav */}
      <div style={{ position: 'sticky', top: 0, zIndex: 30, background: `${C.bg}f0`, borderBottom: `1px solid ${C.border}`, backdropFilter: 'blur(8px)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <SignalMark />
            <span style={{ fontFamily: FONT_D, fontWeight: 800, fontSize: 16 }}>SISTEMA DES+</span>
          </div>
          <div style={{ display: 'flex', gap: 6, background: C.surface, padding: 4, borderRadius: 12, border: `1px solid ${C.border}` }}>
            {[['client', 'Painel Cliente', LayoutDashboard], ['admin', 'Painel Admin', ShieldCheck]].map(([id, label, Icon]) => (
              <button key={id} onClick={() => setView(id)} style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 9, fontSize: 12.5, fontWeight: 700,
                background: view === id ? C.green : 'transparent', color: view === id ? '#fff' : C.muted, border: 'none', cursor: 'pointer',
              }}>
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>
          {view === 'admin' && (
            <button onClick={toggleDemoClientStatus} style={{
              fontSize: 11.5, fontWeight: 700, color: C.muted, background: 'transparent', border: `1px dashed ${C.border}`,
              borderRadius: 10, padding: '8px 12px', cursor: 'pointer',
            }}>
              ⚡ Simular: {subStatus === 'active' ? 'Inativar' : 'Ativar'} Padaria Bom Dia
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '24px 20px 60px' }}>
        {view === 'client' ? (
          <>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 20, fontWeight: 800, fontFamily: FONT_D }}>Padaria Bom Dia</div>
              <div style={{ fontSize: 12, color: C.muted }}>Painel do cliente · Plano Essencial</div>
            </div>
            <SubscriptionBanner status={subStatus} />
            <div style={{ display: 'flex', gap: 6, marginBottom: 20, background: C.surface, padding: 4, borderRadius: 12, border: `1px solid ${C.border}`, width: 'fit-content' }}>
              {[['crm', 'CRM & WhatsApp', Users], ['analytics', 'Métricas & Diagnóstico IA', LineChartIcon]].map(([id, label, Icon]) => (
                <button key={id} onClick={() => setClientTab(id)} style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 9, fontSize: 12.5, fontWeight: 700,
                  background: clientTab === id ? C.green : 'transparent', color: clientTab === id ? '#fff' : C.muted, border: 'none', cursor: 'pointer',
                }}>
                  <Icon size={14} /> {label}
                </button>
              ))}
            </div>
            {clientTab === 'crm' ? <CrmModule subStatus={subStatus} /> : <AnalyticsModule subStatus={subStatus} />}
          </>
        ) : (
          <>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 20, fontWeight: 800, fontFamily: FONT_D }}>Painel Administrativo DESTINO</div>
              <div style={{ fontSize: 12, color: C.muted }}>Gestão de pagamentos, aprovações e assinaturas de todos os clientes.</div>
            </div>
            <AdminModule clients={clients} setClients={setClients} />
          </>
        )}
      </div>
    </div>
  );
}
