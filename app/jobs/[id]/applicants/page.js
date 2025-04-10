"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Search, User2 } from "lucide-react"
import { useJobs } from "@/components/jobs-provider"
import { Badge } from "@/components/ui/badge"

export default function JobApplicantsPage({ params }) {
  const router = useRouter()
  const { jobs } = useJobs()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock applicants data - in a real app, this would come from an API
  const [applicants, setApplicants] = useState([])

  useEffect(() => {
    if (jobs.length > 0) {
      const foundJob = jobs.find((j) => j.id === params.id)
      if (foundJob) {
        setJob(foundJob)

        // Generate mock applicants based on the job's applicant count
        if (foundJob.applicants > 0) {
          const mockApplicants = Array.from({ length: foundJob.applicants }, (_, i) => ({
            id: `applicant-${i + 1}`,
            name: `Applicant ${i + 1}`,
            email: `applicant${i + 1}@example.com`,
            stage: getRandomStage(),
            applied: getRandomTimeAgo(),
            rating: Math.floor(Math.random() * 5) + 1,
          }))
          setApplicants(mockApplicants)
        }
      } else {
        // Job not found, redirect to jobs page
        router.push("/jobs")
      }
      setLoading(false)
    }
  }, [params.id, router, jobs])

  if (loading) {
    return <div className="text-center py-10">Loading applicants...</div>
  }

  if (!job) {
    return <div className="text-center py-10">Job not found</div>
  }

  const stages = {
    Applied: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "Phone Screen": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    Interview: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Offer: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    Hired: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
    Rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
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

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Applicants for {job.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {job.applicants} {job.applicants === 1 ? "applicant" : "applicants"} total
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search applicants..."
              className="rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <Button size="sm" asChild>
            <Link href={`/jobs/${params.id}/applicants/new`}>
              <Plus className="h-4 w-4 mr-1" />
              Add Applicant
            </Link>
          </Button>
        </div>
      </div>

      {applicants.length === 0 ? (
        <div className="text-center py-10 border rounded-lg">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
            <User2 className="h-6 w-6" />
          </div>
          <p className="text-muted-foreground">No applicants found for this job.</p>
          <Button size="sm" className="mt-4" asChild>
            <Link href={`/jobs/${params.id}/applicants/new`}>Add Your First Applicant</Link>
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-medium text-sm">Name</th>
                  <th className="text-left p-3 font-medium text-sm">Applied</th>
                  <th className="text-left p-3 font-medium text-sm">Stage</th>
                  <th className="text-left p-3 font-medium text-sm">Rating</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant) => (
                  <tr key={applicant.id} className="border-t hover:bg-muted/50 cursor-pointer">
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{applicant.name}</div>
                        <div className="text-sm text-muted-foreground">{applicant.email}</div>
                      </div>
                    </td>
                    <td className="p-3 text-sm text-muted-foreground">{applicant.applied}</td>
                    <td className="p-3">
                      <Badge className={stages[applicant.stage]}>{applicant.stage}</Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${i < applicant.rating ? "text-yellow-500" : "text-gray-300"}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

// Helper functions for generating mock data
function getRandomStage() {
  const stages = ["Applied", "Phone Screen", "Interview", "Offer", "Hired", "Rejected"]
  return stages[Math.floor(Math.random() * stages.length)]
}

function getRandomTimeAgo() {
  const times = ["Just now", "1 hour ago", "2 hours ago", "Yesterday", "2 days ago", "1 week ago"]
  return times[Math.floor(Math.random() * times.length)]
}
