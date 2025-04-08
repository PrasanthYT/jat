import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Users, Calendar } from "lucide-react";

export default function JobsPage() {
  // This would normally come from an API or local storage
  const jobs = [
    {
      id: "1",
      title: "Frontend Developer",
      department: "Engineering",
      hiringManager: "Jane Smith",
      applicants: 3,
      location: "Remote",
      posted: "2 weeks ago",
    },
    {
      id: "2",
      title: "Product Manager",
      department: "Product",
      hiringManager: "John Doe",
      applicants: 0,
      location: "New York, NY",
      posted: "3 days ago",
    },
    {
      id: "3",
      title: "UX Designer",
      department: "Design",
      hiringManager: "Alice Johnson",
      applicants: 5,
      location: "San Francisco, CA",
      posted: "1 month ago",
    },
  ];

  return (
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

      {jobs.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            No jobs found. Add a new job to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {jobs.map((job) => (
            <Link href={`/jobs/${job.id}`} key={job.id} className="block">
              <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-semibold">{job.title}</h2>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                      <span>{job.department}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>Posted {job.posted}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{job.applicants} applicants</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>2 interviews</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
