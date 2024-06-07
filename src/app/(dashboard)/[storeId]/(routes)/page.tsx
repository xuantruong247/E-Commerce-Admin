// components/dashboard-page.tsx (Server Component)
import React from "react";
import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getSalesCount } from "@/actions/get-sale-count";
import { getStockCount } from "@/actions/get-stock-count";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import DashboardPageClient from "./components/dashboard-page-client";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);
  const graphRevenue = await getGraphRevenue(params.storeId);

  return (
    <DashboardPageClient
      totalRevenue={totalRevenue}
      salesCount={salesCount}
      stockCount={stockCount}
      graphRevenue={graphRevenue}
    />
  );
};

export default DashboardPage;
