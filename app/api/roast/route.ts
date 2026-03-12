import Groq from "groq-sdk";
import { NextRequest } from "next/server";

interface LanguageStat {
  name: string;
  count: number;
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

export async function POST(req: NextRequest) {
  const { user, repos, languageStats, profileScore, totalStars, totalForks } =
    await req.json();

  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5)
    .map(
      (r) =>
        `${r.name} (⭐${r.stargazers_count}, 🍴${r.forks_count}, ${r.language || "no language"})`,
    )
    .join(", ");

  const languages = languageStats
    .map((l: LanguageStat) => `${l.name}(${l.count} repos)`)
    .join(", ");

  const accountAge = Math.floor(
    (Date.now() - new Date(user.created_at).getTime()) /
      (1000 * 60 * 60 * 24 * 365),
  );

  const prompt = `You are a witty, sharp tech mentor — like a senior engineer who moonlights as a stand-up comedian.
Roast this developer's GitHub profile with clever humor and specific observations. Be funny and punchy, not cruel.
Reference their actual repo names, languages, follower count, and patterns — the more specific, the funnier.
Use sharp analogies and developer humor. Mock the situation, never attack their skills or potential.
The tone should feel like a friend roasting you at a party — everyone laughs including the person being roasted.
End with 3 genuinely useful tips labeled "How to fix your mess 🔥".
Keep it under 220 words.

Here is the developer's GitHub data:
- Username: ${user.login}
- Name: ${user.name || "No name (already suspicious)"}
- Bio: ${user.bio || "No bio. A developer of mystery."}
- Account age: ${accountAge} years
- Public repos: ${user.public_repos}
- Followers: ${user.followers}
- Following: ${user.following}
- Total stars earned: ${totalStars}
- Total forks: ${totalForks}
- Profile score: ${profileScore}/100
- Top languages: ${languages}
- Top repos: ${topRepos}

Roast them like a friend would — sharp, specific, and funny. Make them laugh at themselves, not feel bad about themselves.`;

  const stream = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    stream: true,
    max_tokens: 400,
  });

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || "";
        if (text) {
          controller.enqueue(new TextEncoder().encode(text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
