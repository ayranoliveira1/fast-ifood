import { Button } from "./ui/button";
import { LogIn } from "lucide-react";

const SideMenu = () => {
  return (
    <div className="flex flex-col">
      <h1 className="mt-[-10px] font-semibold">Menu</h1>
      <div className="mt-6 flex items-center justify-between">
        <h1 className=" text-sm font-semibold">Olá. Faça seu Login!</h1>

        <Button size="icon">
          <LogIn size="20" />
        </Button>
      </div>

      <div className="mt-6 h-[1px] w-full bg-gray-300"></div>
    </div>
  );
};

export default SideMenu;
