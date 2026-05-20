"use client";
import { useEffect, useState } from "react";
import { mockJobs } from "@/lib/mockJobs";
import { JobStatus } from "@/types/job";
import type { Job } from "@/types/job";
import { JobCard } from "@/components/JobCard";
import { JobForm } from "@/components/JobForm";

export default function JobsPage() {
  const [query, setQuery] = useState("");
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

  function addNewJob(formData: {
    company: string;
    title: string;
    location: string;
    description: string;
    status: JobStatus;
  }) {
    const newJob: Job = {
      id: crypto.randomUUID(),
      company: formData.company,
      title: formData.title,
      location: formData.location,
      description: formData.description,
      status: formData.status,
      createdAt: new Date().toISOString(),
    };

    setJobs([newJob, ...jobs]);
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
        <JobForm onAddJob={addNewJob} />
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
