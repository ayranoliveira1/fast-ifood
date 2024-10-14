"use client";

import { Heart, Home, ScrollText } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuPage = () => {
  const pathname = usePathname();

  return (
    <div className="mt-6 flex flex-col gap-3">
      <Button
        variant={pathname === "/" ? "destructive" : "ghost"}
        className="w-full justify-start gap-3 rounded-3xl"
        asChild
      >
        <Link href="/">
          <Home size="16" />
          Início
        </Link>
      </Button>

      <Button
        variant={pathname === "/orders" ? "destructive" : "ghost"}
        className="w-full justify-start gap-3 rounded-3xl"
        asChild
      >
        <Link href="/orders">
          <ScrollText size="16" />
          Meus Pedidos
        </Link>
      </Button>

      <Button
        variant={pathname === "/favorites" ? "destructive" : "ghost"}
        className="w-full justify-start gap-3 rounded-3xl"
        asChild
      >
        <Link href="/favorites">
          <Heart size="16" />
          Restaurantes Favoritos
        </Link>
      </Button>
    </div>
  );
};

export default MenuPage;
