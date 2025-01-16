import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import './CSS/Navigation.css';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(window.location.pathname);

  const handleNavClick = (path) => {
    setActiveLink(path);
  };

  return (
    <header className="nav-header">
      <nav className="nav-container">
        <div className="nav-wrapper">
          {/* Logo/Title section */}
          <div className="nav-logo">
            <h1>Gray Archive</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="nav-desktop">
            <div className="nav-links">
              <a 
                href="/" 
                className={`nav-link ${activeLink === '/' ? 'nav-link-active' : ''}`}
                onClick={() => handleNavClick('/')}
              >
                Login
              </a>
              <a 
                href="/about" 
                className={`nav-link ${activeLink === '/about' ? 'nav-link-active' : ''}`}
                onClick={() => handleNavClick('/about')}
              >
                About
              </a>
              <a 
                href="/docs" 
                className={`nav-link ${activeLink === '/docs' ? 'nav-link-active' : ''}`}
                onClick={() => handleNavClick('/docs')}
              >
                Docs
              </a>
              <a 
                href="/forums" 
                className={`nav-link ${activeLink === '/forums' ? 'nav-link-active' : ''}`}
                onClick={() => handleNavClick('/forums')}
              >
                Forums
              </a>
              <a 
                href="/chat" 
                className={`nav-link ${activeLink === '/chat' ? 'nav-link-active' : ''}`}
                onClick={() => handleNavClick('/chat')}
              >
                Global Chat
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="nav-mobile-button">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mobile-menu-button"
            >
              <Menu className="menu-icon" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="nav-mobile">
            <div className="nav-mobile-links">
              <a 
                href="/" 
                className={`nav-mobile-link ${activeLink === '/' ? 'nav-link-active' : ''}`}
                onClick={() => handleNavClick('/')}
              >
                Login
              </a>
              <a 
                href="/about" 
                className={`nav-mobile-link ${activeLink === '/about' ? 'nav-link-active' : ''}`}
                onClick={() => handleNavClick('/about')}
              >
                About
              </a>
              <a 
                href="/docs" 
                className={`nav-mobile-link ${activeLink === '/docs' ? 'nav-link-active' : ''}`}
                onClick={() => handleNavClick('/docs')}
              >
                Docs
              </a>
              <a 
                href="/forums" 
                className={`nav-mobile-link ${activeLink === '/forums' ? 'nav-link-active' : ''}`}
                onClick={() => handleNavClick('/forums')}
              >
                Forums
              </a>
              <a 
                href="/chat" 
                className={`nav-mobile-link nav-link-primary ${activeLink === '/chat' ? 'nav-link-active' : ''}`}
                onClick={() => handleNavClick('/chat')}
              >
                Global Chat
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;