import React from "react";
import { Banner, Blog } from "../components";

const Home = () => {
 // CHange Document Title
 document.title = `Jsdev Blog - Home`

  return (
    <>
      <Banner />
      <Blog />
    </>
  );
};

export default Home;
