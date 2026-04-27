import { Job } from "@/types/job";

export const mockJobs: Job[] = [
  {
    id: "1",
    company: "Google",
    title: "Frontend Engineer",
    location: "Irvine",
    status: "applied",
    description: "Work on UI features",
    createdAt: "2026-05-01",
  },
  {
    id: "2",
    company: "Amazon",
    title: "Frontend Engineer I",
    location: "Burbank",
    status: "saved",
    description: "Build internal tools",
    createdAt: "2026-05-02",
  },
  {
    id: "3",
    company: "Acorn",
    title: "Frontend Engineer I",
    location: "Playa Vista",
    status: "interviewing",
    description: "Build product UI",
    createdAt: "2026-05-04",
  },
];
