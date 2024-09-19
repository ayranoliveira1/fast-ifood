import { db } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "../components/restaurant-image";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPgae = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />
    </div>
  );
};

export default RestaurantPgae;
