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
    // Check if we have jobs data
    if (jobs && jobs.length > 0) {
      // Find the job with the matching ID
      const foundJob = jobs.find((j) => j.id === params.id)

      if (foundJob) {
        setJob(foundJob)
      } else {
        // If no job is found, we'll redirect to the jobs page
        router.push("/jobs")
      }
    } else {
      // If there are no jobs yet, we'll try to load from localStorage directly
      try {
        const storedJobs = JSON.parse(localStorage.getItem("jobs") || "[]")
        const foundJob = storedJobs.find((j) => j.id === params.id)

        if (foundJob) {
          setJob(foundJob)
        } else {
          router.push("/jobs")
        }
      } catch (error) {
        console.error("Error loading job from localStorage:", error)
        router.push("/jobs")
      }
    }

    // Always set loading to false after attempting to find the job
    setLoading(false)
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
