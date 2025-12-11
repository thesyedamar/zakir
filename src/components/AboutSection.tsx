import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Camera, Mountain, Users, Sparkles } from "lucide-react";

const skills = [
  { icon: Users, label: "Portraits", description: "Capturing authentic personalities" },
  { icon: Mountain, label: "Landscapes", description: "Nature's breathtaking moments" },
  { icon: Sparkles, label: "Events", description: "Celebrating life's milestones" },
  { icon: Camera, label: "Fashion", description: "Style meets artistry" },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentX = useTransform(scrollYProgress, [0, 0.5], ["-100px", "0px"]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-background to-charcoal" />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-gold/5 blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image/Visual side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto perspective-1000">
              {/* Main image frame */}
              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden border border-border shadow-card"
                whileHover={{ rotateY: 5, rotateX: -5 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="w-full h-full bg-charcoal-light flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-20 h-20 text-gold/30 mx-auto mb-4" />
                    <p className="text-muted-foreground text-sm">Zakir Khan</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </motion.div>

              {/* Floating accent cards */}
              <motion.div
                className="absolute -top-6 -right-6 w-32 h-40 bg-gold/10 rounded-xl border border-gold/30"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-24 h-32 bg-gold/10 rounded-xl border border-gold/30"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              />

              {/* Experience badge */}
              <motion.div
                className="absolute -bottom-4 right-8 glass-card px-6 py-4 rounded-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 }}
              >
                <p className="text-3xl font-serif text-gold">10+</p>
                <p className="text-xs text-muted-foreground">Years Experience</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            style={{ x: contentX }}
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className="text-gold font-medium tracking-[0.3em] uppercase text-sm"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              About Me
            </motion.span>

            <h2 className="font-serif text-4xl md:text-5xl mt-4 mb-6">
              The <span className="text-gradient-gold">Story</span> Behind
              <br />the Lens
            </h2>

            <div className="space-y-6 text-muted-foreground">
              <p>
                I'm Zakir Khan, a professional photographer with over a decade of
                experience capturing life's most precious moments. My journey began
                with a simple passion for freezing time and has evolved into an art
                form that tells stories through light and shadow.
              </p>
              <p>
                Every photograph I take is a collaboration between moment and emotion.
                I believe in creating images that resonate, that speak to the soul,
                and that stand the test of time.
              </p>
            </div>

            {/* Skills */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.label}
                  className="group glass-card p-6 rounded-xl cursor-hover"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <skill.icon className="w-6 h-6 text-gold" />
                  </motion.div>
                  <h3 className="font-serif text-lg text-foreground mb-1">
                    {skill.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {skill.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
