import { mockJobs } from "@/lib/mockJobs";
type Props = {
  params: Promise<{ id: string }>;
};

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  const job = mockJobs.find((job) => job.id === id);

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
        <p>{job.status}</p>
      </section>
      <section>
        <p>{job.description || "No description added yet."}</p>
      </section>
      <section>
        <p>{job.location || "No location added yet."}</p>
        <p>{job.createdAt}</p>
      </section>
    </main>
  );
}
