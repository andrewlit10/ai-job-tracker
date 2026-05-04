"use client";
import { useEffect, useState } from "react";
import { mockJobs } from "@/lib/mockJobs";
import { formatStatus } from "@/lib/formatters";
import { JobStatus } from "@/types/job";
import type { Job } from "@/types/job";

import Link from "next/link";

export default function JobsPage() {
  const [query, setQuery] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<JobStatus>("saved");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const savedJobs = localStorage.getItem("jobs");

    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    } else {
      setJobs(mockJobs);
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs, hasLoaded]);
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
    const shouldDelete = confirm("Are you sure you want to delete this job?");
    if (!shouldDelete) return;
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
  }

  function updateJobStatus(id: string, newStatus: JobStatus) {
    const updatedJobs = jobs.map((job) => {
      if (job.id === id) {
        return { ...job, status: newStatus };
      }
      return job;
    });
    setJobs(updatedJobs);
  }

  if (!hasLoaded) {
    return <main>Loading...</main>;
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
          <Link href={`/jobs/${job.id}`}>
            <h2>{job.company}</h2>
            <p>{job.title}</p>
            <p>{formatStatus(job.status)}</p>
          </Link>
          <select
            value={job.status}
            onChange={(e) =>
              updateJobStatus(job.id, e.target.value as JobStatus)
            }
          >
            <option value="saved">Saved</option>
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
          <button onClick={() => deleteJob(job.id)}>Delete</button>
        </div>
      ))}
    </main>
  );
}
