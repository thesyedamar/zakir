import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 25,
          y: (e.clientY - rect.top - rect.height / 2) / 25,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const floatingImages = [
    { x: "10%", y: "20%", rotate: -12, delay: 0, size: "w-48 h-64" },
    { x: "75%", y: "15%", rotate: 8, delay: 0.2, size: "w-40 h-56" },
    { x: "5%", y: "60%", rotate: 15, delay: 0.4, size: "w-36 h-48" },
    { x: "80%", y: "55%", rotate: -8, delay: 0.6, size: "w-44 h-60" },
    { x: "40%", y: "70%", rotate: 5, delay: 0.8, size: "w-32 h-44" },
  ];

  return (
    <motion.section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity, scale }}
    >
      {/* Ambient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-charcoal" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(43, 74%, 49%, 0.2) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Floating photo frames */}
      <div className="absolute inset-0 perspective-2000">
        {floatingImages.map((img, index) => (
          <motion.div
            key={index}
            className={`absolute ${img.size} preserve-3d`}
            style={{
              left: img.x,
              top: img.y,
              transform: `translateX(${mousePosition.x * (index % 2 === 0 ? 1 : -1)}px) translateY(${mousePosition.y * (index % 2 === 0 ? 1 : -1)}px)`,
            }}
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{
              opacity: 0.6,
              scale: 1,
              rotateY: 0,
              rotateZ: img.rotate,
            }}
            transition={{ duration: 1, delay: 2 + img.delay }}
          >
            <motion.div
              className="w-full h-full bg-charcoal-light rounded-lg border border-border shadow-card overflow-hidden"
              animate={{
                y: [0, -10, 0],
                rotateX: [0, 2, 0],
              }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-muted to-charcoal flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gold/30 rounded-full" />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          <motion.p
            className="text-gold font-medium tracking-[0.3em] uppercase text-sm mb-4"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1, delay: 2.6 }}
          >
            Professional Photographer
          </motion.p>

          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-medium mb-6">
            <motion.span
              className="block text-gradient-gold"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.7 }}
            >
              Zakir
            </motion.span>
            <motion.span
              className="block text-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.9 }}
            >
              Khan
            </motion.span>
          </h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground font-light italic max-w-lg mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 3.1 }}
          >
            "Capturing stories through the lens"
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.3 }}
          >
            <a
              href="#portfolio"
              className="px-8 py-4 bg-gold text-primary-foreground font-medium rounded-full hover:bg-gold-light transition-all duration-300 cursor-hover animate-pulse-gold"
            >
              View Portfolio
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-gold text-gold font-medium rounded-full hover:bg-gold/10 transition-all duration-300 cursor-hover"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-gold/60" />
        </motion.div>
      </motion.div>

      {/* 3D Camera decorative element */}
      <motion.div
        className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block"
        style={{
          transform: `translateY(-50%) rotateY(${mousePosition.x * 0.5}deg) rotateX(${-mousePosition.y * 0.5}deg)`,
        }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.4, x: 0 }}
        transition={{ duration: 1, delay: 3 }}
      >
        <svg width="200" height="200" viewBox="0 0 200 200" className="text-gold">
          <motion.circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 3.2 }}
          />
          <motion.circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 3.4 }}
          />
          <motion.circle
            cx="100"
            cy="100"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 3.6 }}
          />
          <motion.circle
            cx="100"
            cy="100"
            r="20"
            fill="currentColor"
            fillOpacity="0.2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 3.8 }}
          />
        </svg>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
