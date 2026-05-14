"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Job, JobStatus } from "@/types/job";
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
  const [isEditing, setIsEditing] = useState(false);
  const [editCompany, setEditCompany] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState<JobStatus>("saved");

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
  const inputClass =
    "rounded-lg border border-slate-300 px-3 py-2 text-base text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
  const primaryButtonClass =
    "rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700";
  const secondaryButtonClass =
    "rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-100";
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

  function startEditing(jobToEdit: Job) {
    setEditCompany(jobToEdit.company);
    setEditTitle(jobToEdit.title);
    setEditLocation(jobToEdit.location);
    setEditDescription(jobToEdit.description);
    setEditStatus(jobToEdit.status);
    setIsEditing(true);
  }
  function cancelEditing() {
    setIsEditing(false);
  }

  function saveJobChanges() {
    if (!editCompany.trim() || !editTitle.trim()) return;
    const updatedJobs = jobs.map((currentJob) => {
      if (currentJob.id === id) {
        return {
          ...currentJob,
          company: editCompany.trim(),
          title: editTitle.trim(),
          location: editLocation.trim(),
          description: editDescription.trim(),
          status: editStatus,
        };
      }
      return currentJob;
    });
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setIsEditing(false);
  }

  return (
    <main className={pageClass}>
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 flex items-center justify-between">
          <Link className="text-blue-600 hover:text-blue-700" href="/jobs">
            ← Back to jobs
          </Link>

          {!isEditing && (
            <button
              className={primaryButtonClass}
              onClick={() => startEditing(job)}
            >
              Edit
            </button>
          )}
        </div>
        {isEditing ? (
          <section className={`${cardClass} mb-4`}>
            <h1 className="mb-4 text-2xl font-bold text-slate-900">Edit Job</h1>

            <div className="grid gap-3">
              <input
                className={inputClass}
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Job title"
              />

              <input
                className={inputClass}
                value={editCompany}
                onChange={(e) => setEditCompany(e.target.value)}
                placeholder="Company"
              />

              <input
                className={inputClass}
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                placeholder="Location"
              />

              <textarea
                className={`${inputClass} min-h-32 resize-none`}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Job description"
              />

              <select
                className={inputClass}
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value as JobStatus)}
              >
                <option value="saved">Saved</option>
                <option value="applied">Applied</option>
                <option value="interviewing">Interviewing</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>

              <div className="flex gap-3">
                <button className={primaryButtonClass} onClick={saveJobChanges}>
                  Save
                </button>
                <button
                  className={secondaryButtonClass}
                  onClick={cancelEditing}
                >
                  Cancel
                </button>
              </div>
            </div>
          </section>
        ) : (
          <>
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
          </>
        )}
      </div>
    </main>
  );
}
