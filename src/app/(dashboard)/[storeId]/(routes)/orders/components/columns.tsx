"use client";

import { ColumnDef } from "@tanstack/react-table";

export type OrderColumn = {
  id: string;
  phone: string;
  isPaid: boolean;
  address: string;
  totalPrice: string;
  products: string;
  createAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "createAt",
    header: "Date",
  },
];
