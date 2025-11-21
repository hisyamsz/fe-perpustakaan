import * as React from "react";
import HomeHero from "./HomeHero";
import HomeInfo from "./HomeInfo";
import HomeFeatured from "./HomeFeatured";
import useHome from "./useHome";

const Home: React.FC = () => {
  const { dataBooks, isLoadingBooks, handleNavigate } = useHome();

  return (
    <section className="pb-18">
      <HomeHero />
      <HomeInfo />
      <HomeFeatured
        dataBooks={dataBooks?.data || []}
        isLoadingBooks={isLoadingBooks}
        handleNavigate={handleNavigate}
        title="Buku Unggulan"
      />
    </section>
  );
};

export default Home;
