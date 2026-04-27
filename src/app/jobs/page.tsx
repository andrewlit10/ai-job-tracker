"use client";
import { useState } from "react";
import { mockJobs } from "@/lib/mockJobs";

export default function JobsPage() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.toLowerCase().trim();
  const filteredJobs = mockJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(normalizedQuery) ||
      job.company.toLowerCase().includes(normalizedQuery),
  );
  return (
    <main>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {filteredJobs.map((job) => (
        <div key={job.id}>
          <h2>{job.company}</h2>
          <p>{job.title}</p>
          <p>{job.status}</p>
        </div>
      ))}
    </main>
  );
}
