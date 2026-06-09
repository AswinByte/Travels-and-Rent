import HeroSection from "../../components/hero/HeroSection";
import QuickServices from "../../components/services/QuickServices";
import FeaturedVehicles from "../../components/vehicles/FeaturedVehicles";
import PopularPackages from "../../components/packages/PopularPackages";
import CustomerReviews from "../../components/reviews/CustomerReviews";
import StatisticsBanner from "../../components/common/StatisticsBanner";
import WhyChooseUs from "../../components/common/WhyChooseUs";
const Home = () => {
  return (
    <>

      <HeroSection />
      <QuickServices />
      <FeaturedVehicles />
      <PopularPackages />
      <WhyChooseUs />
      <CustomerReviews />
      <StatisticsBanner />
    </>
  );
};

export default Home;