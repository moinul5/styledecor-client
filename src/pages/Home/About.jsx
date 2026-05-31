import { motion } from 'motion/react';
import { FiAward, FiHeart, FiUsers, FiStar } from 'react-icons/fi';

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-base-100">
      {/* Hero Section */}
      <div className="container-custom mb-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-serif mb-6"
          >
            Crafting Unforgettable <span className="gradient-text">Experiences</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-base-content/70"
          >
            Since 2018, StyleDecor has been the premier choice for luxury event and space decoration. 
            We believe that every space has a story to tell, and our mission is to help you tell yours beautifully.
          </motion.p>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-base-200/50 py-20">
        <div className="container-custom">
          <h2 className="text-3xl font-bold font-serif text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-card p-8 text-center hover:-translate-y-2 transition-transform duration-300">
              <FiStar className="mx-auto text-4xl text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-sm text-base-content/60">We never compromise on the quality of our materials or our service.</p>
            </div>
            <div className="glass-card p-8 text-center hover:-translate-y-2 transition-transform duration-300">
              <FiHeart className="mx-auto text-4xl text-secondary mb-4" />
              <h3 className="text-xl font-bold mb-2">Passion</h3>
              <p className="text-sm text-base-content/60">We pour our hearts into every single event, no matter the size.</p>
            </div>
            <div className="glass-card p-8 text-center hover:-translate-y-2 transition-transform duration-300">
              <FiUsers className="mx-auto text-4xl text-info mb-4" />
              <h3 className="text-xl font-bold mb-2">Collaboration</h3>
              <p className="text-sm text-base-content/60">We work closely with our clients to bring their exact vision to life.</p>
            </div>
            <div className="glass-card p-8 text-center hover:-translate-y-2 transition-transform duration-300">
              <FiAward className="mx-auto text-4xl text-success mb-4" />
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-sm text-base-content/60">Constantly pushing boundaries to create unique, trend-setting designs.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container-custom py-20">
        <h2 className="text-3xl font-bold font-serif text-center mb-12">Meet Our Lead Decorators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Elena Rostova', role: 'Wedding Specialist', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
            { name: 'Marcus Chen', role: 'Corporate Events Director', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
            { name: 'Sarah Jenkins', role: 'Interior & Stage Design', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
          ].map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card overflow-hidden group"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold font-serif mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-semibold uppercase tracking-wider">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
