import { BakesCategory } from "../constants/constants";
import Category from "./Category";

const Bakes = () => {
  return (
    <div>
      <Category categories={BakesCategory} storeName="ExtraBakes" />
      <Category categories={BakesCategory} storeName="ExtraBakes" />
    </div>
  );
};

export default Bakes;
