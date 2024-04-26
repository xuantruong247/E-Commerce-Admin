import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn path={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL} />;
    </div>
  );
}
