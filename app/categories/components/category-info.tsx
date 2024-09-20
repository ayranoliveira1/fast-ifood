import { Prisma } from "@prisma/client";
import CategoryRedirect from "./Category-route";

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
          <CategoryRedirect key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryInfo;
