import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import "./Home.scss";

const Home = () => {
  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  // Refs for scroll animations
  const storyRef = useRef(null);
  const chefRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, amount: 0.3 });
  const chefInView = useInView(chefRef, { once: true, amount: 0.2 });
  const title = "Taste the Serenity";
  const letters = title.split("");

  // Animation
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

  const storyTitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const storyTextStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const storyTextVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const imageStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.4,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const chefContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const chefImageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const chefTextStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const chefTextVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <>
      <section className="home">
        <motion.video
          className="bg-video"
          src="/Home/1-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
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
        >
          <span></span>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-container">
          {/* Our Story Section */}
          <div className="story-section" ref={storyRef}>
            <motion.div 
              className="story-content"
              initial="hidden"
              animate={storyInView ? "visible" : "hidden"}
            >
              <motion.h2 
                className="story-title"
                variants={storyTitleVariants}
              >
                Our Story
              </motion.h2>
              <motion.div
                variants={storyTextStagger}
              >
                <motion.p 
                  className="story-intro"
                  variants={storyTextVariants}
                >
                  Beneath the vast blue sky — Aozora — lies the harmony of sea and spirit.
                </motion.p>
                <motion.p 
                  className="story-text"
                  variants={storyTextVariants}
                >
                  Born from a passion for purity and precision, Aozora reimagines traditional Japanese dining as an immersive experience of serenity, balance, and beauty.
                </motion.p>
                <motion.p 
                  className="story-text"
                  variants={storyTextVariants}
                >
                  Each dish reflects our devotion to nature's rhythm, the artistry of simplicity, and the fleeting perfection of every season — shun (旬).
                </motion.p>
              </motion.div>
            </motion.div>
            <motion.div 
              className="story-images"
              initial="hidden"
              animate={storyInView ? "visible" : "hidden"}
              variants={imageStagger}
            >
              <motion.img 
                src="/Home/about-1.jpg" 
                alt="Dining experience" 
                className="story-img"
                variants={imageVariants}
              />
              <motion.img 
                src="/Home/about-2.jpg" 
                alt="Sushi preparation" 
                className="story-img"
                variants={imageVariants}
              />
              <motion.img 
                src="/Home/about-3.jpg" 
                alt="Sushi plate" 
                className="story-img"
                variants={imageVariants}
              />
              <motion.img 
                src="/Home/about-4.jpg" 
                alt="Chef at work" 
                className="story-img"
                variants={imageVariants}
              />
            </motion.div>
          </div>
        </div>

        {/* Chef Section - Full Width */}
        <div className="chef-section" ref={chefRef}>
          <motion.div 
            className="chef-section-inner"
            initial="hidden"
            animate={chefInView ? "visible" : "hidden"}
            variants={chefContainerVariants}
          >
            <motion.div 
              className="chef-image-container"
              variants={chefImageVariants}
            >
              <img src="/Home/chef.jpg" alt="Chef Haruto Sakamoto" className="chef-img" />
              <motion.div 
                className="chef-quote"
                variants={chefTextVariants}
              >
                <p className="quote-text">
                  "The soul of sushi is not in its form, but in the silence between flavors."
                </p>
                <p className="quote-author">— Chef Haruto Sakamoto</p>
              </motion.div>
            </motion.div>
            <motion.div 
              className="chef-content"
              variants={chefTextStagger}
            >
              <motion.h2 
                className="chef-name"
                variants={chefTextVariants}
              >
                Chef Haruto
              </motion.h2>
              <motion.h3 
                className="chef-surname"
                variants={chefTextVariants}
              >
                Sakamoto
              </motion.h3>
              <motion.p 
                className="chef-intro"
                variants={chefTextVariants}
              >
                Trained in Tokyo and refined in Michelin-starred kitchens across Kyoto and Paris, Chef Haruto brings over 20 years of mastery to the art of sushi.
              </motion.p>
              <motion.p 
                className="chef-text"
                variants={chefTextVariants}
              >
                Guided by discipline, harmony, and respect for ingredients, his craft bridges traditional Edomae techniques with modern sensibility.
              </motion.p>
              <motion.p 
                className="chef-text"
                variants={chefTextVariants}
              >
                Each plate is composed like a painting — a moment of beauty meant to be experienced, not merely consumed.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
