import { Link } from 'react-router';
import { FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: '/services', label: 'Our Services' },
    { to: '/coverage-map', label: 'Coverage Area' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ];

  const serviceLinks = [
    { label: 'Wedding Decoration' },
    { label: 'Home Interior' },
    { label: 'Corporate Events' },
    { label: 'Birthday Parties' },
    { label: 'Festival Decor' },
  ];

  const socialLinks = [
    { icon: <FaFacebookF size={16} />, href: '#', label: 'Facebook' },
    { icon: <FaInstagram size={16} />, href: '#', label: 'Instagram' },
    { icon: <FaPinterestP size={16} />, href: '#', label: 'Pinterest' },
    { icon: <FaYoutube size={16} />, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-base-200 border-t border-base-300 relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary/3 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-base-300">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold font-serif mb-2">
                Stay <span className="gradient-text">Inspired</span>
              </h3>
              <p className="text-base-content/60 text-sm max-w-md">
                Get the latest decoration trends, exclusive offers, and design tips delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered bg-base-300/50 border-base-300 focus:border-primary w-full md:w-72 rounded-r-none"
              />
              <button className="btn btn-primary rounded-l-none px-6">
                Subscribe
                <FiArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center">
                <span className="text-base-100 font-bold text-lg font-serif">S</span>
              </div>
              <div>
                <span className="text-xl font-bold font-serif gradient-text">Style</span>
                <span className="text-xl font-bold font-serif text-base-content">Decor</span>
              </div>
            </Link>
            <p className="text-base-content/60 text-sm leading-relaxed mb-6">
              Transforming spaces into extraordinary experiences. Premium decoration services for weddings, homes, and events.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-base-300/50 flex items-center justify-center text-base-content/50 hover:bg-primary hover:text-primary-content transition-all duration-300 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-base-content/60 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-6">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <span className="text-sm text-base-content/60 hover:text-primary transition-colors duration-300 flex items-center gap-2 group cursor-default">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-primary mb-6">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-primary mt-0.5 shrink-0" size={16} />
                <span className="text-sm text-base-content/60">123 Design Avenue, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-primary shrink-0" size={16} />
                <span className="text-sm text-base-content/60">+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-primary shrink-0" size={16} />
                <span className="text-sm text-base-content/60">hello@styledecor.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-base-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-base-content/40">
            © {currentYear} StyleDecor. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-base-content/40 hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-base-content/40 hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
