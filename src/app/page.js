import Footer from "@/components/footer/Footer";
import Navbar from "@/components/nav/Navbar";
import BannerCarousel from "@/components/home/banner/BannerCarousel";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <BannerCarousel></BannerCarousel>
      <Footer></Footer>
    </div>
  );
}
