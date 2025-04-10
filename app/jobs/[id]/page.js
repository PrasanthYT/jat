"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit, Trash2, Users, Calendar, MapPin, Clock, Briefcase, DollarSign, User2 } from "lucide-react"
import { useJobs } from "@/components/jobs-provider"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

export default function JobDetailPage({ params }) {
  const router = useRouter()
  const { jobs, deleteJob } = useJobs()
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

  const handleDelete = () => {
    deleteJob(params.id)
    toast({
      title: "Job Deleted",
      description: "The job has been successfully deleted.",
    })
    router.push("/jobs")
  }

  if (loading) {
    return <JobDetailSkeleton />
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
          <Button size="sm" variant="outline" asChild>
            <Link href={`/jobs/${params.id}/edit`}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="destructive">
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the job listing and all associated data. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Applicants</h2>
          <Button size="sm" asChild>
            <Link href={`/jobs/${params.id}/applicants/new`}>Add Applicant</Link>
          </Button>
        </div>

        {job.applicants > 0 ? (
          <div className="space-y-3">
            {[...Array(Math.min(job.applicants, 3))].map((_, index) => (
              <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <User2 className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Applicant {index + 1}</p>
                    <Badge variant="outline">New</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Applied 2 days ago</p>
                </div>
              </div>
            ))}
            {job.applicants > 3 && (
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href={`/jobs/${params.id}/applicants`}>View All {job.applicants} Applicants</Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">No applicants yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function JobDetailSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-32 bg-muted rounded-md"></div>
      <div className="space-y-2">
        <div className="h-8 w-2/3 bg-muted rounded-md"></div>
        <div className="h-4 w-1/2 bg-muted rounded-md"></div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <div className="h-4 w-20 bg-muted rounded-md mb-2"></div>
            <div className="h-8 w-12 bg-muted rounded-md"></div>
          </div>
        ))}
      </div>
      <div className="border rounded-lg p-4">
        <div className="h-6 w-40 bg-muted rounded-md mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted rounded-md"></div>
          <div className="h-4 w-full bg-muted rounded-md"></div>
          <div className="h-4 w-2/3 bg-muted rounded-md"></div>
        </div>
      </div>
    </div>
  )
}
