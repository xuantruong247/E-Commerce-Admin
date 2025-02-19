import prismadb from "@/lib/prismaDB";
import ProductForm from "./components/product-form";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await prismadb.product.findFirst({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const category = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const size = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const color = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product}
          categories={category}
          sizes={size}
          colors={color}
        />
      </div>
    </div>
  );
};

export default ProductPage;
