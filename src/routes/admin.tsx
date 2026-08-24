import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  LayoutDashboard, Wrench, ShoppingBag, LogOut,
  Smartphone, Phone, Eye, Edit2, Trash2, Search, X, Save, ChevronDown, Plus,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { PHONES, BRANDS, SERVICES, ACCESSORIES, KEYPAD_PHONES, PhoneItem, KeypadPhone } from "@/data/products";

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

  // Maintain in-memory state for phones and keypad phones
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

function PhonesTab({ phones, setPhones }: { phones: PhoneItem[]; setPhones: React.Dispatch<React.SetStateAction<PhoneItem[]>> }) {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [editing, setEditing] = useState<PhoneItem | null>(null);
  const [notice, setNotice] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // New phone form state - ALL fields completely optional except phone model/name
  const [newPhone, setNewPhone] = useState<{
    name: string;
    brand: string;
    description: string;
    image: string;
    ram: string;
    storage: string;
    display: string;
    battery: string;
    chip: string;
    camera: string;
  }>({
    name: "",
    brand: "Samsung",
    description: "",
    image: "",
    ram: "",
    storage: "",
    display: "",
    battery: "",
    chip: "",
    camera: "",
  });

  const filtered = useMemo(() => {
    return phones.filter((p) => {
      const ms = brand === "All" || p.brand === brand;
      const mq = search.trim() === "" || p.name.toLowerCase().includes(search.toLowerCase());
      return ms && mq;
    });
  }, [search, brand, phones]);

  const handleAddPhone = () => {
    // If user entered nothing at all
    if (!newPhone.name.trim() && !newPhone.description.trim()) {
      setNotice("⚠️ Kam az kam mobile ka model ya description likhein.");
      return;
    }

    const phoneName = newPhone.name.trim() || newPhone.description.trim().slice(0, 30) || "Mobile Phone";
    const id = "custom_" + Date.now();

    const phone: PhoneItem = {
      id,
      brand: newPhone.brand || "Other",
      name: phoneName,
      description: newPhone.description.trim() || undefined,
      ram: newPhone.ram.trim() || undefined,
      storage: newPhone.storage.trim() || undefined,
      display: newPhone.display.trim() || undefined,
      battery: newPhone.battery.trim() || undefined,
      chip: newPhone.chip.trim() || undefined,
      camera: newPhone.camera.trim() || undefined,
      image: newPhone.image.trim() || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    };

    setPhones((prev) => [phone, ...prev]);
    setNewPhone({
      name: "",
      brand: "Samsung",
      description: "",
      image: "",
      ram: "",
      storage: "",
      display: "",
      battery: "",
      chip: "",
      camera: "",
    });
    setShowAddForm(false);
    setNotice(`✅ "${phone.name}" upload ho gaya!`);
  };

  return (
    <div className="space-y-5">
      {notice && (
        <div className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm border ${notice.startsWith("✅") ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400" : "bg-amber-500/15 border-amber-500/30 text-amber-400"}`}>
          {notice}
          <button onClick={() => setNotice("")}><X className="h-4 w-4" /></button>
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
            onClick={() => { setShowAddForm(!showAddForm); setNotice(""); }}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow transition hover:bg-primary/90 cursor-pointer"
          >
            {showAddForm ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            {showAddForm ? "Cancel" : "Add Smartphone"}
          </button>
        </div>
      </div>

      {/* Add Phone Form */}
      {showAddForm && (
        <div className="rounded-2xl border border-primary/30 bg-card p-5 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-bold text-primary">Naya Mobile Add Karein</h3>
            <span className="text-xs text-emerald-400 font-medium">✓ Har cheez optional hai (sirf model ya description likh dein)</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-semibold text-foreground">Mobile Model / Name</label>
              <input
                placeholder="e.g. Samsung Galaxy A05s"
                value={newPhone.name}
                onChange={(e) => setNewPhone((p) => ({ ...p, name: e.target.value }))}
                className="h-10 w-full rounded-lg border border-primary/50 bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-semibold text-muted-foreground">Description (Optional)</label>
              <textarea
                placeholder="Mobile ki koi bhi detail ya condition yahan likh sakte hain..."
                rows={2}
                value={newPhone.description}
                onChange={(e) => setNewPhone((p) => ({ ...p, description: e.target.value }))}
                className="w-full rounded-lg border border-border bg-secondary p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-muted-foreground">Brand</label>
              <input
                placeholder="e.g. Samsung, Infinix, Vivo..."
                value={newPhone.brand}
                onChange={(e) => setNewPhone((p) => ({ ...p, brand: e.target.value }))}
                className="h-9 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-muted-foreground">Photo URL (Optional)</label>
              <input
                placeholder="https://... (image link)"
                value={newPhone.image}
                onChange={(e) => setNewPhone((p) => ({ ...p, image: e.target.value }))}
                className="h-9 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-muted-foreground">RAM (Optional)</label>
              <input
                placeholder="e.g. 4GB, 8GB"
                value={newPhone.ram}
                onChange={(e) => setNewPhone((p) => ({ ...p, ram: e.target.value }))}
                className="h-9 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-muted-foreground">Storage (Optional)</label>
              <input
                placeholder="e.g. 64GB, 128GB"
                value={newPhone.storage}
                onChange={(e) => setNewPhone((p) => ({ ...p, storage: e.target.value }))}
                className="h-9 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setShowAddForm(false)} className="rounded-xl border border-border px-5 py-2 text-sm font-medium text-foreground hover:bg-secondary transition cursor-pointer">Cancel</button>
            <button
              onClick={handleAddPhone}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 cursor-pointer"
            >
              <Save className="h-4 w-4" /> Upload Mobile Details
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50 text-xs text-muted-foreground uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Mobile Model</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Brand</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Specs / Details</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.slice(0, 30).map((p) => (
              <tr key={p.id} className="bg-card hover:bg-secondary/40 transition-colors">
                <td className="px-4 py-3 font-medium">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-9 w-9 rounded-lg object-contain bg-secondary p-1 border border-border"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&q=80";
                      }}
                    />
                    <div>
                      <p className="font-bold text-foreground">{p.name}</p>
                      {p.description && <p className="text-xs text-muted-foreground line-clamp-1">{p.description}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{p.brand}</td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{p.ram || "—"} / {p.storage || "—"}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => { setEditing(p); setNotice(""); }}
                      className="rounded-lg border border-border bg-background p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary transition cursor-pointer"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => { setPhones((prev) => prev.filter((ph) => ph.id !== p.id)); setNotice(`"${p.name}" delete ho gaya.`); }}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Edit Mobile</h3>
              <button onClick={() => setEditing(null)} className="cursor-pointer"><X className="h-5 w-5 text-muted-foreground" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">Mobile Model / Name</label>
                <input
                  defaultValue={editing.name}
                  id="edit_name"
                  className="h-9 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="col-span-2">
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">Description (Optional)</label>
                <textarea
                  defaultValue={editing.description || ""}
                  id="edit_description"
                  rows={2}
                  className="w-full rounded-lg border border-border bg-secondary p-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">Brand</label>
                <input
                  defaultValue={editing.brand}
                  id="edit_brand"
                  className="h-9 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-muted-foreground">Image URL</label>
                <input
                  defaultValue={editing.image}
                  id="edit_image"
                  className="h-9 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="rounded-xl border border-border px-5 py-2 text-sm font-medium text-foreground hover:bg-secondary transition cursor-pointer">Cancel</button>
              <button
                onClick={() => {
                  const newName = (document.getElementById("edit_name") as HTMLInputElement)?.value || editing.name;
                  const newDesc = (document.getElementById("edit_description") as HTMLTextAreaElement)?.value || "";
                  const newBrand = (document.getElementById("edit_brand") as HTMLInputElement)?.value || editing.brand;
                  const newImg = (document.getElementById("edit_image") as HTMLInputElement)?.value || editing.image;

                  setPhones((prev) => prev.map((ph) => ph.id === editing.id ? { ...ph, name: newName, description: newDesc, brand: newBrand, image: newImg } : ph));
                  setEditing(null);
                  setNotice(`✅ "${newName}" update ho gaya!`);
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
  const [showAddForm, setShowAddForm] = useState(false);
  const [newKeypad, setNewKeypad] = useState({ name: "", brand: "Nokia", description: "", image: "" });

  const filtered = useMemo(() => {
    return keypadPhones.filter((k) => {
      return search.trim() === "" || k.name.toLowerCase().includes(search.toLowerCase()) || k.brand.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, keypadPhones]);

  const handleAddKeypad = () => {
    if (!newKeypad.name.trim() && !newKeypad.description.trim()) {
      setNotice("⚠️ Kam az kam Keypad Phone ka naam ya description likhein.");
      return;
    }
    const name = newKeypad.name.trim() || newKeypad.description.trim().slice(0, 25) || "Keypad Phone";
    const newPhone: KeypadPhone = {
      id: "kp_" + Date.now(),
      name,
      brand: newKeypad.brand.trim() || "Nokia",
      description: newKeypad.description.trim() || undefined,
      image: newKeypad.image.trim() || "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&q=80",
    };
    setKeypadPhones((prev) => [newPhone, ...prev]);
    setNewKeypad({ name: "", brand: "Nokia", description: "", image: "" });
    setShowAddForm(false);
    setNotice(`✅ Keypad Phone "${name}" add ho gaya!`);
  };

  return (
    <div className="space-y-5">
      {notice && (
        <div className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm border ${notice.startsWith("✅") ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400" : "bg-amber-500/15 border-amber-500/30 text-amber-400"}`}>
          {notice}
          <button onClick={() => setNotice("")}><X className="h-4 w-4" /></button>
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
            onClick={() => { setShowAddForm(!showAddForm); setNotice(""); }}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow transition hover:bg-primary/90 cursor-pointer"
          >
            {showAddForm ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            {showAddForm ? "Cancel" : "Add Keypad Phone"}
          </button>
        </div>
      </div>

      {/* Add Keypad Form */}
      {showAddForm && (
        <div className="rounded-2xl border border-primary/30 bg-card p-5 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-bold text-primary">Naya Keypad (Button) Phone Add Karein</h3>
            <span className="text-xs text-emerald-400 font-medium">✓ Jo bhi detail likhein ge upload ho jaye gi</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-semibold text-foreground">Phone Model / Name</label>
              <input
                placeholder="e.g. Nokia 105 (2024), Samsung Guru Music"
                value={newKeypad.name}
                onChange={(e) => setNewKeypad((p) => ({ ...p, name: e.target.value }))}
                className="h-10 w-full rounded-lg border border-primary/50 bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-muted-foreground">Brand (Nokia, Samsung, itel, Jazz, QMobile...)</label>
              <input
                placeholder="e.g. Nokia"
                value={newKeypad.brand}
                onChange={(e) => setNewKeypad((p) => ({ ...p, brand: e.target.value }))}
                className="h-9 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-muted-foreground">Photo URL (Optional)</label>
              <input
                placeholder="https://... (image link)"
                value={newKeypad.image}
                onChange={(e) => setNewKeypad((p) => ({ ...p, image: e.target.value }))}
                className="h-9 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-semibold text-muted-foreground">Description / Details (Optional)</label>
              <textarea
                placeholder="Dual SIM, PTA Approved, Battery backup waghaira..."
                rows={2}
                value={newKeypad.description}
                onChange={(e) => setNewKeypad((p) => ({ ...p, description: e.target.value }))}
                className="w-full rounded-lg border border-border bg-secondary p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setShowAddForm(false)} className="rounded-xl border border-border px-5 py-2 text-sm font-medium text-foreground hover:bg-secondary transition cursor-pointer">Cancel</button>
            <button
              onClick={handleAddKeypad}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 cursor-pointer"
            >
              <Save className="h-4 w-4" /> Upload Keypad Phone
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50 text-xs text-muted-foreground uppercase tracking-wider">
              <th className="px-4 py-3 text-left">Keypad Model</th>
              <th className="px-4 py-3 text-left">Brand</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((kp) => (
              <tr key={kp.id} className="bg-card hover:bg-secondary/40 transition-colors">
                <td className="px-4 py-3 font-medium">
                  <div className="flex items-center gap-3">
                    <img
                      src={kp.image}
                      alt={kp.name}
                      className="h-9 w-9 rounded-lg object-contain bg-secondary p-1 border border-border"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=100&q=80";
                      }}
                    />
                    <div>
                      <p className="font-bold text-foreground">{kp.name}</p>
                      {kp.description && <p className="text-xs text-muted-foreground">{kp.description}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{kp.brand}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => {
                      setKeypadPhones((prev) => prev.filter((k) => k.id !== kp.id));
                      setNotice(`"${kp.name}" delete ho gaya.`);
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
