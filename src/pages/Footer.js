import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub, FaDiscord } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer_main">
            {/* Left Colum */}
            <div className="left_col">
              <Link to="/">Razu Islam</Link>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolorem, suscipit at magni nemo totam perspiciatis quidem
                ratione vero voluptatibus, illum labore eveniet quasi
                repudiandae iure quo exercitationem modi qui optio.
              </p>
            </div>
            {/* Middle Colum */}
            <div className="middle_col">
              <div className="social">
                  <a href="hhttps://facebook.com" rel="noreferrer" target="_blank"><FaFacebookF /></a>
                  <a href="hhttps://facebook.com" rel="noreferrer" target="_blank"><FaTwitter /></a>
                  <a href="hhttps://facebook.com" rel="noreferrer" target="_blank"><FaInstagram /></a>
                  <a href="hhttps://facebook.com" rel="noreferrer" target="_blank"><FaGithub /></a>
                  <a href="hhttps://facebook.com" rel="noreferrer" target="_blank"><FaDiscord /></a>
              </div>
            </div>

            {/* Right Colum */}
            <div className="right_col">
                <div className="subscribe">
                    <input type="text" placeholder="Enter your email.." />
                    <button className="app_btn btn_fill" style={{marginTop:'10px'}}>Subscribe</button>
                </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
