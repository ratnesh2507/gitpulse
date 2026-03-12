"use client";

import { useState, useRef } from "react";
import { GithubUser, GithubRepo } from "@/types/github";
import { X, Copy, Check, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  user: GithubUser;
  repos: GithubRepo[];
  languageStats: { name: string; count: number }[];
  profileScore: number;
  totalStars: number;
  totalForks: number;
};

export default function RoastModal({
  user,
  repos,
  languageStats,
  profileScore,
  totalStars,
  totalForks,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const hasRoasted = useRef(false);

  const fetchRoast = async () => {
    if (hasRoasted.current) return;
    hasRoasted.current = true;
    setLoading(true);
    setRoast("");
    setError("");

    try {
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user,
          repos,
          languageStats,
          profileScore,
          totalStars,
          totalForks,
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch roast");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No reader");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value);
        setRoast((prev) => prev + text);
      }
    } catch {
      setError("Something went wrong. Try again.");
      hasRoasted.current = false;
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    fetchRoast();
  };

  const handleClose = () => {
    setIsOpen(false);
    setRoast("");
    setError("");
    hasRoasted.current = false;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(roast);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={handleOpen}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#ff7b72] to-[#f85149] text-white text-sm font-semibold hover:opacity-90 transition-all duration-200 hover:scale-105 active:scale-100 shadow-lg shadow-[#f85149]/20"
      >
        <Flame size={16} />
        Roast My GitHub
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <div className="relative w-full max-w-lg bg-[#161b22] border border-[#30363d] rounded-2xl shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#30363d]">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-[#f85149]/10">
                  <Flame size={18} className="text-[#f85149]" />
                </div>
                <div>
                  <h2 className="text-white font-semibold">Roast My GitHub</h2>
                  <p className="text-[#8b949e] text-xs">Powered by Llama 3.3</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-[#8b949e] hover:text-white transition-colors p-1 rounded-lg hover:bg-[#30363d]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 min-h-[200px] flex flex-col">
              {loading && roast === "" && (
                <div className="flex flex-col items-center justify-center flex-1 gap-3 py-8">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-[#f85149] animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                  <p className="text-[#8b949e] text-sm">
                    AI is judging your code...
                  </p>
                </div>
              )}

              {error && (
                <div className="flex items-center justify-center flex-1">
                  <p className="text-[#f85149] text-sm">{error}</p>
                </div>
              )}

              {roast && (
                <div className="prose prose-invert max-w-none">
                  <p className="text-[#c9d1d9] text-sm leading-relaxed whitespace-pre-wrap">
                    {roast}
                    {loading && (
                      <span className="inline-block w-1.5 h-4 bg-[#f85149] ml-0.5 animate-pulse rounded-sm" />
                    )}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {roast && !loading && (
              <div className="flex items-center justify-between px-6 pb-6 pt-2">
                <p className="text-[#8b949e] text-xs">
                  Share this with your friends 😭
                </p>
                <button
                  onClick={handleCopy}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                    copied
                      ? "bg-[#238636]/20 text-[#3fb950] border border-[#238636]/30"
                      : "bg-[#30363d] text-[#8b949e] hover:text-white border border-[#30363d]",
                  )}
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? "Copied!" : "Copy roast"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
