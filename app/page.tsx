import Image from "next/image";
import CategotyList from "./components/categoty-list";
import Header from "./components/header";
import Search from "./components/search";
import ProductList from "./components/product-list";
import { Button } from "./components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./lib/prisma";
import RestaurantList from "./components/restaurant-list";

const Home = async () => {
  // Fetch products with a discount percentage greater than or equal to 0
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gte: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <Header />

      <div className="px-5 pt-6 font-semibold">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategotyList />
      </div>

      <div className="px-5 pt-6">
        <Image
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas"
          width={0}
          height={0}
          className="h-auto w-full object-contain"
          sizes="100vw"
          quality={100}
        />
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon size={18} />
          </Button>
        </div>
        <ProductList products={products} />
      </div>

      <div className="px-5 pt-6">
        <Image
          src="/promo-banner-02.png"
          alt="Até 30% de desconto em pizzas"
          width={0}
          height={0}
          className="h-auto w-full object-contain"
          sizes="100vw"
          quality={100}
        />
      </div>

      <div className="space-y-4 py-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon size={18} />
          </Button>
        </div>
        <RestaurantList />
      </div>
    </>
  );
};

export default Home;
