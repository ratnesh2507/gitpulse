import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignInButton from "./components/auth/SignInButton";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#0b0b12] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#14b8a6] rounded-full blur-[180px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-[#6366f1] rounded-full blur-[180px] opacity-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 py-16 max-w-3xl mx-auto">
        {/* Badge */}
        <div className="mb-6 px-4 py-1.5 rounded-full border border-[#14b8a6]/40 bg-[#14b8a6]/10 text-[#2dd4bf] text-sm font-medium tracking-wide">
          GitPulse
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
          Your GitHub pulse,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2dd4bf] to-[#818cf8]">
            visualized.
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-[#9ca3af] mb-10 max-w-xl leading-relaxed">
          Dive deep into your GitHub activity. Explore your top languages,
          contribution patterns, repository stats, and more — all in one place.
        </p>

        {/* Sign in button */}
        <SignInButton />

        {/* What sign-in does */}
        <p className="mt-4 text-sm text-[#9ca3af] max-w-md leading-relaxed">
          Sign-in happens on GitHub&apos;s own page, so GitPulse never sees your
          password. It asks only for read-only access to your public profile
          and repositories.
        </p>

        {/* Features row */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { label: "Repo Stats", desc: "Stars, forks & languages" },
            { label: "Activity", desc: "Contribution patterns" },
            { label: "Insights", desc: "Profile health score" },
            { label: "AI Roast", desc: "Brutally honest insights" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-1 p-4 rounded-xl border border-[#26263a] bg-[#12121c]"
            >
              <span className="text-white font-semibold">{item.label}</span>
              <span className="text-[#9ca3af] text-sm">{item.desc}</span>
            </div>
          ))}
        </div>

        {/* About / disclaimer */}
        <footer className="mt-16 text-xs text-[#9ca3af] leading-relaxed max-w-md">
          <p>
            GitPulse is an independent portfolio project built by{" "}
            <a
              href="https://ratneshbvk.com"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-white"
            >
              BVK Ratnesh
            </a>
            . It is not affiliated with, endorsed by, or sponsored by GitHub,
            Inc.
          </p>
          <p className="mt-2">
            <a
              href="https://github.com/ratnesh2507/gitpulse"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-white"
            >
              View the source code
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
