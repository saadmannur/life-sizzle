import Footer from "@/components/footer/Footer";

import Banner from "@/components/home/banner/Banner";
import FeaturedLessons from "@/components/home/FeaturedLesson";
import MostSavedLessons from "@/components/home/MostSavedLessons";
import TopContributorsOfWeek from "@/components/home/TopContributorsOfWeek";
import WhyLifeLessonsMatter from "@/components/home/WhyLifeLessonsMatter";

export default function Home() {
  return (
    <div>
      
      <Banner></Banner>
      <FeaturedLessons></FeaturedLessons>
      <WhyLifeLessonsMatter></WhyLifeLessonsMatter>
      <TopContributorsOfWeek></TopContributorsOfWeek>
      <MostSavedLessons></MostSavedLessons>
      <Footer></Footer>
    </div>
  );
}
