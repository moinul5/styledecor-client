import { motion } from 'motion/react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

        <div className="container-custom text-center z-10">
          <motion.p
            className="text-primary font-medium tracking-widest uppercase text-sm mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            ✦ Premium Decoration Services ✦
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Transform Your Space <br />
            <span className="gradient-text">Into A Masterpiece</span>
          </motion.h1>
          <motion.p
            className="text-base-content/70 text-lg md:text-xl max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            From weddings to home interiors — book expert decorators, track your project, and experience design excellence.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a href="/services" className="btn btn-primary btn-lg px-8 text-base font-semibold animate-pulse-gold">
              Explore Services
            </a>
            <a href="/about" className="btn btn-outline btn-primary btn-lg px-8 text-base font-semibold">
              Learn More
            </a>
          </motion.div>
        </div>
      </section>

      {/* Placeholder for more sections - will be built in Milestone 2 */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            Why Choose <span className="gradient-text">StyleDecor</span>?
          </h2>
          <p className="text-base-content/60 max-w-xl mx-auto">
            More sections coming in Milestone 2 — Featured Services, How It Works, Testimonials, and more.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
