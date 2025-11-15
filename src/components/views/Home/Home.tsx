import * as React from "react";
import HomeHero from "./HomeHero";
import HomeInfo from "./HomeInfo/HomeInfo";

const Home: React.FC = () => {
  return (
    <section className="mb-32">
      <HomeHero />
      <HomeInfo />
    </section>
  );
};

export default Home;
