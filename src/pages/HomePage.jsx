import Carousel from "../components/Carousel";
import Category from "../components/Category";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  return (
    <div>
      <Carousel />
      <SearchBar />
      <Category />
      <Category />
    </div>
  );
};

export default HomePage;
