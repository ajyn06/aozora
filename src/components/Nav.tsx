import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.scss";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 100) {
        setShowHeader(false);
      } else if (currentScroll < lastScroll) {
        setShowHeader(true);
      }
      if (currentScroll > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      lastScroll = currentScroll;
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const prevent = (e: Event) => {
      e.preventDefault();
    };

    if (menuOpen) {
      html.classList.add("no-scroll");
      document.body.classList.add("no-scroll");
      document.addEventListener("wheel", prevent, { passive: false });
      document.addEventListener("touchmove", prevent, { passive: false });
    } else {
      html.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.removeEventListener("wheel", prevent as EventListener);
      document.removeEventListener("touchmove", prevent as EventListener);
    };
  }, [menuOpen]);

  return (
    <header className={`nav-header ${showHeader ? "visible" : "hidden"} ${scrolled ? "scrolled" : ""}`}>
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
