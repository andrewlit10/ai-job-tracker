"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Job } from "@/types/job";
import { mockJobs } from "@/lib/mockJobs";
import { formatDate, formatStatus } from "@/lib/formatters";

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

  if (!hasLoaded) {
    return <main>Loading...</main>;
  }

  if (!job) {
    return (
      <main>
        <h1>Job not found</h1>
      </main>
    );
  }
  return (
    <main>
      <section>
        <h1>{job.company}</h1>
        <p>{job.title}</p>
        <p>{formatStatus(job.status)}</p>
      </section>
      <section>
        <p>{job.description || "No description added yet."}</p>
      </section>
      <section>
        <p>{job.location || "No location added yet."}</p>
        <p>{formatDate(job.createdAt)}</p>
      </section>
    </main>
  );
}
