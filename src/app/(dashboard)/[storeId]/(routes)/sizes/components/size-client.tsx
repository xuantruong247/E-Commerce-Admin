"use client";

import React from "react";
import { SizeColumn, columns } from "./column";
import { useParams, useRouter } from "next/navigation";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface sizeClientProps {
  data: SizeColumn[];
}

const SizeClient: React.FC<sizeClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Size (${data.length})`}
          description="Manage size for you store"
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/sizes/new`);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add new
        </Button>
      </div>
      <Separator/>
      <DataTable columns={columns} data={data} searchKey="name"/>
      <Heading title="API" description="API calls for Sizes"/>
      <ApiList entityIdName="sizesId" entityName="sizes"/>
    </>
  );
};
export default SizeClient;
