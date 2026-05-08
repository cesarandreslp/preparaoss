import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-[#0f1623] to-[#1a2540]">
      <SignUp />
    </div>
  );
}
