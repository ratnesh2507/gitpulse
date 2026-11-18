"use client";

import { signIn } from "next-auth/react";
import { ArrowRight } from "lucide-react";

export default function SignInButton() {
  return (
    <button
      onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
      className="group flex items-center gap-3 px-8 py-4 bg-white text-[#0b0b12] font-semibold text-lg rounded-xl hover:bg-[#f0f6ff] transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-100"
    >
      Continue with GitHub
      <ArrowRight
        size={20}
        className="transition-transform duration-200 group-hover:translate-x-1"
      />
    </button>
  );
}
