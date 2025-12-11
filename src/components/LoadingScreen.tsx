import { useEffect } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex flex-col items-center">
        {/* Camera shutter animation */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Aperture blades */}
          <svg width="120" height="120" viewBox="0 0 120 120" className="relative">
            {[...Array(8)].map((_, i) => (
              <motion.path
                key={i}
                d={`M60 60 L${60 + 50 * Math.cos((i * 45 * Math.PI) / 180)} ${60 + 50 * Math.sin((i * 45 * Math.PI) / 180)} A50 50 0 0 1 ${60 + 50 * Math.cos(((i + 1) * 45 * Math.PI) / 180)} ${60 + 50 * Math.sin(((i + 1) * 45 * Math.PI) / 180)} Z`}
                fill="hsl(var(--gold))"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0.6],
                  scale: [0.5, 1, 1, 1],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.08,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: "60px 60px" }}
              />
            ))}
          </svg>

          {/* Center camera icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Camera className="w-12 h-12 text-gold" />
          </motion.div>
        </motion.div>

        {/* Loading text */}
        <motion.div
          className="mt-8 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="font-serif text-2xl text-gradient-gold">Zakir Khan</h2>
          <motion.div
            className="mt-4 flex gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-gold"
                animate={{
                  y: [-3, 3, -3],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="absolute -bottom-16 w-48 h-0.5 bg-muted rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            className="h-full bg-gold"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
