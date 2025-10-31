import { MartCategory } from "../constants/constants";
import Category from "./Category";

const Mart = () => {
  return (
    <div>
      <Category categories={MartCategory} storeName="ExtraMart" />

      <Category categories={MartCategory} storeName="ExtraMart" />
    </div>
  );
};

export default Mart;
