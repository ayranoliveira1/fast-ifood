import { Product } from "@prisma/client";
import Link from "next/link";
import CategoryProductItem from "./category-product-item";

interface CategoryRedirectPros {
  product: Product;
}

const CategoryRedirect = ({ product }: CategoryRedirectPros) => {
  return (
    <Link className="w-[150px] min-w-[150px]" href={`/products/${product.id}`}>
      <CategoryProductItem product={product} />
    </Link>
  );
};

export default CategoryRedirect;
