import { db } from "@/app/lib/prisma";
import { notFound } from "next/navigation";

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

  return <div>{restaurant.id}</div>;
};

export default RestaurantPgae;
