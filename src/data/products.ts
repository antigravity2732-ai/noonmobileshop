import { Wrench, ShieldCheck, Phone } from "lucide-react";

export type PhoneItem = {
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

export const PHONES: PhoneItem[] = [
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

export const BRANDS = ["All", "Apple", "Samsung", "Xiaomi", "Infinix", "Oppo", "Vivo", "Tecno", "Realme", "Honor", "Nokia", "itel"];

export const SERVICES = [
  { icon: Wrench, title: "Screen Replacement", desc: "Original LCD & OLED panels with 30-day warranty.", price: "From Rs. 3,500" },
  { icon: ShieldCheck, title: "Battery Replacement", desc: "100% health original batteries for all brands.", price: "From Rs. 2,200" },
  { icon: Phone, title: "Software & IMEI Repair", desc: "Flashing, unlocking, iCloud & FRP solutions.", price: "From Rs. 1,500" },
  { icon: Wrench, title: "Board & Charging Repair", desc: "Micro-soldering, charging port & camera repair.", price: "From Rs. 1,800" },
];

export type Accessory = { id: string; name: string; category: string; price: string; desc: string; emoji: string };

export const ACCESSORIES: Accessory[] = [
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

export const WHATSAPP_NUMBER = "923265235786";
export const DISPLAY_NUMBER = "0326-5235786";

export const fmt = (n: number) => "Rs. " + n.toLocaleString("en-PK");
