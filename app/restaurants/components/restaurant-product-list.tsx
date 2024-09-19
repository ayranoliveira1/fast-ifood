import { Product } from "@prisma/client";
import RestaurantProductItem from "./restaurant-product-item";

interface ProductListProps {
  products: Product[];
}

const RestaurantProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <RestaurantProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default RestaurantProductList;
