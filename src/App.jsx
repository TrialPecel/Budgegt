import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Trash2, 
  CreditCard, 
  Wallet, 
  Target, 
  MessageSquare, 
  BarChart3, 
  DollarSign, 
  User, 
  Sun, 
  Moon, 
  AlertTriangle, 
  ChevronRight, 
  PlusCircle, 
  ArrowRight,
  TrendingUp as Gain,
  ShieldCheck,
  Zap,
  HelpCircle,
  FolderMinus,
  Sparkles,
  RefreshCw,
  Coins,
  CheckCircle2,
  X
} from 'lucide-react';

// Predefined categories with colors and emojis
const CATEGORIES = [
  { name: 'Makanan & Minuman', icon: '🍔', color: '#ffb7b2' },
  { name: 'Transportasi', icon: '🚗', color: '#b388ff' },
  { name: 'Kebutuhan Rumah', icon: '🏠', color: '#4fc3f7' },
  { name: 'Hiburan', icon: '🎮', color: '#ff8a00' },
  { name: 'Kesehatan', icon: '🏥', color: '#81c784' },
  { name: 'Pendidikan', icon: '📚', color: '#a1887f' },
  { name: 'Belanja', icon: '🛍️', color: '#f06292' },
  { name: 'Investasi', icon: '📈', color: '#ccff00' },
  { name: 'Lainnya', icon: '🏷️', color: '#90a4ae' }
];

export default function App() {
  // Navigation & Auth Flow
  const [currentTab, setCurrentTab] = useState('landing'); // 'landing', 'dashboard', 'wallets', 'transactions', 'budgets', 'goals', 'debts', 'investments', 'ai'
  const [theme, setTheme] = useState('dark');
  const [userProfile, setUserProfile] = useState({ name: 'Pengguna Setia', email: 'user@budggt.com' });

  // Core App States (hydrated from localStorage)
  const [wallets, setWallets] = useState(() => {
    const saved = localStorage.getItem('budggt_wallets');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Dompet Cash', balance: 500000, type: 'cash', emoji: '💵' },
      { id: '2', name: 'Bank BCA', balance: 2500000, type: 'bank', emoji: '🏦' },
      { id: '3', name: 'GoPay', balance: 150000, type: 'e-wallet', emoji: '📱' }
    ];
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('budggt_transactions');
    return saved ? JSON.parse(saved) : [
      { id: '1', type: 'expense', amount: 35000, category: 'Makanan & Minuman', walletId: '1', date: '2026-06-28', note: 'Makan Siang Bakso' },
      { id: '2', type: 'income', amount: 3500000, category: 'Gaji', walletId: '2', date: '2026-06-25', note: 'Gaji Bulanan' },
      { id: '3', type: 'expense', amount: 120000, category: 'Transportasi', walletId: '2', date: '2026-06-27', note: 'Bensin & Tol' },
      { id: '4', type: 'expense', amount: 50000, category: 'Hiburan', walletId: '3', date: '2026-06-28', note: 'Topup Game' }
    ];
  });

  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('budggt_budgets');
    return saved ? JSON.parse(saved) : [
      { category: 'Makanan & Minuman', limit: 1200000 },
      { category: 'Transportasi', limit: 500000 },
      { category: 'Hiburan', limit: 300000 }
    ];
  });

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('budggt_goals');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Dana Darurat', target: 5000000, current: 1500000, deadline: '2026-12-31' },
      { id: '2', name: 'Beli Gadget Baru', target: 8000000, current: 2000000, deadline: '2027-03-15' }
    ];
  });

  const [debts, setDebts] = useState(() => {
    const saved = localStorage.getItem('budggt_debts');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Hutang ke Andi', amount: 200000, type: 'debt', status: 'unpaid', dueDate: '2026-07-10' },
      { id: '2', name: 'Piutang Budi (Pinjam)', amount: 150000, type: 'receivable', status: 'unpaid', dueDate: '2026-07-05' }
    ];
  });

  const [investments, setInvestments] = useState(() => {
    const saved = localStorage.getItem('budggt_investments');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Emas Antam', value: 3200000, qty: '3 gram', type: 'commodity' },
      { id: '2', name: 'Reksadana Saham', value: 1500000, qty: '1000 unit', type: 'mutual-fund' }
    ];
  });

  // AI Chat Messages State
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', text: 'Halo! Saya AI Konsultan Finansial Budggt. Saya siap menganalisis data keuanganmu untuk memberikan tips hemat terbaik. Ajukan pertanyaanmu!' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Modals / Transaction Form Fields
  const [showTxModal, setShowTxModal] = useState(false);
  const [txType, setTxType] = useState('expense');
  const [txAmount, setTxAmount] = useState('');
  const [txCategory, setTxCategory] = useState('Makanan & Minuman');
  const [txWalletId, setTxWalletId] = useState('1');
  const [txDate, setTxDate] = useState(new Date().toISOString().substring(0, 10));
  const [txNote, setTxNote] = useState('');

  // Save states to localStorage
  useEffect(() => {
    localStorage.setItem('budggt_wallets', JSON.stringify(wallets));
  }, [wallets]);

  useEffect(() => {
    localStorage.setItem('budggt_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('budggt_budgets', JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem('budggt_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('budggt_debts', JSON.stringify(debts));
  }, [debts]);

  useEffect(() => {
    localStorage.setItem('budggt_investments', JSON.stringify(investments));
  }, [investments]);

  // Set HTML theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Calculations
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const totalWalletBalance = wallets.reduce((acc, w) => acc + w.balance, 0);
  const totalInvestmentValue = investments.reduce((acc, i) => acc + i.value, 0);
  const totalReceivables = debts.filter(d => d.type === 'receivable' && d.status === 'unpaid').reduce((acc, d) => acc + d.amount, 0);
  const totalDebts = debts.filter(d => d.type === 'debt' && d.status === 'unpaid').reduce((acc, d) => acc + d.amount, 0);
  const netWorth = totalWalletBalance + totalInvestmentValue + totalReceivables - totalDebts;

  // Transactions calculations for current month
  const currentMonth = new Date().toISOString().substring(0, 7); // "YYYY-MM"
  const monthlyTransactions = transactions.filter(t => t.date.startsWith(currentMonth));
  const monthlyIncome = monthlyTransactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const monthlyExpense = monthlyTransactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

  // Category actual spend
  const categorySpend = (catName) => {
    return monthlyTransactions
      .filter(t => t.type === 'expense' && t.category === catName)
      .reduce((acc, t) => acc + t.amount, 0);
  };

  // Add Wallet
  const handleAddWallet = (e) => {
    e.preventDefault();
    const name = e.target.walletName.value;
    const balance = parseFloat(e.target.walletBalance.value) || 0;
    const type = e.target.walletType.value;
    const emoji = e.target.walletEmoji.value || '💳';
    if (!name) return;

    setWallets([...wallets, {
      id: Date.now().toString(),
      name,
      balance,
      type,
      emoji
    }]);
    e.target.reset();
  };

  // Delete Wallet
  const handleDeleteWallet = (id) => {
    setWallets(wallets.filter(w => w.id !== id));
  };

  // Add Transaction
  const handleAddTransaction = (e) => {
    e.preventDefault();
    const amount = parseFloat(txAmount);
    if (!amount || amount <= 0) return;

    // Create tx
    const newTx = {
      id: Date.now().toString(),
      type: txType,
      amount,
      category: txType === 'income' ? 'Pemasukan' : txCategory,
      walletId: txWalletId,
      date: txDate,
      note: txNote
    };

    // Update wallet balance
    setWallets(wallets.map(w => {
      if (w.id === txWalletId) {
        return {
          ...w,
          balance: txType === 'income' ? w.balance + amount : w.balance - amount
        };
      }
      return w;
    }));

    setTransactions([newTx, ...transactions]);
    setShowTxModal(false);
    // Reset Form
    setTxAmount('');
    setTxNote('');
  };

  // Delete Transaction
  const handleDeleteTransaction = (tx) => {
    setTransactions(transactions.filter(t => t.id !== tx.id));
    // Restore wallet balance
    setWallets(wallets.map(w => {
      if (w.id === tx.walletId) {
        return {
          ...w,
          balance: tx.type === 'income' ? w.balance - tx.amount : w.balance + tx.amount
        };
      }
      return w;
    }));
  };

  // Set Budget Limit
  const handleSetBudget = (e) => {
    e.preventDefault();
    const cat = e.target.budgetCategory.value;
    const limit = parseFloat(e.target.budgetLimit.value);
    if (!limit || limit <= 0) return;

    const exists = budgets.find(b => b.category === cat);
    if (exists) {
      setBudgets(budgets.map(b => b.category === cat ? { ...b, limit } : b));
    } else {
      setBudgets([...budgets, { category: cat, limit }]);
    }
    e.target.reset();
  };

  // Delete Budget
  const handleDeleteBudget = (catName) => {
    setBudgets(budgets.filter(b => b.category !== catName));
  };

  // Add Goal
  const handleAddGoal = (e) => {
    e.preventDefault();
    const name = e.target.goalName.value;
    const target = parseFloat(e.target.goalTarget.value) || 0;
    const deadline = e.target.goalDeadline.value;
    if (!name || target <= 0) return;

    setGoals([...goals, {
      id: Date.now().toString(),
      name,
      target,
      current: 0,
      deadline
    }]);
    e.target.reset();
  };

  // Deposit to Goal
  const handleDepositGoal = (goalId, amount) => {
    if (!amount || amount <= 0) return;
    setGoals(goals.map(g => {
      if (g.id === goalId) {
        return { ...g, current: Math.min(g.target, g.current + amount) };
      }
      return g;
    }));
  };

  // Delete Goal
  const handleDeleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  // Add Debt
  const handleAddDebt = (e) => {
    e.preventDefault();
    const name = e.target.debtName.value;
    const amount = parseFloat(e.target.debtAmount.value) || 0;
    const type = e.target.debtType.value;
    const dueDate = e.target.debtDueDate.value;
    if (!name || amount <= 0) return;

    setDebts([...debts, {
      id: Date.now().toString(),
      name,
      amount,
      type,
      status: 'unpaid',
      dueDate
    }]);
    e.target.reset();
  };

  // Mark Debt Paid
  const handleToggleDebtStatus = (id) => {
    setDebts(debts.map(d => {
      if (d.id === id) {
        return { ...d, status: d.status === 'paid' ? 'unpaid' : 'paid' };
      }
      return d;
    }));
  };

  // Delete Debt
  const handleDeleteDebt = (id) => {
    setDebts(debts.filter(d => d.id !== id));
  };

  // Add Investment
  const handleAddInvestment = (e) => {
    e.preventDefault();
    const name = e.target.investName.value;
    const value = parseFloat(e.target.investValue.value) || 0;
    const qty = e.target.investQty.value;
    const type = e.target.investType.value;
    if (!name || value <= 0) return;

    setInvestments([...investments, {
      id: Date.now().toString(),
      name,
      value,
      qty,
      type
    }]);
    e.target.reset();
  };

  // Delete Investment
  const handleDeleteInvestment = (id) => {
    setInvestments(investments.filter(i => i.id !== id));
  };

  // AI Assistant Chat Logic
  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    const newMessages = [...chatMessages, { role: 'user', text: userMsg }];
    setChatMessages(newMessages);
    setChatInput('');

    // Generate responsive feedback based on actual financial parameters
    setTimeout(() => {
      let aiText = '';
      const textLower = userMsg.toLowerCase();

      if (textLower.includes('analisis') || textLower.includes('keuangan') || textLower.includes('summary')) {
        const topCategory = CATEGORIES.reduce((max, cat) => {
          const spend = categorySpend(cat.name);
          return spend > max.spend ? { name: cat.name, spend } : max;
        }, { name: 'Belum ada', spend: 0 });

        aiText = `Berdasarkan catatan keuanganmu:\n- Total saldo walet: ${formatCurrency(totalWalletBalance)}.\n- Pemasukan bulan ini: ${formatCurrency(monthlyIncome)}.\n- Pengeluaran bulan ini: ${formatCurrency(monthlyExpense)}.\n`;
        if (monthlyExpense > monthlyIncome) {
          aiText += `⚠️ *Peringatan:* Pengeluaran bulananmu melebihi pemasukan! Cobalah untuk menghemat pengeluaran.`;
        } else {
          aiText += `👍 *Bagus:* Saldo kas kamu positif dengan rasio tabungan yang sehat.`;
        }
        if (topCategory.spend > 0) {
          aiText += `\nKategori pengeluaran tertinggi bulan ini adalah *${topCategory.name}* sebesar ${formatCurrency(topCategory.spend)}.`;
        }
      } else if (textLower.includes('tips') || textLower.includes('hemat')) {
        aiText = `Berikut tips hemat instan khusus untukmu:\n1. Batasi makan di luar, alokasikan maks 20% budget.\n2. Cek anggaran bulanan secara rutin di tab 'Budget'.\n3. Lunasi hutangmu senilai ${formatCurrency(totalDebts)} untuk mengurangi beban bunga.`;
      } else if (textLower.includes('hutang') || textLower.includes('debt')) {
        aiText = `Kamu memiliki total tagihan hutang belum terbayar sebesar ${formatCurrency(totalDebts)}. Di sisi lain, orang lain berhutang kepadamu sebesar ${formatCurrency(totalReceivables)}. Fokuslah membayar hutang terlebih dahulu demi menjaga kredit skormu tetap baik!`;
      } else if (textLower.includes('investasi') || textLower.includes('saham') || textLower.includes('emas')) {
        aiText = `Portofolio investasi kamu saat ini senilai ${formatCurrency(totalInvestmentValue)} (${investments.length} aset). Sangat disarankan untuk mendiversifikasikan ke emas batangan atau reksadana pasar uang untuk menjaga likuiditas di tengah ketidakpastian pasar.`;
      } else {
        aiText = `Halo! Saya memahami pesanmu. Terkait pengelolaan keuangan, pastikan total alokasi pengeluaranmu tidak melebihi 50% untuk kebutuhan pokok, 30% keinginan, dan 20% tabungan. Saldo bersihmu saat ini adalah ${formatCurrency(netWorth)}. Ada hal spesifik lain yang ingin kamu diskusikan?`;
      }

      setChatMessages([...newMessages, { role: 'assistant', text: aiText }]);
    }, 800);
  };

  const triggerPresetQuestion = (q) => {
    setChatInput(q);
    setTimeout(() => {
      // Simulate click submit
      const inputEl = document.getElementById('ai-chat-input');
      if (inputEl) {
        inputEl.focus();
      }
    }, 10);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <header className="glass-panel sticky top-0 z-[100] border-b border-white/5 py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('landing')}>
          <div className="w-10 h-10 rounded-xl bg-lime flex items-center justify-center font-bold text-xl shadow-lg glow-lime">
            B.
          </div>
          <span className="font-title font-bold text-2xl tracking-tight">Budggt.</span>
        </div>

        {/* Navigation Tabs (Dashboard & Beyond) */}
        {currentTab !== 'landing' && (
          <nav className="hidden md:flex items-center gap-1">
            <button className={`nav-item ${currentTab === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentTab('dashboard')}>
              <BarChart3 size={18} /> Dashboard
            </button>
            <button className={`nav-item ${currentTab === 'wallets' ? 'active' : ''}`} onClick={() => setCurrentTab('wallets')}>
              <Wallet size={18} /> Dompet
            </button>
            <button className={`nav-item ${currentTab === 'transactions' ? 'active' : ''}`} onClick={() => setCurrentTab('transactions')}>
              <CreditCard size={18} /> Transaksi
            </button>
            <button className={`nav-item ${currentTab === 'budgets' ? 'active' : ''}`} onClick={() => setCurrentTab('budgets')}>
              <AlertTriangle size={18} /> Budget
            </button>
            <button className={`nav-item ${currentTab === 'goals' ? 'active' : ''}`} onClick={() => setCurrentTab('goals')}>
              <Target size={18} /> Tabungan
            </button>
            <button className={`nav-item ${currentTab === 'debts' ? 'active' : ''}`} onClick={() => setCurrentTab('debts')}>
              <Coins size={18} /> Hutang
            </button>
            <button className={`nav-item ${currentTab === 'investments' ? 'active' : ''}`} onClick={() => setCurrentTab('investments')}>
              <TrendingUp size={18} /> Investasi
            </button>
            <button className={`nav-item ${currentTab === 'ai' ? 'active' : ''}`} onClick={() => setCurrentTab('ai')}>
              <Sparkles className="text-purple-400 animate-pulse" size={18} /> AI Asisten
            </button>
          </nav>
        )}

        <div className="flex items-center gap-4">
          {/* Theme Selector */}
          <div className="flex items-center gap-1 bg-black/20 p-1 rounded-lg border border-white/5">
            <button 
              className={`p-1.5 rounded ${theme === 'dark' ? 'bg-zinc-800 text-lime-400' : 'text-zinc-400'}`}
              onClick={() => setTheme('dark')}
              title="Dark Theme"
            >
              <Moon size={16} />
            </button>
            <button 
              className={`p-1.5 rounded ${theme === 'light' ? 'bg-zinc-200 text-zinc-950' : 'text-zinc-500'}`}
              onClick={() => setTheme('light')}
              title="Light Theme"
            >
              <Sun size={16} />
            </button>
            <button 
              className={`p-1.5 rounded ${theme === 'cute' ? 'bg-[#ffb7b2] text-zinc-950' : 'text-zinc-500'}`}
              onClick={() => setTheme('cute')}
              title="Cute Pastel Theme"
            >
              <Zap size={16} />
            </button>
          </div>

          {currentTab === 'landing' ? (
            <button className="btn-primary" onClick={() => setCurrentTab('dashboard')}>
              Mulai Sekarang <ArrowRight size={16} />
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-zinc-800/80 p-1.5 pr-3 rounded-full border border-white/10">
              <div className="w-8 h-8 rounded-full bg-[#b388ff] text-zinc-900 flex items-center justify-center font-bold text-sm">
                U
              </div>
              <span className="text-xs font-semibold hidden sm:inline">{userProfile.name}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* ================= LANDING PAGE VIEW ================= */}
        {currentTab === 'landing' && (
          <div className="flex flex-col items-center">
            {/* Hero Section */}
            <section className="max-w-5xl mx-auto px-6 py-20 text-center flex flex-col items-center">
              <div className="inline-flex items-center gap-2 bg-lime/10 border border-lime/30 text-lime-400 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 animate-bounce">
                <Sparkles size={14} /> Aplikasi Keuangan Pribadi #1 dengan Dukungan AI
              </div>
              
              <h1 className="font-title text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight max-w-4xl">
                Kelola Uang Lebih <span className="color-lime">Pintar</span>, Bebas Stres Finansial.
              </h1>
              
              <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12">
                Budggt membantu mencatat transaksi harian, mengelola anggaran dompet, memantau tujuan tabungan, hutang, hingga memberikan rekomendasi hemat langsung dari asisten AI cerdas.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <button className="btn-primary text-lg px-8 py-4 rounded-xl" onClick={() => setCurrentTab('dashboard')}>
                  Mulai Kelola Sekarang <ArrowRight size={20} />
                </button>
                <a href="#features" className="btn-secondary text-lg px-8 py-4 rounded-xl">
                  Pelajari Fitur
                </a>
              </div>

              {/* Interface Mockup */}
              <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/50 p-2 shadow-2xl glow-lime">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
                <div className="w-full h-full rounded-xl bg-zinc-950/80 flex flex-col p-4 text-left overflow-hidden select-none">
                  {/* Top Bar inside Mockup */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-lime flex items-center justify-center text-xs font-bold text-zinc-900">B</div>
                      <span className="font-title text-sm font-semibold">Budggt. Dashboard Mockup</span>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    </div>
                  </div>
                  {/* Body inside Mockup */}
                  <div className="grid grid-cols-3 gap-3 flex-1">
                    <div className="bg-zinc-900 p-3 rounded-lg border border-white/5 flex flex-col justify-between">
                      <span className="text-zinc-500 text-xs">Total Saldo</span>
                      <span className="text-xl font-bold text-white">Rp 3.150.000</span>
                      <span className="text-xs text-emerald-400">↑ 12% dari bulan lalu</span>
                    </div>
                    <div className="bg-zinc-900 p-3 rounded-lg border border-white/5 flex flex-col justify-between">
                      <span className="text-zinc-500 text-xs">Pengeluaran Juni</span>
                      <span className="text-xl font-bold text-red-400">Rp 205.000</span>
                      <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-red-400 h-full w-[45%]" />
                      </div>
                    </div>
                    <div className="bg-zinc-900 p-3 rounded-lg border border-white/5 flex flex-col justify-between">
                      <span className="text-zinc-500 text-xs">Tujuan Tabungan</span>
                      <span className="text-xl font-bold text-purple-400">Rp 3.500.000</span>
                      <span className="text-xs text-purple-400">55% Target Terpenuhi</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features list */}
            <section id="features" className="w-full bg-zinc-950/40 border-t border-white/5 py-24 px-6">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 font-title">
                    Segala Kebutuhan Finansial dalam Satu Genggaman
                  </h2>
                  <p className="text-zinc-400 max-w-xl mx-auto">
                    Rasakan kemudahan mengontrol pengeluaran dengan tools modern terintegrasi secara dinamis.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="card">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                      <Wallet size={24} className="text-purple-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Multi Dompet & Rekening</h3>
                    <p className="text-sm text-zinc-400">
                      Pisahkan anggaran kas, rekening bank, kartu kredit, hingga e-wallet favorit kamu secara rapi.
                    </p>
                  </div>

                  <div className="card">
                    <div className="w-12 h-12 rounded-lg bg-lime/10 border border-lime/30 flex items-center justify-center mb-4">
                      <BarChart3 size={24} className="color-lime" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Sistem Limit Budget</h3>
                    <p className="text-sm text-zinc-400">
                      Tentukan batas pengeluaran kategori (seperti belanja/makanan) untuk mencegah boros sebelum terlambat.
                    </p>
                  </div>

                  <div className="card">
                    <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                      <Sparkles size={24} className="text-cyan-400 animate-pulse" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Asisten Keuangan AI</h3>
                    <p className="text-sm text-zinc-400">
                      Konsultasikan data transaksi langsung dengan AI kami untuk mendapatkan strategi berhemat.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================= APP LAYOUT & TABS ================= */}
        {currentTab !== 'landing' && (
          <div className="max-w-6xl mx-auto px-6 py-8">
            
            {/* Quick Actions (Floating or Top bar) */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-zinc-900/60 border border-white/5 p-4 rounded-2xl glass-panel">
              <div>
                <h1 className="text-2xl font-bold font-title">
                  {currentTab === 'dashboard' && 'Dashboard Finansial'}
                  {currentTab === 'wallets' && 'Kelola Dompet'}
                  {currentTab === 'transactions' && 'Riwayat Transaksi'}
                  {currentTab === 'budgets' && 'Anggaran Kategori'}
                  {currentTab === 'goals' && 'Tujuan Tabungan'}
                  {currentTab === 'debts' && 'Hutang & Piutang'}
                  {currentTab === 'investments' && 'Aset & Investasi'}
                  {currentTab === 'ai' && 'AI Konsultan Finansial'}
                </h1>
                <p className="text-sm text-zinc-400">
                  {currentTab === 'dashboard' && 'Rangkuman saldo bersih, pengeluaran, dan performa keuanganmu.'}
                  {currentTab === 'wallets' && 'Pisahkan saldo kas, tabungan, dan dompet digital.'}
                  {currentTab === 'transactions' && 'Detail pemasukan dan pengeluaran harian.'}
                  {currentTab === 'budgets' && 'Atur batas maksimal pengeluaran kategori bulanan.'}
                  {currentTab === 'goals' && 'Pantau tabungan rencana dan dana darurat.'}
                  {currentTab === 'debts' && 'Pantau catatan hutang dan piutang jatuh tempo.'}
                  {currentTab === 'investments' && 'Catat nilai kepemilikan investasi di luar uang tunai.'}
                  {currentTab === 'ai' && 'Tanyakan apa saja kepada AI kami berdasarkan catatan belanjamu.'}
                </p>
              </div>

              <div className="flex gap-2">
                <button className="btn-primary" onClick={() => setShowTxModal(true)}>
                  <Plus size={16} /> Transaksi Baru
                </button>
                <button className="btn-secondary md:hidden" onClick={() => setCurrentTab('ai')}>
                  <Sparkles size={16} className="text-purple-400" />
                </button>
              </div>
            </div>

            {/* Mobile Tab Bar Selector */}
            <div className="md:hidden flex overflow-x-auto gap-2 pb-4 mb-6 scrollbar-none">
              <button className={`nav-item whitespace-nowrap ${currentTab === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentTab('dashboard')}>
                Dashboard
              </button>
              <button className={`nav-item whitespace-nowrap ${currentTab === 'wallets' ? 'active' : ''}`} onClick={() => setCurrentTab('wallets')}>
                Dompet
              </button>
              <button className={`nav-item whitespace-nowrap ${currentTab === 'transactions' ? 'active' : ''}`} onClick={() => setCurrentTab('transactions')}>
                Transaksi
              </button>
              <button className={`nav-item whitespace-nowrap ${currentTab === 'budgets' ? 'active' : ''}`} onClick={() => setCurrentTab('budgets')}>
                Budget
              </button>
              <button className={`nav-item whitespace-nowrap ${currentTab === 'goals' ? 'active' : ''}`} onClick={() => setCurrentTab('goals')}>
                Tabungan
              </button>
              <button className={`nav-item whitespace-nowrap ${currentTab === 'debts' ? 'active' : ''}`} onClick={() => setCurrentTab('debts')}>
                Hutang
              </button>
              <button className={`nav-item whitespace-nowrap ${currentTab === 'investments' ? 'active' : ''}`} onClick={() => setCurrentTab('investments')}>
                Investasi
              </button>
              <button className={`nav-item whitespace-nowrap ${currentTab === 'ai' ? 'active' : ''}`} onClick={() => setCurrentTab('ai')}>
                AI
              </button>
            </div>

            {/* TAB CONTENTS */}

            {/* DASHBOARD VIEW */}
            {currentTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Scorecards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="card">
                    <span className="text-xs text-zinc-400 block mb-1">Total Saldo Bersih</span>
                    <span className="text-2xl font-bold font-title color-lime">{formatCurrency(netWorth)}</span>
                    <div className="text-[10px] text-zinc-500 mt-2">
                      Dompet + Investasi + Piutang - Hutang
                    </div>
                  </div>
                  
                  <div className="card">
                    <span className="text-xs text-zinc-400 block mb-1">Saldo Kas Dompet</span>
                    <span className="text-2xl font-bold font-title">{formatCurrency(totalWalletBalance)}</span>
                    <div className="text-[10px] text-zinc-500 mt-2">
                      Dari {wallets.length} dompet aktif
                    </div>
                  </div>

                  <div className="card border-emerald-500/20">
                    <span className="text-xs text-zinc-400 block mb-1">Pemasukan Bulan Ini</span>
                    <span className="text-2xl font-bold font-title text-emerald-400 flex items-center gap-1">
                      <TrendingUp size={20} /> {formatCurrency(monthlyIncome)}
                    </span>
                    <div className="text-[10px] text-zinc-500 mt-2">
                      Total transaksi masuk
                    </div>
                  </div>

                  <div className="card border-red-500/20">
                    <span className="text-xs text-zinc-400 block mb-1">Pengeluaran Bulan Ini</span>
                    <span className="text-2xl font-bold font-title text-red-400 flex items-center gap-1">
                      <TrendingDown size={20} /> {formatCurrency(monthlyExpense)}
                    </span>
                    <div className="text-[10px] text-zinc-500 mt-2">
                      Total transaksi keluar
                    </div>
                  </div>
                </div>

                {/* Main Dashboard Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left and Middle Columns */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Budget progress tracker */}
                    <div className="card">
                      <h2 className="text-lg font-bold font-title mb-4 flex items-center justify-between">
                        <span>Anggaran Bulan Ini</span>
                        <button className="text-xs color-lime flex items-center gap-1" onClick={() => setCurrentTab('budgets')}>
                          Kelola Anggaran <ChevronRight size={14} />
                        </button>
                      </h2>
                      <div className="space-y-4">
                        {budgets.length === 0 ? (
                          <div className="text-center py-6 text-zinc-500 text-sm">
                            Belum ada anggaran kategori diatur.
                          </div>
                        ) : (
                          budgets.map(b => {
                            const spend = categorySpend(b.category);
                            const percent = Math.min(100, Math.round((spend / b.limit) * 100));
                            const isOver = spend > b.limit;
                            return (
                              <div key={b.category} className="space-y-1.5">
                                <div className="flex justify-between text-xs">
                                  <span className="font-semibold">{b.category}</span>
                                  <span className={isOver ? 'text-red-400' : 'text-zinc-400'}>
                                    {formatCurrency(spend)} / {formatCurrency(b.limit)} ({percent}%)
                                  </span>
                                </div>
                                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full transition-all duration-500 ${isOver ? 'bg-red-500' : percent > 85 ? 'bg-amber-400' : 'bg-lime'}`}
                                    style={{ width: `${percent}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>

                    {/* Recent transactions */}
                    <div className="card">
                      <h2 className="text-lg font-bold font-title mb-4 flex items-center justify-between">
                        <span>Transaksi Terakhir</span>
                        <button className="text-xs color-lime flex items-center gap-1" onClick={() => setCurrentTab('transactions')}>
                          Lihat Semua <ChevronRight size={14} />
                        </button>
                      </h2>
                      
                      <div className="divide-y divide-white/5">
                        {transactions.slice(0, 5).map(t => {
                          const wallet = wallets.find(w => w.id === t.walletId);
                          return (
                            <div key={t.id} className="py-3 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="text-xl bg-zinc-800 w-10 h-10 rounded-lg flex items-center justify-center">
                                  {t.type === 'income' ? '💰' : (CATEGORIES.find(c => c.name === t.category)?.icon || '🏷️')}
                                </div>
                                <div>
                                  <span className="text-sm font-semibold block">{t.note || t.category}</span>
                                  <span className="text-xs text-zinc-500">{t.date} • {wallet?.name || 'Dompet'}</span>
                                </div>
                              </div>
                              <span className={`font-semibold text-sm ${t.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                                {t.type === 'income' ? '+' : '-'} {formatCurrency(t.amount)}
                              </span>
                            </div>
                          );
                        })}
                        {transactions.length === 0 && (
                          <div className="text-center py-6 text-zinc-500 text-sm">
                            Belum ada catatan transaksi.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Wallets summary */}
                    <div className="card">
                      <h2 className="text-lg font-bold font-title mb-4 flex items-center justify-between">
                        <span>Dompet Saya</span>
                        <button className="text-xs color-lime flex items-center gap-1" onClick={() => setCurrentTab('wallets')}>
                          Detail Dompet <ChevronRight size={14} />
                        </button>
                      </h2>
                      <div className="space-y-3">
                        {wallets.map(w => (
                          <div key={w.id} className="flex items-center justify-between bg-black/20 p-3 rounded-xl border border-white/5">
                            <div className="flex items-center gap-2.5">
                              <span className="text-lg">{w.emoji}</span>
                              <span className="text-sm font-semibold">{w.name}</span>
                            </div>
                            <span className="text-sm font-bold">{formatCurrency(w.balance)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Coach Suggestion panel */}
                    <div className="card border-purple-500/30 bg-purple-500/[0.03] flex flex-col justify-between">
                      <div>
                        <div className="inline-flex items-center gap-1 text-purple-400 font-bold text-xs bg-purple-500/10 border border-purple-500/20 px-2 py-1 rounded-md mb-3">
                          <Sparkles size={12} /> AI TIPS FINANSIAL
                        </div>
                        <h3 className="font-title font-bold text-md mb-2">Evaluasi Pengeluaran Bulanan</h3>
                        <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                          {monthlyExpense > monthlyIncome 
                            ? "Waduh! Total belanja kamu bulan ini lebih besar daripada gajimu. Yuk kurangi nongkrong dan belanja non-esensial dahulu!"
                            : "Kerja bagus! Pengeluaranmu bulan ini masih berada di bawah angka pemasukan harian. Teruskan gaya hidup sehat ini."
                          }
                        </p>
                      </div>
                      <button className="btn-secondary w-full text-xs py-2 justify-center" onClick={() => setCurrentTab('ai')}>
                        Konsultasikan dengan AI <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* WALLETS VIEW */}
            {currentTab === 'wallets' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Wallet Form */}
                <div className="card h-fit">
                  <h2 className="text-lg font-bold font-title mb-4">Tambah Dompet Baru</h2>
                  <form onSubmit={handleAddWallet} className="space-y-4">
                    <div>
                      <label className="text-xs text-zinc-400 block mb-1">Nama Dompet / Rekening</label>
                      <input type="text" name="walletName" placeholder="Contoh: Bank Mandiri, Kas Tunai" className="form-input" required />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-zinc-400 block mb-1">Saldo Awal</label>
                        <input type="number" name="walletBalance" placeholder="0" className="form-input" required />
                      </div>
                      <div>
                        <label className="text-xs text-zinc-400 block mb-1">Jenis</label>
                        <select name="walletType" className="form-input">
                          <option value="cash">Cash</option>
                          <option value="bank">Bank / Debit</option>
                          <option value="e-wallet">E-Wallet</option>
                          <option value="card">Kartu Kredit</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-zinc-400 block mb-1">Emoji / Icon</label>
                      <input type="text" name="walletEmoji" placeholder="🏦" defaultValue="💳" className="form-input" maxLength="4" />
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center">
                      <Plus size={16} /> Buat Dompet
                    </button>
                  </form>
                </div>

                {/* Wallets List */}
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="text-lg font-bold font-title">Daftar Dompet</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wallets.map(w => (
                      <div key={w.id} className="card flex flex-col justify-between h-36">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl bg-zinc-800 p-2.5 rounded-xl">{w.emoji}</span>
                            <div>
                              <h3 className="font-bold text-md">{w.name}</h3>
                              <span className="text-xs text-zinc-500 capitalize">{w.type}</span>
                            </div>
                          </div>
                          <button className="text-zinc-500 hover:text-red-400 p-1" onClick={() => handleDeleteWallet(w.id)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="text-xl font-bold font-title text-right color-lime">
                          {formatCurrency(w.balance)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TRANSACTIONS VIEW */}
            {currentTab === 'transactions' && (
              <div className="card">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="text-lg font-bold font-title">Riwayat Transaksi Masuk & Keluar</h2>
                  <div className="flex gap-2">
                    <button className="btn-primary py-2 text-xs" onClick={() => setShowTxModal(true)}>
                      <Plus size={14} /> Catat Transaksi
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 text-zinc-500 text-xs uppercase">
                        <th className="py-3 px-4">Tanggal</th>
                        <th className="py-3 px-4">Kategori</th>
                        <th className="py-3 px-4">Wallet</th>
                        <th className="py-3 px-4">Catatan</th>
                        <th className="py-3 px-4 text-right">Jumlah</th>
                        <th className="py-3 px-4 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                      {transactions.map(t => {
                        const wallet = wallets.find(w => w.id === t.walletId);
                        const categoryDetails = CATEGORIES.find(c => c.name === t.category);
                        return (
                          <tr key={t.id} className="hover:bg-zinc-800/40">
                            <td className="py-3.5 px-4 font-mono text-xs">{t.date}</td>
                            <td className="py-3.5 px-4">
                              <span className="inline-flex items-center gap-1.5 bg-zinc-800 px-2 py-0.5 rounded-full text-xs">
                                <span>{categoryDetails?.icon || '💰'}</span>
                                {t.category}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-zinc-300">{wallet?.name || 'Dompet'}</td>
                            <td className="py-3.5 px-4 text-zinc-400 max-w-[200px] truncate" title={t.note}>{t.note || '-'}</td>
                            <td className={`py-3.5 px-4 text-right font-semibold ${t.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                              {t.type === 'income' ? '+' : '-'} {formatCurrency(t.amount)}
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <button className="text-zinc-500 hover:text-red-400 p-1" onClick={() => handleDeleteTransaction(t)}>
                                <Trash2 size={15} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                      {transactions.length === 0 && (
                        <tr>
                          <td colSpan="6" className="text-center py-8 text-zinc-500">
                            Belum ada riwayat transaksi tercatat.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* BUDGETS VIEW */}
            {currentTab === 'budgets' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form to Set Limit */}
                <div className="card h-fit">
                  <h2 className="text-lg font-bold font-title mb-4">Setel Batas Anggaran</h2>
                  <form onSubmit={handleSetBudget} className="space-y-4">
                    <div>
                      <label className="text-xs text-zinc-400 block mb-1">Kategori Pengeluaran</label>
                      <select name="budgetCategory" className="form-input">
                        {CATEGORIES.filter(c => c.name !== 'Investasi' && c.name !== 'Lainnya').map(c => (
                          <option key={c.name} value={c.name}>{c.icon} {c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-zinc-400 block mb-1">Batas Maksimal Bulanan (IDR)</label>
                      <input type="number" name="budgetLimit" placeholder="Contoh: 1500000" className="form-input" required />
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center">
                      Simpan Anggaran
                    </button>
                  </form>
                </div>

                {/* Budgets Progress Bar List */}
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="text-lg font-bold font-title">Progress Anggaran Kategori</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {budgets.map(b => {
                      const spend = categorySpend(b.category);
                      const percent = Math.min(100, Math.round((spend / b.limit) * 100));
                      const isOver = spend > b.limit;
                      return (
                        <div key={b.category} className="card relative overflow-hidden">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-bold text-md">{b.category}</h3>
                              <span className="text-xs text-zinc-500">Batas: {formatCurrency(b.limit)}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`font-mono text-sm font-semibold ${isOver ? 'text-red-400' : 'text-zinc-300'}`}>
                                Terpakai: {formatCurrency(spend)} ({percent}%)
                              </span>
                              <button className="text-zinc-500 hover:text-red-400 p-1" onClick={() => handleDeleteBudget(b.category)}>
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                          <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${isOver ? 'bg-red-500' : percent > 85 ? 'bg-amber-400' : 'bg-lime'}`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          {isOver && (
                            <div className="mt-2 text-xs text-red-400 flex items-center gap-1.5">
                              <AlertTriangle size={14} /> Anggaran melebihi batas yang direncanakan!
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {budgets.length === 0 && (
                      <div className="card text-center py-10 text-zinc-500">
                        Belum ada batas anggaran bulanan yang ditentukan.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SAVINGS GOALS VIEW */}
            {currentTab === 'goals' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Goal Form */}
                <div className="card h-fit">
                  <h2 className="text-lg font-bold font-title mb-4">Buat Rencana Tabungan</h2>
                  <form onSubmit={handleAddGoal} className="space-y-4">
                    <div>
                      <label className="text-xs text-zinc-400 block mb-1">Tujuan Tabungan</label>
                      <input type="text" name="goalName" placeholder="Contoh: Dana Darurat, Beli Motor" className="form-input" required />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-400 block mb-1">Target Nominal (IDR)</label>
                      <input type="number" name="goalTarget" placeholder="Contoh: 10000000" className="form-input" required />
                    </div>
                    <div>
                      <label className="text-xs text-zinc-400 block mb-1">Target Tanggal</label>
                      <input type="date" name="goalDeadline" className="form-input" />
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center">
                      Buat Target
                    </button>
                  </form>
                </div>

                {/* Goals Tracker */}
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="text-lg font-bold font-title">Progress Target Tabungan</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {goals.map(g => {
                      const percent = Math.min(100, Math.round((g.current / g.target) * 100));
                      return (
                        <div key={g.id} className="card flex flex-col justify-between min-h-[160px]">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-md">{g.name}</h3>
                              <button className="text-zinc-500 hover:text-red-400 p-1" onClick={() => handleDeleteGoal(g.id)}>
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <span className="text-xs text-zinc-500 block mb-1">Tenggat waktu: {g.deadline || 'Tidak ada'}</span>
                            <div className="text-sm font-semibold mb-2 text-purple-400">
                              {formatCurrency(g.current)} / {formatCurrency(g.target)} ({percent}%)
                            </div>
                            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden mb-4">
                              <div className="h-full bg-purple-500 rounded-full" style={{ width: `${percent}%` }} />
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button 
                              className="btn-secondary py-1 px-3 text-xs w-full justify-center"
                              onClick={() => {
                                const amt = parseFloat(prompt('Masukkan jumlah simpanan (IDR):'));
                                if (amt) handleDepositGoal(g.id, amt);
                              }}
                            >
                              + Tambah Dana
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    {goals.length === 0 && (
                      <div className="lg:col-span-2 card text-center py-10 text-zinc-500">
                        Belum ada target tabungan terencana.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* DEBTS VIEW */}
            {currentTab === 'debts' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form to Add Debt */}
                <div className="card h-fit">
                  <h2 className="text-lg font-bold font-title mb-4">Catat Hutang / Piutang</h2>
                  <form onSubmit={handleAddDebt} className="space-y-4">
                    <div>
                      <label className="text-xs text-zinc-400 block mb-1">Nama Kontak / Keperluan</label>
                      <input type="text" name="debtName" placeholder="Contoh: Budi (Pinjam Uang), Tagihan Listrik" className="form-input" required />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-zinc-400 block mb-1">Nominal (IDR)</label>
                        <input type="number" name="debtAmount" placeholder="0" className="form-input" required />
                      </div>
                      <div>
                        <label className="text-xs text-zinc-400 block mb-1">Jenis</label>
                        <select name="debtType" className="form-input">
                          <option value="debt">Hutang (Saya Berhutang)</option>
                          <option value="receivable">Piutang (Orang Lain Berhutang)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-zinc-400 block mb-1">Tanggal Jatuh Tempo</label>
                      <input type="date" name="debtDueDate" className="form-input" required />
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center">
                      Simpan Catatan
                    </button>
                  </form>
                </div>

                {/* Debt Ledger */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Summary Debt */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="card border-red-500/20 bg-red-500/[0.02]">
                      <span className="text-xs text-zinc-400 block mb-1">Hutang Belum Terbayar (You Owe)</span>
                      <span className="text-xl font-bold text-red-400">{formatCurrency(totalDebts)}</span>
                    </div>
                    <div className="card border-emerald-500/20 bg-emerald-500/[0.02]">
                      <span className="text-xs text-zinc-400 block mb-1">Piutang Belum Diterima (Owed to You)</span>
                      <span className="text-xl font-bold text-emerald-400">{formatCurrency(totalReceivables)}</span>
                    </div>
                  </div>

                  {/* List of Debts */}
                  <div className="card">
                    <h3 className="text-md font-bold mb-4 font-title">Buku Hutang Piutang</h3>
                    <div className="divide-y divide-white/5">
                      {debts.map(d => (
                        <div key={d.id} className="py-3 flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm">{d.name}</span>
                              <span className={`badge ${d.type === 'debt' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                                {d.type === 'debt' ? 'Hutang' : 'Piutang'}
                              </span>
                              <span className={`badge ${d.status === 'paid' ? 'bg-zinc-700 text-zinc-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                {d.status === 'paid' ? 'Lunas' : 'Belum Lunas'}
                              </span>
                            </div>
                            <span className="text-xs text-zinc-500">Jatuh Tempo: {d.dueDate}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className={`font-semibold text-sm ${d.status === 'paid' ? 'line-through text-zinc-500' : d.type === 'debt' ? 'text-red-400' : 'text-emerald-400'}`}>
                              {formatCurrency(d.amount)}
                            </span>
                            <button 
                              onClick={() => handleToggleDebtStatus(d.id)}
                              className="text-xs bg-zinc-800 hover:bg-zinc-700 py-1 px-2.5 rounded border border-white/5"
                            >
                              {d.status === 'paid' ? 'Belum' : 'Lunas'}
                            </button>
                            <button className="text-zinc-500 hover:text-red-400 p-1" onClick={() => handleDeleteDebt(d.id)}>
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                      {debts.length === 0 && (
                        <div className="text-center py-6 text-zinc-500">
                          Buku hutang piutang masih kosong.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* INVESTMENTS VIEW */}
            {currentTab === 'investments' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form to Add Asset */}
                <div className="card h-fit">
                  <h2 className="text-lg font-bold font-title mb-4">Catat Aset & Investasi</h2>
                  <form onSubmit={handleAddInvestment} className="space-y-4">
                    <div>
                      <label className="text-xs text-zinc-400 block mb-1">Nama Aset / Investasi</label>
                      <input type="text" name="investName" placeholder="Contoh: Emas Batangan, Saham BBCA" className="form-input" required />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-zinc-400 block mb-1">Nilai Sekarang (IDR)</label>
                        <input type="number" name="investValue" placeholder="0" className="form-input" required />
                      </div>
                      <div>
                        <label className="text-xs text-zinc-400 block mb-1">Jenis Aset</label>
                        <select name="investType" className="form-input">
                          <option value="commodity">Emas / Komoditas</option>
                          <option value="mutual-fund">Reksadana</option>
                          <option value="stock">Saham</option>
                          <option value="crypto">Cryptocurrency</option>
                          <option value="other">Lainnya</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-zinc-400 block mb-1">Kuantitas / Jumlah Kepemilikan (Opsional)</label>
                      <input type="text" name="investQty" placeholder="Contoh: 5 Gram, 10 Lot" className="form-input" />
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center">
                      Simpan Aset
                    </button>
                  </form>
                </div>

                {/* Asset Portfolio */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="card bg-lime/5 border border-lime/20 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-zinc-400">Total Nilai Investasi</span>
                      <h2 className="text-2xl font-bold font-title color-lime">{formatCurrency(totalInvestmentValue)}</h2>
                    </div>
                    <TrendingUp size={32} className="color-lime opacity-80" />
                  </div>

                  <h2 className="text-lg font-bold font-title">Portofolio Aset Aktif</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {investments.map(i => (
                      <div key={i.id} className="card flex flex-col justify-between h-32">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="badge bg-zinc-800 text-zinc-400 capitalize mb-1">{i.type}</span>
                            <h3 className="font-bold text-md">{i.name}</h3>
                            <span className="text-xs text-zinc-500">{i.qty || 'Jumlah tidak diatur'}</span>
                          </div>
                          <button className="text-zinc-500 hover:text-red-400 p-1" onClick={() => handleDeleteInvestment(i.id)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="text-lg font-bold text-right text-zinc-200">
                          {formatCurrency(i.value)}
                        </div>
                      </div>
                    ))}
                    {investments.length === 0 && (
                      <div className="col-span-2 card text-center py-10 text-zinc-500">
                        Belum ada aset investasi terdaftar.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* AI ASSISTANT VIEW */}
            {currentTab === 'ai' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-h-[70vh]">
                {/* Quick Info Sidebar */}
                <div className="card h-fit space-y-4 lg:col-span-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="text-purple-400" size={20} />
                    <h3 className="font-title font-bold text-md">AI Konsultan Keuangan</h3>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    AI kami mengevaluasi seluruh transaksi, dompet aktif, tabungan, dan anggaran bulananmu untuk menghasilkan analisis yang disesuaikan secara dinamis.
                  </p>
                  
                  <div className="space-y-2">
                    <span className="text-[10px] text-zinc-500 uppercase block font-semibold">Tombol Cepat Pertanyaan</span>
                    <button 
                      className="btn-secondary w-full text-left py-2 px-3 text-xs justify-start gap-2"
                      onClick={() => triggerPresetQuestion('Bagaimana analisis kondisi keuanganku saat ini?')}
                    >
                      💡 Analisis Keuangan Saya
                    </button>
                    <button 
                      className="btn-secondary w-full text-left py-2 px-3 text-xs justify-start gap-2"
                      onClick={() => triggerPresetQuestion('Tolong berikan tips hemat harian.')}
                    >
                      💸 Tips Hemat Instan
                    </button>
                    <button 
                      className="btn-secondary w-full text-left py-2 px-3 text-xs justify-start gap-2"
                      onClick={() => triggerPresetQuestion('Bagaimana status hutang piutangku?')}
                    >
                      🪙 Rekap Hutang Saya
                    </button>
                  </div>
                </div>

                {/* Chat Panel */}
                <div className="lg:col-span-2 card flex flex-col h-[500px] p-0 overflow-hidden relative">
                  {/* Chat header */}
                  <div className="border-b border-white/5 py-4 px-5 flex items-center justify-between bg-black/25">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-pulse" />
                      <span className="text-sm font-semibold">Budggt.AI Chatbot</span>
                    </div>
                    <button 
                      className="text-xs text-zinc-400 hover:text-zinc-200"
                      onClick={() => setChatMessages([{ role: 'assistant', text: 'Halo! Saya AI Konsultan Finansial Budggt. Siap membantu!' }])}
                    >
                      Reset Obrolan
                    </button>
                  </div>

                  {/* Chat logs */}
                  <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl py-3 px-4 text-sm leading-relaxed whitespace-pre-line ${
                          msg.role === 'user' 
                            ? 'bg-purple text-[#121212] font-semibold' 
                            : 'bg-zinc-800 text-zinc-200 border border-white/5'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input form */}
                  <form onSubmit={handleSendMessage} className="border-t border-white/5 p-4 flex gap-2 bg-black/10">
                    <input 
                      type="text" 
                      id="ai-chat-input"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ketik pertanyaan keuanganmu..." 
                      className="form-input flex-1"
                    />
                    <button type="submit" className="btn-primary py-2.5 bg-[#b388ff] text-[#121212]">
                      Kirim
                    </button>
                  </form>
                </div>
              </div>
            )}
            
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 text-center text-xs text-zinc-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-title font-semibold text-sm">Budggt.</span>
          <span>© 2026 Budggt Financial Planner. Semua data disimpan secara lokal di browsermu.</span>
        </div>
      </footer>

      {/* TRANSACTION MODAL */}
      {showTxModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className="card w-full max-w-md bg-zinc-900 border border-white/10 relative p-6">
            <button className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-200 p-1" onClick={() => setShowTxModal(false)}>
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold font-title mb-6">Catat Transaksi</h2>

            <form onSubmit={handleAddTransaction} className="space-y-4">
              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-2 bg-black/45 p-1 rounded-lg border border-white/5">
                <button 
                  type="button"
                  className={`py-1.5 text-xs font-semibold rounded ${txType === 'expense' ? 'bg-red-500 text-white' : 'text-zinc-400'}`}
                  onClick={() => setTxType('expense')}
                >
                  Pengeluaran
                </button>
                <button 
                  type="button"
                  className={`py-1.5 text-xs font-semibold rounded ${txType === 'income' ? 'bg-emerald-500 text-white' : 'text-zinc-400'}`}
                  onClick={() => setTxType('income')}
                >
                  Pemasukan
                </button>
              </div>

              {/* Amount */}
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Nominal Rupiah (IDR)</label>
                <input 
                  type="number" 
                  value={txAmount} 
                  onChange={(e) => setTxAmount(e.target.value)} 
                  placeholder="0" 
                  className="form-input text-lg font-bold" 
                  required 
                />
              </div>

              {/* Category selector (expense only) */}
              {txType === 'expense' && (
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Kategori</label>
                  <select 
                    value={txCategory} 
                    onChange={(e) => setTxCategory(e.target.value)} 
                    className="form-input"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.name} value={c.name}>{c.icon} {c.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Wallet select */}
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Sumber Rekening / Dompet</label>
                <select 
                  value={txWalletId} 
                  onChange={(e) => setTxWalletId(e.target.value)} 
                  className="form-input"
                >
                  {wallets.map(w => (
                    <option key={w.id} value={w.id}>{w.emoji} {w.name} ({formatCurrency(w.balance)})</option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Tanggal</label>
                <input 
                  type="date" 
                  value={txDate} 
                  onChange={(e) => setTxDate(e.target.value)} 
                  className="form-input" 
                  required 
                />
              </div>

              {/* Note */}
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Catatan / Keterangan</label>
                <input 
                  type="text" 
                  value={txNote} 
                  onChange={(e) => setTxNote(e.target.value)} 
                  placeholder="Contoh: Makan Siang Bakso" 
                  className="form-input" 
                />
              </div>

              <button type="submit" className="btn-primary w-full justify-center py-3 mt-4 text-md">
                Simpan Transaksi
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
