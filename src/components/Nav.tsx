import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./nav.scss";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 100 && currentScroll < lastScroll) {
        setShowHeader(true);
      } else if (currentScroll <= 50) {
        setShowHeader(false);
      }
      lastScroll = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`nav-header ${showHeader ? "visible" : ""}`}>
      <div className="nav-container">
        <img src="/Home/logo-aozora.png" alt="Aozora Logo" className="logo" />

        <button
          className={`menu-btn ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {!menuOpen ? (
            <>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </>
          ) : (
            <span className="close-icon">×</span>
          )}
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <NavLink to="/" onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/menu" onClick={() => setMenuOpen(false)}>
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink to="/book" onClick={() => setMenuOpen(false)}>
                Book
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
