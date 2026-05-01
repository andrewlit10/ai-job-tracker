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
      <h1>{job.company}</h1>
      <p>{job.title}</p>
      <p>{job.status}</p>
    </main>
  );
}
