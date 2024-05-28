"use client";

import React from "react";
import { ColorColumn, columns } from "./column";
import { useParams, useRouter } from "next/navigation";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface colorClientProps {
  data: ColorColumn[];
}

const ColorClient: React.FC<colorClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Color (${data.length})`}
          description="Manage color for you store"
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/colors/new`);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add new
        </Button>
      </div>
      <Separator/>
      <DataTable columns={columns} data={data} searchKey="name"/>
      <Heading title="API" description="API calls for Sizes"/>
      <ApiList entityIdName="colorId" entityName="colors"/>
    </>
  );
};
export default ColorClient;
