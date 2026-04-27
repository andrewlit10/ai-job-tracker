import { mockJobs } from "@/lib/mockJobs";

export default function JobsPage() {
  return (
    <main>
      {mockJobs.map((job) => (
        <div key={job.id}>
          <h2>{job.company}</h2>
          <p>{job.title}</p>
          <p>{job.status}</p>
        </div>
      ))}
    </main>
  );
}
