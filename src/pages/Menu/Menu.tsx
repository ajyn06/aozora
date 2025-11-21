import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import { omakaseItems, formatPrice } from "./menu-data";
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
    </>
  );
};

export default Menu;
