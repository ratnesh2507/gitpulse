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
    <main className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#238636] rounded-full blur-[180px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-[#1f6feb] rounded-full blur-[180px] opacity-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl mx-auto">
        {/* Badge */}
        <div className="mb-6 px-4 py-1.5 rounded-full border border-[#238636]/40 bg-[#238636]/10 text-[#3fb950] text-sm font-medium tracking-wide">
          GitPulse
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
          Your GitHub pulse,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3fb950] to-[#1f6feb]">
            visualized.
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-[#8b949e] mb-10 max-w-xl leading-relaxed">
          Dive deep into your GitHub activity. Explore your top languages,
          contribution patterns, repository stats, and more — all in one place.
        </p>

        {/* Sign in button */}
        <SignInButton />

        {/* Features row */}
        <div className="mt-16 grid grid-cols-3 gap-6 text-center">
          {[
            { label: "Repo Stats", desc: "Stars, forks & languages" },
            { label: "Activity", desc: "Contribution patterns" },
            { label: "Insights", desc: "Profile health score" },
            { label: "AI Roast", desc: "Brutally honest insights" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-1 p-4 rounded-xl border border-[#30363d] bg-[#161b22]"
            >
              <span className="text-white font-semibold">{item.label}</span>
              <span className="text-[#8b949e] text-sm">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
