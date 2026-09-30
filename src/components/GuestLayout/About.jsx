import React from "react";

const About = () => {
  return (
    <>
      <style>
{`
/* ============================= */
/* ABOUT PAGE */
/* ============================= */

.about-section {
  min-height: 100vh;
  padding: 70px 30px;
  background: linear-gradient(
    135deg,
    #061525 0%,
    #081d33 50%,
    #06254a 100%
  );
  color: #ffffff;
  box-sizing: border-box;
  opacity: 0;
  animation: fadeIn 1s forwards;
}

.about-section .container {
  max-width: 1200px;
  margin: 0 auto;
}


/* ============================= */
/* SECTION TITLE */
/* ============================= */

.section-title h2 {
  font-size: 38px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #ffffff;
  transition: all 0.3s ease;
}

.section-title h2:hover {
  color: #2495ff;
  transform: scale(1.03);
}

.section-title p {
  max-width: 900px;
  margin: 0 auto 45px;
  font-size: 17px;
  line-height: 1.8;
  text-align: center;
  color: #9db9d5;
}

.f-para {
  font-style: italic;
  font-weight: 400;
}


/* ============================= */
/* TITLE UNDERLINE */
/* ============================= */

.section-title h2::after {
  content: "";
  display: block;
  width: 80px;
  height: 4px;
  margin: 15px auto 0;
  background: linear-gradient(
    90deg,
    #1688f5,
    #36b9ff
  );
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(22, 136, 245, 0.7);
}


/* ============================= */
/* VIDEO BOX */
/* ============================= */

.about-video {
  margin-bottom: 30px;
  border-radius: 18px;
  overflow: hidden;

  border: 1px solid #216da5;

  box-shadow:
    0 0 25px rgba(0, 123, 255, 0.15);

  transition: all 0.4s ease;

  opacity: 0;
  transform: translateY(50px);

  animation:
    fadeIn 1s forwards 1s,
    slideUp 1s forwards 1s;
}

.about-video:hover {
  transform: translateY(-5px);
  box-shadow:
    0 0 35px rgba(0, 123, 255, 0.3);
}

.about-video iframe {
  display: block;
  width: 100%;
  height: 350px;
  border: none;
  border-radius: 18px;
}


/* ============================= */
/* ABOUT TEXT BOX */
/* ============================= */

.about-text {
  padding: 30px;
  background: #0b223b;

  border: 1px solid #1c6297;
  border-radius: 18px;

  box-shadow:
    0 0 25px rgba(0, 123, 255, 0.1);

  opacity: 0;

  animation:
    fadeIn 1s forwards 1.3s;

  transition: all 0.3s ease;
}

.about-text:hover {
  border-color: #248ce3;

  box-shadow:
    0 0 30px rgba(0, 123, 255, 0.18);

  transform: translateY(-4px);
}


/* ============================= */
/* ABOUT HEADING */
/* ============================= */

.about-text h3 {
  font-size: 27px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #ffffff;
  line-height: 1.4;
  transition: all 0.3s ease;
}

.about-text h3:hover {
  color: #2495ff;
  transform: translateX(5px);
}


/* ============================= */
/* ABOUT PARAGRAPH */
/* ============================= */

.about-text p {
  font-size: 16px;
  line-height: 1.8;
  color: #a8c3dc;
  transition: color 0.3s ease;
}

.about-text p:hover {
  color: #d4e8fa;
}


/* ============================= */
/* FEATURES */
/* ============================= */

.features-list {
  list-style: none;
  padding: 0;
  margin-top: 25px;
}

.features-list li {
  font-size: 16px;
  color: #c2d8eb;
  margin-bottom: 15px;

  padding: 12px 15px;

  background: #102d49;

  border: 1px solid rgba(45, 125, 185, 0.3);

  border-radius: 10px;

  transition: all 0.3s ease;
}

.features-list li:hover {
  color: #ffffff;

  background: #143a5d;

  border-color: #2189db;

  transform: translateX(7px);

  box-shadow:
    0 0 15px rgba(0, 123, 255, 0.15);
}


/* ============================= */
/* CHECK ICON */
/* ============================= */

.features-list li .icon_check {
  display: inline-block;

  width: 20px;
  height: 20px;

  margin-right: 10px;

  color: #2495ff;

  font-weight: bold;

  position: relative;
}

.features-list li .icon_check::before {
  content: "✓";

  font-size: 16px;

  color: #2495ff;

  text-shadow:
    0 0 8px rgba(36, 149, 255, 0.7);
}


/* ============================= */
/* CTA BUTTON */
/* ============================= */

.cta-button {
  display: inline-block;

  padding: 15px 30px;

  background: linear-gradient(
    90deg,
    #087bea,
    #1856cf
  );

  color: #ffffff;

  text-transform: uppercase;

  font-weight: 600;

  font-size: 15px;

  border-radius: 12px;

  text-decoration: none;

  border: 1px solid rgba(55, 155, 255, 0.5);

  box-shadow:
    0 8px 25px rgba(0, 123, 255, 0.25);

  transition: all 0.3s ease;

  animation: fadeIn 1s forwards 2s;
}

.cta-button:hover {
  color: #ffffff;

  transform: translateY(-4px);

  background: linear-gradient(
    90deg,
    #1688f5,
    #2465df
  );

  box-shadow:
    0 12px 30px rgba(0, 123, 255, 0.4);
}


/* ============================= */
/* FADE IN */
/* ============================= */

@keyframes fadeIn {

  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }

}


/* ============================= */
/* SLIDE UP */
/* ============================= */

@keyframes slideUp {

  0% {
    transform: translateY(50px);
  }

  100% {
    transform: translateY(0);
  }

}


/* ============================= */
/* RESPONSIVE */
/* ============================= */

@media (max-width: 991px) {

  .about-section {
    padding: 50px 20px;
  }

  .section-title h2 {
    font-size: 30px;
  }

  .about-video iframe {
    height: 280px;
  }

  .about-text {
    margin-top: 20px;
  }

  .about-text h3 {
    font-size: 23px;
  }

}


/* ============================= */
/* MOBILE */
/* ============================= */

@media (max-width: 768px) {

  .about-section {
    padding: 40px 15px;
  }

  .section-title h2 {
    font-size: 26px;
  }

  .section-title p {
    font-size: 15px;
  }

  .about-video iframe {
    height: 230px;
  }

  .about-text {
    padding: 22px;
  }

  .about-text h3 {
    font-size: 21px;
  }

  .about-text p {
    font-size: 14px;
  }

  .features-list li {
    font-size: 14px;
  }

  .cta-button {
    font-size: 13px;
    padding: 13px 20px;
  }

}


/* ============================= */
/* SMALL MOBILE */
/* ============================= */

@media (max-width: 480px) {

  .section-title h2 {
    font-size: 23px;
  }

  .about-video iframe {
    height: 200px;
  }

  .about-text {
    padding: 18px;
  }

  .cta-button {
    width: 100%;
    text-align: center;
  }

}
`}
</style>

      <section className="about-section spad">
        <div className="container">
          {/* Section Title */}
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h2>About Us: Revolutionizing the Event Industry</h2>
                <p className="f-para">
                  We believe in making your events extraordinary. From interactive
                  experiences to world-class speakers, we create events that leave
                  lasting impressions. Join us as we take your event to the next
                  level!
                </p>
              </div>
            </div>
          </div>

          {/* About Video and Text */}
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-video">
                {/* Embed YouTube Video */}
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/lljD-yXozSc?si=UObdYxWlPX6ko44s"
                  title="Event Overview Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-text">
                <h3>The 2025 Conference: Where Ideas Meet Reality</h3>
                <p>
                  When we first started organizing events, we were focused on
                  creating memorable experiences that would leave a lasting impact
                  on every participant. Our vision is simple: to empower the future
                  of industries through innovative event planning. After years of
                  success, we're proud to be the leaders in creating immersive
                  conferences that change the way people think, learn, and connect.
                </p>
                <ul className="features-list">
                  <li>
                    <span className="icon_check"></span> Tailored Event Planning
                  </li>
                  <li>
                    <span className="icon_check"></span> Interactive Experiences
                  </li>
                  <li>
                    <span className="icon_check"></span> Networking Opportunities
                  </li>
                  <li>
                    <span className="icon_check"></span> World-Class Speakers
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="row text-center mt-5">
            <div className="col-lg-12">
              <a href="/contact" className="cta-button">
                Get in Touch & Start Planning Your Event!
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;