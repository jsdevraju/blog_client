import React from "react";
import Fade from 'react-reveal/Fade';

const Banner = () => {
  return (
    <>
      <section className="home">
        <div className="container">
          <div className="hero_banner">
            <span>Welcome to our sweet jsdev blog site</span>
            <Fade left>
            <h1>I'm Razu Islam Admin On This site</h1>
            </Fade>
            <Fade right>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              nisi doloremque laboriosam, praesentium aperiam nulla quo
              distinctio quos sed? Voluptatem a temporibus, similique provident
              minima ducimus! Quibusdam sed soluta natus.
            </p>
            </Fade>
            <button className="app_btn btn_fill" style={{ marginTop: "10px" }}>
              About Me
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
