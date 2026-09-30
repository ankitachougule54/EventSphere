import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import About from './About';
import Services from './Services';
import Contact from './Contact';

const Home = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const carouselImageStyle = {
    height: '95vh',
    objectFit: 'cover',
    width: '100%'
  };

  const captionStyle = {
    background: 'radial-gradient(961px at 1.9% 5%, rgb(242, 241, 36) 0%, rgb(11, 236, 218) 90%);',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    textShadow: '0px 0px 3px rgba(121, 4, 4, 0.6)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    textAlign: 'center'
  };

  return (
    <div>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={2000}
      >
        <Carousel.Item>
          <img
            src='https://cdni.iconscout.com/illustration/premium/thumb/event-planning-illustration-download-in-svg-png-gif-file-formats--plan-party-managing-service-manager-pack-entertainment-illustrations-4693328.png?f=webp'
            alt="Event Planning"
            style={carouselImageStyle}
          />
          <Carousel.Caption style={captionStyle}>
            I am capable," "I am enough," or "I am in control of my future.
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://c8.alamy.com/comp/JJ5C4J/event-management-concept-JJ5C4J.jpg"
            alt="Event Management"
            style={carouselImageStyle}
          />
          <Carousel.Caption style={captionStyle}>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="https://www.shutterstock.com/image-photo/crowd-raised-hands-concert-festival-260nw-1586074294.jpg"
            alt="Event Design"
            style={carouselImageStyle}
          />
          <Carousel.Caption style={captionStyle}>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div>
        <About />
        <Services />
        <Contact />
      </div>
    </div>
  );
};

export default Home;