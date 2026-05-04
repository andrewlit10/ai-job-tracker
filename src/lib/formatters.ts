import type { JobStatus } from "@/types/job";

export function formatStatus(status: JobStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
