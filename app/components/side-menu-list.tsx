import { db } from "../lib/prisma";
import MenuCategory from "./side-menu-category";

const MenuList = async () => {
  // Fetch all categories from the database
  const categories = await db.category.findMany({});

  return (
    <div className="flex flex-col gap-4">
      {categories.map((category) => (
        <MenuCategory key={category.id} category={category} />
      ))}
    </div>
  );
};

export default MenuList;
