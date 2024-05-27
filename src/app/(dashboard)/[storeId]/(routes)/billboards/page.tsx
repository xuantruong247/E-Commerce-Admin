import prismadb from "@/lib/prismaDB";
import BillboardClient from "./components/billboard-client";
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns";

const Billboard = async ({ params }: { params: { storeid: string } }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeid,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formatBillboards} />
      </div>
    </div>
  );
};

export default Billboard;
