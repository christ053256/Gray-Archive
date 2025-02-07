import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import './CSS/Navigation.css';
import Login from './Login.jsx';
import GlobalChat from './GlobalChat.jsx';
import Forum from './Forum.jsx';
import FYP from './FYP.jsx';
import UserProfile from './UserProfile.jsx';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/login'); // Set default to login
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [userData, setUserData] = useState(null); // Store user data

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
    handleNavClick('/FYP'); // Redirect to FYP or another page after login
  };

  // In your parent component
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    handleNavClick('/login'); // or whatever route you want to redirect to after logout
  };

  const renderContent = () => {
    switch (activeLink) {
      case '/login':
        return <Login onLogin={handleLogin} setUserData={setUserData} />; // Pass the login handler to Login component
      case '/FYP':
        return <div className="content-container"><FYP /></div>;
      case '/forums':
        return <div className="content-container"><Forum /></div>;
      case '/chat':
        return <div className="content-container"><GlobalChat setUserData={userData}/></div>;
      case '/profile':
        return <div className="content-container"><UserProfile setUserData={userData} onLogOut={handleLogout}/></div>;
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
                <a 
                  href="/FYP" 
                  className={`nav-link ${activeLink === '/FYP' ? 'nav-link-active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('/FYP');
                  }}
                >
                  Shorts
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


                {isLoggedIn && (
                  <div className='nav-links'>
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

                  <a 
                    href="#"
                    className={`nav-link ${activeLink === '/profile' ? 'nav-link-active' : ''}`}
                    onClick={(e) => { 
                      e.preventDefault();
                      handleNavClick('/profile');
                    }}
                  >
                    Profile
                  </a>
                  </div>
                )}
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

                {isLoggedIn && (
                  <div className='nav-mobile-links'>
                    <a 
                      href="#"
                      className={`nav-mobile-link ${activeLink === '/profile' ? 'nav-link-active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('/profile');
                      }}
                    >
                      Profile
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
                )}

                <a 
                  href="/FYP" 
                  className={`nav-mobile-link ${activeLink === '/FYP' ? 'nav-link-active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('/FYP');
                  }}
                >
                  Shorts
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
