
import HeroSection from "@/components/home/HeroSection";
import FeaturedServices from "@/components/home/FeaturedServices";
import NewsSection from "@/components/home/NewsSection";
import EventsPreview from "@/components/home/EventsPreview";
import LinksSection from "@/components/home/LinksSection";

const Home = () => {
  return (
    <div className="space-y-4">
      <HeroSection />
      <FeaturedServices />
      <NewsSection />
      <EventsPreview />
      <LinksSection />
    </div>
  );
};

export default Home;
