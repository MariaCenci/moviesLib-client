import React, { useEffect, useState, useRef } from "react";
import MovieCard from "../MovieCard";
import { CarouselProps } from "../../types/interfaces";
import "./carousel.scss";

const Carousel: React.FC<CarouselProps> = ({ movies, userId }) => {
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [hover, setHover] = useState(false)

  useEffect(() => {
    const updateWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateWidth);
  }, []);

  const scroll = (direction) => {
    const container = containerRef.current;

    if (container) {
      const cardWidth = container.clientWidth / 5;
      const newScrollLeft =
        direction === "left"
          ? scrollLeft - cardWidth
          : scrollLeft + cardWidth;
      container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
      setScrollLeft(newScrollLeft);
    }
  };

  const onMouseEnter = () => {
    setHover(true)
  }


const onMouseLeave = () => {
    setHover(false)
}

  return (
    <>
      <div className="carousel-container">
        <div className="card-carousel" ref={containerRef}>
       
          {movies &&
           // @ts-ignore 
            movies.map((card) => <MovieCard userId={userId} key={card.id} movie={card} />)}

          {screenWidth >= 768 && (
            <>
              <button
                className="scroll-button left"
                onClick={() => scroll("left")}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              
              >
                <img
                 src={hover? "../src/icons/arrowOn.png" : "../src/icons/arrowOff.png" }
                 alt="" />
              </button>
              <button
                className="scroll-button right"
                onClick={() => scroll("right")}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                 <img
                 src={hover? "../src/icons/arrowOn.png" : "../src/icons/arrowOff.png" }
                 alt="" />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Carousel;