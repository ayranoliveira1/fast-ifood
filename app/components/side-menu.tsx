import { Button } from "./ui/button";
import { Heart, Home, LogIn, ScrollText } from "lucide-react";

const SideMenu = () => {
  return (
    <div className="flex flex-col">
      <h1 className="mt-[-10px] font-semibold">Menu</h1>
      <div className="mt-6 flex items-center justify-between">
        <h1 className="font-semibold">Olá. Faça seu Login!</h1>

        <Button size="icon">
          <LogIn size="20" />
        </Button>
      </div>

      <div className="mt-6 h-[1px] w-full bg-gray-300"></div>

      <div className="mt-6 space-y-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 rounded-3xl"
        >
          <Home size="16" />
          Início
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3 rounded-3xl"
        >
          <ScrollText size="16" />
          Meus Pedidos
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3 rounded-3xl"
        >
          <Heart size="16" />
          Restaurantes Favoritos
        </Button>
      </div>
    </div>
  );
};

export default SideMenu;
