import { db } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "../components/product-image";
import ProductDetails from "../components/product-info";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  // Fetch the product from the database
  const product = await db.product.findUnique({
    where: {
      id,
    },

    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  // Fetch complementary products (juices) from the same restaurant
  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <div>
      <ProductImage product={product} />

      <ProductDetails product={product} complementaryProducts={juices} />
    </div>
  );
};

export default ProductPage;
