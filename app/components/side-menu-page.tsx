"use client";

import { Heart, Home, ScrollText } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";

const MenuPage = () => {
  const [isStart, setIsStart] = useState<boolean>(false);
  const [isOrders, setIsOrders] = useState<boolean>(false);
  const [isFavorites, setIsFavorites] = useState<boolean>(false);

  function handlepath() {
    if (window.location.pathname === "/") {
      return setIsStart(true);
    }

    if (window.location.pathname === "/orders") {
      return setIsOrders(true);
    }

    if (window.location.pathname === "/favorites") {
      return setIsFavorites(true);
    }

    setIsStart(false);
    setIsOrders(false);
    setIsFavorites(false);
  }

  useEffect(() => {
    handlepath();
  }, []);

  return (
    <div className="mt-6 space-y-3">
      <Link href="/">
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 rounded-3xl ${isStart ? "bg-primary text-white" : ""}`}
        >
          <Home size="16" />
          Início
        </Button>
      </Link>

      <Button
        variant="ghost"
        className={`w-full justify-start gap-3 rounded-3xl ${isOrders ? "bg-primary text-white" : ""}`}
      >
        <ScrollText size="16" />
        Meus Pedidos
      </Button>

      <Button
        variant="ghost"
        className={`w-full justify-start gap-3 rounded-3xl ${isFavorites ? "bg-primary text-white" : ""}`}
      >
        <Heart size="16" />
        Restaurantes Favoritos
      </Button>
    </div>
  );
};

export default MenuPage;
