import Header from "@/app/components/header";
import { db } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import CategoryInfo from "../components/category-info";

interface CategoriesPageProps {
  params: {
    id: string;
  };
}

const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id: id,
    },

    include: {
      Product: true,
      restaurants: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!category) {
    return notFound();
  }

  return (
    <>
      <Header />

      <CategoryInfo Category={category} />
    </>
  );
};

export default CategoriesPage;
