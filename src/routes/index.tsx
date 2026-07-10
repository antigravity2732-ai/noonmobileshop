import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Phone, MapPin, Clock, Wrench, ShieldCheck, Star, Search, MessageCircle, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import heroImg from "@/assets/hero.jpg";
import repairImg from "@/assets/repair.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: "https://id-preview--3512d454-57b3-45b2-b651-9767ab7e7da2.lovable.app/og.jpg" },
    ],
  }),
  component: Home,
});

type PhoneItem = {
  id: string;
  brand: string;
  name: string;
  price: number;
  ram: string;
  storage: string;
  display: string;
  battery: string;
  chip: string;
  camera: string;
  image: string;
};

const img = (slug: string) => `https://fdn2.gsmarena.com/vv/bigpic/${slug}.jpg`;

const PHONES: PhoneItem[] = [
  // Apple (used market, under 1 lakh)
  { id: "ip11", brand: "Apple", name: "iPhone 11 64GB (PTA)", price: 98000, ram: "4GB", storage: "64GB", display: "6.1\" LCD", battery: "3110 mAh", chip: "A13 Bionic", camera: "12MP + 12MP", image: img("apple-iphone-11") },
  { id: "ipxr", brand: "Apple", name: "iPhone XR 64GB", price: 62000, ram: "3GB", storage: "64GB", display: "6.1\" LCD", battery: "2942 mAh", chip: "A12 Bionic", camera: "12MP", image: img("apple-iphone-xr") },
  { id: "ip8p", brand: "Apple", name: "iPhone 8 Plus 64GB", price: 39000, ram: "3GB", storage: "64GB", display: "5.5\" Retina", battery: "2691 mAh", chip: "A11 Bionic", camera: "12MP + 12MP", image: img("apple-iphone-8-plus") },
  { id: "ip7", brand: "Apple", name: "iPhone 7 32GB", price: 22000, ram: "2GB", storage: "32GB", display: "4.7\" Retina", battery: "1960 mAh", chip: "A10 Fusion", camera: "12MP", image: img("apple-iphone-7") },

  // Samsung
  { id: "a35", brand: "Samsung", name: "Galaxy A35 5G 8/128", price: 89999, ram: "8GB", storage: "128GB", display: "6.6\" Super AMOLED 120Hz", battery: "5000 mAh", chip: "Exynos 1380", camera: "50MP triple", image: img("samsung-galaxy-a35") },
  { id: "a25", brand: "Samsung", name: "Galaxy A25 5G 8/128", price: 74999, ram: "8GB", storage: "128GB", display: "6.5\" Super AMOLED", battery: "5000 mAh", chip: "Exynos 1280", camera: "50MP triple", image: img("samsung-galaxy-a25") },
  { id: "a15", brand: "Samsung", name: "Galaxy A15 4/128", price: 44999, ram: "4GB", storage: "128GB", display: "6.5\" Super AMOLED 90Hz", battery: "5000 mAh", chip: "Helio G99", camera: "50MP triple", image: img("samsung-galaxy-a15") },
  { id: "a05s", brand: "Samsung", name: "Galaxy A05s 4/64", price: 32999, ram: "4GB", storage: "64GB", display: "6.7\" 90Hz", battery: "5000 mAh", chip: "Snapdragon 680", camera: "50MP triple", image: img("samsung-galaxy-a05s") },
  { id: "a05", brand: "Samsung", name: "Galaxy A05 4/64", price: 27999, ram: "4GB", storage: "64GB", display: "6.7\" HD+", battery: "5000 mAh", chip: "Helio G85", camera: "50MP dual", image: img("samsung-galaxy-a05") },
  { id: "m14", brand: "Samsung", name: "Galaxy M14 4/128", price: 39999, ram: "4GB", storage: "128GB", display: "6.6\" FHD+ 90Hz", battery: "6000 mAh", chip: "Helio G99", camera: "50MP triple", image: img("samsung-galaxy-m14") },

  // Xiaomi / Redmi
  { id: "note13pro", brand: "Xiaomi", name: "Redmi Note 13 Pro 8/256", price: 74999, ram: "8GB", storage: "256GB", display: "6.67\" AMOLED 120Hz", battery: "5100 mAh", chip: "Helio G99 Ultra", camera: "200MP triple", image: img("xiaomi-redmi-note-13-pro") },
  { id: "note13", brand: "Xiaomi", name: "Redmi Note 13 8/256", price: 57999, ram: "8GB", storage: "256GB", display: "6.67\" AMOLED", battery: "5000 mAh", chip: "Snapdragon 685", camera: "108MP triple", image: img("xiaomi-redmi-note-13") },
  { id: "redmi12", brand: "Xiaomi", name: "Redmi 12 4/128", price: 38999, ram: "4GB", storage: "128GB", display: "6.79\" FHD+ 90Hz", battery: "5000 mAh", chip: "Helio G88", camera: "50MP triple", image: img("xiaomi-redmi-12") },
  { id: "redmi13c", brand: "Xiaomi", name: "Redmi 13C 4/128", price: 32999, ram: "4GB", storage: "128GB", display: "6.74\" HD+ 90Hz", battery: "5000 mAh", chip: "Helio G85", camera: "50MP triple", image: img("xiaomi-redmi-13c") },
  { id: "redmia3", brand: "Xiaomi", name: "Redmi A3 3/64", price: 22999, ram: "3GB", storage: "64GB", display: "6.71\" 90Hz", battery: "5000 mAh", chip: "Helio G36", camera: "8MP dual", image: img("xiaomi-redmi-a3") },

  // Infinix
  { id: "hot40pro", brand: "Infinix", name: "Hot 40 Pro 8/256", price: 44999, ram: "8GB", storage: "256GB", display: "6.78\" FHD+ 120Hz", battery: "5000 mAh", chip: "Helio G99", camera: "108MP triple", image: img("infinix-hot-40-pro") },
  { id: "hot40i", brand: "Infinix", name: "Hot 40i 8/128", price: 32999, ram: "8GB", storage: "128GB", display: "6.6\" 90Hz", battery: "5000 mAh", chip: "Unisoc T606", camera: "50MP dual", image: img("infinix-hot-40i") },
  { id: "smart8pro", brand: "Infinix", name: "Smart 8 Pro 4/128", price: 26999, ram: "4GB", storage: "128GB", display: "6.6\" 90Hz", battery: "5000 mAh", chip: "Unisoc T606", camera: "50MP dual", image: img("infinix-smart-8-pro") },
  { id: "smart8", brand: "Infinix", name: "Smart 8 3/64", price: 19999, ram: "3GB", storage: "64GB", display: "6.6\" 90Hz", battery: "5000 mAh", chip: "Unisoc T606", camera: "13MP", image: img("infinix-smart-8") },

  // Oppo
  { id: "a78", brand: "Oppo", name: "Oppo A78 8/128", price: 54999, ram: "8GB", storage: "128GB", display: "6.43\" AMOLED 90Hz", battery: "5000 mAh", chip: "Snapdragon 680", camera: "50MP dual", image: img("oppo-a78") },
  { id: "a58", brand: "Oppo", name: "Oppo A58 6/128", price: 42999, ram: "6GB", storage: "128GB", display: "6.72\" FHD+ 90Hz", battery: "5000 mAh", chip: "Helio G85", camera: "50MP dual", image: img("oppo-a58") },
  { id: "a18", brand: "Oppo", name: "Oppo A18 4/128", price: 34999, ram: "4GB", storage: "128GB", display: "6.56\" HD+ 90Hz", battery: "5000 mAh", chip: "Helio G85", camera: "8MP dual", image: img("oppo-a18") },

  // Vivo
  { id: "y28", brand: "Vivo", name: "Vivo Y28 8/128", price: 49999, ram: "8GB", storage: "128GB", display: "6.68\" FHD+ 90Hz", battery: "6000 mAh", chip: "Helio G85", camera: "50MP dual", image: img("vivo-y28") },
  { id: "y18", brand: "Vivo", name: "Vivo Y18 4/128", price: 33999, ram: "4GB", storage: "128GB", display: "6.56\" 90Hz", battery: "5000 mAh", chip: "Helio G85", camera: "50MP dual", image: img("vivo-y18") },
  { id: "y03", brand: "Vivo", name: "Vivo Y03 4/64", price: 24999, ram: "4GB", storage: "64GB", display: "6.56\" HD+", battery: "5000 mAh", chip: "Helio G85", camera: "13MP", image: img("vivo-y03") },

  // Tecno
  { id: "spark20pro", brand: "Tecno", name: "Spark 20 Pro 8/256", price: 49999, ram: "8GB", storage: "256GB", display: "6.78\" FHD+ 120Hz", battery: "5000 mAh", chip: "Helio G99", camera: "108MP dual", image: img("tecno-spark-20-pro") },
  { id: "spark20", brand: "Tecno", name: "Spark 20 8/128", price: 34999, ram: "8GB", storage: "128GB", display: "6.6\" 90Hz", battery: "5000 mAh", chip: "Helio G85", camera: "50MP dual", image: img("tecno-spark-20") },
  { id: "camon20", brand: "Tecno", name: "Camon 20 8/256", price: 59999, ram: "8GB", storage: "256GB", display: "6.67\" AMOLED", battery: "5000 mAh", chip: "Helio G85", camera: "64MP triple", image: img("tecno-camon-20") },

  // Realme
  { id: "c67", brand: "Realme", name: "Realme C67 8/256", price: 54999, ram: "8GB", storage: "256GB", display: "6.72\" FHD+ 90Hz", battery: "5000 mAh", chip: "Snapdragon 685", camera: "108MP dual", image: img("realme-c67") },
  { id: "c53", brand: "Realme", name: "Realme C53 6/128", price: 37999, ram: "6GB", storage: "128GB", display: "6.74\" 90Hz", battery: "5000 mAh", chip: "Unisoc T612", camera: "50MP dual", image: img("realme-c53") },
  { id: "note50", brand: "Realme", name: "Realme Note 50 4/128", price: 28999, ram: "4GB", storage: "128GB", display: "6.74\" 90Hz", battery: "5000 mAh", chip: "Unisoc T612", camera: "13MP dual", image: img("realme-note-50") },

  // Honor
  { id: "honorx6b", brand: "Honor", name: "Honor X6b 6/128", price: 32999, ram: "6GB", storage: "128GB", display: "6.56\" 90Hz", battery: "5200 mAh", chip: "Helio G36", camera: "50MP dual", image: img("honor-x6b") },
  { id: "honorx5plus", brand: "Honor", name: "Honor X5 Plus 4/64", price: 24999, ram: "4GB", storage: "64GB", display: "6.56\" HD+", battery: "5000 mAh", chip: "Unisoc T606", camera: "13MP dual", image: img("honor-x5-plus") },

  // Budget bracket (Rs. 10,000 – 20,000)
  { id: "itela70", brand: "itel", name: "itel A70 4/128", price: 19999, ram: "4GB", storage: "128GB", display: "6.6\" 90Hz", battery: "5000 mAh", chip: "Unisoc T603", camera: "13MP", image: img("itel-a70") },
  { id: "itelvision3", brand: "itel", name: "itel Vision 3 3/64", price: 16999, ram: "3GB", storage: "64GB", display: "6.6\" HD+", battery: "5000 mAh", chip: "Unisoc SC9863A", camera: "8MP dual", image: img("itel-vision-3") },
  { id: "itela50", brand: "itel", name: "itel A50 2/64", price: 13499, ram: "2GB", storage: "64GB", display: "6.6\" HD+", battery: "5000 mAh", chip: "Unisoc T603", camera: "8MP", image: img("itel-a50") },
  { id: "itela25", brand: "itel", name: "itel A25 2/32", price: 10499, ram: "2GB", storage: "32GB", display: "5.0\" HD", battery: "3020 mAh", chip: "Spreadtrum SC9832E", camera: "5MP", image: img("itel-a25") },
  { id: "tecnopop8", brand: "Tecno", name: "Tecno POP 8 3/64", price: 18999, ram: "3GB", storage: "64GB", display: "6.6\" 90Hz", battery: "5000 mAh", chip: "Unisoc T606", camera: "8MP dual", image: img("tecno-pop-8") },
  { id: "sparkgo24", brand: "Tecno", name: "Spark Go 2024 3/64", price: 17999, ram: "3GB", storage: "64GB", display: "6.6\" 90Hz", battery: "5000 mAh", chip: "Unisoc T606", camera: "13MP dual", image: img("tecno-spark-go-2024") },
  { id: "infhot30i", brand: "Infinix", name: "Infinix Hot 30i 4/128", price: 27999, ram: "4GB", storage: "128GB", display: "6.56\" 90Hz", battery: "5000 mAh", chip: "Helio G37", camera: "13MP dual", image: img("infinix-hot-30i") },
  { id: "infsmart7", brand: "Infinix", name: "Infinix Smart 7 HD 2/64", price: 17999, ram: "2GB", storage: "64GB", display: "6.6\" HD+", battery: "5000 mAh", chip: "Unisoc SC9863A1", camera: "8MP", image: img("infinix-smart-7-hd") },
  { id: "vivoy02t", brand: "Vivo", name: "Vivo Y02t 4/64", price: 22999, ram: "4GB", storage: "64GB", display: "6.51\" HD+", battery: "5000 mAh", chip: "Helio P35", camera: "8MP", image: img("vivo-y02t") },
  { id: "vivoy02", brand: "Vivo", name: "Vivo Y02 3/32", price: 18499, ram: "3GB", storage: "32GB", display: "6.51\" HD+", battery: "5000 mAh", chip: "Helio P22", camera: "8MP", image: img("vivo-y02") },
  { id: "realmec30s", brand: "Realme", name: "Realme C30s 2/32", price: 16999, ram: "2GB", storage: "32GB", display: "6.5\" HD+", battery: "5000 mAh", chip: "Unisoc SC9863A1", camera: "8MP", image: img("realme-c30s") },
  { id: "redmia2", brand: "Xiaomi", name: "Redmi A2 2/32", price: 17499, ram: "2GB", storage: "32GB", display: "6.52\" HD+", battery: "5000 mAh", chip: "Helio G36", camera: "8MP dual", image: img("xiaomi-redmi-a2") },
  { id: "redmi9a", brand: "Xiaomi", name: "Redmi 9A 2/32", price: 15999, ram: "2GB", storage: "32GB", display: "6.53\" HD+", battery: "5000 mAh", chip: "Helio G25", camera: "13MP", image: img("xiaomi-redmi-9a") },
  { id: "nokiac22", brand: "Nokia", name: "Nokia C22 3/64", price: 22999, ram: "3GB", storage: "64GB", display: "6.52\" HD+", battery: "5000 mAh", chip: "Unisoc T606", camera: "13MP dual", image: img("nokia-c22") },
  { id: "nokiac12", brand: "Nokia", name: "Nokia C12 2/64", price: 17999, ram: "2GB", storage: "64GB", display: "6.3\" HD+", battery: "3000 mAh", chip: "Unisoc SC9863A1", camera: "8MP", image: img("nokia-c12") },
  { id: "samsa04e", brand: "Samsung", name: "Galaxy A04e 3/32", price: 24999, ram: "3GB", storage: "32GB", display: "6.5\" HD+", battery: "5000 mAh", chip: "Helio P35", camera: "13MP dual", image: img("samsung-galaxy-a04e") },
];

const BRANDS = ["All", "Apple", "Samsung", "Xiaomi", "Infinix", "Oppo", "Vivo", "Tecno", "Realme", "Honor", "Nokia", "itel"];

const SERVICES = [
  { icon: Wrench, title: "Screen Replacement", desc: "Original LCD & OLED panels with 30-day warranty.", price: "From Rs. 3,500" },
  { icon: ShieldCheck, title: "Battery Replacement", desc: "100% health original batteries for all brands.", price: "From Rs. 2,200" },
  { icon: Phone, title: "Software & IMEI Repair", desc: "Flashing, unlocking, iCloud & FRP solutions.", price: "From Rs. 1,500" },
  { icon: Wrench, title: "Board & Charging Repair", desc: "Micro-soldering, charging port & camera repair.", price: "From Rs. 1,800" },
];

type Accessory = { id: string; name: string; category: string; price: string; desc: string; emoji: string };

const ACCESSORIES: Accessory[] = [
  { id: "handsfree",   emoji: "🎧", category: "Audio",     name: "Original Handsfree",           price: "Rs. 350 – 2,500",  desc: "Samsung, Oppo, Vivo, iPhone type-C & 3.5mm — original & A-grade options." },
  { id: "airpods",     emoji: "🎧", category: "Audio",     name: "Bluetooth Earbuds / AirPods",   price: "Rs. 1,200 – 8,500", desc: "TWS earbuds, AirPods Pro copy & original — with warranty." },
  { id: "neckband",    emoji: "🎧", category: "Audio",     name: "Bluetooth Neckband",            price: "Rs. 900 – 3,500",  desc: "JBL, Realme, Oraimo — long battery, HD mic." },
  { id: "speaker",     emoji: "🔊", category: "Audio",     name: "Bluetooth Speaker",             price: "Rs. 1,500 – 9,000", desc: "JBL, Anker, Boat — bass-boost portable speakers." },

  { id: "charger",     emoji: "🔌", category: "Charging",  name: "Original Charger (Fast)",       price: "Rs. 600 – 4,500",  desc: "Samsung 25W, Oppo VOOC, iPhone 20W PD, Xiaomi 33W & more." },
  { id: "cable",       emoji: "🔗", category: "Charging",  name: "Data / Charging Cable",         price: "Rs. 150 – 1,200",  desc: "Type-C, Micro-USB, iPhone Lightning — fast-charge braided cables." },
  { id: "powerbank",   emoji: "🔋", category: "Charging",  name: "Power Bank 10,000 – 20,000 mAh", price: "Rs. 1,800 – 6,500", desc: "Anker, Baseus, Romoss — PD fast charging." },
  { id: "carcharge",   emoji: "🚗", category: "Charging",  name: "Car Charger",                   price: "Rs. 400 – 1,800",  desc: "Dual USB, Type-C PD & QC 3.0 car chargers." },
  { id: "wireless",    emoji: "⚡", category: "Charging",  name: "Wireless Charger 15W",          price: "Rs. 1,500 – 3,500", desc: "Qi wireless pads for iPhone & Android." },

  { id: "memory",      emoji: "💾", category: "Storage",   name: "Memory Card (SanDisk)",         price: "Rs. 450 – 3,500",  desc: "16GB, 32GB, 64GB, 128GB, 256GB Class-10 & Ultra." },
  { id: "usb",         emoji: "💽", category: "Storage",   name: "USB Flash Drive",               price: "Rs. 500 – 2,800",  desc: "SanDisk, HP 16GB–128GB, USB 2.0 & 3.0." },
  { id: "otg",         emoji: "🔌", category: "Storage",   name: "OTG / Card Reader",             price: "Rs. 200 – 900",    desc: "Type-C OTG, all-in-one SD + micro-SD card readers." },

  { id: "cover",       emoji: "📱", category: "Protection", name: "Back Cover / Case",            price: "Rs. 250 – 2,500",  desc: "Silicone, hard-shell, magnetic & branded cases for every model." },
  { id: "glass",       emoji: "🛡️", category: "Protection", name: "Tempered Glass Protector",     price: "Rs. 200 – 1,500",  desc: "9H, full-glue, matte, privacy & ceramic protectors — free installation." },
  { id: "pouch",       emoji: "👜", category: "Protection", name: "Leather Wallet Pouch",         price: "Rs. 400 – 1,800",  desc: "Universal & model-fit leather pouches with card slots." },

  { id: "holder",      emoji: "🚙", category: "Mounts",     name: "Mobile Car Holder",             price: "Rs. 500 – 2,000",  desc: "Dashboard, AC-vent & magnetic phone holders." },
  { id: "selfie",      emoji: "🤳", category: "Mounts",     name: "Selfie Stick / Tripod",         price: "Rs. 700 – 3,500",  desc: "Bluetooth tripod with remote, ring-light tripod." },
  { id: "ringlight",   emoji: "💡", category: "Mounts",     name: "Ring Light 10\"–18\"",           price: "Rs. 1,800 – 6,500", desc: "For TikTok, YouTube & video calls." },

  { id: "smartwatch",  emoji: "⌚", category: "Wearables",  name: "Smart Watch",                   price: "Rs. 2,500 – 12,000", desc: "T500, HW68, Ultra series, Amazfit — call & fitness watches." },
  { id: "band",        emoji: "📿", category: "Wearables",  name: "Fitness Band",                  price: "Rs. 1,200 – 5,000",  desc: "Mi Band, Realme Band — heart-rate & step tracking." },

  { id: "simadapter",  emoji: "📶", category: "Extras",     name: "SIM Ejector + Adapter Kit",     price: "Rs. 100 – 400",    desc: "Nano / Micro / Standard sim adapters & ejector pins." },
  { id: "cleaning",    emoji: "🧴", category: "Extras",     name: "Screen Cleaning Kit",           price: "Rs. 250 – 800",    desc: "Alcohol spray + microfiber cloth for phones & tablets." },
  { id: "stylus",      emoji: "✏️", category: "Extras",     name: "Universal Stylus Pen",          price: "Rs. 400 – 1,500",  desc: "Capacitive stylus for iPad, tablets & smartphones." },
];

const WHATSAPP_NUMBER = "923265235786";
const DISPLAY_NUMBER = "0326-5235786";

const fmt = (n: number) => "Rs. " + n.toLocaleString("en-PK");

function Home() {
  const [brand, setBrand] = useState("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"popular" | "low" | "high">("popular");
  const [menuOpen, setMenuOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = PHONES.filter((p) => p.price <= 100000);
    if (brand !== "All") list = list.filter((p) => p.brand === brand);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter((p) => (p.name + " " + p.brand).toLowerCase().includes(s));
    }
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [brand, q, sort]);

  const whatsapp = (msg: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* INTRO SPLASH — plays once per page load */}
      <div className="intro-splash" aria-hidden="true">
        <div className="intro-splash__ring" />
        <div className="intro-splash__inner">
          <img src={logo} alt="" className="intro-splash__logo" />
          <div className="intro-splash__name">Noon Mobile</div>
          <div className="intro-splash__line" />
          <div className="intro-splash__sub">&amp; Repairing Shop</div>
        </div>
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        {/* Top utility strip */}
        <div className="hidden border-b border-border/60 bg-secondary/60 text-[11px] text-muted-foreground md:block">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                <span className="font-semibold uppercase tracking-widest text-foreground">Shop Open</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3 w-3" /> Khaliqabad, Jauharabad, Khushab
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3 w-3" /> Mon–Sat: 10 AM – 10 PM
              </span>
              <a href={`tel:+${WHATSAPP_NUMBER}`} className="inline-flex items-center gap-1.5 font-semibold text-foreground hover:text-primary">
                <Phone className="h-3 w-3" /> {DISPLAY_NUMBER}
              </a>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-3 sm:gap-4">
            <div className="relative shrink-0">
              <img
                src={logo}
                alt="Noon Mobile logo"
                width={48}
                height={48}
                className="h-11 w-11 rounded-full border border-border bg-white object-contain shadow-sm sm:h-12 sm:w-12"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
            </div>
            <div className="flex flex-col">
              <h1
                className="text-xl font-bold uppercase italic leading-none tracking-tighter text-foreground sm:text-2xl"
                style={{ fontFamily: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif" }}
              >
                Noon Mobile
              </h1>
              <span
                className="mt-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-muted-foreground sm:text-[10px]"
                style={{ fontFamily: "'Roboto Mono', ui-monospace, monospace" }}
              >
                &amp; Repairing Shop
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 rounded-full border border-border bg-secondary/40 px-2 py-1 lg:flex">
            {[
              { href: "#phones", label: "Phones" },
              { href: "#accessories", label: "Accessories" },
              { href: "#services", label: "Repair" },
              { href: "#about", label: "About" },
              { href: "#visit", label: "Visit" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition hover:bg-background hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <a
              href={whatsapp("Assalam o Alaikum, I want to inquire about a phone.")}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm transition hover:opacity-90 sm:px-4 sm:text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden xs:inline sm:inline">WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition hover:bg-secondary lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-border bg-background lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col divide-y divide-border px-2 sm:px-4">
              {[
                { href: "#phones", label: "Phones" },
                { href: "#services", label: "Repair" },
                { href: "#about", label: "About" },
                { href: "#visit", label: "Visit" },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-3 text-sm font-semibold uppercase tracking-widest text-foreground transition hover:text-primary"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="flex items-center gap-2 px-3 py-3 text-sm font-semibold text-muted-foreground"
              >
                <Phone className="h-4 w-4" /> {DISPLAY_NUMBER}
              </a>
            </nav>
          </div>
        )}
      </header>


      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `linear-gradient(180deg, oklch(0.08 0 0 / 0.88), oklch(0.14 0 0 / 0.7)), url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 text-primary-foreground sm:px-6 sm:pt-24 lg:pb-28 lg:pt-32">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-5 py-2 text-sm font-extrabold uppercase tracking-wider text-black shadow-lg sm:text-base">
              <Star className="h-4 w-4 fill-black text-black" /> Trusted in Khushab since 2024
            </span>
            <h1 className="mt-5 font-display text-4xl font-black leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              Original smartphones.<br />
              <span className="inline-block rounded-md bg-white px-3 py-1 font-black text-black shadow-lg">Honest prices.</span> Master repairs.
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/80 sm:text-lg">
              Budget se le kar mid-range tak — har phone 100% genuine, tested aur warranty ke sath.
              Repairs owner <strong className="text-white">Muhammad Imran</strong> khud handle karte hain.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#phones" className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-lg transition hover:brightness-105">
                Browse Phones
              </a>
              <a href="#services" className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
                Repair Services
              </a>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 text-white">
              <div><dt className="text-xs uppercase tracking-wider text-white/60">Phones sold</dt><dd className="mt-1 font-display text-2xl font-bold">12,400+</dd></div>
              <div><dt className="text-xs uppercase tracking-wider text-white/60">Repairs done</dt><dd className="mt-1 font-display text-2xl font-bold">8,600+</dd></div>
              <div><dt className="text-xs uppercase tracking-wider text-white/60">Google rating</dt><dd className="mt-1 font-display text-2xl font-bold">4.9 ★</dd></div>
            </dl>
          </div>
        </div>
      </section>

      {/* BRAND STRIP */}
      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-5 text-sm font-semibold uppercase tracking-widest text-muted-foreground sm:px-6">
          {["Apple", "Samsung", "Xiaomi", "Infinix", "Oppo", "Vivo", "Tecno", "Realme", "Honor", "Nokia", "itel"].map((b) => (
            <span key={b} className="opacity-70 transition hover:opacity-100 hover:text-primary">{b}</span>
          ))}
        </div>
      </section>

      {/* PHONES */}
      <section id="phones" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Available now</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Original mobiles in stock</h2>
            <p className="mt-3 text-muted-foreground">
              {filtered.length} models — budget se mid-range tak, sab 1 lakh se kam. Shop par tashreef laayein ya WhatsApp par order karein.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search model…"
                className="w-56 rounded-full border border-input bg-card py-2 pl-9 pr-4 text-sm outline-none ring-ring focus:ring-2"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "popular" | "low" | "high")}
              className="rounded-full border border-input bg-card px-4 py-2 text-sm outline-none ring-ring focus:ring-2"
            >
              <option value="popular">Sort: Popular</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* Brand tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {BRANDS.map((b) => (
            <button
              key={b}
              onClick={() => setBrand(b)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                brand === b
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/40"
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="relative flex h-52 items-center justify-center bg-gradient-to-br from-secondary/60 to-background p-4">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain drop-shadow-md transition group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <span className="absolute left-3 top-3 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-secondary-foreground">In Stock</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">{p.brand}</span>
                <h3 className="mt-1 font-display text-lg font-bold leading-tight">{p.name}</h3>

                <ul className="mt-3 grid grid-cols-2 gap-y-1.5 text-xs text-muted-foreground">
                  <li><span className="text-foreground/80">Chip:</span> {p.chip}</li>
                  <li><span className="text-foreground/80">RAM:</span> {p.ram}</li>
                  <li className="col-span-2"><span className="text-foreground/80">Display:</span> {p.display}</li>
                  <li><span className="text-foreground/80">Battery:</span> {p.battery}</li>
                  <li><span className="text-foreground/80">Storage:</span> {p.storage}</li>
                  <li className="col-span-2"><span className="text-foreground/80">Camera:</span> {p.camera}</li>
                </ul>

                <div className="mt-auto flex items-end justify-between border-t border-border pt-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Cash Price</div>
                    <div className="font-display text-xl font-bold text-primary">{fmt(p.price)}</div>
                  </div>
                  <a
                    href={whatsapp(`Assalam o Alaikum, I want to order ${p.name} (${fmt(p.price)}). Please confirm availability.`)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
                   target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-3.5 w-3.5" /> Order
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">No models match your filters. Try another brand.</p>
        )}

        {/* Buy / Sell CTA */}
        <div className="mt-14 rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-gold/5 to-transparent p-8 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="font-display text-2xl font-bold sm:text-3xl">Phone kharidna ya bechna hai?</h3>
              <p className="mt-2 text-muted-foreground">
                Best rate ke liye seedha WhatsApp par contact karein — <strong className="text-foreground">{DISPLAY_NUMBER}</strong>.
                Used phone ki fair valuation shop par mint mein.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={whatsapp("Assalam o Alaikum, I want to BUY a phone. Please guide me.")} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow transition hover:opacity-90" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" /> Buy a Phone
              </a>
              <a href={whatsapp("Assalam o Alaikum, I want to SELL my phone. Please give me a quote.")} className="inline-flex items-center gap-2 rounded-full border border-primary bg-background px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary/5" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" /> Sell Your Phone
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ACCESSORIES */}
      <section id="accessories" className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">Mobile Accessories</p>
              <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Har accessory — aik hi shop par</h2>
              <p className="mt-3 text-muted-foreground">
                Original handsfree, chargers, cables, memory cards, USB, covers, smart watches — sab kuch available. Retail &amp; wholesale rates ke liye WhatsApp par contact karein.
              </p>
            </div>
            <a
              href={whatsapp("Assalam o Alaikum, mujhe accessories ki price list chahiye.")}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow transition hover:opacity-90"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" /> Get full price list
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ACCESSORIES.map((a) => (
              <article
                key={a.id}
                className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-2xl">{a.emoji}</span>
                  <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {a.category}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-base font-bold leading-tight">{a.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{a.desc}</p>
                <div className="mt-4 flex items-end justify-between border-t border-border pt-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Price range</div>
                    <div className="font-display text-base font-bold text-primary">{a.price}</div>
                  </div>
                  <a
                    href={whatsapp(`Assalam o Alaikum, I want to buy ${a.name} (${a.price}). Please share available options.`)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground transition hover:opacity-90"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-3 w-3" /> Order
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            * Prices vary by brand &amp; model. Confirm the exact rate on WhatsApp before visiting the shop.
          </p>
        </div>
      </section>

      {/* REPAIR */}
      <section id="services" className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <div className="relative overflow-hidden rounded-3xl">
            <img src={repairImg} alt="Mobile repair technician at Noon Mobile" width={1408} height={1008} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Repair Workshop</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Board-level repair, done right the first time.</h2>
            <p className="mt-4 text-primary-foreground/80">
              Every repair is handled personally by owner <strong className="text-gold">Muhammad Imran</strong>,
              using original parts and industry-grade equipment. Free diagnostic, transparent quote, warranty on every job.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <div key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <s.icon className="h-6 w-6 text-gold" />
                  <h3 className="mt-3 font-display text-lg font-bold text-white">{s.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{s.desc}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-gold">{s.price}</p>
                </div>
              ))}
            </div>
            <a
              href={whatsapp("I need a repair quote for my phone.")}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-lg transition hover:brightness-105"
             target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" /> Get a repair quote
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">The Owner</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Muhammad Imran — Khushab ki trusted mobile shop.</h2>
            <p className="mt-5 text-muted-foreground">
              Noon Mobile ki bunyaad teen simple usoolon par rakhi gayi hai: <em>kabhi copy phone nahi</em>,
              <em> kabhi zyada price nahi</em>, aur <em>repair hamesha genuine parts ke sath</em>.
            </p>
            <p className="mt-4 text-muted-foreground">
              Har major brand — Apple, Samsung, Xiaomi, Infinix, Oppo, Vivo, Tecno, Realme, Honor aur itel — real market rates par available.
              Buying, selling aur repair — sab kuch aik hi jaga.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-8">
              <div><div className="font-display text-3xl font-bold text-primary">12+</div><div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Years experience</div></div>
              <div><div className="font-display text-3xl font-bold text-primary">100%</div><div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Original stock</div></div>
              <div><div className="font-display text-3xl font-bold text-primary">30-day</div><div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Repair warranty</div></div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-primary/10 via-gold/10 to-transparent blur-2xl" />
            <div className="rounded-3xl border border-border bg-card p-8 shadow-xl">
              <img src={logo} alt="Noon Mobile logo" width={200} height={200} loading="lazy" className="mx-auto h-40 w-40 object-contain" />
              <blockquote className="mt-6 border-l-2 border-gold pl-4 font-display text-lg italic text-foreground">
                "Trust is the only thing you can't repair. We protect it with every phone we sell."
              </blockquote>
              <p className="mt-3 text-sm font-semibold text-muted-foreground">— Muhammad Imran, Founder</p>
            </div>
          </div>
        </div>
      </section>

      {/* VISIT */}
      <section id="visit" className="border-t border-border bg-secondary/50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:py-20">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><MapPin className="h-5 w-5" /></div>
            <div>
              <h3 className="font-display text-lg font-bold">Visit the Shop</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Noon Mobile &amp; Repairing Shop<br />
                Khaliqabad, Jauharabad City<br />
                District Khushab, Punjab
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Phone className="h-5 w-5" /></div>
            <div>
              <h3 className="font-display text-lg font-bold">Call / WhatsApp</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-primary">{DISPLAY_NUMBER}</a><br />
                Muhammad Imran (Owner)<br />
                <span className="text-xs">Buy • Sell • Repair — WhatsApp anytime</span>
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Clock className="h-5 w-5" /></div>
            <div>
              <h3 className="font-display text-lg font-bold">Opening Hours</h3>
              <p className="mt-1 text-sm text-muted-foreground">Mon – Sat: 10:00 AM – 10:00 PM<br />Friday: 2:30 PM – 10:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
            <span>© {new Date().getFullYear()} Noon Mobile &amp; Repairing Shop, Khaliqabad Jauharabad. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="#phones" className="hover:text-primary">Phones</a>
            <a href="#services" className="hover:text-primary">Repair</a>
            <a href="#visit" className="hover:text-primary">Contact</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={whatsapp("Assalam o Alaikum, I need help with a phone (buy / sell / repair).")}
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-105"
       target="_blank" rel="noopener noreferrer">
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
