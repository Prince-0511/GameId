import { Link } from 'react-router-dom';
import { Gamepad2, Mail, MessageCircle, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-lg">
                <Gamepad2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient-gaming">
                KreedaaX
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              The ultimate gaming marketplace where players connect to buy and sell game IDs, 
              skins, and equipment safely within our trusted community.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 bg-background border border-border rounded-lg hover:border-primary hover:bg-primary/10 transition-all duration-300"
              >
                <Twitter className="h-5 w-5 text-foreground" />
              </a>
              <a
                href="#"
                className="p-2 bg-background border border-border rounded-lg hover:border-primary hover:bg-primary/10 transition-all duration-300"
              >
                <Instagram className="h-5 w-5 text-foreground" />
              </a>
              <a
                href="#"
                className="p-2 bg-background border border-border rounded-lg hover:border-primary hover:bg-primary/10 transition-all duration-300"
              >
                <Youtube className="h-5 w-5 text-foreground" />
              </a>
              <a
                href="#"
                className="p-2 bg-background border border-border rounded-lg hover:border-primary hover:bg-primary/10 transition-all duration-300"
              >
                <MessageCircle className="h-5 w-5 text-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/games" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  Browse Games
                </Link>
              </li>
              <li>
                <Link to="/sell" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  Sell Your ID
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:support@gameonix.com" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  support@gameonix.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 text-primary" />
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  Discord Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 Gameonix. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/safety" className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300">
                Safety Guidelines
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;