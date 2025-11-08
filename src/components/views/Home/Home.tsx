import * as React from "react";
import HomeHero from "./HomeHero";
import HomeInfo from "./HomeInfo/HomeInfo";

interface HomeProps {
  propName?: string;
}

const Home: React.FC<HomeProps> = () => {
  return (
    <section className="mb-32">
      <HomeHero />
      <HomeInfo />
    </section>
  );
};

export default Home;
