import BestSellers from "@/components/BestSellers";
import Brands from "@/components/Brands";
import FeaturedCategories from "@/components/FeaturedCategories";
import Hero from "@/components/Hero";
import NewArrivals from "@/components/NewArrivals";
import Newsletter from "@/components/Newsletter";
import Promotions from "@/components/Promotions";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <FeaturedCategories></FeaturedCategories>
      <BestSellers></BestSellers>
      <NewArrivals></NewArrivals>
      <Promotions></Promotions>
      <Testimonials></Testimonials>
      <Brands></Brands>
      <Newsletter></Newsletter>
    </div>
  );
}
