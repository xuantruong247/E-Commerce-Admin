import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignUp path={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL} />;
    </div>
  );
}
