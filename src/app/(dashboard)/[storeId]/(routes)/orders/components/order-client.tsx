"use client";

import Heading from "@/components/ui/heading";
import { OrderColumn, columns } from "./columns";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

interface orderClientProps {
  data: OrderColumn[];
}

const OrdersClient: React.FC<orderClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for you store"
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
};
export default OrdersClient;
