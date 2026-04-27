export type JobStatus =
  | "saved"
  | "applied"
  | "interviewing"
  | "offer"
  | "rejected";

export type Job = {
  id: string;
  company: string;
  title: string;
  location: string;
  status: JobStatus;
  description: string;
  notes?: string;
  createdAt: string;
};
