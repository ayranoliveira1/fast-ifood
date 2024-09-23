"use client";

import Image from "next/image";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./side-menu";

const Header = () => {
  return (
    <header className="flex justify-between px-5 pt-6">
      <Link href="/">
        <Image src="/logo.png" alt="Logo" width={100} height={30} />
      </Link>

      <Sheet>
        <SheetTrigger>
          <MenuIcon />
        </SheetTrigger>

        <SheetContent>
          <SideMenu />
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
