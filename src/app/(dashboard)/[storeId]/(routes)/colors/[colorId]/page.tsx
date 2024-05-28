import prismadb from "@/lib/prismaDB";
import ColorsForm from "./components/color-form";

const ColorPage = async ({
  params,
}: {
  params: { colorId: string };
}) => {
  const colors = await prismadb.color.findFirst({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsForm initialData={colors}/>
      </div>
    </div>
  );
};

export default ColorPage;
