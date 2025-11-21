import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import { omakaseItems, sushiItems, hotDishItems, drinkItems, dessertItems, formatPrice } from "./menu-data";
import "./Menu.scss";

const Menu = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const title = useMemo(() => "Our Menu", []);
  const letters = useMemo(() => title.split("") , [title]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
  } as const;

  const letterVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] as const },
    },
  } as const;

  const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  } as const;

  return (
    <>
      {/* Menu Hero */}
      <section className="menu-hero" ref={heroRef}>
        <motion.div
          className="menu-hero-bg"
          style={{ y: bgY, scale: bgScale, opacity: bgOpacity }}
        />
        <div className="menu-hero-overlay" />

        <div className="menu-hero-content">
          <motion.h1
            className="menu-hero-title"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {letters.map((ch, i) => (
              <motion.span key={i} className="letter" variants={letterVariants}>
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
          </motion.h1>

          <div className="menu-hero-bottom">
            <motion.p
              className="menu-hero-desc"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
            >
              Discover a refined selection of handcrafted sushi, seasonal dishes, and
              omakase experiences. Every plate at Aozora is a harmony of flavor,
              balance, and artistry — celebrating the beauty of the sea beneath the
              endless blue sky.
            </motion.p>
            <motion.div
              className="menu-hero-button"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.85 }}
            >
              <a
                href="/Menu/aozora-menu.pdf"
                download="aozora-menu.pdf"
                className="menu-download-btn"
                aria-label="Download Aozora menu as PDF"
              >
                Download Menu
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Omakase Section */}
      <section className="menu-main-section omakase-section" aria-labelledby="omakase-heading">
        <div className="menu-main-section-inner">
          <header className="menu-main-section-header">
            <h2 id="omakase-heading" className="omakase-title">Omakase Experience</h2>
            <p className="omakase-subtitle">
              An intimate multi-course journey curated by our head chef — a
              celebration of season, sea, and artistry.
            </p>
          </header>
          <div className="omakase-grid" role="list">
            {omakaseItems.map(item => (
              <article key={item.id} className="omakase-card" role="listitem">
                <div className="omakase-image-wrapper">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="omakase-image"
                    loading="lazy"
                  />
                </div>
                <div className="omakase-info">
                  <div className="omakase-top">
                    <h3 className="omakase-name">{item.name}</h3>
                    <span className="omakase-price">{formatPrice(item.price)}</span>
                  </div>
                  <p className="omakase-desc">{item.description}</p>
                  <hr className="omakase-divider" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sushi & Sashimi Section */}
      <section className="menu-main-section sushi-section" aria-labelledby="sushi-heading">
        <div className="menu-main-section-inner">
          <header className="menu-main-section-header">
            <h2 id="sushi-heading" className="sushi-title">Sushi & Sashimi Selection</h2>
            <p className="sushi-subtitle">
              Authentic creations celebrating the sea's finest treasures.
            </p>
          </header>
          <div className="sushi-grid" role="list">
            {sushiItems.map(item => (
              <article key={item.id} className="sushi-card" role="listitem">
                <div className="sushi-image-wrapper">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="sushi-image"
                    loading="lazy"
                  />
                </div>
                <div className="sushi-info">
                  <div className="sushi-top">
                    <h3 className="sushi-name">{item.name}</h3>
                    <span className="sushi-price">{formatPrice(item.price)}</span>
                  </div>
                  <p className="sushi-desc">{item.description}</p>
                  <hr className="sushi-divider" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Dishes & Add-ons Section */}
      <section className="menu-main-section hotdish-section" aria-labelledby="hotdish-heading">
        <div className="menu-main-section-inner">
          <header className="menu-main-section-header">
            <h2 id="hotdish-heading" className="hotdish-title">Hot Dishes & Add-ons</h2>
            <p className="hotdish-subtitle">
              Elegant warm dishes that complement your sushi experience.
            </p>
          </header>
          <div className="hotdish-grid" role="list">
            {hotDishItems.map(item => (
              <article key={item.id} className="hotdish-card" role="listitem">
                <div className="hotdish-image-wrapper">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="hotdish-image"
                    loading="lazy"
                  />
                </div>
                <div className="hotdish-info">
                  <div className="hotdish-top">
                    <h3 className="hotdish-name">{item.name}</h3>
                    <span className="hotdish-price">{formatPrice(item.price)}</span>
                  </div>
                  <p className="hotdish-desc">{item.description}</p>
                  <hr className="hotdish-divider" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Drinks & Desserts Section */}
      <section className="menu-main-section drinks-section" aria-labelledby="drinks-heading">
        <div className="menu-main-section-inner">
          <div className="drinks-columns">
            <div className="drinks-column">
              <header className="drinks-header">
                <h2 id="drinks-heading" className="drinks-title">Drinks & Beverages</h2>
              </header>
              <div className="drinks-list" role="list">
                {drinkItems.map(item => (
                  <article key={item.id} className="drinks-item" role="listitem">
                    <div className="drinks-item-top">
                      <h3 className="drinks-item-name">{item.name}</h3>
                      <span className="drinks-item-price">{formatPrice(item.price)}</span>
                    </div>
                    <p className="drinks-item-desc">{item.description}</p>
                    <hr className="drinks-divider" />
                  </article>
                ))}
              </div>
            </div>
            <div className="drinks-column">
              <header className="drinks-header">
                <h2 className="drinks-title">Desserts</h2>
              </header>
              <div className="drinks-list" role="list">
                {dessertItems.map(item => (
                  <article key={item.id} className="drinks-item" role="listitem">
                    <div className="drinks-item-top">
                      <h3 className="drinks-item-name">{item.name}</h3>
                      <span className="drinks-item-price">{formatPrice(item.price)}</span>
                    </div>
                    <p className="drinks-item-desc">{item.description}</p>
                    <hr className="drinks-divider" />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Menu Section */}
      <section className="quote-menu-section">
        <video className="quote-menu-video" autoPlay loop muted playsInline>
          <source src="/Menu/quote-menu.mp4" type="video/mp4" />
        </video>
        <div className="quote-menu-overlay" />
        <div className="quote-menu-content">
          <blockquote className="quote-menu-text">
            The beauty of sushi is found not in perfection, but in presence.
          </blockquote>
          <cite className="quote-menu-author">— Chef Haruto Sakamoto</cite>
        </div>
      </section>
    </>
  );
};

export default Menu;
