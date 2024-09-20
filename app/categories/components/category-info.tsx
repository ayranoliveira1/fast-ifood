import ProductItem from "@/app/components/product-item";
import { Prisma } from "@prisma/client";

interface CategoryInfoProps {
  Category: Prisma.CategoryGetPayload<{
    include: {
      Product: true;
    };
  }>;
}

const CategoryInfo = ({ Category }: CategoryInfoProps) => {
  return (
    <div className="space-y-4">
      <h1 className="mt-6 px-5 text-lg font-semibold">{Category.name}</h1>

      <div className="flex flex-wrap items-center justify-center gap-9">
        {Category.Product.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryInfo;
