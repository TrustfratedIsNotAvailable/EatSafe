import { Link } from "react-router";
import Banner from "../components/Home/Banner";
import Features from "../components/Home/Features";
import NearlyExpiredSection from "../components/Home/NearlyExpiredSection";
import ExpiredItemsSection from "../components/Home/ExpiredItemsSection";

const Home = () => {
  return (
    <>
      <Banner />
      <Features />
      <NearlyExpiredSection />
      <ExpiredItemsSection />
    </>
  );
};

export default Home;
