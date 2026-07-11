import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  LayoutDashboard, Wrench, ShoppingBag, LogOut,
  Phone, TrendingUp, Eye, Edit2, Trash2, Search, X, Save, ChevronDown,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { PHONES, BRANDS, SERVICES, ACCESSORIES, PhoneItem, fmt } from "@/data/products";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — Noon Mobile Shop" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPanel,
});

// Simple mock auth — in production replace with real Firebase Auth
const ADMIN_PASSWORD = "noon2024";

type Tab = "dashboard" | "phones" | "accessories" | "services";

function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  if (!authed) {
    return (
      <div className="dark flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-2xl">
          <div className="mb-6 flex flex-col items-center gap-3">
            <img src={logo} alt="Noon Mobile" className="h-16 w-16 object-contain rounded-full border border-border bg-white" />
            <h1 className="font-display text-xl font-bold">Admin Login</h1>
            <p className="text-center text-xs text-muted-foreground">Noon Mobile &amp; Repairing Shop</p>
          </div>
          <div className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Enter admin password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (pw === ADMIN_PASSWORD) { setAuthed(true); setError(""); }
                  else setError("Wrong password. Try again.");
                }
              }}
              className="h-11 rounded-xl border border-border bg-secondary px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
            <button
              onClick={() => {
                if (pw === ADMIN_PASSWORD) { setAuthed(true); setError(""); }
                else setError("Wrong password. Try again.");
              }}
              className="h-11 rounded-xl bg-primary text-sm font-bold text-primary-foreground transition hover:bg-primary/90"
            >
              Login
            </button>
            <Link to="/" className="text-center text-xs text-muted-foreground hover:text-foreground transition">← Back to Store</Link>
          </div>
        </div>
      </div>
    );
  }

  return <AdminDashboard onLogout={() => setAuthed(false)} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "phones", label: "Phones", icon: Phone },
    { id: "accessories", label: "Accessories", icon: ShoppingBag },
    { id: "services", label: "Services", icon: Wrench },
  ];

  return (
    <div className="dark flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-card shadow-2xl transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center gap-3 border-b border-border p-5">
          <img src={logo} alt="" className="h-9 w-9 rounded-full border border-border bg-white object-contain" />
          <div>
            <p className="font-display text-sm font-bold">Noon Mobile</p>
            <p className="text-[10px] text-muted-foreground">Admin Panel</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Menu</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setTab(item.id); setSidebarOpen(false); }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition mb-1 ${tab === item.id ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-border p-3">
          <Link
            to="/"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition mb-1"
          >
            <Eye className="h-4 w-4" /> View Store
          </Link>
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-4 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="rounded-lg border border-border p-1.5 text-muted-foreground hover:bg-secondary lg:hidden">
              <LayoutDashboard className="h-4 w-4" />
            </button>
            <h2 className="font-display text-base font-bold capitalize">{tab}</h2>
          </div>
          <span className="hidden text-xs text-muted-foreground sm:block">Noon Mobile Admin</span>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {tab === "dashboard" && <DashboardTab />}
          {tab === "phones" && <PhonesTab />}
          {tab === "accessories" && <AccessoriesTab />}
          {tab === "services" && <ServicesTab />}
        </main>
      </div>
    </div>
  );
}

function StatCard({ title, value, sub, icon: Icon, color }: { title: string; value: string | number; sub?: string; icon: React.ComponentType<{ className?: string }>; color: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-5 shadow-sm flex items-start gap-4`}>
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{title}</p>
        <p className="font-display text-2xl font-bold">{value}</p>
        {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
      </div>
    </div>
  );
}

function DashboardTab() {
  const totalPhones = PHONES.length;
  const totalAcc = ACCESSORIES.length;
  const totalServices = SERVICES.length;
  const avgPrice = Math.round(PHONES.reduce((s, p) => s + p.price, 0) / PHONES.length);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 font-display text-lg font-bold">Overview</h3>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard title="Total Phones" value={totalPhones} sub="In inventory" icon={Phone} color="bg-blue-500/15 text-blue-400" />
          <StatCard title="Accessories" value={totalAcc} sub="Categories available" icon={ShoppingBag} color="bg-purple-500/15 text-purple-400" />
          <StatCard title="Services" value={totalServices} sub="Repair types" icon={Wrench} color="bg-emerald-500/15 text-emerald-400" />
          <StatCard title="Avg. Price" value={fmt(avgPrice)} sub="Across all phones" icon={TrendingUp} color="bg-amber-500/15 text-amber-400" />
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-display text-lg font-bold">Brand Breakdown</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {["Apple","Samsung","Xiaomi","Infinix","Oppo","Vivo","Tecno","Realme","Honor","Nokia","itel"].map((b) => {
            const count = PHONES.filter((p) => p.brand === b).length;
            return (
              <div key={b} className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
                <span className="text-sm font-medium">{b}</span>
                <span className="font-display text-sm font-bold text-primary">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-display text-lg font-bold">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <a href={`https://wa.me/923265235786`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:scale-105">
            Open WhatsApp
          </a>
          <Link to="/" className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground shadow transition hover:bg-secondary">
            View Live Store
          </Link>
        </div>
      </div>
    </div>
  );
}

function PhonesTab() {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [editing, setEditing] = useState<PhoneItem | null>(null);
  const [notice, setNotice] = useState("");

  const filtered = useMemo(() => {
    return PHONES.filter((p) => {
      const ms = brand === "All" || p.brand === brand;
      const mq = search.trim() === "" || p.name.toLowerCase().includes(search.toLowerCase());
      return ms && mq;
    });
  }, [search, brand]);

  return (
    <div className="space-y-5">
      {notice && (
        <div className="flex items-center justify-between rounded-xl bg-emerald-500/15 border border-emerald-500/30 px-4 py-3 text-sm text-emerald-400">
          {notice}
          <button onClick={() => setNotice("")}><X className="h-4 w-4" /></button>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…" className="h-9 rounded-full border border-border bg-secondary pl-9 pr-4 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="relative">
            <select value={brand} onChange={(e) => setBrand(e.target.value)} className="h-9 appearance-none rounded-full border border-border bg-secondary pl-3 pr-8 text-xs text-foreground focus:outline-none">
              {BRANDS.map((b) => <option key={b}>{b}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{filtered.length} phones • <em>Note: This is a read-only view. Connect Firebase to enable real edits.</em></p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50 text-xs text-muted-foreground uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Brand</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">RAM / Storage</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.slice(0, 25).map((p) => (
              <tr key={p.id} className="bg-card hover:bg-secondary/40 transition-colors">
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{p.brand}</td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{p.ram} / {p.storage}</td>
                <td className="px-4 py-3 font-bold text-primary">{fmt(p.price)}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => { setEditing(p); setNotice(""); }}
                      className="rounded-lg border border-border bg-background p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary transition"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setNotice(`"${p.name}" would be deleted. Connect Firebase to enable real deletions.`)}
                      className="rounded-lg border border-destructive/30 bg-background p-1.5 text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Edit Phone</h3>
              <button onClick={() => setEditing(null)}><X className="h-5 w-5 text-muted-foreground" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(["name","brand","price","ram","storage","display","battery","chip","camera"] as (keyof PhoneItem)[]).map((field) => (
                <div key={field} className={field === "name" ? "col-span-2" : ""}>
                  <label className="mb-1 block text-xs font-semibold capitalize text-muted-foreground">{field}</label>
                  <input
                    defaultValue={String(editing[field])}
                    className="h-9 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              ))}
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="rounded-xl border border-border px-5 py-2 text-sm font-medium text-foreground hover:bg-secondary transition">Cancel</button>
              <button
                onClick={() => { setEditing(null); setNotice("Changes saved (demo). Connect Firebase to persist changes."); }}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                <Save className="h-4 w-4" /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AccessoriesTab() {
  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">Showing {ACCESSORIES.length} accessories. Connect Firebase to enable real edits.</p>
      <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50 text-xs text-muted-foreground uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Item</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Category</th>
              <th className="px-4 py-3 text-left">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {ACCESSORIES.map((a) => (
              <tr key={a.id} className="bg-card hover:bg-secondary/40 transition-colors">
                <td className="px-4 py-3 font-medium">{a.emoji} {a.name}</td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{a.category}</td>
                <td className="px-4 py-3 font-bold text-primary">{a.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ServicesTab() {
  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">Showing {SERVICES.length} services. Connect Firebase to enable real edits.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {SERVICES.map((s) => (
          <div key={s.title} className="rounded-2xl border border-border bg-card p-5 shadow-sm flex gap-4 items-start">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <s.icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-base font-bold">{s.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
              <p className="mt-2 font-bold text-sm text-primary">{s.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
