"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Job } from "@/types/job";
import { mockJobs } from "@/lib/mockJobs";
import {
  formatDate,
  formatStatus,
  getStatusBadgeClass,
} from "@/lib/formatters";
import Link from "next/link";

export default function JobDetailPage() {
  const params = useParams();
  const id = params.id as string;
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

  const job = jobs.find((job) => job.id === id);
  const pageClass = "min-h-screen bg-slate-50 px-6 py-8";
  const cardClass = "rounded-xl border border-slate-200 bg-white p-5 shadow-sm";
  if (!hasLoaded) {
    return <main className={pageClass}>Loading...</main>;
  }

  if (!job) {
    return (
      <main className={pageClass}>
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-bold text-slate-900">Job not found</h1>
          <Link
            className="mt-4 inline-block text-blue-600 hover:text-blue-700"
            href="/jobs"
          >
            Back to jobs
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={pageClass}>
      <div className="mx-auto max-w-2xl">
        <Link
          className="mb-4 inline-block text-blue-600 hover:text-blue-700"
          href="/jobs"
        >
          ← Back to jobs
        </Link>
        <section className={`${cardClass} mb-4`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold leading-tight text-slate-900">
                {job.title}
              </h1>
              <p className="mt-2 text-lg text-slate-700">{job.company}</p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2 py-1 text-sm font-medium ${getStatusBadgeClass(job.status)}`}
            >
              {formatStatus(job.status)}
            </span>
          </div>
        </section>

        <section className={`${cardClass} mb-4`}>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            Description
          </h2>
          <p className="whitespace-pre-wrap text-slate-700">
            {job.description || "No description added yet."}
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            Job Details
          </h2>

          <div className="space-y-2 text-slate-700">
            <p>
              <span className="font-medium text-slate-900">Location:</span>{" "}
              {job.location || "No location added yet."}
            </p>
            <p>
              <span className="font-medium text-slate-900">Added:</span>{" "}
              {formatDate(job.createdAt)}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
