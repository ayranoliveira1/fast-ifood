"use client";

import { Button } from "@/app/components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "name" | "imageUrl">;
}

const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // Get the router instance
  const route = useRouter();

  // Handle favorite button click
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="relative h-[220px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />

      <Button
        onClick={() => route.back()}
        size="icon"
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        size="icon"
        variant="link"
        onClick={handleFavorite}
        className={`absolute right-4 top-4 rounded-full bg-white/50 text-foreground ${isFavorite ? "text-red-500" : "text-white"} hover:text-red-500`}
      >
        <FaHeart className="size-5 " />
      </Button>
    </div>
  );
};

export default RestaurantImage;
