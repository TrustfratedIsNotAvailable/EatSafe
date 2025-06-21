import Banner from "../components/Home/Banner";
import Features from "../components/Home/Features";
import CallToAction from "../components/Home/CallToAction";
import Testimonials from "../components/Home/Testimonials";

import NearlyExpiredSection from "../components/Home/NearlyExpiredSection";
import ExpiredItemsSection from "../components/Home/ExpiredItemsSection";
import LeaveReview from "../components/Home/LeaveReview";
const Home = () => {
  return (
    <>
      <Banner />
      <Features />
      <Testimonials />
      <LeaveReview />
      <CallToAction />
    </>
  );
};

export default Home;
