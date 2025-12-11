import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Camera, Heart, PartyPopper, Building2 } from "lucide-react";

const services = [
  {
    icon: Camera,
    title: "Portraits",
    description: "Professional portrait sessions that capture your authentic self. Perfect for headshots, family portraits, and personal branding.",
    features: ["Studio & Outdoor", "Professional Retouching", "Same-day Preview"],
    price: "From $299",
  },
  {
    icon: Heart,
    title: "Weddings",
    description: "Complete wedding photography coverage from getting ready to the last dance. Your love story, beautifully documented.",
    features: ["Full Day Coverage", "Engagement Session", "Premium Album"],
    price: "From $2,499",
  },
  {
    icon: PartyPopper,
    title: "Events",
    description: "Dynamic event coverage for corporate gatherings, parties, and special occasions. Every moment matters.",
    features: ["Flexible Hours", "Quick Turnaround", "Digital Gallery"],
    price: "From $599",
  },
  {
    icon: Building2,
    title: "Commercial",
    description: "High-impact commercial photography for brands, products, and marketing campaigns that demand excellence.",
    features: ["Creative Direction", "Styling Available", "Commercial License"],
    price: "Custom Quote",
  },
];

const ServicesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) / 20,
      y: (e.clientY - rect.top - rect.height / 2) / 20,
    });
    setHoveredIndex(index);
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-32 bg-charcoal overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(43, 74%, 49%, 0.1) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
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
            What I Offer
          </motion.span>
          <h2 className="font-serif text-5xl md:text-6xl mt-4 mb-6">
            <span className="text-gradient-gold">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Premium photography services tailored to your unique vision and story
          </p>
        </motion.div>

        {/* Services grid - 3D flip cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="perspective-1000"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                className="relative h-[450px] preserve-3d cursor-hover"
                animate={{
                  rotateX: hoveredIndex === index ? -mousePosition.y : 0,
                  rotateY: hoveredIndex === index ? mousePosition.x : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Front of card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="h-full glass-card rounded-2xl p-8 flex flex-col">
                    {/* Icon */}
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <service.icon className="w-8 h-8 text-gold" />
                    </motion.div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl text-foreground mb-4">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm mb-6 flex-grow">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Price */}
                    <div className="pt-6 border-t border-border">
                      <p className="text-gold font-serif text-xl">{service.price}</p>
                    </div>

                    {/* Hover glow effect */}
                    {hoveredIndex === index && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                          background: `radial-gradient(circle at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, hsl(43, 74%, 49%, 0.1) 0%, transparent 50%)`,
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* 3D shadow */}
                <motion.div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/30 blur-xl rounded-full"
                  animate={{
                    scale: hoveredIndex === index ? 1.2 : 1,
                    opacity: hoveredIndex === index ? 0.5 : 0.3,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-primary-foreground font-medium rounded-full hover:bg-gold-light transition-all duration-300 cursor-hover"
          >
            Book a Consultation
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
