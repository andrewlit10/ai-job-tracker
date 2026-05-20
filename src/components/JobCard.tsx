import Link from "next/link";
import type { Job, JobStatus } from "@/types/job";
import {
  formatDate,
  formatStatus,
  getStatusBadgeClass,
} from "@/lib/formatters";

type JobCardProps = {
  job: Job;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: JobStatus) => void;
};

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200";

const dangerButtonClass =
  "rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50";

export function JobCard({ job, onDelete, onStatusChange }: JobCardProps) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <Link href={`/jobs/${job.id}`} className="block">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="min-h-[3.5rem] text-xl font-semibold leading-tight text-slate-900">
              {job.title}
            </h2>
            <p className="mt-1 text-base text-slate-700">{job.company}</p>
          </div>

          <span
            className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeClass(
              job.status,
            )}`}
          >
            {formatStatus(job.status)}
          </span>
        </div>

        <div className="mt-4 space-y-1 text-sm text-slate-500">
          <p>{job.location || "No location added"}</p>
          <p>Added {formatDate(job.createdAt)}</p>
        </div>
      </Link>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <select
          className={`${inputClass} max-w-[180px]`}
          value={job.status}
          onChange={(e) => onStatusChange(job.id, e.target.value as JobStatus)}
        >
          <option value="saved">Saved</option>
          <option value="applied">Applied</option>
          <option value="interviewing">Interviewing</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>

        <button className={dangerButtonClass} onClick={() => onDelete(job.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
