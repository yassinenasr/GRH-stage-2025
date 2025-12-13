import React from "react";
import HeroHome from "../components/home/HeroHome";
import Features from "../components/home/Feachers";
import FeaturesBlock from "../components/home/FeacherBlockes";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";
import PartnersAndMap from "../components/home/PartnersAndMap";
import VideoModal from "../components/common/VideoModal";

const Home = () => {
  return (
    <main>
      <VideoModal />
      <HeroHome />
      <Features />
      <FeaturesBlock />
      <Newsletter />
      <PartnersAndMap />
    </main>
  );
};

export default Home;
