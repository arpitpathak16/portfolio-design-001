"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Project, MotionItem, AspectRatio } from "@/lib/data";

type Section = "projects" | "motionItems" | "shortsItems";

const SECTION_LABELS: Record<Section, string> = {
  projects: "Work",
  motionItems: "Motion Design",
  shortsItems: "Portfolio Shorts",
};

interface Props {
  initialProjects: Project[];
  initialMotionItems: MotionItem[];
  initialShortsItems: MotionItem[];
}

export default function AdminDashboard({ initialProjects, initialMotionItems, initialShortsItems }: Props) {
  const router = useRouter();
  const [lists, setLists] = useState<Record<Section, (Project | MotionItem)[]>>({
    projects: initialProjects,
    motionItems: initialMotionItems,
    shortsItems: initialShortsItems,
  });

  const [section, setSection] = useState<Section>("projects");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [tags, setTags] = useState("");
  const [aspect, setAspect] = useState<AspectRatio>("landscape");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const res = await fetch("/api/admin/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        section,
        youtubeUrl,
        title,
        client,
        category,
        year,
        aspect,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      }),
    });

    const data = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setError(data.error ?? "Something went wrong");
      return;
    }

    setLists((prev) => ({ ...prev, [section]: [...prev[section], data] }));
    setYoutubeUrl("");
    setTitle("");
    setClient("");
    setCategory("");
    setTags("");
  }

  async function handleDelete(targetSection: Section, id: number) {
    const res = await fetch(`/api/admin/videos/${targetSection}/${id}`, { method: "DELETE" });
    if (res.ok) {
      setLists((prev) => ({
        ...prev,
        [targetSection]: prev[targetSection].filter((item) => item.id !== id),
      }));
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#080808] px-6 py-12 text-[#F5F0E8] md:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Video Manager</h1>
          <button onClick={handleLogout} className="text-sm text-[#888888] hover:text-[#F5F0E8]">
            Log out
          </button>
        </div>

        <form onSubmit={handleAdd} className="mb-14 space-y-4 rounded-lg border border-[#1E1E1E] bg-[#101010] p-6">
          <h2 className="text-lg font-semibold">Add a video</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs uppercase text-[#888888]">Section</span>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value as Section)}
                className="w-full rounded-md border border-[#1E1E1E] bg-[#080808] px-3 py-2"
              >
                <option value="projects">Work</option>
                <option value="motionItems">Motion Design</option>
                <option value="shortsItems">Portfolio Shorts</option>
              </select>
            </label>

            {section === "projects" && (
              <label className="block">
                <span className="mb-1 block text-xs uppercase text-[#888888]">Aspect ratio</span>
                <select
                  value={aspect}
                  onChange={(e) => setAspect(e.target.value as AspectRatio)}
                  className="w-full rounded-md border border-[#1E1E1E] bg-[#080808] px-3 py-2"
                >
                  <option value="landscape">Landscape</option>
                  <option value="portrait">Portrait</option>
                  <option value="square">Square</option>
                </select>
              </label>
            )}
          </div>

          <label className="block">
            <span className="mb-1 block text-xs uppercase text-[#888888]">YouTube URL</span>
            <input
              required
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full rounded-md border border-[#1E1E1E] bg-[#080808] px-3 py-2"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs uppercase text-[#888888]">Title</span>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border border-[#1E1E1E] bg-[#080808] px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs uppercase text-[#888888]">Client</span>
              <input
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full rounded-md border border-[#1E1E1E] bg-[#080808] px-3 py-2"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {section === "projects" && (
              <label className="block">
                <span className="mb-1 block text-xs uppercase text-[#888888]">Category</span>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-md border border-[#1E1E1E] bg-[#080808] px-3 py-2"
                />
              </label>
            )}
            <label className="block">
              <span className="mb-1 block text-xs uppercase text-[#888888]">Year</span>
              <input
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full rounded-md border border-[#1E1E1E] bg-[#080808] px-3 py-2"
              />
            </label>
            {section === "projects" && (
              <label className="block">
                <span className="mb-1 block text-xs uppercase text-[#888888]">Tags (comma separated)</span>
                <input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full rounded-md border border-[#1E1E1E] bg-[#080808] px-3 py-2"
                />
              </label>
            )}
          </div>

          {error && <p className="text-sm text-[#FF3D00]">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-[#CDFF00] px-5 py-2.5 font-semibold text-[#080808] disabled:opacity-50"
          >
            {submitting ? "Adding…" : "Add video"}
          </button>
        </form>

        {(Object.keys(lists) as Section[]).map((key) => (
          <div key={key} className="mb-10">
            <h2 className="mb-3 text-sm uppercase tracking-wide text-[#888888]">{SECTION_LABELS[key]}</h2>
            {lists[key].length === 0 ? (
              <p className="text-sm text-[#555555]">No admin-added videos yet.</p>
            ) : (
              <ul className="space-y-2">
                {lists[key].map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between rounded-md border border-[#1E1E1E] bg-[#101010] px-4 py-3"
                  >
                    <span>{item.title}</span>
                    <button
                      onClick={() => handleDelete(key, item.id)}
                      className="text-sm text-[#FF3D00] hover:underline"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
