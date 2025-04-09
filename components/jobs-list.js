"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JobCard } from "@/components/job-card"
import { useJobs } from "@/components/jobs-provider"

export function JobsList() {
  const { jobs, loading, error } = useJobs()

  if (loading) {
    return <div className="text-center py-10">Loading jobs...</div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg">
        <p className="text-muted-foreground">No jobs found. Add a new job to get started.</p>
        <Link href="/jobs/new" className="mt-4 inline-block">
          <Button>Add Your First Job</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-3">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}
