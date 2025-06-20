import Banner from "../components/Home/Banner";
import Features from "../components/Home/Features";
import NearlyExpiredSection from "../components/Home/NearlyExpiredSection";
import ExpiredItemsSection from "../components/Home/ExpiredItemsSection";
import CallToAction from "../components/Home/CallToAction";

const Home = () => {
  return (
    <>
      <Banner />
      <Features />
      <NearlyExpiredSection />
      <ExpiredItemsSection />
      <CallToAction />
    </>
  );
};

export default Home;
