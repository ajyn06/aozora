import { useState } from "react";
import { motion } from "framer-motion";
import "./Contact.scss";

const Contact = () => {
  const [showNotification, setShowNotification] = useState(false);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setShowNotification(true);
    form.reset();
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <>
      <section className="main-contact">
        <video
          className="bg-video"
          src="/Home/contact-page.mp4"
          poster="/Home/contact-img.jpg"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="video-overlay" />

        <div className="main-contact-content">
          <h1 className="contact-hero-title">Get in Touch</h1>
          <p className="contact-hero-desc">
            We’d love to hear from you. Whether it’s a reservation inquiry, a private dining request, or
            a special celebration, our team is here to assist you. Feel free to reach out through the
            form below or contact us directly.
          </p>
        </div>
      </section>

      <section className="contact-section-blue">
        <div className="contact-form-container">
          <motion.h2
            className="contact-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Contact Us
          </motion.h2>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <motion.div
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <input type="text" id="name" name="name" placeholder="Name" required />
            </motion.div>
            <motion.div
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <input type="email" id="email" name="email" placeholder="Email" required />
            </motion.div>
            <motion.div
              className="form-group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <textarea id="message" name="message" rows={4} placeholder="Message" required></textarea>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <button type="submit" className="submit-btn">Submit</button>
            </motion.div>
          </form>
        </div>
        <div className="contact-image-container">
          <img src="/Home/contact-img.jpg" alt="Sushi with chopsticks" className="contact-image" />
        </div>
      </section>

      {/* Notification */}
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

export default Contact;
