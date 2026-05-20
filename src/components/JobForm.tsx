"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { JobStatus } from "@/types/job";

type NewJobFormData = {
  company: string;
  title: string;
  location: string;
  description: string;
  status: JobStatus;
};

type JobFormProps = {
  onAddJob: (formData: NewJobFormData) => void;
};

const inputClass =
  "rounded-lg border border-slate-300 px-3 py-2 text-base text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const primaryButtonClass =
  "rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700";

export function JobForm({ onAddJob }: JobFormProps) {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<JobStatus>("saved");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!company.trim() || !title.trim()) return;

    onAddJob({
      company: company.trim(),
      title: title.trim(),
      location: location.trim(),
      description: description.trim(),
      status,
    });

    setCompany("");
    setTitle("");
    setLocation("");
    setDescription("");
    setStatus("saved");
  }

  return (
    <form
      onSubmit={handleSubmit}
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
  );
}
