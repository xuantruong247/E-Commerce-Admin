import { UserButton } from "@clerk/nextjs";
import MainNav from "@/components/navbars/main-nav";
import StoreSwitcher from "@/components/switcher/store-switcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismaDB";
import { ThemeToggle } from "../theme-toggle";

const Navbar = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect(`/${process.env.NEXT_PUBLIC_CLERK_SIGN_IN_UR}`);
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
