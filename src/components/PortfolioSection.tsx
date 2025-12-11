import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const portfolioItems = [
  { id: 1, category: "Portrait", title: "Golden Hour", color: "from-amber-900/40 to-orange-900/40" },
  { id: 2, category: "Wedding", title: "Eternal Vows", color: "from-rose-900/40 to-pink-900/40" },
  { id: 3, category: "Landscape", title: "Mountain Mist", color: "from-emerald-900/40 to-teal-900/40" },
  { id: 4, category: "Fashion", title: "Urban Elegance", color: "from-violet-900/40 to-purple-900/40" },
  { id: 5, category: "Portrait", title: "Silent Stories", color: "from-slate-800/40 to-zinc-900/40" },
  { id: 6, category: "Events", title: "Celebration", color: "from-yellow-900/40 to-amber-900/40" },
];

const categories = ["All", "Portrait", "Wedding", "Landscape", "Fashion", "Events"];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredItems =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) / 10,
      y: (e.clientY - rect.top - rect.height / 2) / 10,
    });
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-32 bg-charcoal overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-gold font-medium tracking-[0.3em] uppercase text-sm"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            My Work
          </motion.span>
          <h2 className="font-serif text-5xl md:text-6xl mt-4 mb-6">
            <span className="text-gradient-gold">Portfolio</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A curated collection of moments frozen in time, each image telling its own unique story
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 cursor-hover ${
                activeCategory === category
                  ? "bg-gold text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="perspective-1000"
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
              >
                <motion.div
                  className="relative group aspect-[4/5] rounded-xl overflow-hidden cursor-hover preserve-3d"
                  whileHover={{
                    z: 50,
                    rotateX: mousePosition.y,
                    rotateY: -mousePosition.x,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() => setSelectedImage(item.id)}
                >
                  {/* Image placeholder with gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color}`}
                  />
                  <div className="absolute inset-0 bg-charcoal-light" />

                  {/* Decorative lines */}
                  <div className="absolute inset-4 border border-gold/20 rounded-lg" />

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    initial={false}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      className="text-center"
                    >
                      <ZoomIn className="w-10 h-10 text-gold mx-auto mb-3" />
                      <h3 className="font-serif text-xl text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-gold text-sm mt-1">{item.category}</p>
                    </motion.div>
                  </motion.div>

                  {/* Bottom info bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
                    <p className="text-gold text-xs tracking-widest uppercase">
                      {item.category}
                    </p>
                    <h3 className="font-serif text-lg text-foreground mt-1">
                      {item.title}
                    </h3>
                  </div>

                  {/* 3D shadow */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/30 blur-xl rounded-full group-hover:scale-110 transition-transform" />
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full mx-8 aspect-[4/3] rounded-xl overflow-hidden"
              initial={{ scale: 0.8, rotateY: -30 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.8, rotateY: 30 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-full bg-charcoal-light flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 border-2 border-gold/30 rounded-full mx-auto mb-4" />
                  <p className="text-muted-foreground">Image Preview</p>
                </div>
              </div>
              <button
                className="absolute top-4 right-4 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center hover:bg-gold transition-colors cursor-hover"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;
