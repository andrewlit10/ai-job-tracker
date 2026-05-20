"use client";
import { useEffect, useState } from "react";
import { mockJobs } from "@/lib/mockJobs";
import { JobStatus } from "@/types/job";
import type { Job } from "@/types/job";
import { JobCard } from "@/components/JobCard";

export default function JobsPage() {
  const [query, setQuery] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
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
      job.company.toLowerCase().includes(normalizedQuery) ||
      job.status.toLowerCase().includes(normalizedQuery),
  );

  function addNewJob(e: any) {
    e.preventDefault();
    if (!company.trim() || !title.trim()) return;
    const newJob = {
      id: crypto.randomUUID(),
      company: company.trim(),
      title: title.trim(),
      location: location.trim(),
      description: description.trim(),
      status: status,
      createdAt: new Date().toISOString(),
    };

    setJobs([newJob, ...jobs]);
    setCompany("");
    setTitle("");
    setLocation("");
    setDescription("");
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
  const pageClass = "min-h-screen bg-slate-50 px-6 py-8";
  const inputClass =
    "rounded-lg border border-slate-300 px-3 py-2 text-base text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
  const primaryButtonClass =
    "rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700";

  const dangerButtonClass =
    "rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700";
  if (!hasLoaded) {
    return (
      <main className={pageClass}>
        <div className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-slate-600">Loading jobs...</p>
        </div>
      </main>
    );
  }
  return (
    <main className={pageClass}>
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">AI Job Tracker</h1>
        </div>
        <form
          onSubmit={addNewJob}
          className="mb-8 grid gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <input
            className={inputClass}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company"
          />
          <input
            className={inputClass}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job Title"
          />
          <input
            className={inputClass}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
          />
          <textarea
            className={`${inputClass} min-h-24 resize-none`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Job description"
          />
          <select
            className={inputClass}
            value={status}
            onChange={(e) => setStatus(e.target.value as JobStatus)}
          >
            <option value="saved">Saved</option>
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className={primaryButtonClass} type="submit">
            Add Job
          </button>
        </form>
        <input
          className={`mb-4 w-full ${inputClass}`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search jobs..."
        />

        {jobs.length === 0 ? (
          <p>No jobs yet. Add your first job above.</p>
        ) : filteredJobs.length === 0 ? (
          <p>No matching jobs found.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onDelete={deleteJob}
                onStatusChange={updateJobStatus}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
