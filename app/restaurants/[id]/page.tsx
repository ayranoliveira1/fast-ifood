import { db } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "../components/restaurant-image";
import RestaurantInfo from "../components/restaurant-info";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPgae = async ({ params: { id } }: RestaurantPageProps) => {
  // Fetch restaurant data from the database
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        orderBy: {
          name: "desc",
        },
      },
      categories: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  // Check if restaurant exists
  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />

      <RestaurantInfo restaurant={restaurant} />
    </div>
  );
};

export default RestaurantPgae;
