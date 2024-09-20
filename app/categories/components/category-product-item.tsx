import { Product } from "@prisma/client";
import Image from "next/image";
import { ArrowDownIcon } from "lucide-react";
import { calculateProduct, formatCurrency } from "@/app/helpers/price";
import { db } from "@/app/lib/prisma";
import { notFound } from "next/navigation";

interface ProductItemProps {
  product: Product;
}

const CategoryProductItem = async ({ product }: ProductItemProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id: product.restaurantId,
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="w-[150px] min-w-[150px] space-y-2">
      <div className="relative h-[150px] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="obg-cover rounded-lg shadow-md"
        />

        {product.discountPercentage > 0 && (
          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-white">
            <ArrowDownIcon size={12} />
            <span className="text-xs font-semibold">
              {product.discountPercentage}%
            </span>
          </div>
        )}
      </div>

      <div>
        <h2 className="truncate text-sm">{product.name}</h2>

        <div className="flex items-center gap-1">
          <h3 className="font-semibold">
            {formatCurrency(calculateProduct(product))}
          </h3>

          {product.discountPercentage > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              {formatCurrency(Number(product.price))}
            </span>
          )}
        </div>

        <span className="block text-sm text-muted-foreground">
          {restaurant.name}
        </span>
      </div>
    </div>
  );
};

export default CategoryProductItem;
