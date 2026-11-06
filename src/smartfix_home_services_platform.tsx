import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Search, MapPin, Star, CheckCircle2, ChevronRight, ArrowLeft,
  User, Home, Check, Sparkles, Hammer, Zap, Droplets, Paintbrush,
  Video, Wrench, Scissors, Truck, Plus, Minus, X, CreditCard,
  Crosshair
} from 'lucide-react';

// ─── DATA ───────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'cat-paint', name: 'Painting Services', icon: Paintbrush, count: 14, desc: 'Full house, texture, waterproof & touchups', highlight: '60% OFF', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=360&q=80' },
  { id: 'cat-elec', name: 'Electrical Services', icon: Zap, count: 18, desc: 'Repairs, wiring, MCB & switchboards', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=360&q=80' },
  { id: 'cat-ac', name: 'AC Repair & Service', icon: Sparkles, count: 12, desc: 'Jet cleaning, gas refill, installation', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=360&q=80' },
  { id: 'cat-plumb', name: 'Plumbing', icon: Droplets, count: 24, desc: 'Pipe leakages, taps & mixer repairs', image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=360&q=80' },
  { id: 'cat-clean', name: 'Home Cleaning', icon: Sparkles, count: 15, desc: 'Deep house, sofa & bathroom cleaning', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=360&q=80' },
  { id: 'cat-appl', name: 'Appliance Repair', icon: Wrench, count: 32, desc: 'Washing machine, fridge & TV', image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=360&q=80' },
  { id: 'cat-carp', name: 'Carpenter Services', icon: Hammer, count: 16, desc: 'Furniture repairs & door locks', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=360&q=80' },
  { id: 'cat-cctv', name: 'CCTV & Security', icon: Video, count: 8, desc: 'Smart camera installation & WiFi setup', image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=360&q=80' },
  { id: 'cat-beauty', name: 'Beauty & Grooming', icon: Scissors, count: 20, desc: 'Salon at home, haircut & massage', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=360&q=80' },
];

const CATALOG_SERVICES = [
  // PAINTING
  { id: 'srv-paint-1', categoryId: 'cat-paint', categoryName: 'Painting Services', brand: 'SmartFix Pro', name: 'SmartFix Express Home Painting', rating: 4.92, reviewsCount: 3840, price: 3499, originalPrice: 4999, image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80', description: 'Complete home painting with dust-free mechanical sanding and 2-coat luxury emulsion finish.', badge: '60% OFF', included: ['Dust-free automatic vacuum sanding', '2 coats Premium Luxury Emulsion', '1 coat primer & crack filling', 'Floor & furniture mask coverings', 'Free post-service deep floor cleaning'], options: [{ id: 'opt-full', name: 'Full House', desc: '3 rooms, 1 kitchen', icon: '🏡', priceMultiplier: 1.0 }, { id: 'opt-large', name: 'Large House', desc: '4 rooms, 2 kitchens', icon: '🏘️', priceMultiplier: 1.4 }, { id: 'opt-custom', name: 'Custom Space', desc: 'Balcony & garage', icon: '🎨', priceMultiplier: 0.8 }], colorSwatches: ['#6C2D6F', '#4A4E9E', '#0B8A72', '#E74C23'] },
  { id: 'srv-paint-2', categoryId: 'cat-paint', categoryName: 'Painting Services', brand: 'SmartFix Pro', name: 'Waterproofing & Damp Repair', rating: 4.88, reviewsCount: 1420, price: 1899, originalPrice: 2499, image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80', description: 'Dr. Fixit polymer coating, terrace and bathroom leakage sealing with crack-bridging technology.', badge: 'Popular', included: ['Crack opening & chemical filling', 'Triple waterproofing polymer coats', '1-year seepage warranty'], options: [{ id: 'opt-wall', name: 'Single Damp Wall', desc: 'Up to 100 sq.ft', icon: '🧱', priceMultiplier: 1.0 }, { id: 'opt-bath', name: 'Bathroom Grouting', desc: 'Complete perimeter', icon: '🚿', priceMultiplier: 1.3 }], colorSwatches: ['#6C2D6F', '#1E40AF', '#059669'] },
  { id: 'srv-paint-3', categoryId: 'cat-paint', categoryName: 'Painting Services', brand: 'SmartFix Design', name: 'Living Room Feature & Accent Wall', rating: 4.95, reviewsCount: 890, price: 2199, originalPrice: 2999, image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80', description: 'Designer metallic and stencil textures crafted by verified master painters.', badge: 'Trending', included: ['Metallic royal texture design', 'Base smoothing & stencil creation', 'Complete cleanup'], options: [{ id: 'opt-metallic', name: 'Metallic Texture', desc: 'Geometric & swirl', icon: '✨', priceMultiplier: 1.0 }, { id: 'opt-marble', name: 'Stucco Marble', desc: 'Italian high gloss', icon: '🏛️', priceMultiplier: 1.6 }], colorSwatches: ['#6C2D6F', '#D97706', '#0284C7'] },
  // ELECTRICAL
  { id: 'srv-elec-1', categoryId: 'cat-elec', categoryName: 'Electrical Services', brand: 'SmartFix Pro', name: 'Ceiling Fan Installation & Repair', rating: 4.91, reviewsCount: 3120, price: 199, originalPrice: 299, image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80', description: 'Ceiling fan assembly, wobbling fix, capacitor replacement and down-rod installation.', badge: 'Quick Fix', included: ['Assembly and balance check', 'Capacitor/regulator testing', 'Safety hook fastening'], options: [{ id: 'efan-1', name: 'Single Fan', desc: '1 unit install/fix', icon: '🌀', priceMultiplier: 1.0 }, { id: 'efan-multi', name: 'Up to 3 Fans', desc: 'Multi-room package', icon: '⚡', priceMultiplier: 2.2 }], colorSwatches: ['#6C2D6F', '#1E40AF', '#059669'] },
  { id: 'srv-elec-2', categoryId: 'cat-elec', categoryName: 'Electrical Services', brand: 'SmartFix Pro', name: 'Switchboard Repair & Socket Installation', rating: 4.89, reviewsCount: 2210, price: 249, originalPrice: 399, image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80', description: 'Fix sparking switches, loose internal wiring, smart switch panels & AC heavy-load points.', badge: 'Essential', included: ['Voltage & earth leakage check', 'Modular switch replacement', 'Load balance testing'], options: [{ id: 'esw-1', name: '1-2 Switchboards', desc: 'Standard repair', icon: '🔌', priceMultiplier: 1.0 }, { id: 'esw-heavy', name: 'Heavy Load Point', desc: 'Geyser / AC point', icon: '⚡', priceMultiplier: 1.4 }], colorSwatches: ['#6C2D6F', '#0284C7'] },
  { id: 'srv-elec-3', categoryId: 'cat-elec', categoryName: 'Electrical Services', brand: 'SmartFix Pro', name: 'MCB & Main Fuse Box Replacement', rating: 4.94, reviewsCount: 1670, price: 499, originalPrice: 799, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80', description: 'Prevent frequent tripping, short circuits and upgrade distribution board with RCBO.', badge: 'Safety First', included: ['Phase load balancing', 'Single/Double pole MCB install', 'Earth grounding check'], options: [{ id: 'emcb-single', name: 'Single Pole MCB', desc: 'Individual circuit fix', icon: '🛡️', priceMultiplier: 1.0 }, { id: 'emcb-main', name: 'Main DB Upgrade', desc: 'Complete DB upgrade', icon: '⚡', priceMultiplier: 2.1 }], colorSwatches: ['#6C2D6F', '#DC2626'] },
  // AC
  { id: 'srv-ac-1', categoryId: 'cat-ac', categoryName: 'AC Repair & Service', brand: 'SmartJet Pro', name: 'Power Jet Deep AC Cleaning & Gas Check', rating: 4.88, reviewsCount: 4210, price: 499, originalPrice: 699, image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80', description: 'High-pressure 2x coil jet cleaning with zero mess anti-spill jacket.', badge: 'Best Seller', included: ['Indoor unit jet wash with anti-fungal rinse', 'Outdoor condenser power wash', 'Drain tray & pipe unclogging', 'Diagnostic gas pressure check'], options: [{ id: 'ac-split', name: 'Split AC (1-2 Ton)', desc: 'Indoor & outdoor', icon: '❄️', priceMultiplier: 1.0 }, { id: 'ac-window', name: 'Window AC', desc: 'Full extraction', icon: '🧊', priceMultiplier: 0.9 }, { id: 'ac-multi', name: '2x Split Units', desc: 'Two units combo', icon: '✨', priceMultiplier: 1.8 }], colorSwatches: ['#6C2D6F', '#2B6CB0', '#2C7A7B'] },
  { id: 'srv-ac-2', categoryId: 'cat-ac', categoryName: 'AC Repair & Service', brand: 'SmartJet Pro', name: 'AC Gas Leak Detection & Top-up', rating: 4.86, reviewsCount: 1980, price: 1499, originalPrice: 2199, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80', description: 'Nitrogen leak testing, brazing copper pipe joints, vacuum purging and R32/R410A gas refill.', badge: '30-Day Guarantee', included: ['Pressure gauge check', 'Soap & electronic leak test', 'Optimal refrigerant recharge'], options: [{ id: 'acgas-top', name: 'Gas Top-Up', desc: 'Minor cooling drop', icon: '💨', priceMultiplier: 1.0 }, { id: 'acgas-full', name: 'Full Vacuum & Refill', desc: 'Zero cooling fix', icon: '❄️', priceMultiplier: 1.5 }], colorSwatches: ['#6C2D6F', '#0284C7'] },
  // PLUMBING
  { id: 'srv-plumb-1', categoryId: 'cat-plumb', categoryName: 'Plumbing Service', brand: 'AquaFix', name: 'Kitchen & Washroom Plumbing Fix', rating: 4.87, reviewsCount: 2410, price: 249, originalPrice: 499, image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80', description: 'Fix leakages, pipe joints, flush cisterns, taps, sanitary fixtures, and motor connections.', badge: '40% OFF', included: ['High pressure leak detection', 'Sealant & washer replacement', 'Drainage blockage unclogging', '30-day drip-free guarantee'], options: [{ id: 'pl-tap', name: 'Single Leak / Tap', desc: 'Sink or basin fix', icon: '🚰', priceMultiplier: 1.0 }, { id: 'pl-bath', name: 'Full Bathroom', desc: 'All fixtures + shower', icon: '🚿', priceMultiplier: 1.6 }, { id: 'pl-pipe', name: 'Main Pipe Line', desc: 'Under-sink / terrace', icon: '🔧', priceMultiplier: 1.9 }], colorSwatches: ['#EA580C', '#0B8A72', '#6C2D6F'] },
  { id: 'srv-plumb-2', categoryId: 'cat-plumb', categoryName: 'Plumbing Service', brand: 'AquaFix', name: 'Blocked Drain & Sink Unclogging', rating: 4.9, reviewsCount: 1840, price: 349, originalPrice: 599, image: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=600&q=80', description: 'High-torque motorized drain auger to clear stubborn food grease, hair, and slime blocks.', badge: 'Instant Relief', included: ['Motorized snake cable clearing', 'P-trap disassembly and flush', 'Eco chemical deodorizer wash'], options: [{ id: 'plumb-sink', name: 'Kitchen Sink Drain', desc: 'Grease and food block', icon: '🍽️', priceMultiplier: 1.0 }, { id: 'plumb-main', name: 'Main Sewer Line', desc: 'Multi-drain backup', icon: '🛠️', priceMultiplier: 1.7 }], colorSwatches: ['#EA580C', '#6C2D6F'] },
  // CLEANING
  { id: 'srv-clean-1', categoryId: 'cat-clean', categoryName: 'Home Cleaning', brand: 'SmartClean Pro', name: 'Full Home Deep Cleaning', rating: 4.93, reviewsCount: 3510, price: 2499, originalPrice: 3899, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80', description: 'Intense kitchen degreasing, bathroom descaling, balcony wash, and floor buffing.', badge: 'Sparkle Clean', included: ['Kitchen chimney and tile degreasing', 'Bathroom hard-water stain removal', 'Mattress and sofa dry vacuuming', 'Balcony and window track jet wash'], options: [{ id: 'clean-1bhk', name: '1 BHK', desc: 'Compact deep clean', icon: '🏠', priceMultiplier: 0.8 }, { id: 'clean-2bhk', name: '2 BHK', desc: 'Standard full clean', icon: '🏡', priceMultiplier: 1.0 }, { id: 'clean-3bhk', name: '3 BHK', desc: 'Large residence', icon: '🏘️', priceMultiplier: 1.35 }], colorSwatches: ['#6C2D6F', '#059669', '#0284C7'] },
  // APPLIANCE
  { id: 'srv-appl-1', categoryId: 'cat-appl', categoryName: 'Appliance Repair', brand: 'SmartFix Pro', name: 'Home Appliance Inspection & Repair', rating: 4.91, reviewsCount: 2980, price: 299, originalPrice: 599, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80', description: 'Expert repair for washing machines, refrigerators, microwaves, and home electrical appliances.', badge: '50% OFF', included: ['24-point circuit & motor diagnostic', 'Genuine spare parts 90-day warranty', 'Electrical safety insulation check', 'Zero post-repair cleanup'], options: [{ id: 'appl-wm', name: 'Washing Machine', desc: 'Drum & drainage fix', icon: '🧺', priceMultiplier: 1.0 }, { id: 'appl-ref', name: 'Refrigerator', desc: 'Cooling & thermostat', icon: '❄️', priceMultiplier: 1.2 }, { id: 'appl-mw', name: 'Microwave / Oven', desc: 'Heating coil repair', icon: '⚡', priceMultiplier: 0.85 }], colorSwatches: ['#1E40AF', '#0F766E', '#6C2D6F'] },
  // CARPENTER
  { id: 'srv-carp-1', categoryId: 'cat-carp', categoryName: 'Carpenter Services', brand: 'SmartWood Pro', name: 'Door Lock, Hinge & Handle Repair', rating: 4.89, reviewsCount: 1650, price: 299, originalPrice: 449, image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80', description: 'Fix sticking doors, misaligned latches, install mortise locks, hydraulic door closers and peep holes.', badge: 'Precision Fix', included: ['Chiseling & wood alignment', 'Lock and cylinder fitting', 'Hinge lubrication and tightening'], options: [{ id: 'carp-door', name: '1 Door Alignment', desc: 'Latch & hinge repair', icon: '🚪', priceMultiplier: 1.0 }, { id: 'carp-lock', name: 'Main Door Lock', desc: 'Heavy duty mortise', icon: '🔐', priceMultiplier: 1.5 }], colorSwatches: ['#6C2D6F', '#B45309'] },
  // CCTV
  { id: 'srv-cctv-1', categoryId: 'cat-cctv', categoryName: 'CCTV & Security', brand: 'SecureFix', name: 'Smart WiFi CCTV Camera Setup', rating: 4.94, reviewsCount: 1120, price: 399, originalPrice: 699, image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80', description: 'Mount indoor/outdoor dome cameras, connect to mobile app, configure motion sensors & cloud backup.', badge: 'High Tech', included: ['Drilling and wall mounting', 'WiFi pairing and mobile live view test', 'Night vision calibration'], options: [{ id: 'cctv-1', name: '1 Camera Setup', desc: 'Single room / balcony', icon: '📹', priceMultiplier: 1.0 }, { id: 'cctv-4', name: '4 Cameras Kit', desc: 'Full perimeter security', icon: '🛡️', priceMultiplier: 2.8 }], colorSwatches: ['#6C2D6F', '#1E40AF'] },
  // BEAUTY
  { id: 'srv-beauty-1', categoryId: 'cat-beauty', categoryName: 'Beauty & Grooming', brand: 'GlamAtHome', name: 'Salon at Home: Hair Styling & Facial', rating: 4.96, reviewsCount: 4560, price: 799, originalPrice: 1299, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80', description: 'Hygienic single-use kits, expert hair cut, fruit facial glow, and stress relief head massage.', badge: 'Customer Choice', included: ['Sealed disposable kit & cape', 'Organic herbal face cleanup', 'Blow dry & hair style finish'], options: [{ id: 'beau-hair', name: 'Haircut & Styling', desc: 'Wash + trim + style', icon: '✂️', priceMultiplier: 1.0 }, { id: 'beau-combo', name: 'Full Glow Package', desc: 'Haircut + Facial + Mani', icon: '💅', priceMultiplier: 1.9 }], colorSwatches: ['#6C2D6F', '#DB2777', '#7C3AED'] },
];

// ─── HELPER ──────────────────────────────────────────────────
function BriefcaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

const TIME_SLOTS: Record<string, string[]> = {
  Morning:   ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM'],
  Afternoon: ['12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'],
  Evening:   ['04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'],
};
const FLOW_STEPS = ['Date & Time', 'Configure', 'Location', 'Payment'];
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// Starting prices per category (for the carousel cards)
const CAT_STARTING: Record<string, { price: number; badge?: string; badgeColor?: string }> = {
  'cat-paint': { price: 149, badge: '60% OFF',          badgeColor: 'bg-[#6C2D6F]' },
  'cat-elec':  { price: 49,  badge: '20 MIN ARRIVAL',   badgeColor: 'bg-emerald-500' },
  'cat-ac':    { price: 69,  badge: 'BESTSELLER',        badgeColor: 'bg-orange-500' },
  'cat-plumb': { price: 39,  badge: 'NO-LEAK GUARANTEE', badgeColor: 'bg-teal-500' },
  'cat-clean': { price: 99,  badge: 'DEEP CLEAN',        badgeColor: 'bg-blue-500' },
  'cat-appl':  { price: 79,  badge: '50% OFF',           badgeColor: 'bg-[#6C2D6F]' },
  'cat-carp':  { price: 59,  badge: 'PRECISION FIX',     badgeColor: 'bg-amber-600' },
  'cat-cctv':  { price: 99,  badge: 'HIGH TECH',         badgeColor: 'bg-blue-700' },
  'cat-beauty':{ price: 49,  badge: 'CUSTOMER CHOICE',   badgeColor: 'bg-pink-500' },
};

// ── Featured Carousel ──────────────────────────────────────
function FeaturedCarousel({ categories, onSelect }: { categories: typeof CATEGORIES; onSelect: (c: typeof CATEGORIES[0]) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const CARD_W = 240 + 16; // card width + gap
    let pos = 0;
    const total = categories.length;
    const interval = setInterval(() => {
      pos = (pos + 1) % total;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const target = pos * CARD_W;
      if (target > maxScroll) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
        pos = 0;
      } else {
        el.scrollTo({ left: target, behavior: 'smooth' });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [categories.length]);

  return (
    <div
      ref={scrollRef}
      className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', paddingRight: '1rem' }}
    >
      {categories.map((cat, idx) => {
        const meta = CAT_STARTING[cat.id] ?? { price: 49 };
        const isLast = idx === categories.length - 1;
        return (
          <div
            key={cat.id}
            onClick={() => onSelect(cat)}
            style={{
              background: 'linear-gradient(135deg, #3B1354 0%, #5C1F7A 60%, #7B2D8B 100%)',
              marginRight: isLast ? '1rem' : undefined,
            }}
            className="relative flex-shrink-0 w-[240px] rounded-[20px] overflow-hidden cursor-pointer snap-start group flex flex-col"
          >
            {/* Image — fixed height top section, no overlap with text */}
            <div className="relative w-full h-[120px] overflow-hidden flex-shrink-0">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300" />
              {/* Badge over image */}
              {meta.badge && (
                <div className={`absolute top-2.5 left-2.5 ${meta.badgeColor} text-white text-[9px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full`}>
                  {meta.badge}
                </div>
              )}
            </div>

            {/* Text content — fully below image, no overlap */}
            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-white font-black text-[15px] leading-tight">{cat.name}</h3>
                <p className="text-purple-200 text-[11px] mt-1 leading-snug line-clamp-2">{cat.desc}</p>
              </div>
              <div className="mt-3">
                <p className="text-purple-300 text-[9px] font-bold uppercase tracking-widest">Starting</p>
                <p className="text-white text-2xl font-black leading-none">₹{meta.price}</p>
                <button className="mt-2 w-full bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold py-1.5 rounded-xl flex items-center justify-center gap-1 transition-colors">
                  View {cat.count}+ Packages <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────
export default function App() {
  const today = new Date();
  const currentYear  = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay   = today.getDate();

  type View = 'home' | 'category-services' | 'booking-flow' | 'bookings';
  const [view, setView]               = useState<View>('home');
  const [category, setCategory]       = useState(CATEGORIES[0]);
  const [service, setService]         = useState<typeof CATALOG_SERVICES[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // booking flow
  const [step, setStep]                     = useState(1);
  const [calMonth, setCalMonth]             = useState(currentMonth);
  const [calYear, setCalYear]               = useState(currentYear);
  const [selDate, setSelDate]               = useState<Date | null>(null);
  const [timePeriod, setTimePeriod]         = useState('Morning');
  const [timeSlot, setTimeSlot]             = useState<string | null>(null);
  const [inclEquip, setInclEquip]           = useState(true);
  const [optionId, setOptionId]             = useState('');
  const [persons, setPersons]               = useState(1);
  const [addrType, setAddrType]             = useState('Home');
  const [addrText, setAddrText]             = useState('');
  const [addrSuggestions, setAddrSuggestions] = useState<{display_name: string}[]>([]);
  const [addrLoading, setAddrLoading]       = useState(false);
  const [payment, setPayment]               = useState('upi');
  const [confirmedId, setConfirmedId]       = useState('');
  const [bookings, setBookings]             = useState<any[]>([]);
  const [toast, setToast]                   = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  // Address autocomplete via OpenStreetMap Nominatim (no API key needed)
  const addrDebounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchAddress = (query: string) => {
    setAddrText(query);
    setAddrSuggestions([]);
    if (!query.trim() || query.length < 3) return;
    if (addrDebounceRef.current) clearTimeout(addrDebounceRef.current);
    addrDebounceRef.current = setTimeout(async () => {
      setAddrLoading(true);
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(query)}`, {
          headers: { 'Accept-Language': 'en' }
        });
        const data = await res.json();
        setAddrSuggestions(data);
      } catch { /* silent fail */ }
      finally { setAddrLoading(false); }
    }, 400);
  };

  // calendar helpers
  const daysInMonth  = (m: number, y: number) => new Date(y, m + 1, 0).getDate();
  const firstWeekday = (m: number, y: number) => { const d = new Date(y, m, 1).getDay(); return d === 0 ? 6 : d - 1; };
  const isPast       = (day: number) => new Date(calYear, calMonth, day) < new Date(currentYear, currentMonth, currentDay);

  const prevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else setCalMonth(m => m - 1); };
  const nextMonth = () => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } else setCalMonth(m => m + 1); };
  const canGoPrev = calYear > currentYear || calMonth > currentMonth;

  const price = useMemo(() => {
    if (!service) return 0;
    const base   = service.price;
    const optMul = service.options?.find(o => o.id === optionId)?.priceMultiplier ?? 1;
    const perMul = persons > 1 ? 1 + (persons - 1) * 0.4 : 1;
    return Math.round(base * optMul * perMul);
  }, [service, optionId, persons]);

  const categoryServices = useMemo(() =>
    CATALOG_SERVICES.filter(s => {
      if (s.categoryId !== category.id) return false;
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
    }),
  [category, searchQuery]);

  const openCategory = (cat: typeof CATEGORIES[0]) => { setCategory(cat); setView('category-services'); window.scrollTo({ top: 0 }); };

  const startBooking = (svc: typeof CATALOG_SERVICES[0]) => {
    setService(svc);
    setOptionId(svc.options?.[0]?.id ?? '');
    setPersons(1);
    setSelDate(null); setTimeSlot(null); setTimePeriod('Morning');
    setAddrText(''); setAddrType('Home'); setPayment('upi');
    setAddrSuggestions([]);
    setStep(1); setView('booking-flow');
    window.scrollTo({ top: 0 });
  };

  const finalise = () => {
    if (!service || !selDate) return;
    const id = 'SF-' + Math.floor(10000 + Math.random() * 90000);
    const dateStr = selDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const pkgName = service.options?.find(o => o.id === optionId)?.name ?? 'Standard';

    setBookings(prev => [{
      id, serviceName: service.name, category: service.categoryName,
      date: dateStr, timeSlot, address: addrText,
      package: pkgName, persons, total: price, status: 'Confirmed', image: service.image,
    }, ...prev]);
    setConfirmedId(id); setStep(5);
    window.scrollTo({ top: 0 });

    // Send booking details to WhatsApp
    const msg = [
      `🔔 *New SmartFix Booking*`,
      ``,
      `📋 *Booking ID:* ${id}`,
      `🛠️ *Service:* ${service.name}`,
      `📂 *Category:* ${service.categoryName}`,
      `📦 *Package:* ${pkgName} (${persons} technician${persons > 1 ? 's' : ''})`,
      ``,
      `📅 *Date:* ${dateStr}`,
      `⏰ *Time:* ${timeSlot}`,
      `📍 *Address:* ${addrText}`,
      ``,
      `💰 *Total Amount:* ₹${price}`,
      ``,
      `✅ Status: Confirmed`,
    ].join('\n');

    window.open(
      `https://wa.me/919494694195?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
  };

  const goBack = () => { if (step === 1) setView('category-services'); else setStep(s => s - 1); };

  return (
    <div className="min-h-screen bg-[#F1E8FC] text-slate-900 font-sans antialiased pb-16">

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#1E1B24] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-2 border border-purple-500/30">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="text-sm font-semibold">{toast}</span>
        </div>
      )}

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919494694195"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-30 animate-ping" />
        {/* Button */}
        <span className="relative flex w-14 h-14 rounded-full bg-[#25D366] items-center justify-center shadow-xl shadow-green-500/40 group-hover:scale-110 transition-transform duration-200">
          <svg viewBox="0 0 32 32" className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.67 4.797 1.836 6.789L2 30l7.438-1.818A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 0 1-5.836-1.598l-.418-.248-4.414 1.079 1.107-4.285-.272-.44A11.46 11.46 0 0 1 4.5 16C4.5 9.596 9.596 4.5 16 4.5S27.5 9.596 27.5 16 22.404 27.5 16 27.5zm6.29-8.61c-.344-.172-2.037-1.004-2.352-1.119-.316-.115-.546-.172-.776.172-.23.344-.89 1.119-1.09 1.35-.2.23-.4.258-.744.086-.344-.172-1.452-.535-2.766-1.707-1.022-.912-1.712-2.038-1.912-2.382-.2-.344-.021-.53.15-.702.155-.154.344-.4.516-.6.172-.2.23-.344.344-.574.115-.23.058-.43-.029-.602-.086-.172-.776-1.87-1.063-2.562-.28-.672-.564-.58-.776-.59l-.66-.012c-.23 0-.602.086-.916.43-.315.344-1.204 1.176-1.204 2.868s1.233 3.327 1.405 3.557c.172.23 2.426 3.704 5.878 5.193.822.354 1.463.566 1.963.725.824.262 1.575.225 2.168.137.661-.099 2.037-.832 2.323-1.635.287-.803.287-1.49.2-1.635-.085-.143-.315-.23-.66-.4z"/>
          </svg>
        </span>
      </a>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <button onClick={() => setView('home')} className="flex items-center gap-2 group">
            <img src="/logo.png" alt="SmartFix" className="h-9 w-auto group-hover:scale-105 transition-transform" />
            <span className="text-xl font-black tracking-tight text-[#6C2D6F]">smartfix</span>
          </button>
          <div className="flex items-center space-x-1">
            <button onClick={() => setView('home')} className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${view === 'home' || view === 'category-services' ? 'bg-[#6C2D6F] text-white' : 'text-slate-600 hover:text-[#6C2D6F]'}`}>Services</button>
            <button onClick={() => setView('bookings')} className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${view === 'bookings' ? 'bg-[#6C2D6F] text-white' : 'text-slate-600 hover:text-[#6C2D6F]'}`}>Bookings ({bookings.length})</button>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 pt-6 space-y-0">

        {/* ── HOME ── */}
        {view === 'home' && (
          <div className="max-w-7xl mx-auto space-y-8">
            {/* ── AUTO-SCROLL CARDS ── */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-tight flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#6C2D6F]" />Featured Offers</h2>
                <span className="text-xs text-purple-700 font-bold">Scroll to explore</span>
              </div>
              <FeaturedCarousel categories={CATEGORIES} onSelect={openCategory} />
            </div>
            {/* ── ALL SERVICES GRID ── */}
            <div>
              <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-tight flex items-center gap-2 mb-3"><Wrench className="w-4 h-4 text-[#6C2D6F]" />All Services</h2>
              <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
                {CATEGORIES.map(cat => {
                  const Icon = cat.icon;
                  return (
                    <button key={cat.id} onClick={() => openCategory(cat)} className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all border border-purple-50">
                      <div className="w-14 h-14 rounded-2xl bg-[#F1E8FC] flex items-center justify-center"><Icon className="w-7 h-7 text-[#6C2D6F]" /></div>
                      <span className="text-xs font-bold text-slate-700 text-center leading-tight">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── CATEGORY SERVICES ── */}
        {view === 'category-services' && (
          <div className="max-w-3xl mx-auto space-y-5">
            <div className="flex items-center gap-3">
              <button onClick={() => setView('home')} className="p-2 rounded-2xl bg-white shadow-sm hover:bg-purple-50"><ArrowLeft className="w-4 h-4 text-slate-700" /></button>
              <div><h1 className="text-lg font-black text-slate-900">{category.name}</h1><p className="text-xs text-slate-500">{category.count}+ services available</p></div>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input type="text" placeholder="Search services..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full bg-white text-sm rounded-2xl pl-9 pr-4 py-2.5 border border-purple-100 focus:outline-none focus:ring-2 focus:ring-[#6C2D6F]" />
            </div>
            <div className="space-y-3">
              {categoryServices.map(svc => (
                <div key={svc.id} className="bg-white rounded-[24px] p-4 border border-purple-50 shadow-sm flex gap-4 items-start">
                  <img src={svc.image} alt={svc.name} className="w-20 h-20 rounded-2xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-slate-900 leading-tight">{svc.name}</h3>
                      {svc.badge && <span className="text-[9px] font-bold bg-purple-100 text-[#6C2D6F] px-2 py-0.5 rounded-full whitespace-nowrap">{svc.badge}</span>}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-slate-700">{svc.rating}</span>
                      <span className="text-xs text-slate-400">({svc.reviewsCount.toLocaleString()})</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{svc.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div><span className="text-base font-black text-[#6C2D6F]">₹{svc.price}</span>{svc.originalPrice && <span className="text-xs text-slate-400 line-through ml-1.5">₹{svc.originalPrice}</span>}</div>
                      <button onClick={() => startBooking(svc)} className="px-4 py-2 bg-[#6C2D6F] hover:bg-[#58235A] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1">
                        <span>Book Now</span><ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {categoryServices.length === 0 && (
                <div className="text-center py-16 text-slate-400"><Search className="w-8 h-8 mx-auto mb-2 opacity-40" /><p className="text-sm">No services found</p></div>
              )}
            </div>
          </div>
        )}

        {/* ── BOOKING FLOW ── */}
        {view === 'booking-flow' && service && step < 5 && (
          <div className="max-w-xl mx-auto space-y-5">
            {/* Step header */}
            <div className="bg-white rounded-3xl p-4 border border-purple-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <button onClick={goBack} className="p-2 rounded-xl bg-[#F1E8FC] hover:bg-purple-100 transition-colors"><ArrowLeft className="w-4 h-4 text-[#6C2D6F]" /></button>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{service.categoryName}</p>
                  <h2 className="text-sm font-black text-slate-900 truncate">{service.name}</h2>
                </div>
                <span className="text-sm font-black text-[#6C2D6F]">₹{price}</span>
              </div>
              <div className="flex items-center gap-1">
                {FLOW_STEPS.map((label, i) => {
                  const s = i + 1;
                  const done = step > s; const active = step === s;
                  return (
                    <React.Fragment key={s}>
                      <div className={`flex items-center gap-1 ${active ? 'flex-1' : ''}`}>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 transition-all ${done ? 'bg-emerald-500 text-white' : active ? 'bg-[#6C2D6F] text-white' : 'bg-slate-100 text-slate-400'}`}>
                          {done ? <Check className="w-3 h-3" /> : s}
                        </div>
                        {active && <span className="text-[10px] font-bold text-[#6C2D6F] whitespace-nowrap">{label}</span>}
                      </div>
                      {i < FLOW_STEPS.length - 1 && <div className={`flex-1 h-0.5 rounded-full ${done ? 'bg-emerald-400' : 'bg-slate-100'}`} />}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* STEP 1: DATE & TIME */}
            {step === 1 && (
              <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-sm space-y-5">
                <h3 className="text-base font-black text-slate-900">Choose Date & Time</h3>
                {/* Calendar */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-slate-800">{MONTH_NAMES[calMonth]} {calYear}</h4>
                    <div className="flex gap-1">
                      <button onClick={prevMonth} disabled={!canGoPrev} className="p-1.5 rounded-lg hover:bg-slate-100 disabled:opacity-30 transition-colors"><ArrowLeft className="w-3.5 h-3.5 text-slate-600" /></button>
                      <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"><ChevronRight className="w-3.5 h-3.5 text-slate-600" /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {['Mo','Tu','We','Th','Fr','Sa','Su'].map(d => <span key={d} className="text-[10px] font-bold text-slate-400 py-1">{d}</span>)}
                    {Array.from({ length: firstWeekday(calMonth, calYear) }).map((_, i) => <div key={`pad-${i}`} />)}
                    {Array.from({ length: daysInMonth(calMonth, calYear) }, (_, i) => i + 1).map(day => {
                      const disabled = isPast(day);
                      const dateObj  = new Date(calYear, calMonth, day);
                      const isSel    = selDate?.toDateString() === dateObj.toDateString();
                      return (
                        <button key={day} disabled={disabled} onClick={() => setSelDate(dateObj)}
                          className={`h-8 w-8 mx-auto rounded-full text-xs font-semibold flex items-center justify-center transition-all ${disabled ? 'text-slate-300 cursor-not-allowed' : isSel ? 'bg-[#6C2D6F] text-white shadow-md' : 'text-slate-700 hover:bg-purple-50'}`}>
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {/* Time */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800">Time Period</label>
                  <div className="flex gap-2">
                    {Object.keys(TIME_SLOTS).map(p => (
                      <button key={p} onClick={() => { setTimePeriod(p); setTimeSlot(null); }} className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${timePeriod === p ? 'bg-[#6C2D6F] text-white' : 'bg-slate-100 text-slate-600 hover:bg-purple-50'}`}>{p}</button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {TIME_SLOTS[timePeriod].map(slot => (
                      <button key={slot} onClick={() => setTimeSlot(slot)} className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${timeSlot === slot ? 'border-[#6C2D6F] bg-purple-50 text-[#6C2D6F] font-bold' : 'border-slate-200 text-slate-700 bg-white hover:border-purple-200'}`}>{slot}</button>
                    ))}
                  </div>
                </div>
                <div onClick={() => setInclEquip(v => !v)} className="flex items-center gap-2 cursor-pointer">
                  <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${inclEquip ? 'bg-[#6C2D6F] text-white' : 'border border-slate-300 bg-white'}`}>{inclEquip && <Check className="w-3 h-3" />}</div>
                  <span className="text-xs text-slate-600">Include all equipment & instruments</span>
                </div>
                <button disabled={!selDate || !timeSlot} onClick={() => setStep(2)}
                  className="w-full bg-[#6C2D6F] hover:bg-[#58235A] disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3.5 rounded-2xl text-sm transition-all">
                  {selDate && timeSlot ? `Continue — ${selDate.toLocaleDateString('en-GB', { day:'numeric', month:'short' })} at ${timeSlot}` : 'Select a date & time to continue'}
                </button>
              </div>
            )}

            {/* STEP 2: CONFIGURE */}
            {step === 2 && (
              <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><img src={service.image} alt="" className="w-10 h-10 rounded-xl object-cover" /><h3 className="text-base font-black text-slate-900">{service.brand || 'SmartFix'}</h3></div>
                  <button onClick={() => showToast('Custom scope enabled')} className="border border-[#6C2D6F] text-[#6C2D6F] text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 hover:bg-purple-50"><Plus className="w-3 h-3" /><span>Custom</span></button>
                </div>
                <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-[#5B255D] to-[#843688] text-white p-4 flex items-center justify-between">
                  <div><span className="text-[9px] uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded text-purple-100 font-bold">Limited Offer</span><h4 className="text-base font-black mt-0.5">Special Discount</h4><p className="text-[11px] text-purple-200">On Instant Online Confirmation</p></div>
                  <img src={service.image} alt="" className="w-16 h-16 rounded-xl object-cover border border-white/20" />
                </div>
                {service.options && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800">Select Package</label>
                    <div className="grid grid-cols-3 gap-2">
                      {service.options.map(opt => (
                        <div key={opt.id} onClick={() => setOptionId(opt.id)} className={`p-3 rounded-2xl cursor-pointer text-center flex flex-col items-center border transition-all ${optionId === opt.id ? 'bg-[#F7EFFF] border-[#6C2D6F] shadow-sm' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'}`}>
                          <span className="text-2xl mb-1">{opt.icon}</span>
                          <span className="text-[11px] font-bold text-slate-800 leading-tight">{opt.name}</span>
                          <span className="text-[9px] text-slate-400 mt-0.5">{opt.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {service.colorSwatches && null}

                <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-[#6C2D6F] flex items-center justify-center"><User className="w-4 h-4" /></div>
                    <div><p className="text-xs font-bold text-slate-800">Required Technicians</p><p className="text-[10px] text-slate-400">₹500/pro additional</p></div>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-slate-200">
                    <button onClick={() => setPersons(Math.max(1, persons - 1))} className="p-0.5 hover:text-[#6C2D6F]"><Minus className="w-3.5 h-3.5" /></button>
                    <span className="text-xs font-bold w-4 text-center">{persons}</span>
                    <button onClick={() => setPersons(persons + 1)} className="p-0.5 hover:text-[#6C2D6F]"><Plus className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <button onClick={() => setStep(3)} className="w-full bg-[#6C2D6F] hover:bg-[#58235A] text-white font-bold py-3.5 rounded-2xl text-sm transition-all">Continue to Location</button>
              </div>
            )}

            {/* STEP 3: LOCATION */}
            {step === 3 && (
              <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-sm space-y-5">
                <h3 className="text-base font-black text-slate-900">Service Location</h3>
                <div className="h-44 w-full rounded-2xl overflow-hidden relative bg-[#EBF0F5] border border-slate-200">
                  <svg className="w-full h-full opacity-50" viewBox="0 0 200 160">
                    <path d="M 0 40 Q 60 50 110 30 T 200 50" fill="none" stroke="#FFFFFF" strokeWidth="12" />
                    <path d="M 50 0 Q 70 80 80 160" fill="none" stroke="#FFFFFF" strokeWidth="14" />
                    <path d="M 140 0 Q 130 90 150 160" fill="none" stroke="#FFFFFF" strokeWidth="10" />
                    <path d="M 0 110 Q 90 90 200 130" fill="none" stroke="#FFFFFF" strokeWidth="16" />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 rounded-full bg-[#6C2D6F] text-white flex items-center justify-center shadow-lg"><MapPin className="w-4 h-4 fill-white" /></div>
                  </div>
                  <button onClick={() => showToast('GPS location detected')} className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow text-slate-600 hover:text-[#6C2D6F]"><Crosshair className="w-4 h-4" /></button>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800">Full Address</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input type="text" placeholder="Search your area or address..." value={addrText} onChange={e => searchAddress(e.target.value)} className="w-full bg-slate-50 text-sm rounded-2xl pl-9 pr-10 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#6C2D6F]" autoComplete="off" />
                    {addrText && <button onClick={() => { setAddrText(''); setAddrSuggestions([]); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>}
                    {/* Suggestions dropdown */}
                    {(addrSuggestions.length > 0 || addrLoading) && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl border border-purple-100 shadow-xl z-20 overflow-hidden">
                        {addrLoading && <div className="px-4 py-3 text-xs text-slate-400 flex items-center gap-2"><div className="w-3 h-3 border-2 border-[#6C2D6F] border-t-transparent rounded-full animate-spin" />Searching...</div>}
                        {addrSuggestions.map((s, i) => (
                          <button key={i} onClick={() => { setAddrText(s.display_name); setAddrSuggestions([]); }}
                            className="w-full text-left px-4 py-3 text-xs text-slate-700 hover:bg-purple-50 flex items-start gap-2 border-b border-slate-50 last:border-0 transition-colors">
                            <MapPin className="w-3.5 h-3.5 text-[#6C2D6F] flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{s.display_name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[{ id: 'Home', icon: Home }, { id: 'Work', icon: BriefcaseIcon }, { id: 'Other', icon: MapPin }].map(addr => {
                    const Icon = addr.icon; const isSel = addrType === addr.id;
                    return (
                      <button key={addr.id} onClick={() => setAddrType(addr.id)} className={`py-2.5 rounded-2xl flex flex-col items-center border transition-all ${isSel ? 'bg-[#F7EFFF] border-[#6C2D6F] text-[#6C2D6F]' : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'}`}>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center mb-1 ${isSel ? 'bg-[#6C2D6F] text-white' : 'bg-slate-100'}`}><Icon className="w-3.5 h-3.5" /></div>
                        <span className="text-[10px] font-bold">{addr.id}</span>
                      </button>
                    );
                  })}
                </div>
                <button disabled={!addrText.trim()} onClick={() => setStep(4)} className="w-full bg-[#6C2D6F] hover:bg-[#58235A] disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3.5 rounded-2xl text-sm transition-all">Continue to Payment</button>
              </div>
            )}

            {/* STEP 4: PAYMENT */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-sm space-y-4">
                  <div className="flex items-start justify-between">
                    <div><span className="text-[10px] uppercase font-bold text-[#6C2D6F] tracking-wider">Order Summary</span><h2 className="text-base font-black text-slate-900 mt-0.5">{service.name}</h2></div>
                    <div className="text-right"><span className="text-2xl font-black text-[#6C2D6F]">₹{price}</span><span className="text-xs text-slate-400 line-through block">₹{Math.round(price * 1.4)}</span></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3 bg-[#F1E8FC]/60 rounded-2xl"><span className="text-[10px] text-slate-400 font-bold uppercase block">Date & Time</span><span className="font-bold text-slate-900 mt-0.5 block">{selDate?.toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })} · {timeSlot}</span></div>
                    <div className="p-3 bg-[#F1E8FC]/60 rounded-2xl"><span className="text-[10px] text-slate-400 font-bold uppercase block">Location</span><span className="font-bold text-slate-900 mt-0.5 block truncate">{addrText}</span></div>
                    <div className="p-3 bg-[#F1E8FC]/60 rounded-2xl col-span-2"><span className="text-[10px] text-slate-400 font-bold uppercase block">Package & Crew</span><span className="font-bold text-slate-900 mt-0.5 block">{service.options?.find(o => o.id === optionId)?.name ?? 'Standard'} · {persons} Technician{persons > 1 ? 's' : ''}</span></div>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-4 space-y-2 text-xs border border-slate-100">
                    <div className="flex justify-between text-slate-600"><span>Base Service</span><span className="font-semibold text-slate-800">₹{service.price}</span></div>
                    {persons > 1 && <div className="flex justify-between text-slate-600"><span>Extra Technicians ({persons - 1})</span><span className="font-semibold">+₹{Math.round(service.price * 0.4 * (persons - 1))}</span></div>}
                    <div className="flex justify-between text-emerald-600 font-semibold"><span>SmartFix Discount</span><span>-₹{Math.round(price * 0.4)}</span></div>
                    <div className="flex justify-between text-slate-600"><span>Equipment & Safety</span><span className="text-emerald-600 font-medium">FREE</span></div>
                    <div className="pt-2 border-t border-slate-200 flex justify-between font-bold"><span className="text-sm text-slate-900">Total</span><span className="text-xl font-black text-[#6C2D6F]">₹{price}</span></div>
                  </div>
                  {service.included && (
                    <div className="space-y-1.5">
                      <p className="text-xs font-bold text-slate-800">What's Included</p>
                      {service.included.map((inc, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-600"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" /><span>{inc}</span></div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-sm space-y-3">
                  <h3 className="text-sm font-bold text-slate-900">Payment Method</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[{ id: 'upi', name: 'UPI', desc: 'GPay / Paytm', icon: Zap }, { id: 'card', name: 'Card', desc: 'Debit / Credit', icon: CreditCard }, { id: 'cash', name: 'Cash', desc: 'Pay on service', icon: Truck }].map(m => {
                      const Icon = m.icon; const isSel = payment === m.id;
                      return (
                        <div key={m.id} onClick={() => setPayment(m.id)} className={`p-3 rounded-2xl border cursor-pointer transition-all ${isSel ? 'border-[#6C2D6F] bg-[#F7EFFF]' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-1.5 ${isSel ? 'bg-[#6C2D6F] text-white' : 'bg-slate-100 text-slate-600'}`}><Icon className="w-3.5 h-3.5" /></div>
                          <p className="text-xs font-bold text-slate-900">{m.name}</p>
                          <p className="text-[10px] text-slate-400">{m.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <button onClick={finalise} className="w-full bg-[#6C2D6F] hover:bg-[#58235A] text-white font-extrabold py-4 rounded-2xl text-sm transition-all shadow-xl shadow-purple-900/20 flex items-center justify-center gap-2">
                  <span>Confirm Booking · ₹{price}</span><CheckCircle2 className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── CONFIRMED ── */}
        {view === 'booking-flow' && step === 5 && service && (
          <div className="max-w-xl mx-auto flex flex-col items-center text-center gap-6 py-10">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center shadow-lg"><CheckCircle2 className="w-10 h-10 text-emerald-500" /></div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Booking Confirmed!</h2>
              <p className="text-sm text-slate-500 mt-1">Your technician is on the way.</p>
              <p className="text-xs text-slate-400 mt-1">ID: <span className="font-bold text-[#6C2D6F]">{confirmedId}</span></p>
            </div>
            <div className="w-full bg-white rounded-3xl p-5 border border-purple-100 shadow-sm text-left space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <img src={service.image} alt="" className="w-12 h-12 rounded-2xl object-cover" />
                <div><p className="font-bold text-slate-900">{service.name}</p><p className="text-slate-500">{service.categoryName}</p></div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-slate-50 rounded-xl"><p className="text-[10px] text-slate-400 font-bold uppercase">Date & Time</p><p className="font-bold text-slate-800 mt-0.5">{selDate?.toLocaleDateString('en-GB', { day:'numeric', month:'short' })} · {timeSlot}</p></div>
                <div className="p-2.5 bg-slate-50 rounded-xl"><p className="text-[10px] text-slate-400 font-bold uppercase">Total Paid</p><p className="font-bold text-[#6C2D6F] text-sm mt-0.5">₹{price}</p></div>
                <div className="p-2.5 bg-slate-50 rounded-xl col-span-2"><p className="text-[10px] text-slate-400 font-bold uppercase">Address</p><p className="font-bold text-slate-800 mt-0.5">{addrText}</p></div>
              </div>
            </div>
            <div className="flex w-full gap-3">
              <button onClick={() => setView('bookings')} className="flex-1 border-2 border-[#6C2D6F] text-[#6C2D6F] font-bold py-3 rounded-2xl text-sm hover:bg-purple-50 transition-all">View Bookings</button>
              <button onClick={() => setView('home')} className="flex-1 bg-[#6C2D6F] hover:bg-[#58235A] text-white font-bold py-3 rounded-2xl text-sm transition-all">Book Another</button>
            </div>
          </div>
        )}

        {/* ── BOOKINGS ── */}
        {view === 'bookings' && (
          <div className="max-w-3xl mx-auto space-y-5">
            <div className="flex items-center justify-between">
              <div><h1 className="text-xl font-black text-slate-900">Your Bookings</h1><p className="text-xs text-slate-500">{bookings.length} booking{bookings.length !== 1 ? 's' : ''}</p></div>
              <button onClick={() => setView('home')} className="px-4 py-2 bg-[#6C2D6F] text-white text-xs font-bold rounded-2xl hover:bg-[#58235A]">+ New Booking</button>
            </div>
            {bookings.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <Star className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm font-semibold">No bookings yet</p>
                <p className="text-xs mt-1">Your confirmed bookings will appear here</p>
                <button onClick={() => setView('home')} className="mt-4 px-6 py-2.5 bg-[#6C2D6F] text-white text-xs font-bold rounded-2xl">Browse Services</button>
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map(b => (
                  <div key={b.id} className="bg-white rounded-[24px] p-5 border border-purple-100 shadow-sm space-y-3">
                    <div className="flex items-center gap-3">
                      {b.image && <img src={b.image} alt="" className="w-12 h-12 rounded-2xl object-cover flex-shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-bold text-slate-900 text-sm truncate">{b.serviceName}</h3>
                          <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold rounded-full whitespace-nowrap">{b.status}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold mt-0.5">#{b.id}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="p-2.5 bg-slate-50 rounded-xl"><p className="text-[10px] text-slate-400 font-bold uppercase">Date</p><p className="font-bold text-slate-800 mt-0.5">{b.date}</p></div>
                      <div className="p-2.5 bg-slate-50 rounded-xl"><p className="text-[10px] text-slate-400 font-bold uppercase">Time</p><p className="font-bold text-slate-800 mt-0.5">{b.timeSlot}</p></div>
                      <div className="p-2.5 bg-slate-50 rounded-xl"><p className="text-[10px] text-slate-400 font-bold uppercase">Total</p><p className="font-bold text-[#6C2D6F] mt-0.5">₹{b.total}</p></div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 truncate max-w-[200px]">📍 {b.address}</span>
                      <button onClick={() => showToast('Technician will call before arrival')} className="px-3 py-1.5 border border-[#6C2D6F] text-[#6C2D6F] font-bold rounded-xl hover:bg-purple-50">Contact Pro</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
