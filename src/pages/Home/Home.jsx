import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { motion, useInView } from 'motion/react';
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
} from 'react-icons/fi';

// ==================== ANIMATED COUNTER ====================
const AnimatedCounter = ({ target, suffix = '', duration = 2000 }) => {
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

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

// ==================== SECTION WRAPPER ====================
const SectionWrapper = ({ children, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

// ==================== MOCK DATA ====================
const featuredServices = [
  {
    id: 1,
    name: 'Wedding Elegance',
    category: 'Wedding',
    price: 2500,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&h=400&fit=crop',
    description: 'Complete wedding venue transformation with floral arrangements, lighting, and elegant drapery.',
  },
  {
    id: 2,
    name: 'Living Room Makeover',
    category: 'Home Interior',
    price: 800,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
    description: 'Modern living room redesign with curated furniture placement and accent pieces.',
  },
  {
    id: 3,
    name: 'Corporate Gala Setup',
    category: 'Corporate',
    price: 3500,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
    description: 'Professional corporate event decoration with branded elements and premium staging.',
  },
  {
    id: 4,
    name: 'Birthday Bash',
    category: 'Birthday',
    price: 600,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop',
    description: 'Themed birthday party decorations with balloons, banners, and custom setups.',
  },
  {
    id: 5,
    name: 'Festival Grandeur',
    category: 'Festival',
    price: 1800,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop',
    description: 'Traditional and modern festival decoration blending cultural aesthetics beautifully.',
  },
  {
    id: 6,
    name: 'Garden Paradise',
    category: 'Outdoor',
    price: 1200,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=600&h=400&fit=crop',
    description: 'Enchanting outdoor garden setup with fairy lights, floral arches, and seating.',
  },
];

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Bride',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Mitchell&background=d4af37&color=0f0f1a&bold=true&size=80',
    text: 'StyleDecor turned our wedding venue into an absolute dreamland. Every detail was perfect — the flowers, the lighting, the ambiance. Our guests were speechless!',
    rating: 5,
  },
  {
    name: 'James Rodriguez',
    role: 'Homeowner',
    avatar: 'https://ui-avatars.com/api/?name=James+Rodriguez&background=c084fc&color=0f0f1a&bold=true&size=80',
    text: 'The living room makeover exceeded all my expectations. The team understood my vision perfectly and delivered a space that feels both modern and cozy.',
    rating: 5,
  },
  {
    name: 'Amira Khan',
    role: 'Event Manager',
    avatar: 'https://ui-avatars.com/api/?name=Amira+Khan&background=38bdf8&color=0f0f1a&bold=true&size=80',
    text: 'We hired StyleDecor for our annual corporate gala and they delivered beyond expectations. Professional, punctual, and incredibly creative.',
    rating: 5,
  },
];

const decorators = [
  { name: 'Elena Rossi', specialty: 'Wedding Design', projects: 120, avatar: 'https://ui-avatars.com/api/?name=Elena+Rossi&background=d4af37&color=0f0f1a&bold=true&size=100' },
  { name: 'David Chen', specialty: 'Interior Styling', projects: 95, avatar: 'https://ui-avatars.com/api/?name=David+Chen&background=c084fc&color=0f0f1a&bold=true&size=100' },
  { name: 'Priya Sharma', specialty: 'Event Decoration', projects: 108, avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=38bdf8&color=0f0f1a&bold=true&size=100' },
  { name: 'Marcus Williams', specialty: 'Festival Decor', projects: 87, avatar: 'https://ui-avatars.com/api/?name=Marcus+Williams&background=4ade80&color=0f0f1a&bold=true&size=100' },
];

// ==================== HOME COMPONENT ====================
const Home = () => {
  return (
    <div className="overflow-hidden">

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px] animate-float" />
          <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-secondary/6 rounded-full blur-[120px] animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/3 rounded-full blur-[150px]" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="container-custom relative z-10 pt-24 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
            >
              <FiAward size={14} />
              <span>Award-Winning Decoration Studio</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-serif leading-[1.1] mb-8"
            >
              Crafting
              <br />
              <span className="gradient-text">Unforgettable</span>
              <br />
              Spaces
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-base-content/60 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              From intimate weddings to grand corporate events — our expert decorators bring your vision to life with meticulous attention to every detail.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/services"
                className="btn btn-primary btn-lg px-10 text-base font-semibold shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-shadow"
              >
                Explore Services
                <FiArrowRight size={18} />
              </Link>
              <Link
                to="/about"
                className="btn btn-lg px-10 text-base font-semibold bg-base-content/5 border border-base-content/10 text-base-content hover:bg-base-content/10 hover:border-base-content/20"
              >
                Our Story
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-base-content/40"
            >
              <span className="flex items-center gap-2"><FiShield size={14} className="text-primary" /> Trusted by 2,000+ clients</span>
              <span className="flex items-center gap-2"><FiStar size={14} className="text-primary" /> 4.9 average rating</span>
              <span className="flex items-center gap-2"><FiMapPin size={14} className="text-primary" /> 15+ cities covered</span>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-base-100 to-transparent" />
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <SectionWrapper className="py-16 relative">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <FiHeart />, value: 2500, suffix: '+', label: 'Happy Clients' },
              { icon: <FiCalendar />, value: 3200, suffix: '+', label: 'Projects Done' },
              { icon: <FiUsers />, value: 45, suffix: '+', label: 'Expert Decorators' },
              { icon: <FiMapPin />, value: 15, suffix: '+', label: 'Cities Covered' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card p-6 md:p-8 text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-xl group-hover:bg-primary group-hover:text-primary-content transition-colors duration-300">
                  {stat.icon}
                </div>
                <p className="text-3xl md:text-4xl font-bold gradient-text font-serif">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-base-content/50 mt-2 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ==================== FEATURED SERVICES ==================== */}
      <SectionWrapper className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Our Expertise</span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif mt-3 mb-4">
              Featured <span className="gradient-text">Services</span>
            </h2>
            <p className="text-base-content/60 max-w-xl mx-auto">
              Discover our most popular decoration packages crafted to perfection for every occasion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card overflow-hidden group cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base-100/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/90 text-primary-content">
                      {service.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-base-100/80 backdrop-blur-sm text-xs font-semibold">
                    <FiStar className="text-yellow-400 fill-yellow-400" size={12} />
                    {service.rating}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold font-serif mb-2 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-base-content/50 mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold gradient-text">${service.price}</span>
                      <span className="text-xs text-base-content/40 ml-1">/ event</span>
                    </div>
                    <Link
                      to={`/services/${service.id}`}
                      className="btn btn-primary btn-sm px-4 shadow-md shadow-primary/20"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="btn btn-outline btn-primary btn-lg px-10">
              Browse All Services
              <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* ==================== HOW IT WORKS ==================== */}
      <SectionWrapper className="section-padding bg-base-200/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Simple Process</span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif mt-3 mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-base-content/60 max-w-xl mx-auto">
              Book your dream decoration in three easy steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            {[
              {
                step: '01',
                icon: <FiSearch size={28} />,
                title: 'Browse & Choose',
                desc: 'Explore our curated decoration packages. Filter by category, budget, and style to find your perfect match.',
              },
              {
                step: '02',
                icon: <FiCalendar size={28} />,
                title: 'Book & Schedule',
                desc: 'Select your preferred date and location. Our team will confirm your booking and assign a dedicated decorator.',
              },
              {
                step: '03',
                icon: <FiCreditCard size={28} />,
                title: 'Pay & Enjoy',
                desc: 'Secure online payment through Stripe. Sit back and watch as we transform your space into something magical.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative text-center group"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-base-200 border border-base-300 flex items-center justify-center group-hover:border-primary/40 group-hover:shadow-xl group-hover:shadow-primary/10 transition-all duration-500 relative">
                  <span className="text-primary">{item.icon}</span>
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-lg gradient-gold flex items-center justify-center text-xs font-bold text-base-100">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-serif mb-3">{item.title}</h3>
                <p className="text-sm text-base-content/50 max-w-xs mx-auto leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ==================== FEATURED DECORATORS ==================== */}
      <SectionWrapper className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Our Team</span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif mt-3 mb-4">
              Meet Our <span className="gradient-text">Decorators</span>
            </h2>
            <p className="text-base-content/60 max-w-xl mx-auto">
              Talented professionals who bring creativity and precision to every project.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {decorators.map((dec, i) => (
              <motion.div
                key={dec.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card p-6 text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all duration-300">
                  <img src={dec.avatar} alt={dec.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold font-serif text-lg mb-1">{dec.name}</h3>
                <p className="text-xs text-primary font-medium mb-2">{dec.specialty}</p>
                <p className="text-xs text-base-content/40">{dec.projects} projects completed</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ==================== TESTIMONIALS ==================== */}
      <SectionWrapper className="section-padding bg-base-200/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Client Love</span>
            <h2 className="text-4xl md:text-5xl font-bold font-serif mt-3 mb-4">
              What People <span className="gradient-text">Say</span>
            </h2>
            <p className="text-base-content/60 max-w-xl mx-auto">
              Real stories from clients who trusted us with their most important moments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="glass-card p-8 relative group"
              >
                {/* Quote mark */}
                <div className="absolute top-4 right-6 text-6xl font-serif text-primary/10 leading-none">"</div>

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <FiStar key={j} className="text-yellow-400 fill-yellow-400" size={16} />
                  ))}
                </div>

                <p className="text-sm text-base-content/70 leading-relaxed mb-6 relative z-10">
                  {t.text}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-base-300">
                  <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-primary/20">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-primary">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ==================== WHY CHOOSE US ==================== */}
      <SectionWrapper className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary text-sm font-semibold tracking-widest uppercase">Why StyleDecor</span>
              <h2 className="text-4xl md:text-5xl font-bold font-serif mt-3 mb-6">
                The <span className="gradient-text">Difference</span>
                <br />We Bring
              </h2>
              <p className="text-base-content/60 mb-10 leading-relaxed">
                We don't just decorate — we create experiences. Every project is handled with care, creativity, and a commitment to exceeding your expectations.
              </p>

              <div className="space-y-5">
                {[
                  { title: 'Personalized Design', desc: 'Every project is custom-tailored to your vision and preferences.' },
                  { title: 'Professional Team', desc: 'Vetted decorators with years of experience in premium styling.' },
                  { title: 'On-Time Delivery', desc: 'We respect your schedule — setup complete before your event starts.' },
                  { title: 'Transparent Pricing', desc: 'No hidden costs. Clear quotes with detailed cost breakdowns.' },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="flex gap-4 group"
                  >
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-content transition-colors duration-300">
                      <FiCheck size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-base-content/50">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right side - visual element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&h=700&fit=crop"
                  alt="Elegant decoration setup"
                  className="w-full h-[500px] object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base-100/60 via-transparent to-transparent" />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 glass-card p-5 flex items-center gap-4 animate-float">
                <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center">
                  <FiTrendingUp className="text-base-100" size={22} />
                </div>
                <div>
                  <p className="text-2xl font-bold gradient-text">98%</p>
                  <p className="text-xs text-base-content/50">Client Satisfaction</p>
                </div>
              </div>
              {/* Floating review card */}
              <div className="absolute -top-4 -right-4 glass-card p-4 animate-float" style={{ animationDelay: '2s' }}>
                <div className="flex gap-1 mb-1">
                  {[1,2,3,4,5].map(s => <FiStar key={s} className="text-yellow-400 fill-yellow-400" size={12} />)}
                </div>
                <p className="text-xs text-base-content/60">"Absolutely stunning work!"</p>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary/8 rounded-full blur-[100px]" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6">
              Ready to Transform
              <br />
              <span className="gradient-text">Your Space?</span>
            </h2>
            <p className="text-lg text-base-content/60 mb-10 max-w-xl mx-auto">
              Let's bring your vision to life. Book a consultation with our design experts today and start your journey to a beautifully decorated space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/services"
                className="btn btn-primary btn-lg px-10 text-base font-semibold shadow-xl shadow-primary/25"
              >
                Get Started Now
                <FiArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="btn btn-lg px-10 text-base font-semibold bg-base-content/5 border border-base-content/10 text-base-content hover:bg-base-content/10"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
