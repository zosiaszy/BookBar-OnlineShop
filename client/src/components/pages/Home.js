
import Footer from "../layout/Footer";
import Products from "../features/Products";
import ShopCarousel from "../views/Carousel";

const Home = () => {
    return (
        <div>
         <ShopCarousel />
            <Products />
            <Footer />
        </div>
      
    );
  }
  
  export default Home;