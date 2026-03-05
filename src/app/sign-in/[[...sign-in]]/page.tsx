import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f1623] to-[#1a2540]">
      <SignIn />
    </div>
  );
}
