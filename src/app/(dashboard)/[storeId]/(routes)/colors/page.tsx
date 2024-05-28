import prismadb from "@/lib/prismaDB";
import ColorClient from "./components/color-client";
import { ColorColumn } from "./components/column";
import { format } from "date-fns";

const Color = async ({ params }: { params: { storeId: string } }) => {
  const color = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedSize: ColorColumn[] = color.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createAt: format(item.createdAt, "MMMM do, yyyy"),
  }));


  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedSize} />
      </div>
    </div>
  );
};

export default Color;
