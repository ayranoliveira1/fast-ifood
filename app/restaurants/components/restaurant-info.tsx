import { Card } from "@/app/components/ui/card";
import { formatCurrency } from "@/app/helpers/price";
import { Prisma } from "@prisma/client";
import { BikeIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import RestaurantCategory from "./restaurant-category";
import RestaurantProductList from "./restaurant-product-list";

interface RestaurantInfoProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      products: true;
      categories: {
        include: {
          Product: true;
        };
      };
    };
  }>;
}

const RestaurantInfo = ({ restaurant }: RestaurantInfoProps) => {
  return (
    <div className="relative mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
      <div className="flex items-center justify-between px-5">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>

          <span className=" font-semibold">{restaurant.name}</span>
        </div>

        <div className="flex items-center gap-1 rounded-3xl bg-foreground px-2 py-1 text-xs text-white">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
          5.00
        </div>
      </div>

      <div className="px-5">
        <Card className="mt-4 flex justify-around py-3">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <BikeIcon size={14} />
            </div>

            {Number(restaurant.deliveryFee) > 0 ? (
              <span className="text-sm font-semibold">
                {formatCurrency(Number(restaurant.deliveryFee))}
              </span>
            ) : (
              <span className="text-sm font-semibold">Grátis</span>
            )}
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-xs">Tempo</span>
              <TimerIcon size={14} />
            </div>

            <span className="text-sm font-semibold">
              {restaurant.deliveryTimeMinutes} min
            </span>
          </div>
        </Card>
      </div>

      <div className="flex items-center gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div key={category.id}>
            <RestaurantCategory>{category.name}</RestaurantCategory>
          </div>
        ))}
      </div>

      <div className="space-y-4 px-5 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Mais pedidos</h2>
        </div>
        <RestaurantProductList products={restaurant.products} />
      </div>

      {restaurant.categories.map((category) => {
        const productsCategories = restaurant.products.filter(
          (product) => product.categoryId === category.id,
        );

        return (
          <div key={category.id} className="space-y-4 px-5 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">{category.name}</h2>
            </div>
            <RestaurantProductList products={productsCategories} />
          </div>
        );
      })}
    </div>
  );
};

export default RestaurantInfo;
