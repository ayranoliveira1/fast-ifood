"use client";

import { Heart, Home, ScrollText } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";

const MenuPage = () => {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [isOrders, setIsOrders] = useState<boolean>(false);
  const [isFavorites, setIsFavorites] = useState<boolean>(false);

  // Handle the path to set the active menu
  function handlepath() {
    if (window.location.pathname === "/") {
      return setIsStart(true);
    }

    setIsStart(false);

    if (window.location.pathname === "/orders") {
      return setIsOrders(true);
    }

    setIsOrders(false);

    if (window.location.pathname === "/favorites") {
      return setIsFavorites(true);
    }

    setIsFavorites(false);
  }

  useEffect(() => {
    handlepath();
  }, []);

  return (
    <div className="mt-6 flex flex-col gap-3">
      <Link href="/">
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 rounded-3xl ${isStart ? "bg-primary text-white" : ""}`}
        >
          <Home size="16" />
          Início
        </Button>
      </Link>

      <Link href="/orders">
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 rounded-3xl ${isOrders ? "bg-primary text-white" : ""}`}
        >
          <ScrollText size="16" />
          Meus Pedidos
        </Button>
      </Link>

      <Link href="/orders">
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 rounded-3xl ${isFavorites ? "bg-primary text-white" : ""}`}
        >
          <Heart size="16" />
          Restaurantes Favoritos
        </Button>
      </Link>
    </div>
  );
};

export default MenuPage;
