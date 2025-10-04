import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Brain,
  MessageSquare,
  TrendingUp,
  Network,
  Server,
  Database,
  ArrowRight,
  Menu,
  X,
  Mail,
  Linkedin,
  Github,
} from "lucide-react";
import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const services = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Generative AI Application Development",
      description:
        "Enhance your products, solutions and processes with cutting edge Generative AI integrations",
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Conversation AI Integrations",
      description:
        "Build state of the art text and voice solutions powered by agentic frameworks",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Serverless Architecture",
      description:
        "Fast, responsive and scalable serverless product development with modern cloud infrastructure",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI/ML Model Deployment",
      description:
        "Build, deploy and maintain cutting edge AI/ML models at scale",
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "Knowledge Graph Solutions",
      description:
        "Create intelligent knowledge graphs to power your AI applications and data insights",
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "Cloud Infrastructure",
      description:
        "Robust cloud solutions with Cloudflare Workers, AWS, and modern serverless platforms",
    },
  ];

  const stats = [
    { number: "50+", label: "AI Projects Delivered" },
    { number: "15+", label: "Enterprise Clients" },
    { number: "100%", label: "Serverless Architecture" },
  ];

  const testimonials = [
    {
      company: "TechCorp",
      quote:
        "KVGAI transformed our business with their innovative AI solutions. Their expertise in serverless architecture is unmatched.",
      author: "Sarah Johnson",
      role: "CTO",
    },
    {
      company: "DataFlow Inc",
      quote:
        "The team's ability to deploy and maintain complex AI models at scale has been instrumental to our success.",
      author: "Michael Chen",
      role: "Head of Engineering",
    },
    {
      company: "InnovateLabs",
      quote:
        "Their knowledge graph solutions revolutionized how we handle data. Truly cutting-edge work.",
      author: "Emily Rodriguez",
      role: "Product Director",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <motion.div
            className="logo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Database className="logo-icon" />
            <span className="logo-text">KVGAI</span>
          </motion.div>

          <div className="nav-links desktop">
            <a onClick={() => scrollToSection("services")}>Services</a>
            <a onClick={() => scrollToSection("about")}>About</a>
            <a onClick={() => scrollToSection("testimonials")}>Clients</a>
            <a onClick={() => scrollToSection("contact")} className="cta-button">
              Contact Us
            </a>
          </div>

          <button
            className="menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <a onClick={() => scrollToSection("services")}>Services</a>
            <a onClick={() => scrollToSection("about")}>About</a>
            <a onClick={() => scrollToSection("testimonials")}>Clients</a>
            <a onClick={() => scrollToSection("contact")}>Contact Us</a>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="gradient-text">Serverless Generative AI</span>
              <br />
              Software Development
            </motion.h1>

            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Transforming ideas into intelligent solutions with cutting-edge AI
              technology and modern serverless architecture
            </motion.p>

            <motion.button
              className="hero-button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              onClick={() => scrollToSection("contact")}
            >
              Get Started <ArrowRight className="button-icon" />
            </motion.button>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <div className="floating-card card-1">
              <Sparkles className="card-icon" />
              <span>Generative AI</span>
            </div>
            <div className="floating-card card-2">
              <Brain className="card-icon" />
              <span>ML Models</span>
            </div>
            <div className="floating-card card-3">
              <Network className="card-icon" />
              <span>Knowledge Graphs</span>
            </div>
            <div className="floating-card card-4">
              <Server className="card-icon" />
              <span>Serverless</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <h3 className="stat-number">{stat.number}</h3>
                <p className="stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">What We Offer</h2>
            <p className="section-subtitle">
              Comprehensive AI solutions tailored to your needs
            </p>
          </motion.div>

          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Who We Are</h2>
            <p className="section-subtitle">
              Pioneering the future of AI-powered software development
            </p>
          </motion.div>

          <div className="about-grid">
            <motion.div
              className="about-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="about-icon">
                <Sparkles className="w-12 h-12" />
              </div>
              <h3 className="about-card-title">Our Mission</h3>
              <p className="about-card-text">
                We specialize in serverless generative AI software development,
                helping businesses harness the power of artificial intelligence
                to transform their operations and deliver exceptional value.
              </p>
            </motion.div>

            <motion.div
              className="about-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="about-icon">
                <Brain className="w-12 h-12" />
              </div>
              <h3 className="about-card-title">Our Expertise</h3>
              <p className="about-card-text">
                From model deployments to knowledge graph creation, we provide
                end-to-end AI solutions built on modern serverless
                architectures that scale effortlessly with your needs.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="founder-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="founder-card">
              <div className="founder-avatar">
                <span className="founder-initial">A</span>
              </div>
              <div className="founder-info">
                <h3 className="founder-name">Anubhav Elhence</h3>
                <p className="founder-role">Founder & CEO</p>
                <p className="founder-bio">
                  Leading KVGAI's vision to democratize AI technology through
                  innovative serverless solutions and cutting-edge generative AI
                  applications.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">
              Trusted by innovative companies worldwide
            </p>
          </motion.div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="testimonial-company">{testimonial.company}</div>
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <div className="testimonial-author">
                  <p className="author-name">{testimonial.author}</p>
                  <p className="author-role">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Let's Build The Future Together</h2>
            <p className="section-subtitle">
              Get in touch to discuss your next AI project
            </p>
          </motion.div>

          <motion.div
            className="contact-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us about your project"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                />
              </div>

              <button type="submit" className="submit-button">
                Send Message <ArrowRight className="button-icon" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <Database className="logo-icon" />
                <span className="logo-text">KVGAI</span>
              </div>
              <p className="footer-tagline">
                Serverless Generative AI Software Development
              </p>
            </div>

            <div className="footer-links">
              <div className="footer-column">
                <h4>Company</h4>
                <a onClick={() => scrollToSection("about")}>About</a>
                <a onClick={() => scrollToSection("services")}>Services</a>
                <a onClick={() => scrollToSection("testimonials")}>Clients</a>
              </div>

              <div className="footer-column">
                <h4>Connect</h4>
                <a href="mailto:contact@kvgai.com">
                  <Mail className="w-4 h-4" /> Email
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" /> GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 KVGAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
