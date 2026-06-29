import React, { useState, useEffect, useRef } from 'react';
import {
  BarChart3, Wallet, Target, MessageSquare, Plus, Trash2,
  TrendingUp, TrendingDown, ChevronRight, ArrowRight, X,
  AlertTriangle, Sparkles, Coins, CreditCard, Settings,
  PieChart, BookOpen, DollarSign, HelpCircle
} from 'lucide-react';

/* =============================================
   CONSTANTS
   ============================================= */
const CATEGORIES = [
  { name: 'Makanan & Minuman', icon: '🍔', color: '#ffb7b2' },
  { name: 'Transportasi', icon: '🚗', color: '#b388ff' },
  { name: 'Kebutuhan Rumah', icon: '🏠', color: '#4fc3f7' },
  { name: 'Hiburan', icon: '🎮', color: '#ff8a00' },
  { name: 'Kesehatan', icon: '🏥', color: '#81c784' },
  { name: 'Pendidikan', icon: '📚', color: '#a1887f' },
  { name: 'Belanja', icon: '🛍️', color: '#f06292' },
  { name: 'Tagihan & Utilitas', icon: '💡', color: '#ffd54f' },
  { name: 'Lainnya', icon: '🏷️', color: '#90a4ae' }
];

const TABS = [
  { id: 'home', label: 'Beranda', Icon: BarChart3 },
  { id: 'wallets', label: 'Dompet', Icon: Wallet },
  { id: 'budgets', label: 'Budget', Icon: PieChart },
  { id: 'goals', label: 'Target', Icon: Target },
  { id: 'ai', label: 'AI', Icon: Sparkles },
];

/* =============================================
   HELPERS
   ============================================= */
const fmt = (v) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(v);
const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const curMonth = () => new Date().toISOString().substring(0, 7);
const load = (key, fallback) => { try { const d = localStorage.getItem(key); return d ? JSON.parse(d) : fallback; } catch { return fallback; } };

/* =============================================
   APP
   ============================================= */
export default function App() {
  const [tab, setTab] = useState('landing');
  const [modal, setModal] = useState(null); // null | 'tx' | 'wallet' | 'budget' | 'goal' | 'debt' | 'invest'

  // Data stores
  const [wallets, setWallets] = useState(() => load('bg_wallets', [
    { id: 'w1', name: 'Dompet Cash', balance: 500000, type: 'cash', emoji: '💵' },
    { id: 'w2', name: 'Bank BCA', balance: 2500000, type: 'bank', emoji: '🏦' },
    { id: 'w3', name: 'GoPay', balance: 150000, type: 'e-wallet', emoji: '📱' },
  ]));

  const [txns, setTxns] = useState(() => load('bg_txns', [
    { id: 't1', type: 'income', amount: 3500000, category: 'Gaji', walletId: 'w2', date: '2026-06-25', note: 'Gaji Bulanan' },
    { id: 't2', type: 'expense', amount: 35000, category: 'Makanan & Minuman', walletId: 'w1', date: '2026-06-28', note: 'Makan Siang Bakso' },
    { id: 't3', type: 'expense', amount: 120000, category: 'Transportasi', walletId: 'w2', date: '2026-06-27', note: 'Bensin & Tol' },
    { id: 't4', type: 'expense', amount: 50000, category: 'Hiburan', walletId: 'w3', date: '2026-06-28', note: 'Topup Game' },
    { id: 't5', type: 'expense', amount: 250000, category: 'Belanja', walletId: 'w2', date: '2026-06-26', note: 'Beli baju online' },
  ]));

  const [budgets, setBudgets] = useState(() => load('bg_budgets', [
    { category: 'Makanan & Minuman', limit: 1200000 },
    { category: 'Transportasi', limit: 500000 },
    { category: 'Hiburan', limit: 300000 },
  ]));

  const [goals, setGoals] = useState(() => load('bg_goals', [
    { id: 'g1', name: 'Dana Darurat', target: 5000000, current: 1500000, deadline: '2026-12-31' },
    { id: 'g2', name: 'Beli Gadget Baru', target: 8000000, current: 2000000, deadline: '2027-03-15' },
  ]));

  const [debts, setDebts] = useState(() => load('bg_debts', [
    { id: 'd1', name: 'Hutang ke Andi', amount: 200000, type: 'debt', status: 'unpaid', dueDate: '2026-07-10' },
    { id: 'd2', name: 'Piutang Budi', amount: 150000, type: 'receivable', status: 'unpaid', dueDate: '2026-07-05' },
  ]));

  const [investments, setInvestments] = useState(() => load('bg_investments', [
    { id: 'i1', name: 'Emas Antam', value: 3200000, qty: '3 gram', type: 'commodity' },
    { id: 'i2', name: 'Reksadana Saham', value: 1500000, qty: '1000 unit', type: 'mutual-fund' },
  ]));

  const [chatMsgs, setChatMsgs] = useState([
    { role: 'ai', text: 'Halo! 👋 Saya asisten AI keuangan Budggt. Saya bisa menganalisis transaksi, saldo dompet, dan anggaranmu. Tanyakan apa saja!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef(null);

  // Persist
  useEffect(() => { localStorage.setItem('bg_wallets', JSON.stringify(wallets)); }, [wallets]);
  useEffect(() => { localStorage.setItem('bg_txns', JSON.stringify(txns)); }, [txns]);
  useEffect(() => { localStorage.setItem('bg_budgets', JSON.stringify(budgets)); }, [budgets]);
  useEffect(() => { localStorage.setItem('bg_goals', JSON.stringify(goals)); }, [goals]);
  useEffect(() => { localStorage.setItem('bg_debts', JSON.stringify(debts)); }, [debts]);
  useEffect(() => { localStorage.setItem('bg_investments', JSON.stringify(investments)); }, [investments]);

  // Scroll chat
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMsgs]);

  // Computations
  const totalBalance = wallets.reduce((a, w) => a + w.balance, 0);
  const totalInvestment = investments.reduce((a, i) => a + i.value, 0);
  const totalDebt = debts.filter(d => d.type === 'debt' && d.status === 'unpaid').reduce((a, d) => a + d.amount, 0);
  const totalReceivable = debts.filter(d => d.type === 'receivable' && d.status === 'unpaid').reduce((a, d) => a + d.amount, 0);

  const mTxns = txns.filter(t => t.date.startsWith(curMonth()));
  const mIncome = mTxns.filter(t => t.type === 'income').reduce((a, t) => a + t.amount, 0);
  const mExpense = mTxns.filter(t => t.type === 'expense').reduce((a, t) => a + t.amount, 0);

  const catSpend = (cat) => mTxns.filter(t => t.type === 'expense' && t.category === cat).reduce((a, t) => a + t.amount, 0);

  // ---- CRUD Handlers ----
  const addTx = (tx) => {
    const newTx = { ...tx, id: genId() };
    setTxns(prev => [newTx, ...prev]);
    setWallets(prev => prev.map(w => w.id === tx.walletId
      ? { ...w, balance: tx.type === 'income' ? w.balance + tx.amount : w.balance - tx.amount }
      : w
    ));
    setModal(null);
  };

  const delTx = (tx) => {
    setTxns(prev => prev.filter(t => t.id !== tx.id));
    setWallets(prev => prev.map(w => w.id === tx.walletId
      ? { ...w, balance: tx.type === 'income' ? w.balance - tx.amount : w.balance + tx.amount }
      : w
    ));
  };

  const addWallet = (w) => { setWallets(prev => [...prev, { ...w, id: genId() }]); setModal(null); };
  const delWallet = (id) => setWallets(prev => prev.filter(w => w.id !== id));

  const addBudget = (b) => {
    setBudgets(prev => {
      const exists = prev.find(x => x.category === b.category);
      return exists ? prev.map(x => x.category === b.category ? b : x) : [...prev, b];
    });
    setModal(null);
  };
  const delBudget = (cat) => setBudgets(prev => prev.filter(b => b.category !== cat));

  const addGoal = (g) => { setGoals(prev => [...prev, { ...g, id: genId(), current: 0 }]); setModal(null); };
  const depositGoal = (id, amt) => setGoals(prev => prev.map(g => g.id === id ? { ...g, current: Math.min(g.target, g.current + amt) } : g));
  const delGoal = (id) => setGoals(prev => prev.filter(g => g.id !== id));

  const addDebt = (d) => { setDebts(prev => [...prev, { ...d, id: genId(), status: 'unpaid' }]); setModal(null); };
  const toggleDebt = (id) => setDebts(prev => prev.map(d => d.id === id ? { ...d, status: d.status === 'paid' ? 'unpaid' : 'paid' } : d));
  const delDebt = (id) => setDebts(prev => prev.filter(d => d.id !== id));

  const addInvest = (i) => { setInvestments(prev => [...prev, { ...i, id: genId() }]); setModal(null); };
  const delInvest = (id) => setInvestments(prev => prev.filter(i => i.id !== id));

  // AI Chat
  const sendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    const newMsgs = [...chatMsgs, { role: 'user', text: userMsg }];
    setChatMsgs(newMsgs);
    setChatInput('');

    setTimeout(() => {
      let reply = '';
      const q = userMsg.toLowerCase();
      if (q.includes('analisis') || q.includes('keuangan') || q.includes('summary')) {
        const topCat = CATEGORIES.reduce((m, c) => { const s = catSpend(c.name); return s > m.s ? { n: c.name, s } : m; }, { n: '-', s: 0 });
        reply = `📊 Analisis Keuangan Bulan Ini:\n\n💰 Total Saldo: ${fmt(totalBalance)}\n📈 Pemasukan: ${fmt(mIncome)}\n📉 Pengeluaran: ${fmt(mExpense)}\n${mExpense > mIncome ? '\n⚠️ Pengeluaranmu melebihi pemasukan bulan ini! Segera kurangi belanja non-esensial.' : '\n✅ Keuanganmu sehat! Rasio tabungan positif.'}\n${topCat.s > 0 ? `\n🔥 Kategori terboros: ${topCat.n} (${fmt(topCat.s)})` : ''}`;
      } else if (q.includes('tips') || q.includes('hemat') || q.includes('saran')) {
        reply = `💡 Tips Hemat untuk Kamu:\n\n1. Masak di rumah — hemat hingga 40% biaya makanan\n2. Gunakan transportasi umum 2-3x seminggu\n3. Terapkan aturan 50/30/20 (kebutuhan/keinginan/tabungan)\n4. Lunasi hutang ${fmt(totalDebt)} sebelum jatuh tempo\n5. Review budget di tab Budget setiap minggu`;
      } else if (q.includes('hutang') || q.includes('debt') || q.includes('piutang')) {
        reply = `🪙 Status Hutang-Piutang:\n\n❌ Hutangmu: ${fmt(totalDebt)}\n✅ Piutangmu: ${fmt(totalReceivable)}\n\n${totalDebt > totalReceivable ? 'Prioritaskan pelunasan hutang terlebih dahulu!' : 'Posisi piutangmu lebih besar dari hutang. Bagus!'}`;
      } else if (q.includes('investasi') || q.includes('invest')) {
        reply = `📈 Portofolio Investasi:\n\nTotal nilai: ${fmt(totalInvestment)} (${investments.length} aset)\n\nDiversifikasi ke minimal 3 jenis aset untuk mengurangi risiko. Pertimbangkan menambah reksadana pasar uang untuk likuiditas.`;
      } else {
        reply = `Terima kasih atas pertanyaanmu! 😊\n\nSaldo bersihmu saat ini: ${fmt(totalBalance + totalInvestment - totalDebt)}\n\nGunakan tombol di bawah untuk pertanyaan spesifik, atau ketik "analisis" untuk laporan lengkap.`;
      }
      setChatMsgs(prev => [...prev, { role: 'ai', text: reply }]);
    }, 600);
  };

  /* =============================================
     LANDING PAGE
     ============================================= */
  if (tab === 'landing') {
    return (
      <div className="landing">
        {/* Top Logo */}
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'calc(env(safe-area-inset-top, 0px) + 12px) 20px 12px', background: 'rgba(18,18,18,0.85)', backdropFilter: 'blur(20px)' }}>
          <div className="top-bar-logo">
            <div className="logo-icon">B.</div>
            <span className="logo-text">Budggt.</span>
          </div>
          <button className="btn btn-lime btn-sm" onClick={() => setTab('home')}>
            Masuk <ArrowRight size={14} />
          </button>
        </div>

        {/* Hero */}
        <div className="landing-badge animate-in">
          <Sparkles size={12} /> Aplikasi Keuangan #1 dengan AI
        </div>

        <h1 className="animate-in">
          Kelola Uang Lebih <span className="accent">Pintar.</span>
        </h1>

        <p className="landing-subtitle animate-in">
          Catat transaksi, atur anggaran, pantau tabungan & hutang, hingga konsultasi keuangan dengan AI — semuanya gratis.
        </p>

        <div className="landing-cta-group animate-in">
          <button className="btn btn-lime" onClick={() => setTab('home')}>
            Mulai Gratis Sekarang <ArrowRight size={18} />
          </button>
          <a href="#features" className="btn btn-ghost">
            Lihat Fitur Lengkap
          </a>
        </div>

        {/* App Mockup */}
        <div className="landing-mockup animate-in">
          <div className="mockup-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 20, height: 20, borderRadius: 6, background: '#ccff00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: '#121212' }}>B</div>
              <span style={{ fontSize: 12, fontWeight: 600 }}>Dashboard</span>
            </div>
            <div className="mockup-dots">
              <div className="mockup-dot" style={{ background: '#ef4444' }} />
              <div className="mockup-dot" style={{ background: '#f59e0b' }} />
              <div className="mockup-dot" style={{ background: '#10b981' }} />
            </div>
          </div>
          <div className="mockup-content">
            <div className="mockup-stat-card">
              <div className="mockup-stat-label">Total Saldo</div>
              <div className="mockup-stat-value text-lime">Rp 3.150.000</div>
              <div style={{ fontSize: 10, color: '#10b981', marginTop: 4 }}>↑ 12% dari bulan lalu</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div className="mockup-stat-card">
                <div className="mockup-stat-label">Pemasukan</div>
                <div className="mockup-stat-value text-success" style={{ fontSize: 14 }}>Rp 3.500.000</div>
              </div>
              <div className="mockup-stat-card">
                <div className="mockup-stat-label">Pengeluaran</div>
                <div className="mockup-stat-value text-danger" style={{ fontSize: 14 }}>Rp 455.000</div>
              </div>
            </div>
            <div className="mockup-stat-card" style={{ marginTop: 8 }}>
              <div className="mockup-stat-label">Budget Makanan</div>
              <div style={{ height: 4, background: '#2a2a2a', borderRadius: 99, overflow: 'hidden', marginTop: 8 }}>
                <div style={{ width: '35%', height: '100%', background: '#ccff00', borderRadius: 99 }} />
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div id="features" className="features-section">
          <h2 className="features-title">Fitur Lengkap</h2>
          <p className="features-subtitle">Semua yang kamu butuhkan untuk mengelola keuangan pribadi dalam satu aplikasi.</p>

          <div className="features-grid">
            {[
              { icon: '💳', title: 'Multi Dompet', desc: 'Kelola kas, rekening bank, kartu kredit, dan e-wallet secara terpisah.', bg: 'rgba(179,136,255,0.1)', border: 'rgba(179,136,255,0.2)' },
              { icon: '📊', title: 'Limit Anggaran', desc: 'Atur batas pengeluaran per kategori dan dapatkan peringatan otomatis.', bg: 'rgba(204,255,0,0.06)', border: 'rgba(204,255,0,0.15)' },
              { icon: '🎯', title: 'Target Tabungan', desc: 'Buat rencana tabungan dengan target dan pantau progress harian.', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.2)' },
              { icon: '🤖', title: 'AI Konsultan', desc: 'Tanyakan kondisi keuanganmu dan dapatkan saran hemat instan.', bg: 'rgba(179,136,255,0.1)', border: 'rgba(179,136,255,0.2)' },
              { icon: '📒', title: 'Hutang & Piutang', desc: 'Catat siapa berhutang kepadamu dan sebaliknya dengan jatuh tempo.', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)' },
              { icon: '📈', title: 'Aset & Investasi', desc: 'Lacak emas, saham, reksadana, dan crypto untuk total kekayaan bersih.', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)' },
            ].map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon" style={{ background: f.bg, border: `1px solid ${f.border}` }}>
                  {f.icon}
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '32px 20px', textAlign: 'center', fontSize: 11, color: 'var(--text-tertiary)', width: '100%', borderTop: '1px solid var(--border)' }}>
          © 2026 Budggt. Semua data tersimpan lokal di perangkatmu.
        </div>
      </div>
    );
  }

  /* =============================================
     APP SHELL
     ============================================= */
  return (
    <div className="app-shell">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-logo">
          <div className="logo-icon">B.</div>
          <span className="logo-text">Budggt.</span>
        </div>
        <div className="top-bar-actions">
          <button className="icon-btn" onClick={() => setTab('home')} title="Beranda">
            <BarChart3 size={18} />
          </button>
          <button className="icon-btn accent" onClick={() => setModal('tx')}>
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Page Content */}
      <div className="page-content">

        {/* ===== HOME TAB ===== */}
        {tab === 'home' && (
          <div className="space-y-4 animate-in">
            {/* Balance card */}
            <div className="balance-card">
              <div className="balance-label">Total Saldo Bersih</div>
              <div className="balance-amount">{fmt(totalBalance)}</div>
              <div className="balance-sub">{wallets.length} dompet aktif • {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</div>
            </div>

            {/* Income / Expense stats */}
            <div className="stat-row">
              <div className="stat-chip">
                <div className="stat-chip-icon income"><TrendingUp size={18} /></div>
                <div className="stat-chip-label">Pemasukan</div>
                <div className="stat-chip-value income">{fmt(mIncome)}</div>
              </div>
              <div className="stat-chip">
                <div className="stat-chip-icon expense"><TrendingDown size={18} /></div>
                <div className="stat-chip-label">Pengeluaran</div>
                <div className="stat-chip-value expense">{fmt(mExpense)}</div>
              </div>
            </div>

            {/* Budget progress */}
            {budgets.length > 0 && (
              <div>
                <div className="section-header">
                  <h2 className="section-title">Anggaran Bulan Ini</h2>
                  <button className="section-action" onClick={() => setTab('budgets')}>
                    Semua <ChevronRight size={14} />
                  </button>
                </div>
                <div className="space-y-3">
                  {budgets.slice(0, 3).map(b => {
                    const spent = catSpend(b.category);
                    const pct = Math.min(100, Math.round((spent / b.limit) * 100));
                    const over = spent > b.limit;
                    return (
                      <div key={b.category} className="budget-item">
                        <div className="budget-header">
                          <span className="budget-name">{b.category}</span>
                          <span className="budget-values">{fmt(spent)} / {fmt(b.limit)}</span>
                        </div>
                        <div className="progress-track">
                          <div className={`progress-fill ${over ? 'over' : pct > 85 ? 'warn' : 'safe'}`} style={{ width: `${pct}%` }} />
                        </div>
                        {over && <div className="budget-alert"><AlertTriangle size={12} /> Melebihi batas!</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Recent transactions */}
            <div>
              <div className="section-header">
                <h2 className="section-title">Transaksi Terakhir</h2>
                <button className="section-action" onClick={() => setTab('wallets')}>
                  Semua <ChevronRight size={14} />
                </button>
              </div>
              <div className="card tx-list">
                {txns.slice(0, 5).map(t => {
                  const w = wallets.find(w => w.id === t.walletId);
                  const cat = CATEGORIES.find(c => c.name === t.category);
                  return (
                    <div key={t.id} className="tx-item">
                      <div className="tx-icon">{t.type === 'income' ? '💰' : (cat?.icon || '🏷️')}</div>
                      <div className="tx-info">
                        <div className="tx-info-title">{t.note || t.category}</div>
                        <div className="tx-info-sub">{t.date} • {w?.name || 'Dompet'}</div>
                      </div>
                      <div className={`tx-amount ${t.type}`}>
                        {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
                      </div>
                    </div>
                  );
                })}
                {txns.length === 0 && <div className="empty-state"><BookOpen size={32} /><span>Belum ada transaksi</span></div>}
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid-2">
              <button className="card card-sm card-interactive flex items-center gap-3" onClick={() => setTab('goals')}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(179,136,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Target size={18} style={{ color: '#b388ff' }} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div className="text-sm font-bold">Tabungan</div>
                  <div className="text-xs text-dim">{goals.length} target aktif</div>
                </div>
              </button>
              <button className="card card-sm card-interactive flex items-center gap-3" onClick={() => setModal('debt')}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(245,158,11,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Coins size={18} style={{ color: '#f59e0b' }} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div className="text-sm font-bold">Hutang</div>
                  <div className="text-xs text-dim">{debts.filter(d => d.status === 'unpaid').length} belum lunas</div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ===== WALLETS TAB ===== */}
        {tab === 'wallets' && (
          <div className="space-y-4 animate-in">
            <div className="section-header">
              <h2 className="section-title">Dompet Saya</h2>
              <button className="btn btn-lime btn-sm" onClick={() => setModal('wallet')}>
                <Plus size={14} /> Tambah
              </button>
            </div>

            <div className="space-y-3">
              {wallets.map(w => (
                <div key={w.id} className="wallet-card">
                  <div className="wallet-emoji">{w.emoji}</div>
                  <div className="wallet-info">
                    <div className="wallet-name">{w.name}</div>
                    <div className="wallet-type">{w.type}</div>
                  </div>
                  <div className="wallet-balance">{fmt(w.balance)}</div>
                  <button className="delete-btn" onClick={() => delWallet(w.id)}><Trash2 size={14} /></button>
                </div>
              ))}
            </div>

            {/* All transactions */}
            <div className="section-header mt-4">
              <h2 className="section-title">Semua Transaksi</h2>
            </div>
            <div className="card tx-list">
              {txns.map(t => {
                const w = wallets.find(w => w.id === t.walletId);
                const cat = CATEGORIES.find(c => c.name === t.category);
                return (
                  <div key={t.id} className="tx-item">
                    <div className="tx-icon">{t.type === 'income' ? '💰' : (cat?.icon || '🏷️')}</div>
                    <div className="tx-info">
                      <div className="tx-info-title">{t.note || t.category}</div>
                      <div className="tx-info-sub">{t.date} • {w?.name || 'Dompet'}</div>
                    </div>
                    <div className={`tx-amount ${t.type}`}>
                      {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
                    </div>
                    <button className="delete-btn" onClick={() => delTx(t)}><Trash2 size={14} /></button>
                  </div>
                );
              })}
              {txns.length === 0 && <div className="empty-state"><BookOpen size={32} /><span>Belum ada transaksi</span></div>}
            </div>

            {/* Debts & Investments */}
            <div className="section-header mt-4">
              <h2 className="section-title">Hutang & Piutang</h2>
              <button className="btn btn-ghost btn-sm" onClick={() => setModal('debt')}><Plus size={14} /> Catat</button>
            </div>
            <div className="space-y-3">
              {debts.map(d => (
                <div key={d.id} className="debt-item">
                  <div className="debt-info">
                    <div className="debt-name">
                      {d.name}
                      <span className={`badge ${d.type === 'debt' ? 'badge-debt' : 'badge-receivable'}`}>
                        {d.type === 'debt' ? 'Hutang' : 'Piutang'}
                      </span>
                      <span className={`badge ${d.status === 'paid' ? 'badge-paid' : 'badge-unpaid'}`}>
                        {d.status === 'paid' ? 'Lunas' : 'Belum'}
                      </span>
                    </div>
                    <div className="debt-due">Jatuh tempo: {d.dueDate}</div>
                  </div>
                  <div className={`debt-amount ${d.status === 'paid' ? 'line-through text-dim' : d.type === 'debt' ? 'text-danger' : 'text-success'}`}>
                    {fmt(d.amount)}
                  </div>
                  <button className="btn btn-ghost btn-sm" onClick={() => toggleDebt(d.id)}>
                    {d.status === 'paid' ? 'Buka' : '✓'}
                  </button>
                  <button className="delete-btn" onClick={() => delDebt(d.id)}><Trash2 size={14} /></button>
                </div>
              ))}
              {debts.length === 0 && <div className="empty-state"><Coins size={28} /><span>Belum ada catatan</span></div>}
            </div>

            {/* Investments */}
            <div className="section-header mt-4">
              <h2 className="section-title">Aset & Investasi</h2>
              <button className="btn btn-ghost btn-sm" onClick={() => setModal('invest')}><Plus size={14} /> Tambah</button>
            </div>

            {investments.length > 0 && (
              <div className="summary-banner mb-3">
                <div>
                  <div className="label">Total Investasi</div>
                  <div className="value">{fmt(totalInvestment)}</div>
                </div>
                <TrendingUp size={28} style={{ color: 'var(--zlime)', opacity: 0.6 }} />
              </div>
            )}

            <div className="space-y-3">
              {investments.map(i => (
                <div key={i.id} className="invest-card">
                  <div className="invest-info">
                    <div className="invest-name">{i.name}</div>
                    <div className="invest-meta">{i.type} • {i.qty || '-'}</div>
                  </div>
                  <div className="invest-value">{fmt(i.value)}</div>
                  <button className="delete-btn" onClick={() => delInvest(i.id)}><Trash2 size={14} /></button>
                </div>
              ))}
              {investments.length === 0 && <div className="empty-state"><TrendingUp size={28} /><span>Belum ada aset</span></div>}
            </div>
          </div>
        )}

        {/* ===== BUDGETS TAB ===== */}
        {tab === 'budgets' && (
          <div className="space-y-4 animate-in">
            <div className="section-header">
              <h2 className="section-title">Anggaran Kategori</h2>
              <button className="btn btn-lime btn-sm" onClick={() => setModal('budget')}>
                <Plus size={14} /> Atur
              </button>
            </div>

            <div className="space-y-3">
              {budgets.map(b => {
                const spent = catSpend(b.category);
                const pct = Math.min(100, Math.round((spent / b.limit) * 100));
                const over = spent > b.limit;
                const catInfo = CATEGORIES.find(c => c.name === b.category);
                return (
                  <div key={b.category} className="budget-item">
                    <div className="budget-header">
                      <span className="budget-name">{catInfo?.icon} {b.category}</span>
                      <button className="delete-btn" onClick={() => delBudget(b.category)}><Trash2 size={13} /></button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 8 }}>
                      <span className="font-semibold">{fmt(spent)}</span>
                      <span className="text-dim">dari {fmt(b.limit)} ({pct}%)</span>
                    </div>
                    <div className="progress-track">
                      <div className={`progress-fill ${over ? 'over' : pct > 85 ? 'warn' : 'safe'}`} style={{ width: `${pct}%` }} />
                    </div>
                    {over && <div className="budget-alert"><AlertTriangle size={12} /> Melebihi batas anggaran!</div>}
                  </div>
                );
              })}
              {budgets.length === 0 && <div className="empty-state"><PieChart size={32} /><span>Belum ada anggaran diatur</span></div>}
            </div>
          </div>
        )}

        {/* ===== GOALS TAB ===== */}
        {tab === 'goals' && (
          <div className="space-y-4 animate-in">
            <div className="section-header">
              <h2 className="section-title">Target Tabungan</h2>
              <button className="btn btn-lime btn-sm" onClick={() => setModal('goal')}>
                <Plus size={14} /> Baru
              </button>
            </div>

            <div className="space-y-3">
              {goals.map(g => {
                const pct = Math.min(100, Math.round((g.current / g.target) * 100));
                return (
                  <div key={g.id} className="goal-card">
                    <div className="flex items-center justify-between">
                      <div className="goal-name">{g.name}</div>
                      <button className="delete-btn" onClick={() => delGoal(g.id)}><Trash2 size={14} /></button>
                    </div>
                    <div className="goal-meta">Tenggat: {g.deadline || 'Tidak ada'}</div>
                    <div className="goal-progress-text">
                      <span className="current">{fmt(g.current)}</span>
                      <span className="target">{fmt(g.target)} ({pct}%)</span>
                    </div>
                    <div className="progress-track" style={{ height: 8 }}>
                      <div className="progress-fill" style={{ width: `${pct}%`, background: 'var(--zpurple)' }} />
                    </div>
                    <button
                      className="btn btn-ghost btn-sm btn-full mt-3"
                      onClick={() => {
                        const a = parseFloat(prompt('Masukkan jumlah setoran (IDR):'));
                        if (a > 0) depositGoal(g.id, a);
                      }}
                    >
                      + Tambah Dana
                    </button>
                  </div>
                );
              })}
              {goals.length === 0 && <div className="empty-state"><Target size={32} /><span>Belum ada target tabungan</span></div>}
            </div>
          </div>
        )}

        {/* ===== AI TAB ===== */}
        {tab === 'ai' && (
          <div className="animate-in">
            <div className="chat-container">
              <div className="chat-header">
                <div className="chat-header-left">
                  <div className="chat-dot" />
                  <span className="text-sm font-bold">Budggt AI</span>
                </div>
                <button
                  className="text-xs text-muted"
                  onClick={() => setChatMsgs([{ role: 'ai', text: 'Obrolan direset! Tanyakan apa saja tentang keuanganmu 😊' }])}
                >
                  Reset
                </button>
              </div>

              <div className="chat-quick-actions">
                {[
                  { icon: '📊', text: 'Analisis Keuangan' },
                  { icon: '💡', text: 'Tips Hemat' },
                  { icon: '🪙', text: 'Status Hutang' },
                  { icon: '📈', text: 'Portofolio Investasi' },
                ].map((q, i) => (
                  <button key={i} className="quick-action-btn" onClick={() => { setChatInput(q.text); }}>
                    {q.icon} {q.text}
                  </button>
                ))}
              </div>

              <div className="chat-messages">
                {chatMsgs.map((m, i) => (
                  <div key={i} className={`chat-bubble ${m.role === 'ai' ? 'ai' : 'user'}`}>
                    {m.text}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <form className="chat-input-bar" onSubmit={e => { e.preventDefault(); sendChat(); }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Tanya soal keuanganmu..."
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button type="submit" className="btn btn-lime btn-sm" style={{ background: 'var(--zpurple)' }}>
                  Kirim
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* FAB */}
      <button className="fab" onClick={() => setModal('tx')} aria-label="Tambah Transaksi">
        <Plus size={26} />
      </button>

      {/* Bottom Tab Bar */}
      <nav className="tab-bar">
        {TABS.map(t => (
          <button key={t.id} className={`tab-item ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            <t.Icon size={22} />
            <span>{t.label}</span>
          </button>
        ))}
      </nav>

      {/* ===== MODALS / BOTTOM SHEETS ===== */}

      {/* Transaction Modal */}
      {modal === 'tx' && (
        <BottomSheet title="Catat Transaksi" onClose={() => setModal(null)}>
          <TxForm wallets={wallets} onSubmit={addTx} />
        </BottomSheet>
      )}

      {/* Wallet Modal */}
      {modal === 'wallet' && (
        <BottomSheet title="Tambah Dompet" onClose={() => setModal(null)}>
          <WalletForm onSubmit={addWallet} />
        </BottomSheet>
      )}

      {/* Budget Modal */}
      {modal === 'budget' && (
        <BottomSheet title="Atur Anggaran" onClose={() => setModal(null)}>
          <BudgetForm onSubmit={addBudget} />
        </BottomSheet>
      )}

      {/* Goal Modal */}
      {modal === 'goal' && (
        <BottomSheet title="Target Tabungan Baru" onClose={() => setModal(null)}>
          <GoalForm onSubmit={addGoal} />
        </BottomSheet>
      )}

      {/* Debt Modal */}
      {modal === 'debt' && (
        <BottomSheet title="Catat Hutang / Piutang" onClose={() => setModal(null)}>
          <DebtForm onSubmit={addDebt} />
        </BottomSheet>
      )}

      {/* Investment Modal */}
      {modal === 'invest' && (
        <BottomSheet title="Tambah Aset" onClose={() => setModal(null)}>
          <InvestForm onSubmit={addInvest} />
        </BottomSheet>
      )}
    </div>
  );
}

/* =============================================
   REUSABLE COMPONENTS
   ============================================= */

function BottomSheet({ title, onClose, children }) {
  return (
    <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-sheet">
        <div className="modal-handle" />
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

function TxForm({ wallets, onSubmit }) {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [walletId, setWalletId] = useState(wallets[0]?.id || '');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [note, setNote] = useState('');

  const handle = (e) => {
    e.preventDefault();
    const a = parseFloat(amount);
    if (!a || a <= 0) return;
    onSubmit({ type, amount: a, category: type === 'income' ? 'Pemasukan' : category, walletId, date, note });
  };

  return (
    <form onSubmit={handle} className="space-y-4">
      <div className="type-toggle">
        <button type="button" className={`type-toggle-btn ${type === 'expense' ? 'active-expense' : ''}`} onClick={() => setType('expense')}>Pengeluaran</button>
        <button type="button" className={`type-toggle-btn ${type === 'income' ? 'active-income' : ''}`} onClick={() => setType('income')}>Pemasukan</button>
      </div>
      <div className="form-group">
        <label className="form-label">Nominal (IDR)</label>
        <input type="number" className="form-input" placeholder="0" value={amount} onChange={e => setAmount(e.target.value)} required style={{ fontSize: 20, fontWeight: 700 }} />
      </div>
      {type === 'expense' && (
        <div className="form-group">
          <label className="form-label">Kategori</label>
          <select className="form-input" value={category} onChange={e => setCategory(e.target.value)}>
            {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.icon} {c.name}</option>)}
          </select>
        </div>
      )}
      <div className="form-group">
        <label className="form-label">Dompet</label>
        <select className="form-input" value={walletId} onChange={e => setWalletId(e.target.value)}>
          {wallets.map(w => <option key={w.id} value={w.id}>{w.emoji} {w.name}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Tanggal</label>
        <input type="date" className="form-input" value={date} onChange={e => setDate(e.target.value)} required />
      </div>
      <div className="form-group">
        <label className="form-label">Catatan</label>
        <input type="text" className="form-input" placeholder="Makan siang, bensin, dll..." value={note} onChange={e => setNote(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-lime btn-full" style={{ padding: '14px', marginTop: 8 }}>
        Simpan Transaksi
      </button>
    </form>
  );
}

function WalletForm({ onSubmit }) {
  const handle = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = fd.get('name');
    const balance = parseFloat(fd.get('balance')) || 0;
    if (!name) return;
    onSubmit({ name, balance, type: fd.get('type'), emoji: fd.get('emoji') || '💳' });
  };
  return (
    <form onSubmit={handle} className="space-y-4">
      <div className="form-group"><label className="form-label">Nama Dompet</label><input name="name" className="form-input" placeholder="Bank BCA, GoPay, dll" required /></div>
      <div className="grid-2">
        <div className="form-group"><label className="form-label">Saldo Awal</label><input name="balance" type="number" className="form-input" placeholder="0" required /></div>
        <div className="form-group"><label className="form-label">Jenis</label>
          <select name="type" className="form-input"><option value="cash">Cash</option><option value="bank">Bank</option><option value="e-wallet">E-Wallet</option><option value="card">Kartu Kredit</option></select>
        </div>
      </div>
      <div className="form-group"><label className="form-label">Emoji</label><input name="emoji" className="form-input" placeholder="🏦" defaultValue="💳" maxLength="4" /></div>
      <button type="submit" className="btn btn-lime btn-full">Buat Dompet</button>
    </form>
  );
}

function BudgetForm({ onSubmit }) {
  const handle = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const limit = parseFloat(fd.get('limit'));
    if (!limit || limit <= 0) return;
    onSubmit({ category: fd.get('category'), limit });
  };
  return (
    <form onSubmit={handle} className="space-y-4">
      <div className="form-group"><label className="form-label">Kategori</label>
        <select name="category" className="form-input">{CATEGORIES.filter(c => c.name !== 'Lainnya').map(c => <option key={c.name} value={c.name}>{c.icon} {c.name}</option>)}</select>
      </div>
      <div className="form-group"><label className="form-label">Batas Bulanan (IDR)</label><input name="limit" type="number" className="form-input" placeholder="1500000" required /></div>
      <button type="submit" className="btn btn-lime btn-full">Simpan Anggaran</button>
    </form>
  );
}

function GoalForm({ onSubmit }) {
  const handle = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const target = parseFloat(fd.get('target'));
    if (!fd.get('name') || target <= 0) return;
    onSubmit({ name: fd.get('name'), target, deadline: fd.get('deadline') });
  };
  return (
    <form onSubmit={handle} className="space-y-4">
      <div className="form-group"><label className="form-label">Nama Target</label><input name="name" className="form-input" placeholder="Dana Darurat, Beli Motor" required /></div>
      <div className="form-group"><label className="form-label">Target Nominal (IDR)</label><input name="target" type="number" className="form-input" placeholder="10000000" required /></div>
      <div className="form-group"><label className="form-label">Tanggal Target</label><input name="deadline" type="date" className="form-input" /></div>
      <button type="submit" className="btn btn-lime btn-full">Buat Target</button>
    </form>
  );
}

function DebtForm({ onSubmit }) {
  const handle = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const amount = parseFloat(fd.get('amount'));
    if (!fd.get('name') || amount <= 0) return;
    onSubmit({ name: fd.get('name'), amount, type: fd.get('type'), dueDate: fd.get('dueDate') });
  };
  return (
    <form onSubmit={handle} className="space-y-4">
      <div className="form-group"><label className="form-label">Nama / Keperluan</label><input name="name" className="form-input" placeholder="Budi, Tagihan Listrik" required /></div>
      <div className="grid-2">
        <div className="form-group"><label className="form-label">Nominal</label><input name="amount" type="number" className="form-input" placeholder="0" required /></div>
        <div className="form-group"><label className="form-label">Jenis</label>
          <select name="type" className="form-input"><option value="debt">Hutang (Saya)</option><option value="receivable">Piutang (Orang Lain)</option></select>
        </div>
      </div>
      <div className="form-group"><label className="form-label">Jatuh Tempo</label><input name="dueDate" type="date" className="form-input" required /></div>
      <button type="submit" className="btn btn-lime btn-full">Simpan</button>
    </form>
  );
}

function InvestForm({ onSubmit }) {
  const handle = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const value = parseFloat(fd.get('value'));
    if (!fd.get('name') || value <= 0) return;
    onSubmit({ name: fd.get('name'), value, qty: fd.get('qty'), type: fd.get('type') });
  };
  return (
    <form onSubmit={handle} className="space-y-4">
      <div className="form-group"><label className="form-label">Nama Aset</label><input name="name" className="form-input" placeholder="Emas, Saham BBCA" required /></div>
      <div className="grid-2">
        <div className="form-group"><label className="form-label">Nilai (IDR)</label><input name="value" type="number" className="form-input" placeholder="0" required /></div>
        <div className="form-group"><label className="form-label">Jenis</label>
          <select name="type" className="form-input"><option value="commodity">Emas/Komoditas</option><option value="mutual-fund">Reksadana</option><option value="stock">Saham</option><option value="crypto">Crypto</option><option value="other">Lainnya</option></select>
        </div>
      </div>
      <div className="form-group"><label className="form-label">Kuantitas</label><input name="qty" className="form-input" placeholder="5 gram, 10 lot" /></div>
      <button type="submit" className="btn btn-lime btn-full">Simpan Aset</button>
    </form>
  );
}
