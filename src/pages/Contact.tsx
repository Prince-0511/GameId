import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, Clock, Users, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      contact: 'support@gameonix.com',
      action: 'Send Email'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team instantly',
      contact: 'Available 24/7',
      action: 'Start Chat'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us for urgent matters',
      contact: '+1 (555) 123-4567',
      action: 'Call Now'
    }
  ];

  const stats = [
    {
      icon: Users,
      number: '50K+',
      label: 'Happy Customers'
    },
    {
      icon: Clock,
      number: '24/7',
      label: 'Support Available'
    },
    {
      icon: Shield,
      number: '99.9%',
      label: 'Secure Transactions'
    }
  ];

  const faqs = [
    {
      question: 'How do I buy an account safely?',
      answer: 'Our escrow system protects your payment until you confirm the account is as described. All sellers are verified.'
    },
    {
      question: 'What if the account is not as described?',
      answer: 'We offer full refunds if the account doesn\'t match the listing. Our support team will help resolve any issues.'
    },
    {
      question: 'How long does account transfer take?',
      answer: 'Most account transfers are instant once payment is confirmed. Complex transfers may take up to 24 hours.'
    },
    {
      question: 'Can I sell my gaming account?',
      answer: 'Yes! Create a free seller account, verify your identity, and list your accounts with detailed descriptions.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/20 via-secondary/20 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gradient-gaming mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Need help? Have questions? Our support team is here to assist you 24/7
          </p>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="gaming-card p-6 text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-gradient-gaming mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient-gaming mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose your preferred way to reach us
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {contactMethods.map((method, index) => (
              <div key={index} className="gaming-card p-8 text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <method.icon className="w-10 h-10 text-primary" />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {method.title}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {method.description}
                </p>
                
                <div className="text-lg font-semibold text-primary mb-6">
                  {method.contact}
                </div>
                
                <button className="btn-gaming-primary px-6 py-3">
                  {method.action}
                </button>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Send us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  >
                    <option value="">Select a subject</option>
                    <option value="account-issue">Account Issue</option>
                    <option value="payment">Payment Problem</option>
                    <option value="technical">Technical Support</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                    placeholder="Describe your issue or question in detail..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-gaming-primary px-6 py-4 text-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Frequently Asked Questions
              </h3>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="gaming-card p-6">
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      {faq.question}
                    </h4>
                    <p className="text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Info */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="gaming-card p-12">
            <MapPin className="w-16 h-16 mx-auto text-primary mb-6" />
            <h2 className="text-4xl font-bold text-gradient-gaming mb-6">
              Visit Our Office
            </h2>
            <div className="text-xl text-muted-foreground space-y-2">
              <p>123 Gaming Street, Tech District</p>
              <p>San Francisco, CA 94102</p>
              <p className="font-semibold">Business Hours: 9 AM - 6 PM (PST)</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;