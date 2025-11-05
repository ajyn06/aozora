import "./Home.scss";

const Home = () => {
  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="home">
      <video
        className="bg-video"
        src="/Home/1-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="video-overlay"></div>

      <div className="home-content">
        <h1>Taste the Serenity</h1>
        <h2>of the Sea Under Aozora.</h2>
        <p>
          Welcome to Aozora, Every dish is crafted with precision, 
          honoring Japan’s finest traditions while embracing modern refinement. 
          Step into a world where flavors flow like waves beneath a boundless blue 
          horizon.
        </p>
      </div>

      <div className="scroll-arrow" onClick={scrollDown}>
        <span>⌄</span>
      </div>
    </section>
  );
};

export default Home;
