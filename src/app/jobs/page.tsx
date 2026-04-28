"use client";
import { useState } from "react";
import { mockJobs } from "@/lib/mockJobs";
import { JobStatus } from "@/types/job";

export default function JobsPage() {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState(mockJobs);
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<JobStatus>("saved");

  const normalizedQuery = query.toLowerCase().trim();
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(normalizedQuery) ||
      job.company.toLowerCase().includes(normalizedQuery),
  );

  function addNewJob(e: any) {
    e.preventDefault();
    if (!company || !title) return;
    const newJob = {
      id: crypto.randomUUID(),
      company: company,
      title: title,
      location: "",
      status: status,
      description: "",
      createdAt: new Date().toISOString(),
    };

    setJobs([newJob, ...jobs]);
    setCompany("");
    setTitle("");
    setStatus("saved");
  }
  function deleteJob(id: string) {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
  }
  return (
    <main>
      <form onSubmit={addNewJob}>
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
        />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Job Title"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as JobStatus)}
        >
          <option value="saved">Saved</option>
          <option value="applied">Applied</option>
          <option value="interviewing">Interviewing</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
        <button type="submit">Add Job</button>
      </form>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {filteredJobs.map((job) => (
        <div key={job.id}>
          <h2>{job.company}</h2>
          <p>{job.title}</p>
          <p>{job.status}</p>
          <button onClick={() => deleteJob(job.id)}>Delete</button>
        </div>
      ))}
    </main>
  );
}
