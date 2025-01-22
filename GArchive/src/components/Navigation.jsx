import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import './CSS/Navigation.css';
import Login from './Login.jsx';
import GlobalChat from './GlobalChat.jsx';
import Forum from './Forum.jsx';
import Docs from './Docs.jsx';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/login'); // Set default to login
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  useEffect(() => {
    window.history.pushState({}, '', activeLink);
  }, [activeLink]);

  const handleNavClick = (path) => {
    setActiveLink(path);
    setIsOpen(false);
  };

  const handleLogin = () => {
    // This is where you set the user as logged in after successful login
    setIsLoggedIn(true);
    handleNavClick('/docs'); // Redirect to Docs or another page after login
  };

  const renderContent = () => {
    switch (activeLink) {
      case '/login':
        return <Login onLogin={handleLogin} />; // Pass the login handler to Login component
      case '/docs':
        return <div className="content-container"><Docs /></div>;
      case '/forums':
        return <div className="content-container"><Forum /></div>;
      case '/chat':
        return <div className="content-container"><GlobalChat /></div>;
      default:
        return <Login onLogin={handleLogin} />; // Fallback to login
    }
  };

  return (
    <div className="app-container">
      <header className="nav-header">
        <nav className="nav-container">
          <div className="nav-wrapper">
            <div className="nav-logo">
              <h1>Gray Archive</h1>
            </div>

            <div className="nav-desktop">
              <div className="nav-links">
                {!isLoggedIn && (
                  <a 
                    href="#"
                    className={`nav-link ${activeLink === '/login' ? 'nav-link-active' : ''}`}
                    onClick={(e) => { 
                      e.preventDefault();
                      handleNavClick('/login');
                    }}
                  >
                    Login
                  </a>
                )}

                <a 
                  href="/docs" 
                  className={`nav-link ${activeLink === '/docs' ? 'nav-link-active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('/docs');
                  }}
                >
                  Docs
                </a>
                <a 
                  href="/forums" 
                  className={`nav-link ${activeLink === '/forums' ? 'nav-link-active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('/forums');
                  }}
                >
                  Forums
                </a>
                <a 
                  href="/chat" 
                  className={`nav-link ${activeLink === '/chat' ? 'nav-link-active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('/chat');
                  }}
                >
                  Global Chat
                </a>
              </div>
            </div>

            <div className="nav-mobile-button">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="mobile-menu-button"
              >
                <Menu className="menu-icon" />
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="nav-mobile">
              <div className="nav-mobile-links">
                {!isLoggedIn && (
                  <a 
                    href="#"
                    className={`nav-mobile-link ${activeLink === '/login' ? 'nav-link-active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('/login');
                    }}
                  >
                    Login
                  </a>
                )}

                <a 
                  href="/docs" 
                  className={`nav-mobile-link ${activeLink === '/docs' ? 'nav-link-active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('/docs');
                  }}
                >
                  Docs
                </a>
                <a 
                  href="/forums" 
                  className={`nav-mobile-link ${activeLink === '/forums' ? 'nav-link-active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('/forums');
                  }}
                >
                  Forums
                </a>
                <a 
                  href="/chat" 
                  className={`nav-mobile-link ${activeLink === '/chat' ? 'nav-link-active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('/chat');
                  }}
                >
                  Global Chat
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default Navigation;
