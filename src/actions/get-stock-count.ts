import prismadb from "@/lib/prismaDB";

export const getStockCount = async (storeId: string) => {
  const salesCount = await prismadb.product.count({
    where: {
      storeId,
      isArchived: true,
    },
  });

  return salesCount;
};
