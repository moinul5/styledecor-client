import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useInView } from "motion/react";
import {
  FiArrowRight,
  FiCheck,
  FiCalendar,
  FiSearch,
  FiCreditCard,
  FiStar,
  FiHeart,
  FiUsers,
  FiMapPin,
  FiAward,
  FiTrendingUp,
  FiShield,
} from "react-icons/fi";

// ==================== ANIMATED COUNTER ====================
const AnimatedCounter = ({ target, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

// ==================== SECTION WRAPPER ====================
const SectionWrapper = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`py-16 md:py-24 ${className}`}
    >
      {children}
    </motion.section>
  );
};

// ==================== GLASS CARD ====================
const GlassCard = ({ children, className = "" }) => (
  <div
    className={`glass-card bg-white/70 dark:bg-base-100/70 backdrop-blur-2xl border border-white/30 dark:border-base-content/10 rounded-3xl shadow-xl shadow-black/5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ${className}`}
  >
    {children}
  </div>
);

// ==================== MOCK DATA ====================
const featuredServices = [
  {
    id: 1,
    name: "Wedding Elegance",
    category: "Wedding",
    price: 2500,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop",
    description: "Complete wedding venue transformation with floral arrangements, lighting, and elegant drapery.",
  },
  {
    id: 2,
    name: "Living Room Makeover",
    category: "Home Interior",
    price: 800,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
    description: "Modern living room redesign with curated furniture placement and accent pieces.",
  },
  {
    id: 3,
    name: "Corporate Gala Setup",
    category: "Corporate",
    price: 3500,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    description: "Professional corporate event decoration with branded elements and premium staging.",
  },
  {
    id: 4,
    name: "Birthday Bash",
    category: "Birthday",
    price: 600,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop",
    description: "Themed birthday party decorations with balloons, banners, and custom setups.",
  },
  {
    id: 5,
    name: "Festival Grandeur",
    category: "Festival",
    price: 1800,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop",
    description: "Traditional and modern festival decoration blending cultural aesthetics beautifully.",
  },
  {
    id: 6,
    name: "Garden Paradise",
    category: "Outdoor",
    price: 1200,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=600&h=400&fit=crop",
    description: "Enchanting outdoor garden setup with fairy lights, floral arches, and seating.",
  },
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Bride",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Mitchell&background=d4af37&color=0f0f1a&bold=true&size=80",
    text: "StyleDecor turned our wedding venue into an absolute dreamland. Every detail was perfect — the flowers, the lighting, the ambiance.",
    rating: 5,
  },
  {
    name: "James Rodriguez",
    role: "Homeowner",
    avatar: "https://ui-avatars.com/api/?name=James+Rodriguez&background=c084fc&color=0f0f1a&bold=true&size=80",
    text: "The living room makeover exceeded all my expectations. The team understood my vision perfectly.",
    rating: 5,
  },
  {
    name: "Amira Khan",
    role: "Event Manager",
    avatar: "https://ui-avatars.com/api/?name=Amira+Khan&background=38bdf8&color=0f0f1a&bold=true&size=80",
    text: "We hired StyleDecor for our annual corporate gala and they delivered beyond expectations.",
    rating: 5,
  },
];

const decorators = [
  {
    name: "Elena Rossi",
    specialty: "Wedding Design",
    projects: 120,
    avatar: "https://ui-avatars.com/api/?name=Elena+Rossi&background=d4af37&color=0f0f1a&bold=true&size=100",
  },
  {
    name: "David Chen",
    specialty: "Interior Styling",
    projects: 95,
    avatar: "https://ui-avatars.com/api/?name=David+Chen&background=c084fc&color=0f0f1a&bold=true&size=100",
  },
  {
    name: "Priya Sharma",
    specialty: "Event Decoration",
    projects: 108,
    avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=38bdf8&color=0f0f1a&bold=true&size=100",
  },
  {
    name: "Marcus Williams",
    specialty: "Festival Decor",
    projects: 87,
    avatar: "https://ui-avatars.com/api/?name=Marcus+Williams&background=4ade80&color=0f0f1a&bold=true&size=100",
  },
];

// ==================== HOME COMPONENT ====================
const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-24 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/3 -right-20 w-[700px] h-[700px] bg-secondary/8 rounded-full blur-[140px] animate-float" style={{ animationDelay: "2.5s" }} />
        </div>

        <div className="container-custom relative z-10 pt-20 pb-12 px-4">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
            >
              <FiAward size={16} />
              <span>Award-Winning Decoration Studio</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-bold font-serif leading-[1.05] mb-8"
            >
              Crafting <span className="gradient-text">Unforgettable</span><br /> Spaces
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto mb-12"
            >
              Transforming venues into breathtaking experiences with elegance, precision, and timeless beauty.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/services"
                className="btn btn-primary h-14 px-10 text-base font-semibold rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/40 flex items-center gap-2"
              >
                Explore Services
                <FiArrowRight size={20} />
              </Link>
              <Link
                to="/about"
                className="btn h-14 px-10 text-base font-semibold rounded-2xl border border-base-content/20 hover:bg-base-content/5"
              >
                Our Story
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <SectionWrapper className="bg-base-100">
        <div className="container-custom px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FiHeart />, value: 2500, suffix: "+", label: "Happy Clients" },
              { icon: <FiCalendar />, value: 3200, suffix: "+", label: "Projects Done" },
              { icon: <FiUsers />, value: 45, suffix: "+", label: "Expert Decorators" },
              { icon: <FiMapPin />, value: 15, suffix: "+", label: "Cities Covered" },
            ].map((stat, i) => (
              <GlassCard key={i}>
                <div className="p-8 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl text-primary mb-6">
                    {stat.icon}
                  </div>
                  <p className="text-4xl md:text-5xl font-bold gradient-text font-serif mb-2">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm text-base-content/60 font-medium">{stat.label}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* FEATURED SERVICES */}
      <SectionWrapper>
        <div className="container-custom px-4">
          <div className="text-center mb-16">
            <span className="uppercase tracking-[3px] text-primary text-sm font-semibold">Our Expertise</span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif mt-3">Featured Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, i) => (
              <GlassCard key={service.id} className="group overflow-hidden h-full flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 text-xs font-semibold bg-white/90 text-base-content rounded-full">
                      {service.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 text-base-content px-3 py-1 rounded-full text-sm font-medium">
                    <FiStar className="text-yellow-500" size={16} />
                    {service.rating}
                  </div>
                </div>

                <div className="p-7 flex-1 flex flex-col">
                  <h3 className="font-bold text-xl font-serif mb-3 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-base-content/70 text-sm flex-1 line-clamp-3">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-base-200">
                    <div>
                      <span className="text-3xl font-bold gradient-text">${service.price}</span>
                      <span className="text-xs text-base-content/50 ml-1">/event</span>
                    </div>
                    <Link
                      to={`/services/${service.id}`}
                      className="btn btn-primary btn-sm px-6 rounded-2xl"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* You can continue adding other sections (How It Works, Decorators, Testimonials, etc.) using the same GlassCard and SectionWrapper pattern. */}

    </div>
  );
};

export default Home;