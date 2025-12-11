import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, Mail, Phone, MapPin, Camera } from "lucide-react";
import { toast } from "sonner";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showShutter, setShowShutter] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowShutter(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowShutter(false);
    setFormData({ name: "", email: "", service: "", message: "" });
    toast.success("Message sent successfully! I'll get back to you soon.");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-background to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gold/5 blur-3xl" />

      {/* Camera shutter overlay */}
      <AnimatePresence>
        {showShutter && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
            initial={{ clipPath: "circle(100% at 50% 50%)" }}
            animate={{ clipPath: "circle(0% at 50% 50%)" }}
            exit={{ clipPath: "circle(100% at 50% 50%)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Camera className="w-16 h-16 text-gold" />
          </motion.div>
        )}
      </AnimatePresence>

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
            Get in Touch
          </motion.span>
          <h2 className="font-serif text-5xl md:text-6xl mt-4 mb-6">
            Let's <span className="text-gradient-gold">Create</span> Together
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to capture your story? Reach out and let's discuss your vision
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-serif text-2xl text-foreground mb-8">
              Contact Information
            </h3>

            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "hello@zakirkhan.com" },
                { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                { icon: MapPin, label: "Location", value: "New York, NY" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-4 group cursor-hover"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <item.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-foreground font-medium">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Decorative element */}
            <motion.div
              className="mt-12 p-8 glass-card rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              <p className="font-serif text-xl text-foreground italic">
                "Photography is the story I fail to put into words."
              </p>
              <p className="text-gold mt-4">— Destin Sparks</p>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-8 perspective-1000"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Your Name
                </label>
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:border-gold focus:outline-none transition-colors text-foreground"
                  placeholder="John Doe"
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Email Address
                </label>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:border-gold focus:outline-none transition-colors text-foreground"
                  placeholder="john@example.com"
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              {/* Service */}
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Service Interested In
                </label>
                <motion.select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:border-gold focus:outline-none transition-colors text-foreground cursor-hover"
                  whileFocus={{ scale: 1.01 }}
                >
                  <option value="">Select a service</option>
                  <option value="portraits">Portraits</option>
                  <option value="weddings">Weddings</option>
                  <option value="events">Events</option>
                  <option value="commercial">Commercial</option>
                </motion.select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Your Message
                </label>
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:border-gold focus:outline-none transition-colors text-foreground resize-none"
                  placeholder="Tell me about your project..."
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gold text-primary-foreground font-medium rounded-xl hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2 cursor-hover disabled:opacity-70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
