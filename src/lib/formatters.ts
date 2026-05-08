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

export function getStatusBadgeClass(status: JobStatus) {
  switch (status) {
    case "saved":
      return "bg-gray-100 text-gray-700";
    case "applied":
      return "bg-blue-100 text-blue-700";
    case "interviewing":
      return "bg-purple-100 text-purple-700";
    case "offer":
      return "bg-green-100 text-green-700";
    case "rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}
