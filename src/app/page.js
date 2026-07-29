import Footer from "@/components/footer/Footer";

import Banner from "@/components/home/banner/Banner";
import FeaturedLessons from "@/components/home/FeaturedLesson";

export default function Home() {
  return (
    <div>
      
      <Banner></Banner>
      <FeaturedLessons></FeaturedLessons>
      <Footer></Footer>
    </div>
  );
}
