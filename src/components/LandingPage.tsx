import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Globe,
  Mail,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  Truck,
  Wallet,
} from 'lucide-react';
import womanStanding from '@/assets/Womanstanding.png';
import manOnPhone from '@/assets/Manonphone.png';
import individualsPhoneVideo from '@/assets/2026-03-18 12.31.21.mp4';
import merchantsPhoneVideo from '@/assets/2026-03-18 12.30.39.mp4';
import section3LaptopVideoMp4 from '@/assets/Normauserpayingmerchant.mp4';
import section3LaptopVideo from '@/assets/Normauserpayingmerchant.mov';
import merchantLaptopVideoMp4 from '@/assets/Merchant WebDashboardWalkthrough.mp4';
import merchantLaptopVideo from '@/assets/Merchant WebDashboardWalkthrough.mov';

type VideoSource = {
  src: string;
  type: string;
};

const useIsMobileViewport = () => {
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateViewport = () => setIsMobileViewport(mediaQuery.matches);

    updateViewport();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateViewport);
      return () => mediaQuery.removeEventListener('change', updateViewport);
    }

    mediaQuery.addListener(updateViewport);
    return () => mediaQuery.removeListener(updateViewport);
  }, []);

  return isMobileViewport;
};

const revealUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const revealLeft = {
  hidden: { opacity: 0, x: -28, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const revealRight = {
  hidden: { opacity: 0, x: 28, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const AmbientVideo = ({
  sources,
  title,
  objectFit = 'object-cover',
  className = '',
}: {
  sources: VideoSource[];
  title: string;
  objectFit?: 'object-cover' | 'object-contain';
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return undefined;
    }

    let isCancelled = false;

    const tryPlay = async () => {
      if (isCancelled) {
        return;
      }

      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;

      try {
        await video.play();
      } catch {
        // Mobile browsers can reject autoplay transiently; retry via visibility/media events.
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        void tryPlay();
      }
    };

    const handleCanPlay = () => {
      void tryPlay();
    };

    const observer =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(
            (entries) => {
              if (entries.some((entry) => entry.isIntersecting)) {
                void tryPlay();
              }
            },
            { threshold: 0.35 }
          );

    observer?.observe(video);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    video.addEventListener('loadedmetadata', handleCanPlay);
    video.addEventListener('canplay', handleCanPlay);

    void tryPlay();

    return () => {
      isCancelled = true;
      observer?.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      video.removeEventListener('loadedmetadata', handleCanPlay);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [sources]);

  return (
    <video
      ref={videoRef}
      aria-label={title}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
      className={`h-full w-full ${objectFit} ${className}`}
    >
      {sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );
};

const PhoneSimulator = ({
  videoSources,
  videoTitle,
}: {
  videoSources: VideoSource[];
  videoTitle: string;
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      animate={prefersReducedMotion ? undefined : { y: [0, -6, 0], rotateZ: [0, -0.6, 0] }}
      transition={prefersReducedMotion ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      className="relative h-[500px] w-[246px] rounded-[2.2rem] bg-[#101010] p-2.5 shadow-2xl ring-1 ring-white/10 sm:h-[590px] sm:w-[288px] sm:rounded-[2.5rem] sm:p-[10px]"
    >
      <motion.div
        animate={prefersReducedMotion ? undefined : { opacity: [0.15, 0.35, 0.15] }}
        transition={prefersReducedMotion ? undefined : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-x-10 top-2 h-10 rounded-full bg-white/5 blur-xl"
      />
      <div className="absolute left-1/2 top-4 z-30 flex -translate-x-1/2 items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-[#2d2d2d] shadow-[0_0_0_2px_rgba(255,255,255,0.04)]" />
        <div className="h-1.5 w-16 rounded-full bg-[#242424]" />
      </div>
      <div className="absolute right-[-2px] top-28 h-12 w-1 rounded-full bg-[#1f1f1f]" />
      <div className="absolute right-[-2px] top-44 h-20 w-1 rounded-full bg-[#1f1f1f]" />
      <div className="absolute left-[-2px] top-36 h-16 w-1 rounded-full bg-[#1f1f1f]" />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/5 bg-black sm:rounded-[2rem]">
        <AmbientVideo
          sources={videoSources}
          title={videoTitle}
          objectFit="object-contain"
          className="bg-black p-2"
        />
        <motion.div
          animate={prefersReducedMotion ? undefined : { x: ['-120%', '140%'] }}
          transition={prefersReducedMotion ? undefined : { duration: 4.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.6 }}
          className="pointer-events-none absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-md"
        />
      </div>
    </motion.div>
  );
};

const Section = ({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <section id={id} className={`relative flex min-h-screen flex-col justify-center px-4 py-24 sm:px-6 sm:py-28 md:py-40 ${className}`}>
    {children}
  </section>
);

const ParallaxText = ({ children }: { children: string }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="overflow-hidden whitespace-nowrap py-8 leading-[0.8] tracking-tighter sm:py-10">
      <motion.div
        animate={prefersReducedMotion ? undefined : { x: ['0%', '-18%'] }}
        transition={prefersReducedMotion ? undefined : { duration: 28, repeat: Infinity, ease: 'linear' }}
        className="flex gap-8 whitespace-nowrap font-display text-[18vw] font-black uppercase opacity-5 sm:gap-12 sm:text-[15vw]"
      >
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
      </motion.div>
    </div>
  );
};

const LaptopAnimation = ({
  caption,
  windowLabel,
  videoSources,
  videoTitle,
}: {
  caption: string;
  windowLabel: string;
  videoSources: VideoSource[];
  videoTitle: string;
}) => {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobileViewport = useIsMobileViewport();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [-105, 0, 0, -105]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const captionY = useTransform(scrollYProgress, [0, 0.5, 1], [18, 0, -12]);
  const useFlatShell = prefersReducedMotion || isMobileViewport;

  return (
    <div ref={containerRef} className="mt-16 flex w-full flex-col items-center justify-center sm:mt-24">
      <motion.div
        style={{ opacity }}
        animate={useFlatShell ? undefined : { y: [0, -4, 0] }}
        transition={useFlatShell ? undefined : { duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative aspect-[16/10] w-full max-w-[520px] sm:max-w-[600px] sm:[perspective:2000px]"
      >
        <motion.div
          style={{
            rotateX: useFlatShell ? 0 : rotateX,
            transformOrigin: 'bottom',
            transformStyle: useFlatShell ? 'flat' : 'preserve-3d',
          }}
          className="absolute bottom-[8%] left-[5%] right-[5%] z-20 h-[85%] overflow-hidden rounded-t-xl border-[4px] border-tikibox-navy/20 bg-tikibox-navy shadow-2xl"
        >
          <div className="relative flex h-full w-full flex-col bg-white">
            <div className="flex h-6 items-center gap-1.5 bg-tikibox-navy px-3">
              <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
              <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              <div className="ml-2 text-[6px] font-black uppercase tracking-widest text-white/40">{windowLabel}</div>
            </div>
            <div className="relative flex-1 overflow-hidden bg-[#0f1015]">
              <AmbientVideo
                sources={videoSources}
                title={videoTitle}
                objectFit="object-contain"
                className="bg-[#0f1015]"
              />
              <motion.div
                animate={useFlatShell ? undefined : { x: ['-120%', '140%'] }}
                transition={useFlatShell ? undefined : { duration: 5.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2.4 }}
                className="pointer-events-none absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/8 to-transparent blur-md"
              />
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 z-10 h-[10%] rounded-b-xl bg-tikibox-navy shadow-2xl">
          <div className="absolute left-1/2 top-0 mt-1.5 h-1 w-24 -translate-x-1/2 rounded-full bg-white/10" />
        </div>
      </motion.div>

      <motion.p style={{ opacity, y: useFlatShell ? 0 : captionY }} className="mt-6 text-[7px] font-black uppercase tracking-[0.32em] text-tikibox-navy/20 sm:mt-8 sm:text-[8px] sm:tracking-[0.4em]">
        {caption}
      </motion.p>
    </div>
  );
};

const navLinks = [
  { href: '#individuals', label: 'Individuals' },
  { href: '#merchants', label: 'Merchants' },
  { href: '#suppliers', label: 'Suppliers' },
];

const heroLinks = [
  { href: '#about', label: 'About' },
  { href: '#concept', label: 'Concept' },
  { href: '#contact', label: 'Contact' },
];

const footerLinks = [
  { href: '#about', label: 'About' },
  { href: '#concept', label: 'Concept' },
  { href: '#individuals', label: 'Buy' },
  { href: '#merchants', label: 'Sell' },
  { href: '#resources', label: 'Resources' },
  { href: '#contact', label: 'Contact' },
];

export default function LandingPage() {
  const [expandedCard, setExpandedCard] = useState<'merchant' | 'customer' | null>('merchant');
  const [showFloatingTop, setShowFloatingTop] = useState(false);
  const [activeFooterCircle, setActiveFooterCircle] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const footerCircleRefs = useRef<Array<HTMLDivElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();

  const section3PhoneSources = [{ src: individualsPhoneVideo, type: 'video/mp4' }];
  const section4PhoneSources = [{ src: merchantsPhoneVideo, type: 'video/mp4' }];
  const section3LaptopSources = [
    { src: section3LaptopVideoMp4, type: 'video/mp4' },
    { src: section3LaptopVideo, type: 'video/quicktime' },
  ];
  const section4LaptopSources = [
    { src: merchantLaptopVideoMp4, type: 'video/mp4' },
    { src: merchantLaptopVideo, type: 'video/quicktime' },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const navOverlayOpacity = useTransform(smoothProgress, [0, 0.03, 0.08], [0, 0.35, 1]);
  const heroGlowY = useTransform(smoothProgress, [0, 0.25], [0, -28]);
  const heroGlowScale = useTransform(smoothProgress, [0, 0.25], [1, 1.08]);
  const heroLeftDrift = useTransform(smoothProgress, [0, 0.25], [0, -22]);
  const heroRightDrift = useTransform(smoothProgress, [0, 0.25], [0, 18]);
  const heroBadgeY = useTransform(smoothProgress, [0, 0.2], [0, -10]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      setShowFloatingTop(value > 0.12);
    });

    return unsubscribe;
  }, [scrollYProgress]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFooterPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) {
      return;
    }

    const pointerX = event.clientX;
    let nearestIndex: number | null = null;
    let nearestDistance = Number.POSITIVE_INFINITY;

    footerCircleRefs.current.forEach((circle, index) => {
      if (!circle) {
        return;
      }

      const rect = circle.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const distance = Math.abs(pointerX - centerX);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveFooterCircle(nearestIndex);
  };

  const resetFooterPointer = () => {
    setActiveFooterCircle(null);
  };

  return (
    <div id="top" ref={containerRef} className="overflow-x-hidden bg-white text-tikibox-navy selection:bg-tikibox-orange selection:text-white">
      <motion.div className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-tikibox-orange-gradient" style={{ scaleX: smoothProgress }} />
      <motion.button
        type="button"
        onClick={() => scrollToSection('top')}
        initial={false}
        animate={
          showFloatingTop
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 16, scale: 0.92 }
        }
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.03 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
        className="fixed bottom-5 right-4 z-50 flex items-center gap-2 rounded-full border border-transparent bg-tikibox-orange-gradient px-4 py-3 text-[10px] font-black uppercase tracking-[0.22em] text-[#1a1a2e] shadow-[0_18px_40px_rgba(229,112,32,0.28)] sm:bottom-8 sm:right-6"
        style={{ pointerEvents: showFloatingTop ? 'auto' : 'none' }}
        aria-label="Back to top"
      >
        <span className="inline-flex -rotate-90">
          <ArrowRight className="h-4 w-4" />
        </span>
        Top
      </motion.button>

      <Section className="min-h-screen justify-between overflow-hidden bg-[#1a1a2e] !pt-3 text-white sm:!pt-4">
        <motion.div
          style={{ y: heroGlowY, scale: heroGlowScale }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(229,112,32,0.18),transparent_32%),radial-gradient(circle_at_15%_80%,rgba(185,49,49,0.28),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(225,115,43,0.22),transparent_28%)]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/40 to-transparent" />

        <nav className="relative z-30 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <motion.div
            style={{ opacity: navOverlayOpacity }}
            className="pointer-events-none absolute inset-0 rounded-full border border-white/10 bg-white/6 backdrop-blur-xl"
          />
          <div className="hidden gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-white/40 md:flex">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                className="relative transition-colors hover:text-tikibox-orange"
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          <motion.a
            href="#top"
            whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
            className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 sm:gap-3"
          >
            <motion.div
              animate={prefersReducedMotion ? undefined : { boxShadow: ['0 8px 20px rgba(225,115,43,0.12)', '0 16px 30px rgba(225,115,43,0.28)', '0 8px 20px rgba(225,115,43,0.12)'] }}
              transition={prefersReducedMotion ? undefined : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-tikibox-orange-gradient shadow-lg shadow-tikibox-orange/20 sm:h-10 sm:w-10"
            >
              <Wallet className="h-5 w-5 text-tikibox-navy sm:h-6 sm:w-6" />
            </motion.div>
            <span className="font-display text-xl font-black uppercase tracking-tighter sm:text-2xl">Tik’iBox</span>
          </motion.a>

          <div className="hidden gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-white/40 md:flex">
            {heroLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                className="transition-colors hover:text-tikibox-orange"
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </nav>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-20 flex flex-1 flex-col items-center justify-center px-4 text-center sm:px-6"
        >
          <motion.p variants={revealUp} className="mb-8 text-[9px] font-black uppercase tracking-[0.4em] text-white/40 sm:mb-10 sm:text-[10px] sm:tracking-[0.5em]">
            Launch with confidence
          </motion.p>

          <motion.h1 variants={revealUp} className="mb-3 text-center font-display text-[2.25rem] font-black uppercase leading-[0.9] tracking-tighter sm:mb-2 sm:text-4xl md:text-6xl lg:text-7xl">
            The Pulse of <br />
            Community Commerce
          </motion.h1>

          <motion.div
            variants={revealUp}
            className="relative mb-10 inline-block overflow-hidden bg-tikibox-orange-gradient px-5 py-3 sm:mb-12 sm:px-8 sm:py-4 md:px-10 md:py-5"
          >
            <motion.div
              animate={prefersReducedMotion ? undefined : { x: ['-120%', '130%'] }}
              transition={prefersReducedMotion ? undefined : { duration: 3.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.3 }}
              className="pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-60"
            />
            <span className="text-center font-display text-xl font-black uppercase tracking-tighter text-[#1a1a2e] sm:text-[1.65rem] md:text-4xl lg:text-5xl">
              Without the Friction
            </span>
          </motion.div>

          <motion.p variants={revealUp} className="mb-8 max-w-xl text-balance text-sm font-medium leading-relaxed text-white/55 sm:mb-10 sm:max-w-2xl sm:text-base md:text-lg">
            Tik’iBox connects neighbourhood buyers, merchants, and suppliers with instant payments, elegant commerce tools, and a digital rhythm that feels local and world-class at the same time.
          </motion.p>

          <motion.div variants={revealUp} style={{ y: heroBadgeY }} className="flex w-full flex-col items-center gap-3 sm:w-auto sm:gap-4">
            <div className="flex w-full max-w-[21rem] flex-col rounded-[1.75rem] bg-white p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] sm:w-auto sm:max-w-none sm:flex-row sm:rounded-full sm:p-2">
              <motion.button
                type="button"
                onClick={() => scrollToSection('individuals')}
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.04 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-tikibox-orange-gradient px-6 py-3.5 text-[10px] font-black uppercase tracking-[0.22em] text-[#1a1a2e] sm:w-auto sm:gap-3 sm:px-10 sm:py-5 sm:text-xs sm:tracking-widest"
              >
                Join as User
                <motion.span whileHover={prefersReducedMotion ? undefined : { x: 4 }} className="inline-flex">
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </motion.button>
              <motion.button
                type="button"
                onClick={() => scrollToSection('merchants')}
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                className="group flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[10px] font-black uppercase tracking-[0.22em] text-[#1a1a2e] transition-all hover:bg-[#1a1a2e]/5 sm:w-auto sm:gap-3 sm:px-10 sm:py-5 sm:text-xs sm:tracking-widest"
              >
                Join as Merchant
                <motion.span whileHover={prefersReducedMotion ? undefined : { x: 4 }} className="inline-flex">
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </motion.button>
            </div>

            <motion.div variants={staggerContainer} className="flex flex-wrap justify-center gap-2 text-[9px] font-black uppercase tracking-[0.24em] text-white/35 sm:gap-3 sm:text-[10px] sm:tracking-[0.35em]">
              {['Instant Wallets', 'Merchant Growth', 'Supplier Access'].map((item) => (
                <motion.span
                  key={item}
                  variants={revealUp}
                  animate={prefersReducedMotion ? undefined : { y: [0, -3, 0] }}
                  transition={prefersReducedMotion ? undefined : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm sm:px-4 sm:py-2"
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ x: -120, y: 100, opacity: 0, rotate: -8 }}
          animate={{ x: 0, y: 0, opacity: 1, rotate: -3 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ y: heroLeftDrift }}
          className="pointer-events-none absolute bottom-[-2%] left-[-2%] z-10 hidden w-[38vw] max-w-[540px] lg:block"
        >
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, -8, 0], rotate: [-3, -1, -3] }}
            transition={prefersReducedMotion ? undefined : { duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <motion.div
              animate={prefersReducedMotion ? undefined : { scale: [1, 1.04, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={prefersReducedMotion ? undefined : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-[12%] right-[10%] top-[20%] h-[48%] rounded-[2.5rem] border border-white/12 bg-white/6 backdrop-blur-md"
            />
            <motion.div
              animate={prefersReducedMotion ? undefined : { opacity: [0.85, 1, 0.85], x: [0, 6, 0] }}
              transition={prefersReducedMotion ? undefined : { duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-[16%] right-[14%] top-[17%] h-8 rounded-t-[1.4rem] bg-[linear-gradient(90deg,rgba(225,115,43,0.95)_0%,rgba(229,112,32,0.7)_50%,rgba(185,49,49,0.9)_100%)] shadow-[0_12px_30px_rgba(229,112,32,0.2)]"
            />
            <motion.div
              animate={prefersReducedMotion ? undefined : { y: [0, -3, 0] }}
              transition={prefersReducedMotion ? undefined : { duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-[12%] top-[20%] rounded-full border border-white/12 bg-[#1f2142]/92 px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.28em] text-white/82 shadow-[0_12px_28px_rgba(0,0,0,0.2)]"
            >
              Neighbourhood Shop
            </motion.div>
            <motion.div
              animate={prefersReducedMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.55, 0.8, 0.55] }}
              transition={prefersReducedMotion ? undefined : { duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-[6%] left-1/2 h-20 w-[72%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(229,112,32,0.5)_0%,rgba(229,112,32,0.12)_55%,transparent_80%)] blur-2xl"
            />
            <motion.div
              animate={prefersReducedMotion ? undefined : { scaleX: [1, 1.08, 1], opacity: [0.45, 0.65, 0.45] }}
              transition={prefersReducedMotion ? undefined : { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-[8%] left-1/2 h-8 w-[56%] -translate-x-1/2 rounded-full bg-black/45 blur-xl"
            />
            <div className="absolute left-[8%] top-[30%] h-36 w-8 rounded-full bg-white/6 blur-md" />
            <img
              src={womanStanding}
              alt="Woman standing proudly in front of a shop"
              className="relative z-10 h-auto w-full object-contain drop-shadow-[0_28px_38px_rgba(0,0,0,0.45)]"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ x: 120, y: -40, opacity: 0, rotate: 8 }}
          animate={{ x: 0, y: 0, opacity: 1, rotate: 3 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ y: heroRightDrift }}
          className="pointer-events-none absolute right-[-2%] top-[21%] z-10 hidden w-[34vw] max-w-[500px] lg:block"
        >
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, 8, 0], rotate: [3, 1.5, 3] }}
            transition={prefersReducedMotion ? undefined : { duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <motion.div
              animate={prefersReducedMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.35, 0.65, 0.35] }}
              transition={prefersReducedMotion ? undefined : { duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute right-[8%] top-[10%] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(225,115,43,0.5)_0%,rgba(185,49,49,0.16)_55%,transparent_72%)] blur-3xl"
            />
            <motion.div
              animate={prefersReducedMotion ? undefined : { y: [0, -5, 0], rotate: [0, 3, 0] }}
              transition={prefersReducedMotion ? undefined : { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute right-[22%] top-[34%] h-24 w-24 rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl"
            />
            <motion.div
              animate={prefersReducedMotion ? undefined : { scale: [1, 1.06, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={prefersReducedMotion ? undefined : { duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute right-[17%] top-[29%] h-36 w-36 rounded-full border border-tikibox-orange/25"
            />
            <div className="absolute right-[27%] top-[41%] h-16 w-16 rounded-2xl bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.15)]" />
            <motion.div
              animate={prefersReducedMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
              transition={prefersReducedMotion ? undefined : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute right-[25%] top-[43%] h-12 w-12 rounded-2xl bg-tikibox-orange-gradient opacity-85"
            />
            <motion.div
              animate={prefersReducedMotion ? undefined : { scaleX: [1, 1.08, 1], opacity: [0.45, 0.65, 0.45] }}
              transition={prefersReducedMotion ? undefined : { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-[9%] left-1/2 h-8 w-[48%] -translate-x-1/2 rounded-full bg-black/45 blur-xl"
            />
            <img
              src={manOnPhone}
              alt="Man looking at his phone ready to make a payment"
              className="relative z-10 h-auto w-full translate-x-[2%] object-contain drop-shadow-[0_28px_40px_rgba(0,0,0,0.55)]"
            />
            <motion.div
              animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}
              transition={prefersReducedMotion ? undefined : { duration: 3.3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute right-[7%] top-[17%] z-0 rounded-[1.5rem] border border-white/12 bg-[#1f2142]/90 px-7 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-white/88 shadow-[0_12px_28px_rgba(0,0,0,0.24)]"
            >
              <span className="block whitespace-nowrap">Payment Ready</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </Section>

      <Section id="about" className="overflow-hidden bg-white py-20 sm:py-24">
        <ParallaxText>community commerce</ParallaxText>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:gap-10"
        >
          <motion.div variants={revealLeft}>
            <p className="mb-4 text-[10px] font-black uppercase tracking-[0.45em] text-tikibox-orange">About Tik’iBox</p>
            <h2 className="max-w-4xl font-display text-3xl font-black uppercase leading-[0.92] tracking-tighter text-tikibox-navy sm:text-4xl md:text-6xl">
              Designed for the people who keep neighbourhood economies moving.
            </h2>
          </motion.div>
          <motion.div variants={revealRight} className="space-y-4 text-sm font-medium leading-relaxed text-tikibox-navy/65 sm:space-y-5 sm:text-base">
            <p>
              Tik’iBox gives everyday buyers and ambitious merchants one connected commerce layer: instant payments, local trust, and tools that feel premium without becoming complicated.
            </p>
            <p>
              The experience is built to feel cinematic, confident, and rooted in community life, whether someone is buying groceries, tracking inventory, or preparing the next order for the block.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mx-auto mt-12 grid max-w-7xl gap-4 px-4 sm:mt-16 sm:gap-6 sm:px-6 md:grid-cols-3"
        >
          {[
            {
              icon: Wallet,
              title: 'Payments with rhythm',
              body: 'Fast wallet experiences that feel polished enough for launch day and practical enough for daily use.',
            },
            {
              icon: Store,
              title: 'Merchant tools with taste',
              body: 'Modern dashboards, stock visibility, and commerce cues that turn a shop into a digital destination.',
            },
            {
              icon: Globe,
              title: 'Community, connected',
              body: 'A system that links local transactions to larger opportunity without losing the intimacy of street commerce.',
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={revealUp}
              whileHover={prefersReducedMotion ? undefined : { y: -8, scale: 1.01 }}
              className="group rounded-[1.5rem] border border-tikibox-navy/8 bg-white p-6 shadow-[0_20px_40px_rgba(35,35,62,0.06)] sm:rounded-[2rem] sm:p-8"
            >
              <motion.div whileHover={prefersReducedMotion ? undefined : { rotate: -8, scale: 1.08 }} className="w-fit">
                <item.icon className="mb-5 h-7 w-7 text-tikibox-orange sm:mb-6 sm:h-8 sm:w-8" />
              </motion.div>
              <h3 className="mb-3 font-display text-xl font-black uppercase tracking-tight text-tikibox-navy sm:mb-4 sm:text-2xl">{item.title}</h3>
              <p className="text-sm font-medium leading-relaxed text-tikibox-navy/60">{item.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section id="joining" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-4 text-center font-display text-2xl font-black uppercase tracking-tighter text-tikibox-navy sm:text-3xl md:text-5xl">
            Choose your side of commerce
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-sm font-medium leading-relaxed text-tikibox-navy/55 sm:mb-16 sm:text-base">
            Whether you are buying, paying, stocking, or growing, Tik’iBox is designed to meet you exactly where the money moves.
          </p>

          <div className="grid items-start gap-5 sm:gap-8 md:grid-cols-2 md:auto-rows-fr">
            <motion.div
              layout
              whileHover={prefersReducedMotion ? undefined : { y: -10 }}
              className="group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-[2rem] bg-tikibox-navy p-7 text-center shadow-2xl sm:min-h-[500px] sm:rounded-[40px] sm:p-12"
            >
              <motion.div
                animate={prefersReducedMotion ? undefined : { scale: [1, 1.18, 1], opacity: [0.18, 0.34, 0.18] }}
                transition={prefersReducedMotion ? undefined : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute right-0 top-0 -mr-16 -mt-16 h-32 w-32 rounded-full bg-tikibox-orange-gradient opacity-20 transition-transform group-hover:scale-150"
              />
              <div className="relative z-10 mb-8 flex w-full justify-center">
                <motion.div whileHover={prefersReducedMotion ? undefined : { rotate: -8, scale: 1.06 }} className="flex h-24 w-24 items-center justify-center rounded-[1.75rem] bg-white/5 backdrop-blur-sm sm:h-32 sm:w-32 sm:rounded-3xl">
                  <Store className="h-12 w-12 text-tikibox-orange sm:h-16 sm:w-16" />
                </motion.div>
              </div>

              <div className="relative z-10 space-y-4">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-tikibox-orange">Joining as a Merchant</p>
                <h3 className="font-display text-2xl font-black uppercase leading-tight tracking-tighter text-white sm:text-3xl md:text-4xl">
                  Ready to grow
                  <br />
                  your business?
                </h3>
              </div>

              <motion.div layout className="relative z-10 mt-auto w-full">
                {expandedCard === 'merchant' ? (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
                    <p className="text-[13px] leading-relaxed text-white/68 sm:text-sm">
                      Accept digital payments instantly, understand your sales at a glance, and stay stocked with supplier access built directly into the experience.
                    </p>
                    <button
                      type="button"
                      onClick={() => scrollToSection('merchants')}
                      className="rounded-full bg-tikibox-orange-gradient px-8 py-3.5 text-[9px] font-black uppercase tracking-[0.22em] text-tikibox-navy transition-all hover:scale-105 sm:px-10 sm:py-4 sm:text-[10px] sm:tracking-widest"
                    >
                      Explore merchant tools
                    </button>
                  </motion.div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setExpandedCard('merchant')}
                    className="mt-6 rounded-full bg-tikibox-orange-gradient px-8 py-3.5 text-[10px] font-black uppercase tracking-[0.22em] text-tikibox-navy transition-all hover:scale-105 sm:mt-8 sm:px-12 sm:py-5 sm:text-xs sm:tracking-widest"
                  >
                    Learn more
                  </button>
                )}
              </motion.div>
            </motion.div>

            <motion.div
              layout
              whileHover={prefersReducedMotion ? undefined : { y: -10 }}
              className="group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-[2rem] bg-tikibox-orange-gradient p-7 text-center shadow-2xl sm:min-h-[500px] sm:rounded-[40px] sm:p-12"
            >
              <motion.div
                animate={prefersReducedMotion ? undefined : { scale: [1, 1.18, 1], opacity: [0.16, 0.28, 0.16] }}
                transition={prefersReducedMotion ? undefined : { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-0 left-0 -mb-16 -ml-16 h-32 w-32 rounded-full bg-tikibox-navy/10 transition-transform group-hover:scale-150"
              />
              <div className="relative z-10 mb-8 flex w-full justify-center">
                <motion.div whileHover={prefersReducedMotion ? undefined : { rotate: 8, scale: 1.06 }} className="flex h-24 w-24 items-center justify-center rounded-[1.75rem] bg-tikibox-navy/5 backdrop-blur-sm sm:h-32 sm:w-32 sm:rounded-3xl">
                  <Smartphone className="h-12 w-12 text-tikibox-navy sm:h-16 sm:w-16" />
                </motion.div>
              </div>

              <div className="relative z-10 space-y-4">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-tikibox-navy">Joining as a Customer</p>
                <h3 className="font-display text-[1.7rem] font-black uppercase leading-tight tracking-tighter text-tikibox-navy sm:text-[2rem] md:text-[2.35rem]">
                  Want a smarter
                  <br />
                  way to pay?
                </h3>
              </div>

              <motion.div layout className="relative z-10 mt-auto w-full">
                {expandedCard === 'customer' ? (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
                    <p className="text-[13px] leading-relaxed text-tikibox-navy/70 sm:text-sm">
                      Pay with confidence, move money instantly, and keep every transaction visible in one simple interface designed for daily life.
                    </p>
                    <button
                      type="button"
                      onClick={() => scrollToSection('individuals')}
                      className="rounded-full bg-tikibox-navy px-8 py-3.5 text-[9px] font-black uppercase tracking-[0.22em] text-white transition-all hover:scale-105 sm:px-10 sm:py-4 sm:text-[10px] sm:tracking-widest"
                    >
                      Explore user tools
                    </button>
                  </motion.div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setExpandedCard('customer')}
                    className="mt-6 rounded-full bg-tikibox-navy px-8 py-3.5 text-[10px] font-black uppercase tracking-[0.22em] text-white transition-all hover:scale-105 sm:mt-8 sm:px-12 sm:py-5 sm:text-xs sm:tracking-widest"
                  >
                    Learn more
                  </button>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Section>

      <Section id="concept" className="bg-[#faf8f6] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-12 flex flex-col gap-6 sm:mb-16 sm:gap-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <motion.div variants={revealLeft}>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.45em] text-tikibox-orange">Concept</p>
              <h2 className="font-display text-3xl font-black uppercase leading-[0.94] tracking-tighter text-tikibox-navy sm:text-4xl md:text-6xl">
                One commerce pulse,
                <br />
                three connected players.
              </h2>
            </motion.div>
            <motion.p variants={revealRight} className="max-w-xl text-sm font-medium leading-relaxed text-tikibox-navy/60 sm:text-base">
              The system works because it is designed as an ecosystem, not a collection of screens. Buyers transact with confidence, merchants grow with clarity, and suppliers stay in sync with demand.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-4 sm:gap-6 md:grid-cols-3"
          >
            {[
              {
                icon: Smartphone,
                title: 'Users',
                body: 'Scan, send, receive, and move quickly through everyday payments without losing visibility or trust.',
              },
              {
                icon: Store,
                title: 'Merchants',
                body: 'Turn every transaction into insight with tools for selling, stock awareness, and stronger business decisions.',
              },
              {
                icon: Truck,
                title: 'Suppliers',
                body: 'Keep neighbourhood shops replenished with cleaner ordering signals and better visibility across the network.',
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={revealUp}
                whileHover={prefersReducedMotion ? undefined : { y: -8, scale: 1.01 }}
                className="group rounded-[1.5rem] bg-white p-6 shadow-[0_20px_40px_rgba(35,35,62,0.06)] ring-1 ring-tikibox-navy/6 sm:rounded-[2rem] sm:p-8"
              >
                <motion.div whileHover={prefersReducedMotion ? undefined : { scale: 1.08, rotate: -6 }} className="w-fit">
                  <item.icon className="mb-5 h-7 w-7 text-tikibox-orange sm:mb-6 sm:h-8 sm:w-8" />
                </motion.div>
                <h3 className="mb-3 font-display text-xl font-black uppercase tracking-tight text-tikibox-navy sm:mb-4 sm:text-2xl">{item.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-tikibox-navy/60">{item.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      <Section className="min-h-screen items-center bg-white py-16 sm:py-20" id="individuals">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 md:grid-cols-[1fr_1.5fr_2fr] md:gap-16">
          <div className="relative flex h-full flex-col justify-start pt-4">
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="text-3xl font-display font-black tracking-tighter text-tikibox-navy sm:text-4xl">
                TK<span className="inline-block text-tikibox-orange-gradient">BX</span>
              </div>
              <div className="text-[9px] font-black uppercase leading-relaxed tracking-[0.32em] text-tikibox-navy/30 sm:text-[10px] sm:tracking-[0.4em]">
                Built for <br /> Financial <br /> Freedom
              </div>
            </div>

            <div className="mt-12 hidden md:block">
              <motion.div animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }} transition={prefersReducedMotion ? undefined : { duration: 3.6, repeat: Infinity, ease: 'easeInOut' }} className="relative">
                <span className="inline-block whitespace-nowrap font-serif text-2xl italic text-tikibox-orange-gradient">Why Tik’iBox?</span>
                <motion.svg
                  animate={prefersReducedMotion ? undefined : { x: [0, 4, 0], opacity: [0.65, 1, 0.65] }}
                  transition={prefersReducedMotion ? undefined : { duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-6 top-8 h-12 w-12 text-tikibox-orange"
                  viewBox="0 0 50 50"
                  fill="none"
                >
                  <path d="M5 5C5 5 15 35 45 45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M35 45L45 45L45 35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </motion.div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="hidden justify-center lg:flex">
            <PhoneSimulator videoSources={section3PhoneSources} videoTitle="Tik'iBox user payment demo on Android phone" />
          </motion.div>

          <div className="space-y-10 sm:space-y-16 md:space-y-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl font-display text-3xl font-medium leading-[1.12] tracking-tight text-tikibox-navy sm:text-4xl md:text-5xl"
            >
              Simplify your daily life and join thousands of users who trust Tik’iBox for their everyday payments.
            </motion.h2>

            <div className="divide-y divide-tikibox-navy/10 border-t border-tikibox-navy/10">
              {[
                {
                  title: 'Effortless Payments',
                  desc: 'Send and receive funds in seconds using just a phone number or a quick QR scan. No more carrying cash or waiting in long lines at the bank.',
                },
                {
                  title: 'Financial Inclusion',
                  desc: 'Designed specifically for the underbanked, Tik’iBox provides a secure digital wallet that gives you financial freedom without the need for a traditional bank account.',
                },
                {
                  title: 'Total Control',
                  desc: "Track every cent with a real-time transaction history. Our simple, intuitive interface ensures you're always in charge of your balance, no matter your tech level.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="grid gap-4 py-6 sm:gap-6 sm:py-8 md:grid-cols-[1fr_1.5fr] md:gap-12 md:py-10"
                >
                  <h3 className="font-display text-base font-black uppercase tracking-tight text-tikibox-navy sm:text-lg">{item.title}</h3>
                  <p className="text-sm font-medium leading-relaxed text-tikibox-navy/60 sm:text-base">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <LaptopAnimation
          caption="Personal Finance Interface"
          windowLabel="Tik’iBox Wallet Portal"
          videoSources={section3LaptopSources}
          videoTitle="Tik'iBox user paying merchant walkthrough on laptop"
        />
      </Section>

      <Section className="min-h-screen items-center bg-[#f8f9fa] py-16 sm:py-20" id="merchants">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 md:grid-cols-[2fr_1.5fr_1fr] md:gap-16">
          <div className="order-3 space-y-10 md:order-1 md:space-y-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl font-display text-3xl font-medium leading-[1.12] tracking-tight text-tikibox-navy sm:text-4xl md:text-5xl"
            >
              Transform your shop into a digital powerhouse with tools built for community growth.
            </motion.h2>

            <div className="divide-y divide-tikibox-navy/10 border-t border-tikibox-navy/10">
              {[
                {
                  title: 'Instant Digital Payments',
                  desc: 'Accept payments via QR code or phone number and see funds in your wallet immediately. No more handling large amounts of cash or waiting for card settlements.',
                },
                {
                  title: 'Inventory & Stock Control',
                  desc: "Manage your shop's inventory directly from the app. Track low-stock items and order directly from verified suppliers to keep your shelves full.",
                },
                {
                  title: 'Financial Growth Tools',
                  desc: 'Access real-time sales data and analytics to understand your business performance. Use your transaction history to build a credit profile for future growth.',
                },
                {
                  title: 'Secure Bank Payouts',
                  desc: 'Transfer your earnings to any linked bank account with a few taps. Our secure protocol ensures your business funds are always safe and accessible.',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="grid gap-4 py-6 sm:gap-6 sm:py-8 md:grid-cols-[1fr_1.5fr] md:gap-12 md:py-10"
                >
                  <h3 className="font-display text-base font-black uppercase tracking-tight text-tikibox-navy sm:text-lg">{item.title}</h3>
                  <p className="text-sm font-medium leading-relaxed text-tikibox-navy/60 sm:text-base">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 hidden justify-center lg:flex">
            <PhoneSimulator videoSources={section4PhoneSources} videoTitle="Tik'iBox merchant payment demo on Android phone" />
          </motion.div>

          <div className="order-1 flex h-full flex-col items-end justify-start pt-4 text-right md:order-3">
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="text-3xl font-display font-black tracking-tighter text-tikibox-navy sm:text-4xl">
                TK<span className="inline-block text-tikibox-orange-gradient">BX</span>
              </div>
              <div className="text-[9px] font-black uppercase leading-relaxed tracking-[0.32em] text-tikibox-navy/30 sm:text-[10px] sm:tracking-[0.4em]">
                Built for <br /> Financial <br /> Freedom
              </div>
            </div>

            <div className="mt-12 hidden md:block">
              <motion.div animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }} transition={prefersReducedMotion ? undefined : { duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }} className="relative">
                <span className="inline-block whitespace-nowrap font-serif text-2xl italic text-tikibox-orange-gradient">Why Tik’iBox?</span>
                <motion.svg
                  animate={prefersReducedMotion ? undefined : { x: [0, -4, 0], opacity: [0.65, 1, 0.65] }}
                  transition={prefersReducedMotion ? undefined : { duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                  className="absolute right-6 top-8 h-12 w-12 scale-x-[-1] text-tikibox-orange"
                  viewBox="0 0 50 50"
                  fill="none"
                >
                  <path d="M5 5C5 5 15 35 45 45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M35 45L45 45L45 35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </motion.div>
            </div>
          </div>
        </div>
        <LaptopAnimation
          caption="Business Management Interface"
          windowLabel="Tik’iBox Merchant Portal"
          videoSources={section4LaptopSources}
          videoTitle="Tik'iBox merchant dashboard walkthrough on laptop"
        />
      </Section>

      <Section id="suppliers" className="overflow-hidden bg-tikibox-navy py-20 text-white sm:py-24">
        <ParallaxText>supplier network</ParallaxText>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
          className="relative mx-auto max-w-7xl px-4 sm:px-6"
        >
          <div className="mb-12 grid gap-8 sm:mb-16 sm:gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <motion.div variants={revealLeft}>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.45em] text-tikibox-orange">Suppliers</p>
              <h2 className="font-display text-3xl font-black uppercase leading-[0.94] tracking-tighter sm:text-4xl md:text-6xl">
                Keep shelves full
                <br />
                without slowing down.
              </h2>
            </motion.div>
            <motion.p variants={revealRight} className="max-w-xl text-sm font-medium leading-relaxed text-white/65 sm:text-base">
              Suppliers become part of the same pulse. Shops know where stock is coming from, suppliers see cleaner demand signals, and the full network becomes more dependable.
            </motion.p>
          </div>

          <motion.div variants={staggerContainer} className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {[
              {
                icon: Truck,
                title: 'Verified ordering routes',
                body: 'Give merchants a faster path from low-stock signal to supplier action without breaking the flow of the day.',
              },
              {
                icon: ShieldCheck,
                title: 'Trusted fulfilment',
                body: 'Build a dependable network with cleaner supplier relationships, stronger visibility, and less guesswork.',
              },
              {
                icon: Sparkles,
                title: 'A stronger ecosystem',
                body: 'The more connected the chain becomes, the more premium the full commerce experience feels for everyone.',
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={revealUp}
                whileHover={prefersReducedMotion ? undefined : { y: -8, scale: 1.01 }}
                className="group rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:rounded-[2rem] sm:p-8"
              >
                <motion.div whileHover={prefersReducedMotion ? undefined : { scale: 1.08, rotate: -6 }} className="w-fit">
                  <item.icon className="mb-5 h-7 w-7 text-tikibox-orange sm:mb-6 sm:h-8 sm:w-8" />
                </motion.div>
                <h3 className="mb-3 font-display text-xl font-black uppercase tracking-tight sm:mb-4 sm:text-2xl">{item.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-white/70">{item.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Section>

      <Section id="resources" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 flex flex-col gap-6 sm:mb-16 sm:gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.45em] text-tikibox-orange">Resources</p>
              <h2 className="font-display text-3xl font-black uppercase leading-[0.94] tracking-tighter text-tikibox-navy sm:text-4xl md:text-6xl">
                The trust layer
                <br />
                behind the launch.
              </h2>
            </div>
            <p className="max-w-xl text-sm font-medium leading-relaxed text-tikibox-navy/60 sm:text-base">
              Beyond the visuals, the site should feel complete. These are the cues that tell people the experience is ready to be believed.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-4 sm:gap-6 md:grid-cols-4"
          >
            {[
              'Real-time transaction visibility',
              'Merchant inventory awareness',
              'Cross-browser product demos',
              'Designed for local commerce trust',
            ].map((item) => (
              <motion.div
                key={item}
                variants={revealUp}
                whileHover={prefersReducedMotion ? undefined : { y: -8, scale: 1.01 }}
                className="rounded-[1.5rem] border border-tikibox-navy/8 bg-[#faf8f6] p-6 text-[11px] font-black uppercase leading-relaxed tracking-[0.18em] text-tikibox-navy sm:rounded-[2rem] sm:p-8 sm:text-sm sm:tracking-[0.22em]"
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      <Section id="contact" className="bg-[#faf8f6] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-[2rem] bg-tikibox-navy px-6 py-10 text-white shadow-[0_30px_60px_rgba(35,35,62,0.18)] sm:rounded-[3rem] sm:px-8 sm:py-14 md:px-14">
            <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1.3fr_1fr]">
              <div>
                <p className="mb-4 text-[10px] font-black uppercase tracking-[0.45em] text-tikibox-orange">Contact</p>
                <h2 className="max-w-3xl font-display text-3xl font-black uppercase leading-[0.94] tracking-tighter sm:text-4xl md:text-6xl">
                  Ready to shape the next version of community commerce?
                </h2>
                <p className="mt-5 max-w-2xl text-sm font-medium leading-relaxed text-white/65 sm:mt-6 sm:text-base">
                  Use this landing page as the launch canvas. Everything now connects, and the next conversation is about which audience you want to activate first.
                </p>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-3 sm:space-y-4"
              >
                {[
                  { icon: PhoneCall, label: 'Start with user flow', href: '#individuals' },
                  { icon: Store, label: 'Start with merchant flow', href: '#merchants' },
                  { icon: Truck, label: 'View supplier network', href: '#suppliers' },
                  { icon: Mail, label: 'Review launch story', href: '#about' },
                ].map((item) => (
                  <motion.a
                    key={item.label}
                    variants={revealUp}
                    href={item.href}
                    whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.01 }}
                    className="group flex items-center justify-between rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4 transition-all hover:bg-white/10 sm:rounded-[1.5rem] sm:px-6 sm:py-5"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <motion.div whileHover={prefersReducedMotion ? undefined : { rotate: -8, scale: 1.05 }} className="w-fit">
                        <item.icon className="h-4 w-4 text-tikibox-orange sm:h-5 sm:w-5" />
                      </motion.div>
                      <span className="text-[11px] font-black uppercase tracking-[0.16em] sm:text-sm sm:tracking-[0.22em]">{item.label}</span>
                    </div>
                    <motion.div whileHover={prefersReducedMotion ? undefined : { x: 5 }} className="inline-flex">
                      <ArrowRight className="h-4 w-4 text-white/60 sm:h-5 sm:w-5" />
                    </motion.div>
                  </motion.a>
                ))}
              </motion.div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4 border-t border-white/10 pt-6 text-xs font-medium text-white/45 sm:mt-12 sm:gap-6 sm:pt-8 sm:text-sm">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-tikibox-orange" />
                Built for neighbourhood commerce
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-tikibox-orange" />
                Premium by design
              </span>
            </div>
          </div>
        </div>
      </Section>

      <footer className="relative overflow-hidden bg-tikibox-light pb-0 pt-20 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 flex flex-wrap justify-center gap-x-8 gap-y-3 sm:mb-12 sm:gap-x-12 sm:gap-y-4">
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-sm font-bold text-tikibox-navy transition-colors hover:text-tikibox-orange sm:text-base">
                {link.label}
              </a>
            ))}
          </div>

          <div className="mb-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium text-tikibox-navy/60 sm:mb-32 sm:gap-x-12 sm:gap-y-4 sm:text-sm">
            <p>© 2026 Tik’iBox, all rights reserved.</p>
            <span>Launch narrative</span>
            <span>Community-first commerce</span>
            <span>Crafted for motion</span>
          </div>
        </div>

        <div className="relative h-[8.5rem] overflow-hidden sm:h-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="absolute inset-x-0 bottom-[-3.9rem] flex select-none flex-col items-center sm:static sm:translate-y-[35%]"
          >
            <motion.div
              onPointerMove={handleFooterPointerMove}
              onPointerLeave={resetFooterPointer}
              animate={prefersReducedMotion ? undefined : { y: [0, -8, 0] }}
              transition={prefersReducedMotion ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-2 flex gap-[7vw] pointer-events-auto sm:mb-[-4vw] sm:gap-[10vw]"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  ref={(node) => {
                    footerCircleRefs.current[i - 1] = node;
                  }}
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : {
                          y:
                            activeFooterCircle === null
                              ? 0
                              : activeFooterCircle === i - 1
                                ? -28
                                : Math.abs(activeFooterCircle - (i - 1)) === 1
                                  ? 14
                                  : 0,
                          scale: activeFooterCircle === i - 1 ? 1.12 : activeFooterCircle === null ? 1 : 0.98,
                        }
                  }
                  transition={prefersReducedMotion ? undefined : { type: 'spring', stiffness: 260, damping: 18, mass: 0.8 }}
                  className="h-[12vw] w-[12vw] rounded-full bg-tikibox-navy sm:h-[10vw] sm:w-[10vw]"
                />
              ))}
            </motion.div>
            <motion.h2
              animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
              transition={prefersReducedMotion ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none whitespace-nowrap font-display text-[36vw] font-black uppercase leading-none tracking-tighter text-tikibox-navy sm:text-[28vw]"
            >
              Tik’iBox
            </motion.h2>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
