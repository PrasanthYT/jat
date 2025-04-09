"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit, Trash2, Users, Calendar, MapPin, Clock, Briefcase, DollarSign } from "lucide-react"

export default function JobDetailPage({ params }) {
  const router = useRouter()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch job details from localStorage
    try {
      const storedJobs = JSON.parse(localStorage.getItem("jobs") || "[]")
      const foundJob = storedJobs.find((j) => j.id === params.id)

      if (foundJob) {
        setJob(foundJob)
      } else {
        // Job not found, redirect to jobs page
        router.push("/jobs")
      }
    } catch (error) {
      console.error("Error fetching job:", error)
    } finally {
      setLoading(false)
    }
  }, [params.id, router])

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
          <Link href="/jobs">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Jobs
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{job.title}</h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
            <span>{job.department}</span>
            {job.location && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{job.location}</span>
                </div>
              </>
            )}
            {job.posted && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Posted {job.posted}</span>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button size="sm" variant="destructive">
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
            <Users className="h-4 w-4" />
            <span>Applicants</span>
          </div>
          <p className="text-2xl font-bold">{job.applicants || 0}</p>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
            <Calendar className="h-4 w-4" />
            <span>Interviews</span>
          </div>
          <p className="text-2xl font-bold">{job.interviews || 0}</p>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
            <Briefcase className="h-4 w-4" />
            <span>Job Type</span>
          </div>
          <p className="text-lg font-medium">{job.type || "Full-time"}</p>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
            <DollarSign className="h-4 w-4" />
            <span>Salary Range</span>
          </div>
          <p className="text-lg font-medium">{job.salary || "Not specified"}</p>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Job Description</h2>
        <p className="text-sm whitespace-pre-line">{job.description || "No description provided."}</p>
      </div>

      {job.requirements && (
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Requirements</h2>
          <p className="text-sm whitespace-pre-line">{job.requirements}</p>
        </div>
      )}

      <Separator />

      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Applicants</h2>
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">No applicants yet.</p>
          <Button size="sm" className="mt-2">
            Add Applicant
          </Button>
        </div>
      </div>
    </div>
  )
}
