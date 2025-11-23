import "./Contact.scss";

const Contact = () => {
  return (
    <>
      <section className="main-contact">
        <video
          className="bg-video"
          src="Home/contact-page.mp4"
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
    </>
  );
};

export default Contact;
