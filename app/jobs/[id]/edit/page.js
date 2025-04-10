"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useJobs } from "@/components/jobs-provider"
import { EditJobForm } from "@/components/edit-job-form"

export default function EditJobPage({ params }) {
  const router = useRouter()
  const { jobs } = useJobs()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (jobs.length > 0) {
      const foundJob = jobs.find((j) => j.id === params.id)
      if (foundJob) {
        setJob(foundJob)
      } else {
        // Job not found, redirect to jobs page
        router.push("/jobs")
      }
      setLoading(false)
    }
  }, [params.id, router, jobs])

  if (loading) {
    return <div className="text-center py-10">Loading job details...</div>
  }

  if (!job) {
    return <div className="text-center py-10">Job not found</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/jobs/${params.id}`}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Job Details
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Job</h1>
        <p className="text-sm text-muted-foreground mt-1">Update the job details below.</p>
      </div>

      <div className="border rounded-lg p-4">
        <EditJobForm job={job} />
      </div>
    </div>
  )
}
