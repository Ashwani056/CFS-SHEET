"use client";
import React, { useMemo, useState, useEffect } from "react";

type Question = {
  title: string;
  description: string;
  topic: string;
  pattern: string;
  difficulty: string;
  link: string;
};

const topics = [
  "Array",
  "2D Array",
  "Strings",
  "Searching",
  "Sorting",
  "Recursion",
  "Stack",
  "Queue",
  "Linked List",
  "Heap",
  "Hashing",
  "Tree",
  "Graph",
  "DP",
  "Greedy Algorithms",
  "Backtracking",
];

// (kept for reference, but we won't render this full list directly)
// We’ll render only the patterns available for the chosen topic.
const patternsAll = [
  "All Patterns",
  "General",
  "Two Pointers",
  "Fast & Slow Pointers",
  "Sliding Window",
  "Prefix Sum",
  "Hash Map / Set",
  "Prefix/Suffix Products",
  "Sorting & Partitioning",
  "Binary Search",
  "Binary Search on Answer",
  "Greedy",
  "Monotonic Stack",
  "Monotonic Queue",
  "Heap / Priority Queue",
  "Order Statistics (Quickselect)",
  "Intervals & Sweep Line",
  "Stack",
  "Queue / Deque",
  "Union-Find (DSU)",
  "BFS",
  "DFS",
  "Topological Sort",
  "Shortest Path (Dijkstra / 0-1 BFS)",
  "Minimum Spanning Tree (Kruskal / Prim)",
  "Backtracking",
  "Recursion / Divide & Conquer",
  "Kadane / Subarray",
  "Matrix Manipulation",
  "Bit Manipulation",
  "Trie / Prefix Tree",
  "String Matching (KMP / Z / Rabin–Karp)",
  "Boyer–Moore Voting (Majority)",
  "Two Heaps (Median maintenance)",
  "DP on Strings",
];
// Curated patterns per topic (unioned with what's in data)
const TOPIC_PATTERN_MAP: Record<string, string[]> = {
  Array: [
    "General",
    "Two Pointers",
    "Sliding Window",
    "Prefix Sum",
    "Prefix/Suffix Products",
    "Kadane / Subarray",
    "Binary Search",
    "Binary Search on Answer",
    "Sorting & Partitioning",
    "Monotonic Stack",
    "Monotonic Queue",
    "Heap / Priority Queue",
    "Order Statistics (Quickselect)",
    "Greedy",
    "Hash Map / Set",
    "Bit Manipulation",
    "Two Heaps (Median maintenance)",
    "Difference Array",
  ],
  "2D Array": [
    "Matrix Manipulation",
    "Prefix Sum",
    "Binary Search",
    "Sorting & Partitioning",
    "Greedy",
    "Monotonic Stack",
  ],
  Strings: [
    "Sliding Window",
    "Two Pointers",
    "Hash Map / Set",
    "String Matching (KMP / Z / Rabin–Karp)",
    "Trie / Prefix Tree",
    "Rolling Hash",
    "DP on Strings",
  ],
  Searching: [
    "Binary Search",
    "Binary Search on Answer",
    "Two Pointers",
    "Greedy",
    "Order Statistics (Quickselect)",
  ],
  Sorting: [
    "Sorting & Partitioning",
    "Heap / Priority Queue",
    "Order Statistics (Quickselect)",
    "Two Heaps (Median maintenance)",
    "Two Pointers",
    "Greedy",
  ],
  Recursion: ["Recursion / Divide & Conquer", "Backtracking", "DFS"],
  Stack: ["Stack", "Monotonic Stack"],
  Queue: ["Queue / Deque", "Monotonic Queue", "BFS"],
  "Linked List": [
    "Two Pointers",
    "Fast & Slow Pointers",
    "Hash Map / Set",
    "Heap / Priority Queue",
    "Recursion / Divide & Conquer",
    "Stack",
  ],
  Heap: [
    "Heap / Priority Queue",
    "Two Heaps (Median maintenance)",
    "Order Statistics (Quickselect)",
    "Greedy",
  ],
  Hashing: ["Hash Map / Set", "Prefix Sum", "Boyer–Moore Voting (Majority)"],
  Tree: ["DFS", "BFS", "Recursion / Divide & Conquer", "Binary Search"],
  Graph: [
    "BFS",
    "DFS",
    "Topological Sort",
    "Shortest Path (Dijkstra / 0-1 BFS)",
    "Minimum Spanning Tree (Kruskal / Prim)",
    "Union-Find (DSU)",
    "Greedy",
  ],
  DP: [
    "Kadane / Subarray",
    "Recursion / Divide & Conquer",
    "Bitmask DP", // optional, shows up in DP sets
    "DP on Intervals",
    "DP on Trees",
  ],
  "Greedy Algorithms": [
    "Greedy",
    "Intervals & Sweep Line",
    "Heap / Priority Queue",
    "Two Pointers",
    "Binary Search on Answer",
  ],
  Backtracking: [
    "Backtracking",
    "Recursion / Divide & Conquer",
    "Trie / Prefix Tree",
    "Bit Manipulation",
  ],
};

export default function PracticePage() {
  const [selectedTopic, setSelectedTopic] = useState("Array");
  const [selectedPattern, setSelectedPattern] = useState("All Patterns");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [questionsData, setQuestionsData] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  // Track done state: { [questionKey]: true }
  const [doneMap, setDoneMap] = useState<{ [key: string]: boolean }>(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("practiceDoneMap");
        if (raw) return JSON.parse(raw);
      } catch {}
    }
    return {};
  });

  // Helper to get a unique key for a question (use link if unique, else fallback to title)
  function getQuestionKey(q: Question) {
    return q.link || q.title;
  }
  // Save doneMap to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("practiceDoneMap", JSON.stringify(doneMap));
    }
  }, [doneMap]);
  // Compute per-topic progress
  const topicProgress = useMemo(() => {
    const map: { [topic: string]: { total: number; done: number } } = {};
    questionsData.forEach((q) => {
      const t = q.topic;
      if (!map[t]) map[t] = { total: 0, done: 0 };
      map[t].total++;
      if (doneMap[getQuestionKey(q)]) map[t].done++;
    });
    return map;
  }, [questionsData, doneMap]);

  useEffect(() => {
    setLoading(true);
    fetch("/data/practiceQuestions.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load questions");
        return res.json();
      })
      .then((data) => {
        setQuestionsData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const patternsByTopic = useMemo(() => {
    const map = new Map<string, Set<string>>();
    questionsData.forEach((q) => {
      const t = (q.topic || "Misc").trim();
      const p = (q.pattern || "General").trim();
      if (!map.has(t)) map.set(t, new Set());
      map.get(t)!.add(p);
    });
    return map;
  }, [questionsData]);

  const visiblePatterns = useMemo(() => {
    // patterns present in data for the selected topic
    const fromData = new Set(
      patternsByTopic.get(selectedTopic) || new Set<string>()
    );
    // curated patterns for the selected topic
    const curated = new Set(TOPIC_PATTERN_MAP[selectedTopic] || []);
    // union so students always see a complete list
    const union = new Set<string>([...fromData, ...curated]);
    return ["All Patterns", ...Array.from(union).sort()];
  }, [patternsByTopic, selectedTopic]);

  useEffect(() => {
    setSelectedPattern("All Patterns");
  }, [selectedTopic]);

  const filteredQuestions = questionsData.filter((q: Question) => {
    const topicOk = q.topic === selectedTopic;
    const patternOk =
      selectedPattern === "All Patterns" ||
      (q.pattern || "General") === selectedPattern;

    const difficultyOk =
      selectedDifficulty === "All" || q.difficulty === selectedDifficulty;

    const searchOk = !search
      ? true
      : `${q.title} ${q.topic} ${q.pattern} ${q.difficulty}`
          .toLowerCase()
          .includes(search.toLowerCase());

    return topicOk && patternOk && difficultyOk && searchOk;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        Loading questions...
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-red-400">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col relative overflow-hidden">
      {/* Gradient corner effects */}
      <div className="pointer-events-none absolute top-0 right-0 w-[45rem] h-[45rem] bg-gradient-radial from-violet-800/30 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[45rem] h-[45rem] bg-gradient-radial from-indigo-900/40 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[38rem] w-[38rem] rounded-full bg-violet-800/15 blur-[120px]"
        style={{ animation: "ambientGlow1 16s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-12rem] right-[-12rem] h-[32rem] w-[32rem] rounded-full bg-indigo-900/15 blur-[110px]"
        style={{ animation: "ambientGlow2 18s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.35'/></svg>')",
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/55 border-b border-[#232b3b]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/img/logo.png" alt="logo" className="w-10 h-10" />
            <span className="font-semibold tracking-tight text-lg">
              CodeForSuccess
            </span>
            <span className="ml-4 text-xl font-bold tracking-tight text-white">
              Practice Sheets
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/courses"
              className="px-4 py-2 rounded-full bg-neutral-900 text-white font-semibold shadow hover:bg-neutral-800 border border-neutral-800 transition"
            >
              Courses
            </a>
            <a
              href="/signin"
              className="px-4 py-2 rounded-full bg-[#2FEAAA] text-neutral-900 font-semibold shadow hover:opacity-90 border border-transparent transition"
            >
              Log In
            </a>
          </div>
        </div>
      </header>

      <div className="flex flex-1 z-10 relative">
        {/* Sidebar */}
        <aside className="w-80 bg-neutral-900/80 p-6 border-r border-[#232b3b] backdrop-blur-lg">
          <select className="w-full mb-4 p-2 rounded bg-neutral-950 border border-[#232b3b] text-white">
            <option>DSA Sheet</option>
          </select>

          {/* ✅ wired search */}
          <input
            className="w-full mb-6 p-2 rounded bg-neutral-950 border border-[#232b3b] text-white placeholder:text-neutral-400 focus:ring-2 focus:ring-[#2FEAAA]"
            placeholder="Search by title, topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <h2 className="text-lg font-semibold mb-4">Topics</h2>
          <ul className="space-y-2">
            {topics.map((topic) => {
              const prog = topicProgress[topic] || { total: 0, done: 0 };
              return (
                <li key={topic}>
                  <button
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition font-medium ${
                      selectedTopic === topic
                        ? "bg-neutral-800 text-[#2FEAAA] shadow-lg"
                        : "hover:bg-[#232b3b]"
                    }`}
                    onClick={() => setSelectedTopic(topic)}
                  >
                    <span className="flex items-center gap-2">
                      <span className="inline-block w-5 h-5 bg-[#2FEAAA] rounded mr-2" />
                      <span className="text-left break-words whitespace-normal block">
                        {topic}
                      </span>
                    </span>
                    <span className="text-xs opacity-60">
                      {prog.done}/{prog.total} done
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* ✅ Pattern chips – only those under the selected topic */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Select Pattern</h2>
            <ul className="flex flex-wrap gap-2">
              {visiblePatterns.map((p) => (
                <li key={p}>
                  <button
                    className={`px-3 py-1 rounded-full text-xs border font-semibold transition ${
                      selectedPattern === p
                        ? "bg-[#2FEAAA] text-neutral-900 border-transparent shadow"
                        : "border-[#232b3b] bg-neutral-900 text-white hover:bg-[#232b3b]"
                    }`}
                    onClick={() => setSelectedPattern(p)}
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Difficulty filter buttons */}
          <div className="flex gap-4 mb-8">
            {["All", "Easy", "Medium", "Hard"].map((level) => (
              <button
                key={level}
                className={`px-5 py-2 rounded-full font-semibold border text-sm transition-all
                  ${
                    selectedDifficulty === level
                      ? "bg-[#2FEAAA] text-neutral-900 border-transparent shadow"
                      : "bg-neutral-900 text-white border-[#232b3b] hover:bg-[#232b3b]"
                  }
                `}
                onClick={() => setSelectedDifficulty(level)}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredQuestions.map((q: Question, idx: number) => {
              const qKey = getQuestionKey(q);
              return (
                <div
                  key={qKey}
                  className="bg-neutral-900 rounded-3xl p-6 shadow-xl border border-[#232b3b] flex flex-col gap-2 backdrop-blur-md hover:scale-[1.025] transition-transform duration-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        q.difficulty === "Easy"
                          ? "bg-green-900 text-green-300"
                          : q.difficulty === "Medium"
                          ? "bg-yellow-900 text-yellow-300"
                          : "bg-red-900 text-red-300"
                      }`}
                    >
                      {q.difficulty}
                    </span>
                    <span className="text-xs bg-[#232b3b] px-2 py-0.5 rounded text-white">
                      {q.topic}
                    </span>
                    <span className="text-xs bg-[#232b3b] px-2 py-0.5 rounded">
                      {q.pattern || "General"}
                    </span>
                    <input
                      type="checkbox"
                      className="ml-auto accent-[#2FEAAA]"
                      checked={!!doneMap[qKey]}
                      onChange={(e) => {
                        setDoneMap((prev) => ({
                          ...prev,
                          [qKey]: e.target.checked,
                        }));
                      }}
                    />
                    <span className="text-xs opacity-60">Done</span>
                  </div>
                  <div className="font-bold text-lg tracking-tight mb-1 text-white">
                    {q.title}
                  </div>
                  <div className="text-sm opacity-80 mb-2">{q.description}</div>
                  <div className="flex gap-2 mt-auto">
                    <a
                      href={q.link}
                      target="_blank"
                      className="text-[#2FEAAA] text-sm font-medium hover:underline hover:text-white transition"
                    >
                      Open ↗
                    </a>
                    <button className="ml-auto px-3 py-1 rounded bg-[#232b3b] text-xs text-white font-semibold shadow hover:opacity-90 transition">
                      Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
