import prismadb from "@/lib/prismaDB";
import CategoryForm from "./components/category-form";

const CategoriesPage = async ({
  params,
}: {
  params: { billboardId: string; storeId: string };
}) => {
  const category = await prismadb.category.findFirst({
    where: {
      id: params.billboardId,
    },
  });

  const billboard = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboard} />
      </div>
    </div>
  );
};

export default CategoriesPage;
