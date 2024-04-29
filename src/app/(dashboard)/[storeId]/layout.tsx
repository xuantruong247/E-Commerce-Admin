import Navbar from "@/components/navbars/navbar";
import prismadb from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const DashboardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    redirect(`${process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}`);
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
export default DashboardLayout;
