import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  LayoutDashboard, Wrench, ShoppingBag, LogOut,
  Smartphone, Phone, Eye, Edit2, Trash2, Search, X, Save, ChevronDown, Plus,
} from "lucide-react";
import logo from "@/assets/logo.png";
import {
  PHONES, BRANDS, SERVICES, ACCESSORIES, KEYPAD_PHONES,
  PhoneItem, KeypadPhone, DEFAULT_PHONE_IMAGE, fmt,
} from "@/data/products";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — Noon Mobile Shop" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPanel,
});

// Simple mock auth
const ADMIN_PASSWORD = "noon2024";

type Tab = "dashboard" | "phones" | "keypad" | "accessories" | "services";

const BRAND_OPTIONS = [
  "Apple", "Samsung", "Xiaomi", "Infinix", "Oppo", "Vivo", "Tecno",
  "Realme", "Honor", "Nokia", "itel", "Jazz", "QMobile", "Other"
];

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
              className="h-11 rounded-xl bg-primary text-sm font-bold text-primary-foreground transition hover:bg-primary/90 cursor-pointer"
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

  // Maintain state for phones and keypad phones
  const [phones, setPhones] = useState<PhoneItem[]>(PHONES);
  const [keypadPhones, setKeypadPhones] = useState<KeypadPhone[]>(KEYPAD_PHONES);

  const navItems: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "phones", label: "Smartphones", icon: Smartphone },
    { id: "keypad", label: "Keypad Phones", icon: Phone },
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
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition mb-1 cursor-pointer ${tab === item.id ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
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
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition cursor-pointer"
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
            <h2 className="font-display text-base font-bold capitalize">
              {tab === "phones" ? "Smartphones" : tab === "keypad" ? "Keypad (Button) Phones" : tab}
            </h2>
          </div>
          <span className="hidden text-xs text-muted-foreground sm:block">Noon Mobile Admin</span>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {tab === "dashboard" && <DashboardTab phonesCount={phones.length} keypadCount={keypadPhones.length} />}
          {tab === "phones" && <PhonesTab phones={phones} setPhones={setPhones} />}
          {tab === "keypad" && <KeypadTab keypadPhones={keypadPhones} setKeypadPhones={setKeypadPhones} />}
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

function DashboardTab({ phonesCount, keypadCount }: { phonesCount: number; keypadCount: number }) {
  const totalAcc = ACCESSORIES.length;
  const totalServices = SERVICES.length;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 font-display text-lg font-bold">Overview</h3>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard title="Smartphones" value={phonesCount} sub="In inventory" icon={Smartphone} color="bg-blue-500/15 text-blue-400" />
          <StatCard title="Keypad Phones" value={keypadCount} sub="Button phones" icon={Phone} color="bg-amber-500/15 text-amber-400" />
          <StatCard title="Accessories" value={totalAcc} sub="Categories" icon={ShoppingBag} color="bg-purple-500/15 text-purple-400" />
          <StatCard title="Services" value={totalServices} sub="Repair types" icon={Wrench} color="bg-emerald-500/15 text-emerald-400" />
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-display text-lg font-bold">Brand Breakdown (Smartphones)</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {["Apple","Samsung","Xiaomi","Infinix","Oppo","Vivo","Tecno","Realme","Honor","Nokia","itel","Other"].map((b) => {
            const count = PHONES.filter((p) => (p.brand || "Other") === b).length;
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

function PhonesTab({ phones, setPhones }: { phones: PhoneItem[]; setPhones: React.Dispatch<React.SetStateAction<PhoneItem[]>> }) {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [editing, setEditing] = useState<PhoneItem | null>(null);
  const [notice, setNotice] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // New phone form state
  const [newPhone, setNewPhone] = useState<{
    name: string;
    brand: string;
    customBrand: string;
    price: string;
    ram: string;
    storage: string;
    display: string;
    battery: string;
    chip: string;
    camera: string;
    image: string;
    description: string;
  }>({
    name: "",
    brand: "Apple",
    customBrand: "",
    price: "",
    ram: "",
    storage: "",
    display: "",
    battery: "",
    chip: "",
    camera: "",
    image: "",
    description: "",
  });

  const filtered = useMemo(() => {
    return phones.filter((p) => {
      const pBrand = p.brand || "Other";
      const ms = brand === "All" || pBrand === brand;
      const mq = search.trim() === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        pBrand.toLowerCase().includes(search.toLowerCase());
      return ms && mq;
    });
  }, [search, brand, phones]);

  const handleAddPhone = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!newPhone.name.trim()) {
      setNotice("⚠️ Please enter Phone Name (Model).");
      return;
    }

    const selectedBrand = newPhone.brand === "Other" && newPhone.customBrand.trim()
      ? newPhone.customBrand.trim()
      : newPhone.brand || "Other";

    const parsedPrice = newPhone.price && Number(newPhone.price) > 0 ? Number(newPhone.price) : undefined;

    const phone: PhoneItem = {
      id: "phone_" + Date.now(),
      name: newPhone.name.trim(),
      brand: selectedBrand,
      price: parsedPrice,
      ram: newPhone.ram.trim() || undefined,
      storage: newPhone.storage.trim() || undefined,
      display: newPhone.display.trim() || undefined,
      battery: newPhone.battery.trim() || undefined,
      chip: newPhone.chip.trim() || undefined,
      camera: newPhone.camera.trim() || undefined,
      image: newPhone.image.trim() || DEFAULT_PHONE_IMAGE,
      description: newPhone.description.trim() || undefined,
    };

    setPhones((prev) => [phone, ...prev]);
    setNewPhone({
      name: "",
      brand: "Apple",
      customBrand: "",
      price: "",
      ram: "",
      storage: "",
      display: "",
      battery: "",
      chip: "",
      camera: "",
      image: "",
      description: "",
    });
    setShowAddModal(false);
    setNotice(`✅ "${phone.name}" successfully added!`);
  };

  return (
    <div className="space-y-5">
      {notice && (
        <div className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm border ${notice.startsWith("✅") ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400" : "bg-amber-500/15 border-amber-500/30 text-amber-400"}`}>
          {notice}
          <button onClick={() => setNotice("")} className="cursor-pointer"><X className="h-4 w-4" /></button>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search smartphones…" className="h-9 rounded-full border border-border bg-secondary pl-9 pr-4 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="relative">
            <select value={brand} onChange={(e) => setBrand(e.target.value)} className="h-9 appearance-none rounded-full border border-border bg-secondary pl-3 pr-8 text-xs text-foreground focus:outline-none">
              {BRANDS.map((b) => <option key={b}>{b}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs text-muted-foreground">{filtered.length} smartphones</p>
          <button
            onClick={() => { setShowAddModal(true); setNotice(""); }}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow transition hover:bg-primary/90 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            Add New Phone
          </button>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setShowAddModal(false)}>
          <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-xl font-bold">Add New Phone</h3>
              <button onClick={() => setShowAddModal(false)} className="text-muted-foreground hover:text-foreground cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddPhone} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-foreground">Name (Model) *</label>
                <input
                  type="text"
                  placeholder="e.g. Nokia 1100, Samsung Galaxy A05s"
                  value={newPhone.name}
                  onChange={(e) => setNewPhone((p) => ({ ...p, name: e.target.value }))}
                  className="h-11 w-full rounded-xl border border-border bg-secondary px-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-muted-foreground">Brand</label>
                  <select
                    value={newPhone.brand}
                    onChange={(e) => setNewPhone((p) => ({ ...p, brand: e.target.value }))}
                    className="h-11 w-full rounded-xl border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {BRAND_OPTIONS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-muted-foreground">Price (Rs.) (Optional)</label>
                  <input
                    type="number"
                    placeholder="Optional"
                    value={newPhone.price}
                    onChange={(e) => setNewPhone((p) => ({ ...p, price: e.target.value }))}
                    className="h-11 w-full rounded-xl border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              {newPhone.brand === "Other" && (
                <div>
                  <label className="mb-1 block text-xs font-semibold text-muted-foreground">Custom Brand Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Generic, China Phone, QMobile"
                    value={newPhone.customBrand}
                    onChange={(e) => setNewPhone((p) => ({ ...p, customBrand: e.target.value }))}
                    className="h-10 w-full rounded-xl border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-muted-foreground">RAM (e.g. 8GB) (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 4GB, 8GB"
                    value={newPhone.ram}
                    onChange={(e) => setNewPhone((p) => ({ ...p, ram: e.target.value }))}
                    className="h-10 w-full rounded-xl border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-muted-foreground">Storage (e.g. 128GB) (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 64GB, 128GB"
                    value={newPhone.storage}
                    onChange={(e) => setNewPhone((p) => ({ ...p, storage: e.target.value }))}
                    className="h-10 w-full rounded-xl border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">Display (e.g. 6.6&quot; AMOLED) (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. 6.6&quot; 90Hz, 2.4&quot; QVGA"
                  value={newPhone.display}
                  onChange={(e) => setNewPhone((p) => ({ ...p, display: e.target.value }))}
                  className="h-10 w-full rounded-xl border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-muted-foreground">Battery (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 5000 mAh, 1020 mAh"
                    value={newPhone.battery}
                    onChange={(e) => setNewPhone((p) => ({ ...p, battery: e.target.value }))}
                    className="h-10 w-full rounded-xl border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-muted-foreground">Camera (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 50MP, VGA, None"
                    value={newPhone.camera}
                    onChange={(e) => setNewPhone((p) => ({ ...p, camera: e.target.value }))}
                    className="h-10 w-full rounded-xl border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://example.com/phone.jpg"
                  value={newPhone.image}
                  onChange={(e) => setNewPhone((p) => ({ ...p, image: e.target.value }))}
                  className="h-10 w-full rounded-xl border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <p className="mt-1 text-[11px] text-muted-foreground">Tip: imgbb.com par image upload karke link copy karein.</p>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">Description (Optional)</label>
                <textarea
                  placeholder="Koi bhi additional detail..."
                  rows={2}
                  value={newPhone.description}
                  onChange={(e) => setNewPhone((p) => ({ ...p, description: e.target.value }))}
                  className="w-full rounded-xl border border-border bg-secondary p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition hover:bg-primary/90 cursor-pointer shadow-md"
                >
                  Add Phone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Phones Table */}
      <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50 text-xs text-muted-foreground uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Mobile Model</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Brand</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Price</th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">Specs</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.slice(0, 40).map((p) => (
              <tr key={p.id} className="bg-card hover:bg-secondary/40 transition-colors">
                <td className="px-4 py-3 font-medium">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image && p.image.trim() !== "" ? p.image : DEFAULT_PHONE_IMAGE}
                      alt={p.name}
                      className="h-9 w-9 rounded-lg object-contain bg-secondary p-1 border border-border shrink-0"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = DEFAULT_PHONE_IMAGE;
                      }}
                    />
                    <div>
                      <p className="font-bold text-foreground">{p.name}</p>
                      {p.description && <p className="text-xs text-muted-foreground line-clamp-1">{p.description}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{p.brand || "Other"}</td>
                <td className="px-4 py-3 font-medium text-primary hidden md:table-cell">
                  {p.price ? fmt(p.price) : <span className="text-muted-foreground font-normal">—</span>}
                </td>
                <td className="px-4 py-3 text-muted-foreground text-xs hidden lg:table-cell">
                  {(p.ram || p.storage) ? `${p.ram || ""} ${p.storage || ""}`.trim() : "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => { setEditing(p); setNotice(""); }}
                      className="rounded-lg border border-border bg-background p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary transition cursor-pointer"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => { setPhones((prev) => prev.filter((ph) => ph.id !== p.id)); setNotice(`"${p.name}" deleted.`); }}
                      className="rounded-lg border border-destructive/30 bg-background p-1.5 text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Edit Phone</h3>
              <button onClick={() => setEditing(null)} className="cursor-pointer text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-foreground">Name (Model)</label>
                <input
                  defaultValue={editing.name}
                  id="edit_name"
                  className="h-10 w-full rounded-xl border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-muted-foreground">Brand</label>
                  <input
                    defaultValue={editing.brand || "Other"}
                    id="edit_brand"
                    className="h-10 w-full rounded-xl border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-muted-foreground">Price (Rs.) (Optional)</label>
                  <input
                    type="number"
                    defaultValue={editing.price !== undefined ? String(editing.price) : ""}
                    id="edit_price"
                    className="h-10 w-full rounded-xl border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">Image URL (Optional)</label>
                <input
                  defaultValue={editing.image || ""}
                  id="edit_image"
                  className="h-10 w-full rounded-xl border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">Description (Optional)</label>
                <textarea
                  defaultValue={editing.description || ""}
                  id="edit_description"
                  rows={2}
                  className="w-full rounded-xl border border-border bg-secondary p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2 pt-3 border-t border-border">
              <button onClick={() => setEditing(null)} className="rounded-xl border border-border px-5 py-2 text-sm font-medium text-foreground hover:bg-secondary transition cursor-pointer">Cancel</button>
              <button
                onClick={() => {
                  const newName = (document.getElementById("edit_name") as HTMLInputElement)?.value || editing.name;
                  const newBrand = (document.getElementById("edit_brand") as HTMLInputElement)?.value || "Other";
                  const priceStr = (document.getElementById("edit_price") as HTMLInputElement)?.value;
                  const newPrice = priceStr && Number(priceStr) > 0 ? Number(priceStr) : undefined;
                  const newImg = (document.getElementById("edit_image") as HTMLInputElement)?.value;
                  const newDesc = (document.getElementById("edit_description") as HTMLTextAreaElement)?.value;

                  setPhones((prev) => prev.map((ph) => ph.id === editing.id ? {
                    ...ph,
                    name: newName,
                    brand: newBrand,
                    price: newPrice,
                    image: newImg || DEFAULT_PHONE_IMAGE,
                    description: newDesc || undefined,
                  } : ph));
                  setEditing(null);
                  setNotice(`✅ "${newName}" updated successfully!`);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 cursor-pointer"
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

function KeypadTab({ keypadPhones, setKeypadPhones }: { keypadPhones: KeypadPhone[]; setKeypadPhones: React.Dispatch<React.SetStateAction<KeypadPhone[]>> }) {
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newKeypad, setNewKeypad] = useState({
    name: "",
    brand: "Nokia",
    customBrand: "",
    price: "",
    description: "",
    image: ""
  });

  const filtered = useMemo(() => {
    return keypadPhones.filter((k) => {
      const kBrand = k.brand || "Other";
      return search.trim() === "" ||
        k.name.toLowerCase().includes(search.toLowerCase()) ||
        kBrand.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, keypadPhones]);

  const handleAddKeypad = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!newKeypad.name.trim()) {
      setNotice("⚠️ Please enter Phone Name (Model).");
      return;
    }

    const selectedBrand = newKeypad.brand === "Other" && newKeypad.customBrand.trim()
      ? newKeypad.customBrand.trim()
      : newKeypad.brand || "Other";

    const parsedPrice = newKeypad.price && Number(newKeypad.price) > 0 ? Number(newKeypad.price) : undefined;

    const newPhone: KeypadPhone = {
      id: "kp_" + Date.now(),
      name: newKeypad.name.trim(),
      brand: selectedBrand,
      price: parsedPrice,
      description: newKeypad.description.trim() || undefined,
      image: newKeypad.image.trim() || DEFAULT_PHONE_IMAGE,
    };

    setKeypadPhones((prev) => [newPhone, ...prev]);
    setNewKeypad({ name: "", brand: "Nokia", customBrand: "", price: "", description: "", image: "" });
    setShowAddModal(false);
    setNotice(`✅ Keypad Phone "${newPhone.name}" added successfully!`);
  };

  return (
    <div className="space-y-5">
      {notice && (
        <div className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm border ${notice.startsWith("✅") ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400" : "bg-amber-500/15 border-amber-500/30 text-amber-400"}`}>
          {notice}
          <button onClick={() => setNotice("")} className="cursor-pointer"><X className="h-4 w-4" /></button>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search keypad phones…"
            className="h-9 rounded-full border border-border bg-secondary pl-9 pr-4 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs text-muted-foreground">{filtered.length} keypad phones</p>
          <button
            onClick={() => { setShowAddModal(true); setNotice(""); }}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow transition hover:bg-primary/90 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Keypad Phone
          </button>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setShowAddModal(false)}>
          <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-xl font-bold">Add Keypad (Button) Phone</h3>
              <button onClick={() => setShowAddModal(false)} className="text-muted-foreground hover:text-foreground cursor-pointer"><X className="h-5 w-5" /></button>
            </div>

            <form onSubmit={handleAddKeypad} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-foreground">Phone Model / Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Nokia 105 (2024), Samsung Guru Music"
                  value={newKeypad.name}
                  onChange={(e) => setNewKeypad((p) => ({ ...p, name: e.target.value }))}
                  className="h-11 w-full rounded-xl border border-border bg-secondary px-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-muted-foreground">Brand</label>
                  <select
                    value={newKeypad.brand}
                    onChange={(e) => setNewKeypad((p) => ({ ...p, brand: e.target.value }))}
                    className="h-11 w-full rounded-xl border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {BRAND_OPTIONS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-muted-foreground">Price (Rs.) (Optional)</label>
                  <input
                    type="number"
                    placeholder="Optional"
                    value={newKeypad.price}
                    onChange={(e) => setNewKeypad((p) => ({ ...p, price: e.target.value }))}
                    className="h-11 w-full rounded-xl border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              {newKeypad.brand === "Other" && (
                <div>
                  <label className="mb-1 block text-xs font-semibold text-muted-foreground">Custom Brand (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. QMobile, GFive, Voice"
                    value={newKeypad.customBrand}
                    onChange={(e) => setNewKeypad((p) => ({ ...p, customBrand: e.target.value }))}
                    className="h-10 w-full rounded-xl border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              )}

              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://... (image link or leave empty)"
                  value={newKeypad.image}
                  onChange={(e) => setNewKeypad((p) => ({ ...p, image: e.target.value }))}
                  className="h-10 w-full rounded-xl border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">Description / Features (Optional)</label>
                <textarea
                  placeholder="Dual SIM, PTA Approved, Torch, Battery backup..."
                  rows={2}
                  value={newKeypad.description}
                  onChange={(e) => setNewKeypad((p) => ({ ...p, description: e.target.value }))}
                  className="w-full rounded-xl border border-border bg-secondary p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-border px-5 py-2 text-sm font-medium text-foreground hover:bg-secondary transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-primary px-6 py-2 text-sm font-bold text-primary-foreground transition hover:bg-primary/90 cursor-pointer shadow-md"
                >
                  Add Keypad Phone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Keypad Table */}
      <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50 text-xs text-muted-foreground uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Keypad Model</th>
              <th className="px-4 py-3 text-left">Brand</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((kp) => (
              <tr key={kp.id} className="bg-card hover:bg-secondary/40 transition-colors">
                <td className="px-4 py-3 font-medium">
                  <div className="flex items-center gap-3">
                    <img
                      src={kp.image && kp.image.trim() !== "" ? kp.image : DEFAULT_PHONE_IMAGE}
                      alt={kp.name}
                      className="h-9 w-9 rounded-lg object-contain bg-secondary p-1 border border-border shrink-0"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = DEFAULT_PHONE_IMAGE;
                      }}
                    />
                    <div>
                      <p className="font-bold text-foreground">{kp.name}</p>
                      {kp.description && <p className="text-xs text-muted-foreground line-clamp-1">{kp.description}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{kp.brand || "Other"}</td>
                <td className="px-4 py-3 font-medium text-primary">
                  {kp.price ? fmt(kp.price) : <span className="text-muted-foreground font-normal">—</span>}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => {
                      setKeypadPhones((prev) => prev.filter((k) => k.id !== kp.id));
                      setNotice(`"${kp.name}" deleted.`);
                    }}
                    className="rounded-lg border border-destructive/30 bg-background p-1.5 text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AccessoriesTab() {
  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">Showing {ACCESSORIES.length} accessories available in store.</p>
      <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50 text-xs text-muted-foreground uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Item Name</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Category</th>
              <th className="px-4 py-3 text-left">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {ACCESSORIES.map((a) => (
              <tr key={a.id} className="bg-card hover:bg-secondary/40 transition-colors">
                <td className="px-4 py-3 font-medium whitespace-nowrap">{a.emoji} {a.name}</td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{a.category}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{a.desc}</td>
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
      <p className="text-xs text-muted-foreground">Showing {SERVICES.length} expert repair services offered at the shop.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {SERVICES.map((s) => (
          <div key={s.title} className="rounded-2xl border border-border bg-card p-5 shadow-sm flex gap-4 items-start">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <s.icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-base font-bold">{s.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
              <p className="mt-2 text-xs font-semibold text-primary">Original Parts • 30-day Warranty</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
