import { db } from "../lib/prisma";
import CategoryItem from "./category-item";

const CategotyList = async () => {
  // Fetch all categories from the database
  const categories = await db.category.findMany({});

  return (
    <div className="grid grid-cols-2 gap-4">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategotyList;
