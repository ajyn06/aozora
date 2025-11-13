import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  const storyRef = useRef<HTMLDivElement>(null);
  const chefRef = useRef(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const [showNotification, setShowNotification] = useState(false);

  const { scrollYProgress } = useScroll({
    target: videoRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: bookScrollProgress } = useScroll({
    target: bookRef,
    offset: ["start end", "end start"]
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  const bookScale = useTransform(bookScrollProgress, [0, 0.5, 1], [1.2, 1, 1.2]);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setShowNotification(true);
    form.reset();
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const scrollDown = () => {
    if (storyRef.current) {
      storyRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const title = "Taste the Serenity";
  const letters = title.split("");

  // Top Home Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.6, 0.05, 0.01, 0.9] as const,
      },
    },
  };

  const fadeInUpVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.6, 0.05, 0.01, 0.9] as const,
      },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.6, 0.05, 0.01, 0.9] as const,
      },
    },
  };

  // Our Story & Chef Animations
  const storyTitleVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const storyTextVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: i * 0.15,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    }),
  };

  const storyImageVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        delay: i * 0.1,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    }),
  };

  const chefImageVariants = {
    hidden: { 
      opacity: 0,
      x: -60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 1.4,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const chefContentVariants = {
    hidden: { 
      opacity: 0,
      x: 60,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const chefTextVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        delay: 0.3 + (i * 0.12),
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    }),
  };


  return (
    <>
      <section className="home" ref={videoRef}>
        <motion.video
          className="bg-video"
          src="/Home/1-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ 
            y: videoY,
            scale: videoScale,
            opacity: videoOpacity
          }}
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
        />
        <div className="video-overlay"></div>

        <div className="home-content">
          <motion.h1
            className="home-title"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {letters.map((char, index) => (
              <motion.span
                key={index}
                className="letter"
                variants={letterVariants}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.h2
            className="home-subtitle"
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            of the Sea Under Aozora.
          </motion.h2>
          <motion.p
            className="home-desc"
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.9 }}
          >
            Welcome to Aozora, Every dish is crafted with precision,
            honoring Japan's finest traditions while embracing modern refinement.
            Step into a world where flavors flow like waves beneath a boundless blue
            horizon.
          </motion.p>
        </div>

        <motion.div
          className="scroll-arrow"
          onClick={scrollDown}
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.2 }}
          whileInView={{
            y: [0, 15, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <span></span>
        </motion.div>
      </section>

      {/* Our Story and Chef */}
      <section className="about">
        <div className="about-container">
          {/* Our Story */}
          <div className="story-section" ref={storyRef}>
            <motion.div 
              className="story-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4, margin: "-100px" }}
            >
              <motion.h2 
                className="story-title"
                variants={storyTitleVariants}
              >
                Our Story
              </motion.h2>
              <div>
                <motion.p 
                  className="story-intro"
                  custom={0}
                  variants={storyTextVariants}
                >
                  Beneath the vast blue sky — Aozora — lies the harmony of sea and spirit.
                </motion.p>
                <motion.p 
                  className="story-text"
                  custom={1}
                  variants={storyTextVariants}
                >
                  Born from a passion for purity and precision, Aozora reimagines traditional Japanese dining as an immersive experience of serenity, balance, and beauty.
                </motion.p>
                <motion.p 
                  className="story-text"
                  custom={2}
                  variants={storyTextVariants}
                >
                  Each dish reflects our devotion to nature's rhythm, the artistry of simplicity, and the fleeting perfection of every season — shun (旬).
                </motion.p>
              </div>
            </motion.div>
            <motion.div 
              className="story-images"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3, margin: "-100px" }}
            >
              <motion.img 
                src="/Home/about-1.jpg" 
                alt="Dining experience" 
                className="story-img"
                custom={0}
                variants={storyImageVariants}
              />
              <motion.img 
                src="/Home/about-2.jpg" 
                alt="Sushi preparation" 
                className="story-img"
                custom={1}
                variants={storyImageVariants}
              />
              <motion.img 
                src="/Home/about-3.jpg" 
                alt="Sushi plate" 
                className="story-img"
                custom={2}
                variants={storyImageVariants}
              />
              <motion.img 
                src="/Home/about-4.jpg" 
                alt="Chef at work" 
                className="story-img"
                custom={3}
                variants={storyImageVariants}
              />
            </motion.div>
          </div>
        </div>

        {/* Chef */}
        <div className="chef-section" ref={chefRef}>
          <motion.div 
            className="chef-section-inner"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3, margin: "-100px" }}
          >
            <motion.div 
              className="chef-image-container"
              variants={chefImageVariants}
            >
              <img src="/Home/chef.jpg" alt="Chef Haruto Sakamoto" className="chef-img" />
              <motion.div 
                className="chef-quote"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 1,
                  delay: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <p className="quote-text">
                  "The soul of sushi is not in its form, but in the silence between flavors."
                </p>
                <p className="quote-author">— Chef Haruto Sakamoto</p>
              </motion.div>
            </motion.div>
            <motion.div 
              className="chef-content"
              variants={chefContentVariants}
            >
              <motion.h2 
                className="chef-name"
                custom={0}
                variants={chefTextVariants}
              >
                Chef Haruto
              </motion.h2>
              <motion.h3 
                className="chef-surname"
                custom={1}
                variants={chefTextVariants}
              >
                Sakamoto
              </motion.h3>
              <motion.p 
                className="chef-intro"
                custom={2}
                variants={chefTextVariants}
              >
                Trained in Tokyo and refined in Michelin-starred kitchens across Kyoto and Paris, Chef Haruto brings over 20 years of mastery to the art of sushi.
              </motion.p>
              <motion.p 
                className="chef-text"
                custom={3}
                variants={chefTextVariants}
              >
                Guided by discipline, harmony, and respect for ingredients, his craft bridges traditional Edomae techniques with modern sensibility.
              </motion.p>
              <motion.p 
                className="chef-text"
                custom={4}
                variants={chefTextVariants}
              >
                Each plate is composed like a painting — a moment of beauty meant to be experienced, not merely consumed.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* View Menu Section */}
      <section className="menu-section">
        <motion.div 
          className="menu-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div 
            className="menu-image"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <img src="/Home/view-menu.png" alt="Sushi with chopsticks" />
          </motion.div>
          <motion.div 
            className="menu-content"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <motion.h3 
              className="menu-subtitle"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              Experience the
            </motion.h3>
            <motion.h2 
              className="menu-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              Art of Flavor
            </motion.h2>
            <motion.p 
              className="menu-desc"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8,
                delay: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              Discover the harmony of tradition and innovation in every dish. Our menu celebrates the seasons, crafted with precision and the freshest ingredients from sea and sky.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8,
                delay: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <Link to="/menu" className="menu-btn">
                View Our Menu
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <motion.div 
          className="gallery-scroll"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div 
            className="gallery-track"
            drag="x"
            dragConstraints={{ left: -1900, right: 0 }}
            dragElastic={0}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 30 }}
          >
            {[
              '/Home/gallery-1.jpg',
              '/Home/gallery-2.jpg',
              '/Home/gallery-3.jpg',
              '/Home/gallery-4.jpg',
              '/Home/gallery-5.jpg',
              '/Home/gallery-6.jpg',
              '/Home/gallery-7.jpg',
              '/Home/gallery-8.jpg',
            ].map((src, index) => (
              <motion.div
                key={index}
                className="gallery-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
              >
                <img 
                  src={src} 
                  alt={`Gallery ${index + 1}`}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="gallery-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <div className="gallery-title-section">
            <h3 className="gallery-subtitle">A Glimpse Into</h3>
            <h2 className="gallery-title">Aozora</h2>
          </div>
          <p className="gallery-desc">
            Step inside a world where every detail is artfully composed. From the delicate textures of our sushi to the calm beauty of our space, each image reflects the harmony and craftsmanship at the heart of Aozora.
          </p>
        </motion.div>
      </section>

      {/* Book Section */}
      <section className="book-section" ref={bookRef}>
        <motion.div 
          className="book-bg"
          style={{ 
            scale: bookScale
          }}
        />
        <div className="book-overlay"></div>
        <motion.div 
          className="book-content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <motion.h3 
            className="book-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            Book Your
          </motion.h3>
          <motion.h2 
            className="book-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            Aozora Experience
          </motion.h2>
          <motion.p 
            className="book-desc"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8,
              delay: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            From delicate omakase to elegant seasonal courses, every detail is prepared to offer a dining experience like no other.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8,
              delay: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <Link to="/book" className="book-btn">
              Book Now
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Us Section */}
      <section className="contact-section">
        <div className="contact-form-container">
          <motion.h2 
            className="contact-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.9,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            Contact Us
          </motion.h2>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <motion.div 
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <input type="text" id="name" name="name" placeholder="Name" required />
            </motion.div>
            <motion.div 
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8,
                delay: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <input type="email" id="email" name="email" placeholder="Email" required />
            </motion.div>
            <motion.div 
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8,
                delay: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <textarea id="message" name="message" rows={4} placeholder="Message" required></textarea>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8,
                delay: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </motion.div>
          </form>
        </div>
        <div 
          className="contact-image-container"
        >
          <img src="/Home/contact-img.jpg" alt="Sushi with chopsticks" className="contact-image" />
        </div>
      </section>

      {/* Notif Mess */}
      {showNotification && (
        <motion.div
          className="notification-toast"
          initial={{ opacity: 0, y: 50, x: 50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50, x: 50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <p>Thank you! Your message has been sent successfully.</p>
        </motion.div>
      )}
    </>
  );
};

export default Home;
