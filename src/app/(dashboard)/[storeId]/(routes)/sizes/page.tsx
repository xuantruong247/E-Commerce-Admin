import prismadb from "@/lib/prismaDB";
import { SizeColumn } from "./components/column";
import { format } from "date-fns";
import SizeClient from "./components/size-client";

const Size = async ({ params }: { params: { storeId: string } }) => {
  const size = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSize: SizeColumn[] = size.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSize} />
      </div>
    </div>
  );
};

export default Size;
