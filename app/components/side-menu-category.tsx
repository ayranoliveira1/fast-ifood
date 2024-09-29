import { Category } from "@prisma/client";
import Link from "next/link";

// Define the MenuCategoryProps interface
interface MenuCategoryProps {
  category: Pick<Category, "name" | "id">;
}

const MenuCategory = ({ category }: MenuCategoryProps) => {
  return (
    <Link
      href={`/categories/${category.id}`}
      className="w-full rounded-3xl px-4 py-2 hover:bg-primary hover:text-white"
    >
      <span className="text-sm font-semibold">{category.name}</span>
    </Link>
  );
};

export default MenuCategory;
