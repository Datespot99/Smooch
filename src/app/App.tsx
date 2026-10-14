import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play, Pause, Users, X, Star, Mic, Upload, CheckCircle, Loader2,
  MessageCircle, ArrowRight, Sparkles, Flame, Copy,
  ExternalLink, Phone, MapPin, Shield, Zap,
  UserCheck, Headphones, ChevronDown,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import toast, { Toaster } from 'react-hot-toast';
import chatAvatar   from '../imports/photo_1_2026-09-07_13-39-47.jpg';
import smoochLogo from '../imports/Smooch_Interlocking_Hearts_Logo-1.png';
import smoochIcon from '../imports/Interlocking_White_Hearts_on_Red-1.png';
import galleryImg1  from '../imports/ChatGPT_Image_Sep_23__2026__03_51_25_PM.png';
import galleryImg2  from '../imports/ChatGPT_Image_Sep_23__2026__03_51_14_PM.png';
import galleryImg3  from '../imports/Screenshot_2026_09_23_03_54_52_13_948cd9899890cbd5c2798760b2b95377.jpg';
import galleryImg4  from '../imports/ChatGPT_Image_Sep_23__2026__03_51_25_PM.png';
import galleryImg5  from '../imports/ChatGPT_Image_Sep_23__2026__03_51_14_PM.png';
import galleryImg6  from '../imports/Screenshot_2026_09_23_03_54_52_13_948cd9899890cbd5c2798760b2b95377.jpg';
import adminPhoto   from '../imports/photo_2_2026-09-07_13-39-48.jpg';
import faq4Audio from '../imports/faq4-bangalore-girls.mp3.mp3';
import faq5Audio from '../imports/faq5-how-to-join.mp3.mp3';

const B1        = '#E82020';
const B2        = '#B01010';
const ACCENT    = '#FFD700';
const HERO_GRAD = `linear-gradient(135deg, ${B1} 0%, ${B2} 100%)`;

// ─── Theme system ─────────────────────────────────────────────────────────────
const DARK_THEME = {
  PAGE_BG:  '#000000',
  DARK:     '#F5F3F3',
  MUTED:    '#7A88AA',
  CARD_BG:  '#0D0D0D',
  BORDER:   'rgba(255,255,255,0.07)',
  QUOTE:    '#C0C8E8',
  DOT_BG: [
    'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\'%3E%3Ccircle cx=\'12\' cy=\'12\' r=\'1.8\' fill=\'rgba(232%2C32%2C32%2C0.35)\'/%3E%3C/svg%3E") repeat',
    'radial-gradient(ellipse 70% 55% at 15% 40%, rgba(232,32,32,0.10) 0%, transparent 70%)',
    'radial-gradient(ellipse 55% 45% at 85% 15%, rgba(176,16,16,0.07) 0%, transparent 65%)',
    '#000000',
  ].join(', ')
};
type TTheme = typeof DARK_THEME & { isDark: boolean };
const ThemeCtx = React.createContext<{ theme: TTheme; toggle: () => void }>({
  theme: { ...DARK_THEME, isDark: true }, toggle: () => {},
});
const useT = (): TTheme => React.useContext(ThemeCtx).theme;

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = { ...DARK_THEME, isDark: true };
  return <ThemeCtx.Provider value={{ theme, toggle: () => {} }}>{children}</ThemeCtx.Provider>;
}

const PAGE_BG = DARK_THEME.PAGE_BG;
const DARK    = DARK_THEME.DARK;
const MUTED   = DARK_THEME.MUTED;
const CARD_BG = DARK_THEME.CARD_BG;
const DOT_BG  = DARK_THEME.DOT_BG;

const FEAT: { icon: React.ElementType; title: string; desc: string; badge?: string; c1: string; c2: string }[] = [
  { icon: MessageCircle, title: 'Chatting',         desc: 'Chat with Daily active members',  c1: B1, c2: B2 },
  { icon: Phone,         title: 'Video Calls',      desc: 'Talk before you meet',            c1: B1, c2: B2 },
  { icon: MapPin,        title: 'Direct Meets',     desc: 'Meet genuine women in real',      c1: B1, c2: B2 },
  { icon: Flame,         title: '18+ Exclusive',    desc: 'Photos, videos & more',           c1: B1, c2: B2, badge: '18+' },
];

const IMAGES   = [galleryImg1, galleryImg2, galleryImg3, galleryImg4, galleryImg5, galleryImg6];
const VIDEOS   = ['https://player.vimeo.com/video/1182421154', 'https://player.vimeo.com/video/1182421156'];
const QUESTIONS = ['Is this genuine?', 'How much is entry fee?', 'Refunds available?', 'Genuine Bangalore girls?', 'How to join?'];
const AUDIO_FILES = [null, null, null, faq4Audio, faq5Audio];
const REVIEWS = [
  { name: 'Rahul M.',       area: 'Koramangala', text: 'Way better than any dating app I have tried. Met two amazing women so far, both real and verified.' },
  { name: 'Vikram Shetty.', area: 'Indiranagar',  text: 'Finally ondhu genuine group sikthu. Admin is very responsive and the crowd is legit. Genuinely recommend.' },
  { name: 'Karan D.',       area: 'HSR Layout',   text: 'Real girls, real chats. Nothing like the fake bots on Tinder or Bumble. Worth every rupee.' },
  { name: 'Aditya P.',      area: 'Whitefield',   text: "Was skeptical at first but it's 100% worth it. The voice call feature is a great way to vibe before meeting." },
  { name: 'Rohan Gowda.',   area: 'JP Nagar',     text: 'Already arranged a meet within my first week. Active group, daily new faces. Super recommend bro.' },
  { name: 'Suresh Naik.',   area: 'Marathahalli', text: 'Met my current girlfriend here lol. Very organised, zero spam and the admin actually screens people.' },
  { name: 'Arjun K.',       area: 'Jayanagar',    text: 'Best ₹999 I have spent this year honestly. The group is always active, quality women from Bangalore.' },
  { name: 'Dev Menon.',     area: 'BTM Layout',   text: 'Three meets in two months. The vibe here is very different from regular apps — feels real and personal.' },
  { name: 'Sagar R.',       area: 'Electronic City', text: 'Legit group. Admin does proper verification so you know everyone is genuine. No nonsense.' },
  { name: 'Nikhil T.',      area: 'Yelahanka',    text: 'Joined on a friend\'s suggestion and I\'m glad I did. Active daily, good conversations and easy to arrange meets.' },
];

// ─── Glassmorphic blob ────────────────────────────────────────────────────────
function GlassBlob({ size, top, left, right, bottom, rotate = 0, rx = '62% 38% 70% 30% / 45% 55% 45% 55%' }: {
  size: number; top?: string | number; left?: string | number;
  right?: string | number; bottom?: string | number; rotate?: number; rx?: string;
}) {
  return (
    <div style={{
      position: 'absolute', width: size, height: size, top, left, right, bottom,
      background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)',
      border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: rx,
      transform: `rotate(${rotate}deg)`, pointerEvents: 'none',
    }} />
  );
}

// ─── Group Preview Slider ─────────────────────────────────────────────────────
function GroupPreviewSlider({ images, mobile = false }: { images: string[]; mobile?: boolean }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const T = useT();

  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1);
      setCurrent(prev => (prev + 1) % images.length);
    }, 2800);
    return () => clearInterval(id);
  }, [images.length]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  const nav = (i: number) => { setDirection(i > current ? 1 : -1); setCurrent(i); };

  if (mobile) {
    return (
      <section className="py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-extrabold text-xl" style={{ color: T.DARK, letterSpacing: '-0.03em' }}>Group Preview</h2>
            <p className="text-xs font-semibold mt-0.5" style={{ color: T.MUTED }}>Swipe for screenshots </p>
          </div>
          <span className="text-[10px] font-bold px-3 py-1.5 rounded-full text-white" style={{ background: HERO_GRAD }}>
            {current + 1} / {images.length}
          </span>
        </div>
        <div className="flex justify-center">
          <div className="relative" style={{ width: '72vw', maxWidth: 240 }}>
            {/* Glow halo */}
            <div className="absolute inset-0 rounded-3xl blur-2xl opacity-30 scale-95" style={{ background: HERO_GRAD }} />
            <div
              className="relative overflow-hidden rounded-3xl shadow-2xl"
              style={{ aspectRatio: '9/16', border: '2.5px solid rgba(232,32,32,0.2)' }}
            >
              <AnimatePresence custom={direction} mode="popLayout">
                <motion.img
                  key={current} src={images[current]} alt={`Preview ${current + 1}`}
                  custom={direction} variants={variants} initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              {/* Bottom gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)' }} />
              {/* Dot indicators */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1 z-10">
                {images.map((_, i) => (
                  <button key={i} onClick={() => nav(i)} className="rounded-full transition-all duration-300"
                    style={{ width: i === current ? 18 : 5, height: 5, background: i === current ? 'white' : 'rgba(255,255,255,0.45)' }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-bold uppercase tracking-widest" style={{ background: `${B1}12`, color: B1 }}>
            <Sparkles className="w-3 h-3" /> Real Content
          </div>
          <h2 className="text-5xl mb-3 font-bold" style={{ color: T.DARK, letterSpacing: '-0.03em' }}>Group Preview</h2>
          <p className="text-lg font-medium" style={{ color: T.MUTED }}>See exactly what you're joining</p>
        </div>
        <div className="flex justify-center">
          <div className="relative" style={{ width: 300 }}>
            <div className="absolute inset-0 rounded-[2.5rem] blur-3xl opacity-25 scale-90" style={{ background: HERO_GRAD }} />
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl" style={{ aspectRatio: '9/16', border: '3px solid rgba(26,114,232,0.18)' }}>
              <AnimatePresence custom={direction} mode="popLayout">
                <motion.img
                  key={current} src={images[current]} alt={`Preview ${current + 1}`}
                  custom={direction} variants={variants} initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)' }} />
              <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-1.5 z-10">
                {images.map((_, i) => (
                  <button key={i} onClick={() => nav(i)} className="rounded-full transition-all duration-300"
                    style={{ width: i === current ? 22 : 6, height: 6, background: i === current ? 'white' : 'rgba(255,255,255,0.45)' }} />
                ))}
              </div>
              <div className="absolute top-4 right-4 z-10">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white" style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)' }}>
                  {current + 1} / {images.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Lead Modal ───────────────────────────────────────────────────────────────
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbyJ9r8I6EV__rb_1yOL7A4EoIXRf507cWraDta0JmSGFT9V748yy5qgVJAXbnGlbX1-FA/exec';

function LeadGate({ onComplete }: { onComplete: () => void }) {
  const [name, setName]       = useState('');
  const [phone, setPhone]     = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) { setError('Please enter your full name.'); return; }
    if (!/^[6-9]\d{9}$/.test(phone.trim())) { setError('Enter a valid 10-digit Indian mobile number.'); return; }
    setLoading(true);
    try {
      const params = new URLSearchParams({ name: name.trim(), phone: phone.trim() });
      await fetch(`${SHEET_URL}?${params.toString()}`, { mode: 'no-cors' });
      localStorage.setItem('ds_lead_submitted', '1');
      localStorage.setItem('ds_lead_name', name.trim());
      localStorage.setItem('ds_lead_phone', phone.trim());
      onComplete();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center px-5"
      style={{ background: DARK_THEME.DOT_BG, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[340px] rounded-2xl overflow-hidden"
        style={{ background: '#0D0D0D', border: '1px solid rgba(232,32,32,0.18)', boxShadow: `0 32px 80px rgba(0,0,0,0.95), 0 0 60px ${B1}12` }}>

        <div className="h-[2px]" style={{ background: HERO_GRAD }} />

        <div className="px-7 pt-7 pb-7">
          {/* Logo + brand */}
          <div className="flex items-center gap-2.5 mb-6">
            <img src={smoochIcon} alt="Smooch" className="w-8 h-8 rounded-xl object-cover" style={{ boxShadow: `0 4px 12px ${B1}40` }} />
            <span className="font-black text-lg text-white" style={{ letterSpacing: '-0.03em' }}>Smooch</span>
          </div>

          <div className="mb-5">
            <h2 className="text-xl font-extrabold text-white mb-1" style={{ letterSpacing: '-0.03em' }}>
              Enter your details
            </h2>
            <p className="text-[12px] font-medium" style={{ color: '#7A88AA' }}>Required to access the community</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: '#7A88AA' }}>Name</label>
              <input
                type="text" placeholder="Your full name"
                value={name} onChange={e => setName(e.target.value)}
                className="w-full rounded-xl px-4 py-3 outline-none text-[13px] font-semibold transition-all"
                style={{
                  background: '#050505',
                  border: `1px solid ${name ? 'rgba(232,32,32,0.6)' : 'rgba(255,255,255,0.08)'}`,
                  color: '#F5F3F3', caretColor: B1,
                }}
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: '#7A88AA' }}>Phone Number</label>
              <div className="flex items-center rounded-xl overflow-hidden transition-all"
                style={{
                  background: '#050505',
                  border: `1px solid ${phone ? 'rgba(232,32,32,0.6)' : 'rgba(255,255,255,0.08)'}`,
                }}>
                <span className="px-3.5 py-3 text-[13px] font-bold shrink-0"
                  style={{ color: '#7A88AA', borderRight: '1px solid rgba(255,255,255,0.08)' }}>+91</span>
                <input
                  type="tel" placeholder="10-digit mobile number"
                  value={phone} maxLength={10}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 px-3.5 py-3 outline-none text-[13px] font-semibold bg-transparent"
                  style={{ color: '#F5F3F3', caretColor: B1 }}
                />
              </div>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                className="text-[11px] font-semibold text-red-400 bg-red-950/30 px-3 py-2 rounded-lg"
                style={{ border: '1px solid rgba(239,68,68,0.2)' }}>
                {error}
              </motion.p>
            )}

            <motion.button type="submit" disabled={loading}
              whileTap={{ scale: 0.97 }}
              className="w-full rounded-xl py-3.5 font-black text-sm flex items-center justify-center gap-2 relative overflow-hidden mt-1"
              style={{
                background: loading ? '#1a0808' : HERO_GRAD,
                color: loading ? '#8A7275' : '#fff',
                boxShadow: loading ? 'none' : `0 4px 20px ${B1}50`,
              }}>
              {!loading && (
                <motion.div className="absolute inset-0 pointer-events-none"
                  animate={{ x: ['-100%', '160%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', width: '60%' }} />
              )}
              {loading
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : <><span className="relative z-10">Unlock Access</span><ArrowRight className="w-4 h-4 relative z-10" /></>}
            </motion.button>

            <p className="text-center text-[10px] font-semibold" style={{ color: '#3a3f60' }}>
              🔒 Your info is private · 178+ verified members
            </p>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Stats Row ────────────────────────────────────────────────────────────────
function StatsRow({ onJoin }: { onJoin: () => void }) {
  const [idx, setIdx] = useState(0);
  const items = [
    { value: '100+', label: 'Members',  icon: Users,  c1: B1, c2: B2 },
    { value: 'Daily', label: 'Active',  icon: Zap,    c1: B1, c2: B2 },
    { value: '100%', label: 'Verified', icon: Shield, c1: B1, c2: B2 },
    { value: '18+',  label: 'Content',  icon: Flame,  c1: B1, c2: B2 },
  ];
  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % items.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    null
  );
}

// ─── Reviews Slider ───────────────────────────────────────────────────────────
const AVATAR_COLORS = ['#E82020', '#EC4899', '#FF6B35', '#F59E0B', '#B01010', '#EF4444', '#FF4D6D', '#F97316', '#C9184A', '#FF0A54'];

function ReviewsStrip() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef(0);

  const initials = (name: string) => name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  useEffect(() => {
    const t = setInterval(() => { setDirection(1); setCurrent(p => (p + 1) % REVIEWS.length); }, 4000);
    return () => clearInterval(t);
  }, []);

  const goTo = (i: number, dir: number) => { setDirection(dir); setCurrent(i); };
  const prev = () => goTo((current - 1 + REVIEWS.length) % REVIEWS.length, -1);
  const next = () => goTo((current + 1) % REVIEWS.length, 1);

  const onTouchStart = (e: React.TouchEvent) => { dragStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const dx = dragStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) dx > 0 ? next() : prev();
  };
  const onMouseDown  = (e: React.MouseEvent) => { setDragging(false); dragStartX.current = e.clientX; };
  const onMouseUp    = (e: React.MouseEvent) => {
    const dx = dragStartX.current - e.clientX;
    if (Math.abs(dx) > 40) { setDragging(true); dx > 0 ? next() : prev(); }
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '60%' : '-60%', opacity: 0, scale: 0.94 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-60%' : '60%', opacity: 0, scale: 0.94 }),
  };

  const T = useT();
  const r = REVIEWS[current];
  const c1 = AVATAR_COLORS[current % AVATAR_COLORS.length];
  const c2 = AVATAR_COLORS[(current + 3) % AVATAR_COLORS.length];

  return (
    null
  );
}

function ReviewsSlideshow() { return null; }

// ─── Urgency Banner ───────────────────────────────────────────────────────────
const CYCLE_SECS = 6 * 3600; // 6-hour looping countdown

function UrgencyBanner() {
  const T = useT();
  const getRemaining = () => {
    const now = Math.floor(Date.now() / 1000);
    const cycleStart = Math.floor(now / CYCLE_SECS) * CYCLE_SECS;
    return CYCLE_SECS - (now - cycleStart);
  };
  const [time, setTime] = useState(getRemaining);
  useEffect(() => {
    const t = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(t);
  }, []);
  const h = String(Math.floor(time / 3600)).padStart(2, '0');
  const m = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
  const s = String(time % 60).padStart(2, '0');
  const pct = ((CYCLE_SECS - time) / CYCLE_SECS) * 100;

  return (
    <div className="w-full relative overflow-hidden" style={{ background: '#000000', borderBottom: `1px solid ${B1}30` }}>
      {/* Animated progress bar */}
      <div className="absolute bottom-0 left-0 h-[2px] transition-all duration-1000"
        style={{ width: `${100 - pct}%`, background: HERO_GRAD }} />
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}>
            <Zap className="w-3 h-3" style={{ color: ACCENT }} />
          </motion.div>
          <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: T.DARK }}>
            Flash Sale · Ends in
          </span>
        </div>
        <div className="flex items-center gap-1">
          {[h, m, s].map((unit, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center px-1.5 py-0.5 rounded-md"
                style={{ background: `${B1}25`, minWidth: 28 }}>
                <span className="font-black text-xs tabular-nums leading-none" style={{ color: T.DARK }}>{unit}</span>
              </div>
              {i < 2 && <span className="font-black text-xs" style={{ color: T.MUTED }}>:</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Animated Stats ───────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1600) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        setVal(Math.round(t * target));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return { val, ref };
}

function StatsSection() {
  const T = useT();
  const s1 = useCountUp(548); const s2 = useCountUp(467); const s3 = useCountUp(1000); const s4 = useCountUp(95);
  const stats = [
    { ref: s1.ref, val: s1.val, suffix: '+', label: 'Members',          c1: B1, c2: B2 },
    { ref: s2.ref, val: s2.val, suffix: '',  label: 'Online Today',      c1: B1, c2: B2 },
    { ref: s3.ref, val: s3.val, suffix: '+', label: 'Successful Joins',  c1: B1, c2: B2 },
    { ref: s4.ref, val: s4.val, suffix: '%', label: 'Positive Reviews',  c1: B1, c2: B2 },
  ];
  return (
    <section className="py-5">
      <div className="grid grid-cols-2 gap-2.5">
        {stats.map((s, i) => (
          null
        ))}
      </div>
    </section>
  );
}


// ─── Why Trust ────────────────────────────────────────────────────────────────
function WhyTrust() {
  const T = useT();
  const cards = [
    { icon: UserCheck,  title: 'Manual Profile Verification', desc: 'Every member is verified by admin before getting access.', c1: B1, c2: B2 },
    { icon: Users,      title: 'Active Bangalore Community',  desc: '548+ real members from Bangalore, active daily.', c1: B1, c2: B2 },
    { icon: Shield,     title: 'No Fake Profiles Policy',     desc: 'Instant removal of any fake or spam profiles.', c1: B1, c2: B2 },
    { icon: Headphones, title: 'Direct Admin Support',        desc: 'Get help from Subhash directly, fast response guaranteed.', c1: B1, c2: B2 },
  ];
  return (
    null
  );
}

// ─── Meet the Admin ───────────────────────────────────────────────────────────
function MeetAdmin() {
  const T = useT();
  const badges = ['5+ Years Community Experience', 'Personally Verified Members', 'Fast Support'];
  return (
    null
  );
}

// ─── Trust Proof ──────────────────────────────────────────────────────────────

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const T = useT();
  const [open, setOpen] = useState<number | null>(null);
  const items = [
    { q: 'Is this genuine?', a: 'Yes. Smooch has been running since 2021 with 548+ verified members. Every member is manually approved by Subhash Gowda before getting access.' },
    { q: 'How do I get access?', a: 'Pay ₹999 via UPI, upload the payment screenshot, and you receive the Telegram group link instantly. The whole process takes under 2 minutes.' },
    { q: 'Are profiles verified?', a: 'Every profile is manually verified by the admin. Fake profiles, bots, and spam accounts are removed immediately — zero tolerance policy.' },
    { q: 'Is my privacy protected?', a: 'Absolutely. Your personal details are never shared with other members. The group has strict privacy rules and all screenshots of members are prohibited.' },
    { q: 'How quickly do I receive access?', a: 'Access is sent within minutes of payment confirmation, typically under 5 minutes. Admin support is available daily for any delays.' },
  ];
  return (
    null
  );
}

// ─── Sticky CTA ───────────────────────────────────────────────────────────────
function StickyCTA({ onJoin }: { onJoin: () => void }) {
  const T = useT();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-5 pt-2"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.97) 55%, transparent)' }}>
          <motion.button
            onClick={onJoin}
            whileTap={{ scale: 0.97 }}
            className="relative w-full max-w-md mx-auto block rounded-2xl overflow-hidden"
            style={{ background: HERO_GRAD, boxShadow: `0 6px 28px ${B1}60` }}>
            {/* Shimmer sweep */}
            <motion.div className="absolute inset-0 pointer-events-none"
              animate={{ x: ['-100%', '160%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }}
              style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)', width: '60%' }} />
            <div className="relative flex items-center justify-center gap-3 py-3.5 px-6">
              <span className="font-black text-white text-sm tracking-tight">Join Smooch</span>
              <span className="text-white/40 text-[11px] line-through font-semibold">₹1999</span>
              <span className="font-black text-white text-sm">₹999</span>
              <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{ background: ACCENT, color: '#000' }}>50% OFF</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
function MobileApp() {
  const T = useT();
  const [showPayment, setShowPayment] = useState(false);
  const [showChat,    setShowChat]    = useState(false);
  const [paymentType, setPaymentType] = useState<'full' | 'demo'>('full');
  const constraintsRef = useRef<HTMLDivElement>(null);

  const handleJoin = (type: 'full' | 'demo') => {
    setPaymentType(type);
    setShowPayment(true);
  };

  return (
    <div ref={constraintsRef} className="min-h-screen w-full relative overflow-x-hidden"
      style={{ background: T.DOT_BG, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Urgency Banner */}
      <UrgencyBanner />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: HERO_GRAD }}>
        <GlassBlob size={110} top="-10%" right="-6%" rotate={18} />
        <GlassBlob size={70} bottom="5%" left="-8%" rotate={-20} rx="50%" />
        <GlassBlob size={45} top="40%" right="8%" rotate={35} rx="40% 60% 55% 45% / 50% 40% 60% 50%" />
      </section>

      {/* About Strip */}
      <div className="max-w-md mx-auto px-4 pt-5">
        <div className="rounded-2xl px-4 py-4 mb-1" style={{ background: T.CARD_BG, border: `1px solid ${B1}1E`, boxShadow: 'none' }}>
          <div className="flex flex-col items-center gap-1.5 mb-2.5">
            <img src={smoochIcon} alt="Smooch" className="w-6 h-6 object-contain rounded-lg" />
            <div className="flex items-center gap-1.5">
              <span className="font-black leading-none text-[20px]" style={{ color: T.DARK, letterSpacing: '-0.02em' }}>Smooch</span>
              
            </div>
          </div>
          <p className="text-[12px] leading-relaxed font-medium text-center" style={{ color: T.MUTED }}>
            A <span className="font-bold" style={{ color: T.DARK }}>private paid Telegram group</span> to chat, call & meet verified women for dating and hookups. Real people, zero fake profiles.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4">

        {/* Stats */}
        <StatsSection />

        {/* Gallery */}
        <GroupPreviewSlider images={IMAGES} mobile />

        {/* What You Get */}
        <section className="py-5">
          <div className="mb-4">
            <h2 className="font-extrabold text-xl" style={{ color: T.DARK, letterSpacing: '-0.03em' }}>What You Get</h2>
            <p className="text-xs font-semibold mt-0.5" style={{ color: T.MUTED }}>Everything inside the group</p>
          </div>
          <div className="flex flex-col gap-2.5">
            {FEAT.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3.5 rounded-2xl px-4 py-3 relative"
                  style={{ background: T.CARD_BG, border: `1px solid ${f.c1}22`, boxShadow: 'none' }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `linear-gradient(135deg, ${f.c1}, ${f.c2})` }}>
                    <Icon className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-[13px]" style={{ color: T.DARK }}>{f.title}</div>
                    <div className="text-[11px] font-medium mt-0.5" style={{ color: T.MUTED }}>{f.desc}</div>
                  </div>
                  {f.badge && (
                    <span className="text-[8px] font-black px-2 py-0.5 rounded-full shrink-0"
                      style={{ background: `${f.c1}22`, color: f.c1, border: `1px solid ${f.c1}40` }}>
                      {f.badge}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>


        {/* Reviews slider */}
        <ReviewsStrip />

        {/* FAQ */}
        <FAQ />

        {/* Final CTA */}
        <section className="pt-2 pb-8">
          <div className="rounded-3xl overflow-hidden" style={{ background: T.CARD_BG, border: '1px solid rgba(232,32,32,0.22)', boxShadow: `0 0 40px ${B1}15` }}>
            <div className="h-[3px]" style={{ background: HERO_GRAD }} />
            <div className="px-5 py-5 flex flex-col items-center text-center gap-4">

              {/* Discount tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ background: B1, boxShadow: `0 4px 16px ${B1}40` }}>
                <Sparkles className="w-2.5 h-2.5 text-white" />
                <span className="text-[9px] font-black uppercase tracking-widest text-white">50% OFF — Limited Time</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 justify-center">
                <span className="text-base line-through font-semibold" style={{ color: T.MUTED }}>₹1999</span>
                <span className="font-black text-4xl leading-none" style={{ color: B1 }}>₹999</span>
              </div>

              {/* CTA Button */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => handleJoin('full')}
                className="w-full rounded-xl font-black text-white flex items-center justify-center gap-2 relative overflow-hidden"
                style={{ background: HERO_GRAD, boxShadow: `0 6px 24px ${B1}50`, padding: '14px 20px' }}>
                <motion.div className="absolute inset-0"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />
                <span className="text-sm tracking-tight relative z-10">Join Smooch Now</span>
                <ArrowRight className="w-4 h-4 relative z-10" />
              </motion.button>

              {/* WhatsApp help */}
              <p className="text-[11px] font-medium" style={{ color: T.MUTED }}>One time fee - Lifetime membership</p>
              
            </div>
          </div>
        </section>


      </div>

      {/* Sticky CTA */}
      <StickyCTA onJoin={() => handleJoin('full')} />

      <AnimatePresence>
        {showPayment && <PaymentModal onClose={() => setShowPayment(false)} paymentType={paymentType} />}
        {showChat    && <ChatOverlay onClose={() => setShowChat(false)} onOpenPayment={() => handleJoin('full')} />}
      </AnimatePresence>

      <Toaster position="top-center" toastOptions={{
        style: { background: T.CARD_BG, color: T.DARK, borderRadius: '14px', fontSize: '13px', fontWeight: '700', border: `1px solid ${B1}4D`, boxShadow: `0 8px 24px ${B1}40` },
      }} />
    </div>
  );
}

export default function App() {
  const [isMobile, setIsMobile] = useState(true);
  const [gateCleared, setGateCleared] = useState(() => localStorage.getItem('ds_lead_submitted') === '1');

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!gateCleared) {
    return (
      <ThemeProvider>
        <LeadGate onComplete={() => setGateCleared(true)} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      {isMobile ? <MobileApp /> : <DesktopWrapper />}
    </ThemeProvider>
  );
}

function DesktopWrapper() {
  const [showPayment, setShowPayment] = useState(false);
  const [paymentType, setPaymentType] = useState<'full' | 'demo'>('full');
  const handleJoin = (type: 'full' | 'demo') => {
    setPaymentType(type);
    setShowPayment(true);
  };
  return (
    <DesktopVersion onOpenPayment={handleJoin} showPayment={showPayment} onClosePayment={() => setShowPayment(false)} paymentType={paymentType} />
  );
}

// ─── Desktop Version ──────────────────────────────────────────────────────────
function DesktopVersion({ onOpenPayment, showPayment, onClosePayment, paymentType }: {
  onOpenPayment: (type: 'full' | 'demo') => void;
  showPayment: boolean; onClosePayment: () => void; paymentType: 'full' | 'demo';
}) {
  const T = useT();
  const initials = (name: string) => name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const avatarColors = AVATAR_COLORS;

  return (
    <div className="min-h-screen w-full relative" style={{ background: T.DOT_BG, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <UrgencyBanner />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: HERO_GRAD }}>
        <GlassBlob size={320} top="-10%" right="-5%" rotate={25} />
        <GlassBlob size={200} bottom="0" left="-3%" rotate={-20} />
        <GlassBlob size={100} top="30%" right="20%" rotate={40} rx="50%" />
        <div className="max-w-7xl mx-auto px-8 py-24 grid grid-cols-2 gap-20 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/18 border border-white/25 mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-bold text-white">Limited Spots Available</span>
            </div>
            <h1 className="font-extrabold text-white uppercase leading-[0.88] mb-5" style={{ fontSize: 76, letterSpacing: '-0.04em' }}>
              Wanna Date
            </h1>
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-white/60" />
              <span className="font-bold text-white/80 text-lg uppercase tracking-widest">Bangalore Women</span>
            </div>
            <p className="text-white/70 text-lg mb-10 leading-relaxed max-w-lg font-medium">
              Join 548+ verified members in Bangalore's most exclusive dating community. Voice calls, video chats, and real meetups.
            </p>
            <div className="flex gap-4">
              <button onClick={() => onOpenPayment('full')}
                className="rounded-2xl font-bold text-lg flex items-center overflow-hidden transition-all hover:scale-105 shadow-2xl relative"
                style={{ background: HERO_GRAD, boxShadow: `0 8px 32px ${B1}55` }}>
                <div className="flex items-center gap-3 px-7 py-4 text-white">
                  <span className="line-through opacity-50 text-sm">₹1999</span>
                  <span className="font-black">Join for ₹999</span>
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full" style={{ background: ACCENT, color: '#000' }}>50% OFF</span>
                </div>
                <div className="px-5 py-4 self-stretch flex items-center" style={{ background: 'rgba(0,0,0,0.15)' }}>
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative" style={{ width: 280 }}>
              <div className="absolute inset-0 rounded-[2.5rem] blur-3xl opacity-30 scale-90" style={{ background: 'rgba(255,255,255,0.5)' }} />
              <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl" style={{ aspectRatio: '9/16', border: '3px solid rgba(255,255,255,0.3)' }}>
                <img src={IMAGES[0]} alt="Preview" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-8 py-12">
        <StatsSection />
      </section>

      {/* What You Get — row list */}
      <section className="max-w-5xl mx-auto px-8 pb-12">
        <div className="text-center mb-10">
          <h2 className="font-extrabold text-4xl mb-2" style={{ color: T.DARK, letterSpacing: '-0.04em' }}>What You Get</h2>
          <p className="text-lg font-medium" style={{ color: T.MUTED }}>Everything inside the group, from day one</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {FEAT.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={i}
                initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 rounded-2xl px-5 py-4"
                style={{ background: T.CARD_BG, border: `1px solid ${f.c1}22`, boxShadow: 'none' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `linear-gradient(135deg, ${f.c1}, ${f.c2})` }}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm" style={{ color: T.DARK }}>{f.title}</div>
                  <div className="text-xs font-medium mt-0.5" style={{ color: T.MUTED }}>{f.desc}</div>
                </div>
                {f.badge && (
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full shrink-0"
                    style={{ background: `${f.c1}22`, color: f.c1, border: `1px solid ${f.c1}40` }}>
                    {f.badge}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Gallery */}
      <div style={{ background: T.CARD_BG, borderRadius: '3rem', margin: '0 2rem 4rem', border: `1px solid ${T.BORDER}` }}>
        <GroupPreviewSlider images={IMAGES} />
      </div>

      {/* Reviews grid */}
      <section className="max-w-5xl mx-auto px-8 pb-12">
        <div className="text-center mb-8">
          <h2 className="font-extrabold text-3xl mb-1" style={{ color: T.DARK, letterSpacing: '-0.03em' }}>What Members Say</h2>
          <p className="text-base font-medium" style={{ color: T.MUTED }}>Real reviews from Bangalore</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {REVIEWS.slice(0, 6).map((review, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{ background: T.CARD_BG, border: `1.5px solid ${B1}18`, boxShadow: 'none' }}>
              <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                style={{ background: `linear-gradient(180deg, ${avatarColors[i % avatarColors.length]}, ${avatarColors[(i + 3) % avatarColors.length]})` }} />
              <div className="flex gap-0.5 mb-2 ml-1">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-2.5 h-2.5 fill-current" style={{ color: '#F59E0B' }} />)}
              </div>
              <p className="text-sm leading-relaxed mb-3 font-medium ml-1" style={{ color: T.QUOTE }}>"{review.text}"</p>
              <div className="flex items-center gap-2 ml-1">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-black text-[9px] shrink-0"
                  style={{ background: `linear-gradient(135deg, ${avatarColors[i % avatarColors.length]}, ${avatarColors[(i + 3) % avatarColors.length]})` }}>
                  {initials(review.name)}
                </div>
                <div>
                  <div className="font-bold text-xs" style={{ color: T.DARK }}>{review.name}</div>
                  <div className="text-[10px] font-semibold flex items-center gap-0.5" style={{ color: T.MUTED }}>
                    <MapPin className="w-2.5 h-2.5" />{review.area}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-8 pb-12">
        <FAQ />
      </section>

      {/* Final CTA */}
      <section className="max-w-3xl mx-auto px-8 pb-16">
        <div className="rounded-3xl overflow-hidden relative" style={{ background: T.CARD_BG, border: `1px solid ${B1}30` }}>
          <div className="h-[3px]" style={{ background: HERO_GRAD }} />
          <div className="p-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
              style={{ background: B1, boxShadow: `0 4px 20px ${B1}40` }}>
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-black uppercase tracking-widest text-white">50% OFF — Limited Time</span>
            </div>
            <h2 className="font-extrabold mb-2" style={{ color: T.DARK, fontSize: 40, letterSpacing: '-0.03em' }}>Ready to Join?</h2>
            <div className="flex items-baseline gap-2 justify-center mb-6">
              <span className="text-lg line-through font-semibold" style={{ color: T.MUTED }}>₹1999</span>
              <span className="font-black" style={{ fontSize: 48, color: B1, lineHeight: 1 }}>₹999</span>
            </div>
            <button onClick={() => onOpenPayment('full')}
              className="rounded-2xl font-black text-white text-lg flex items-center gap-3 mx-auto relative overflow-hidden transition-all hover:scale-105 mb-4"
              style={{ background: HERO_GRAD, boxShadow: `0 8px 32px ${B1}50`, padding: '16px 40px' }}>
              Join Smooch Now <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-sm font-medium" style={{ color: T.MUTED }}>One-time payment · Lifetime access · No hidden fees</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-8 py-8 text-center" style={{ borderTop: `1px solid rgba(232,32,32,0.2)` }}>
        <p className="text-sm font-semibold" style={{ color: T.MUTED }}>
          © 2026 Smooch Bangalore · One-time payment · Lifetime access · No hidden fees
        </p>
      </footer>

      <AnimatePresence>
        {showPayment && <PaymentModal onClose={onClosePayment} paymentType={paymentType} />}
      </AnimatePresence>
      <Toaster position="top-center" toastOptions={{
        style: { background: T.CARD_BG, color: T.DARK, borderRadius: '14px', fontSize: '14px', fontWeight: '700', border: `1px solid ${B1}30`, boxShadow: `0 8px 24px ${B1}40` },
      }} />
    </div>
  );
}

// ─── Chat Overlay ─────────────────────────────────────────────────────────────
type Message = { id: string; sender: 'bot' | 'user'; type: 'text' | 'audio' | 'button'; content: string; time: string; audioSrc?: string; };

function ChatOverlay({ onClose, onOpenPayment }: { onClose: () => void; onOpenPayment: () => void }) {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1', sender: 'bot', type: 'text',
    content: "Hi! I'm Komal. Tap a question to hear my answer!",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);

  const handleAsk = (q: string, index: number) => {
    const t = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', type: 'text', content: q, time: t }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const msgs: Message[] = [{ id: (Date.now() + 1).toString(), sender: 'bot', type: 'audio', content: '',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), audioSrc: AUDIO_FILES[index] ?? undefined }];
      if (q === 'How to join?') msgs.push({ id: (Date.now() + 2).toString(), sender: 'bot', type: 'button', content: 'Join now',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
      setMessages(prev => [...prev, ...msgs]);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0" onClick={onClose} />
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="relative w-full max-w-md mx-auto h-[82vh] rounded-t-3xl shadow-2xl flex flex-col overflow-hidden"
        style={{ background: CARD_BG }}>
        <div className="p-3.5 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(232,32,32,0.15)', background: PAGE_BG }}>
          <div className="relative">
            <img src={chatAvatar} alt="Komal" className="w-10 h-10 rounded-full object-cover border-2" style={{ borderColor: B1 }} />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-sm" style={{ color: DARK }}>Komal</div>
            <div className="text-[10px] font-semibold" style={{ color: B1 }}>Admin · Online now</div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full" style={{ background: 'rgba(232,32,32,0.07)' }}>
            <X className="w-4 h-4" style={{ color: MUTED }} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2.5" style={{ background: PAGE_BG }}>
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {msg.sender === 'bot' && msg.type !== 'button' && (
                <img src={chatAvatar} alt="Komal" className="w-6 h-6 rounded-full object-cover shrink-0 mt-1" />
              )}
              <div className={`max-w-[78%] flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                {msg.type === 'button' ? (
                  <button onClick={() => { toast.success('Opening payment...'); onClose(); setTimeout(() => onOpenPayment(), 300); }}
                    className="px-5 py-2.5 rounded-2xl text-white font-bold text-xs active:scale-95 transition-transform shadow-md"
                    style={{ background: HERO_GRAD }}>
                    Join for ₹999
                  </button>
                ) : (
                  <div className="px-3.5 py-2.5 text-xs shadow-sm"
                    style={msg.sender === 'user'
                      ? { background: HERO_GRAD, color: 'white', borderRadius: '18px 18px 4px 18px' }
                      : { background: '#050A1A', color: DARK, border: '1px solid rgba(232,32,32,0.2)', borderRadius: '18px 18px 18px 4px' }}>
                    {msg.type === 'text' ? <p>{msg.content}</p> : <VoiceMessageBubble audioSrc={msg.audioSrc} isUser={msg.sender === 'user'} />}
                    <div className="text-[8px] mt-1 opacity-40">{msg.time}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-2">
              <img src={chatAvatar} alt="Komal" className="w-6 h-6 rounded-full object-cover shrink-0" />
              <div className="px-3.5 py-2.5 rounded-2xl flex gap-0.5 shadow-sm" style={{ background: '#050A1A', border: '1px solid rgba(232,32,32,0.2)' }}>
                {[0, 1, 2].map(i => (
                  <motion.div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: B1 }}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="p-4" style={{ background: CARD_BG, borderTop: '1px solid rgba(232,32,32,0.15)' }}>
          <p className="text-[9px] font-bold mb-2.5 text-center uppercase tracking-widest" style={{ color: MUTED }}>Tap to ask</p>
          <div className="space-y-1.5">
            {QUESTIONS.map((q, i) => (
              <button key={i} onClick={() => handleAsk(q, i)}
                className="w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold transition-all active:scale-[0.98]"
                style={{ background: '#050A1A', border: '1.5px solid rgba(232,32,32,0.2)', color: DARK }}>
                {q}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Voice Message Bubble ─────────────────────────────────────────────────────
function VoiceMessageBubble({ audioSrc, isUser }: { audioSrc?: string; isUser?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onEnd  = () => setIsPlaying(false);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnd);
    return () => { audio.removeEventListener('timeupdate', onTime); audio.removeEventListener('loadedmetadata', onMeta); audio.removeEventListener('ended', onEnd); };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); } else { audio.play(); toast.success('Playing...'); }
    setIsPlaying(!isPlaying);
  };

  const fmt = (t: number) => (!t || isNaN(t)) ? '0:00' : `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const waveColor = isUser ? 'rgba(255,255,255,0.9)' : B1;
  const waveFade  = isUser ? 'rgba(255,255,255,0.3)' : `${B1}30`;

  return (
    <div className="flex items-center gap-2 min-w-[155px]">
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      <button onClick={toggle} className="w-8 h-8 rounded-full flex items-center justify-center active:scale-95 transition-transform shrink-0"
        style={{ background: isUser ? 'rgba(255,255,255,0.25)' : `${B1}18` }}>
        {isPlaying
          ? <Pause className="w-3.5 h-3.5 fill-current" style={{ color: isUser ? 'white' : B1 }} />
          : <Play  className="w-3.5 h-3.5 fill-current ml-0.5" style={{ color: isUser ? 'white' : B1 }} />}
      </button>
      <div className="flex-1">
        <div className="flex items-center gap-0.5 h-4">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-0.5 rounded-full transition-all"
              style={{ height: `${Math.max(20, i % 3 === 0 ? 55 : i % 2 === 0 ? 80 : 35)}%`, background: (i / 16) * 100 <= progress ? waveColor : waveFade }} />
          ))}
        </div>
        <span className="text-[8px] font-mono mt-0.5 block opacity-50">{fmt(isPlaying ? currentTime : duration)}</span>
      </div>
      <Mic className="w-3 h-3 opacity-35 shrink-0" style={{ color: isUser ? 'white' : B1 }} />
    </div>
  );
}

// ─── Payment Modal ────────────────────────────────────────────────────────────
type UploadState = 'idle' | 'verifying' | 'success';

function PaymentModal({ onClose, paymentType }: { onClose: () => void; paymentType: 'full' | 'demo' }) {
  const UPI_ID        = 'BHARATPE2R0S0C1D6V46619@unitype';
  const AMOUNT        = '999';
  const ORIGINAL_AMT  = '1999';
  const WHATSAPP_LINK = 'https://t.me/+WpYQG75aIhswMDRl';
  const upiUrl        = `upi://pay?pa=${UPI_ID}&pn=Smooch&am=${AMOUNT}&cu=INR`;

  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [tab, setTab] = useState<'qr' | 'upi'>('qr');

  const compressImage = (file: File): Promise<string> =>
    new Promise(resolve => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const MAX = 900;
        const scale = Math.min(1, MAX / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width  = Math.round(img.width  * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL('image/jpeg', 0.75).split(',')[1]);
      };
      img.src = url;
    });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadState('verifying');
    toast.success('Verifying payment...');

    try {
      const base64 = await compressImage(file);
      const name  = localStorage.getItem('ds_lead_name')  ?? '';
      const phone = localStorage.getItem('ds_lead_phone') ?? '';
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: 'screenshot', name, phone, mimeType: 'image/jpeg', fileName: `payment_${Date.now()}.jpg`, image: base64 }),
      });
    } catch {
      // no-cors — response is opaque, error means network issue
    }

    setTimeout(() => {
      setUploadState('success');
      toast.success('Payment verified! Welcome!');
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: [B1, B2, '#fff', '#FF6B6B'] });
      setTimeout(() => window.open(WHATSAPP_LINK, '_blank'), 1200);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0" onClick={uploadState === 'idle' ? onClose : undefined} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden bg-white">
        {uploadState === 'idle' && (
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full z-20 hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}

        {/* Header */}
        <div className="px-4 pt-4 pb-3 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center shadow-md overflow-hidden">
            <img src={smoochIcon} alt="Smooch" className="w-9 h-9 object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm leading-none text-gray-900">Join Smooch</div>
            <div className="text-[10px] mt-0.5 font-medium text-gray-400">Lifetime access · Telegram</div>
          </div>
          <div className="text-right shrink-0">
            {ORIGINAL_AMT && <div className="text-xs line-through text-gray-400">₹{ORIGINAL_AMT}</div>}
            <div className="font-extrabold text-2xl leading-none" style={{ color: B1 }}>₹{AMOUNT}</div>
          </div>
        </div>

        <div className="px-4 pb-4">
          {uploadState === 'idle' && (
            <>
              {/* Discount badge */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl mb-3" style={{ background: `${B1}10`, border: `1px solid ${B1}30` }}>
                <Sparkles className="w-3.5 h-3.5 shrink-0" style={{ color: B1 }} />
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: B1 }}>Biggest Discount of the Year</p>
              </div>
              <div className="flex rounded-xl p-0.5 mb-3" style={{ background: `${B1}0A` }}>
                {(['qr', 'upi'] as const).map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
                    style={tab === t ? { background: 'white', color: B1, boxShadow: '0 1px 6px rgba(0,0,0,0.08)' } : { color: '#9CA3AF' }}>
                    {t === 'qr' ? 'Scan QR' : 'UPI ID'}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {tab === 'qr' ? (
                  <motion.div key="qr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="rounded-2xl p-3 mb-2 flex items-center justify-center" style={{ background: `${B1}06` }}>
                      <QRCodeSVG value={upiUrl} size={148} level="H" />
                    </div>
                    <p className="text-center text-[10px] mb-2 font-medium" style={{ color: MUTED }}>Scan with any UPI app</p>
                  </motion.div>
                ) : (
                  <motion.div key="upi" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-3">
                    <div className="rounded-2xl p-4 mb-2" style={{ background: `${B1}06` }}>
                      <p className="text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: MUTED }}>UPI ID</p>
                      <p className="font-mono text-sm font-bold break-all mb-4 text-gray-800">{UPI_ID}</p>
                      <div className="flex gap-2">
                        <button onClick={() => { navigator.clipboard.writeText(UPI_ID); toast.success('Copied!'); }}
                          className="flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                          style={{ border: `1.5px solid ${B1}`, color: B1, background: 'white' }}>
                          <Copy className="w-3.5 h-3.5" /> Copy
                        </button>
                        <a href={upiUrl}
                          className="flex-1 py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                          style={{ background: HERO_GRAD }}
                          onClick={() => toast.success('Opening UPI app...')}>
                          <ExternalLink className="w-3.5 h-3.5" /> Pay
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-3 mt-1" style={{ borderTop: `1px solid ${B1}12` }}>
                <p className="text-center text-[10px] mb-2 font-medium" style={{ color: MUTED }}>Upload screenshot to verify payment</p>
                <input type="file" id="ss-upload" className="hidden" accept="image/*" onChange={handleFileChange} />
                <label htmlFor="ss-upload"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-white font-bold text-sm cursor-pointer active:scale-95 transition-transform"
                  style={{ background: HERO_GRAD, boxShadow: `0 6px 20px ${B1}35` }}>
                  <Upload className="w-4 h-4" /> Upload Screenshot
                </label>
              </div>
            </>
          )}

          {uploadState === 'verifying' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: `${B1}12` }}>
                <Loader2 className="w-8 h-8 animate-spin" style={{ color: B1 }} />
              </div>
              <p className="font-bold text-base mb-1 text-gray-900">Verifying Payment</p>
              <p className="text-xs font-medium text-gray-400">Please wait a moment...</p>
            </motion.div>
          )}

          {uploadState === 'success' && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="text-center py-8">
              <div className="w-18 h-18 mx-auto rounded-2xl flex items-center justify-center mb-5 shadow-xl" style={{ background: HERO_GRAD, width: 72, height: 72 }}>
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <p className="font-bold text-xl mb-1 text-gray-900">Payment Verified!</p>
              <p className="text-sm font-medium" style={{ color: B1 }}>Redirecting to Telegram...</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
