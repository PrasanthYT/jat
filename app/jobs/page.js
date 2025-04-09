import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { JobsProvider } from "@/components/jobs-provider";
import { JobsList } from "@/components/jobs-list";

export const metadata = {
  title: "Jobs | Job Application Tracker",
};

export default function JobsPage() {
  return (
    <JobsProvider>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Job Listings</h1>
          <Link href="/jobs/new">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Job
            </Button>
          </Link>
        </div>

        <JobsList />
      </div>
    </JobsProvider>
  );
}
