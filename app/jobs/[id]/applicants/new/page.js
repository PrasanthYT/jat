"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useJobs } from "@/components/jobs-provider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export default function NewApplicantPage({ params }) {
  const router = useRouter()
  const { jobs, updateJob } = useJobs()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    coverLetter: "",
    stage: "Applied",
    notes: "",
  })

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form
      if (!formData.name || !formData.email) {
        throw new Error("Name and email are required")
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // In a real app, you would add the applicant to a database
      // For now, we'll just increment the applicant count on the job
      const updatedJob = {
        ...job,
        applicants: (job.applicants || 0) + 1,
      }

      // Update the job
      updateJob(updatedJob)

      // Show success message
      toast({
        title: "Applicant Added",
        description: `${formData.name} has been added as an applicant for ${job.title}.`,
      })

      // Redirect back to job details
      router.push(`/jobs/${params.id}/applicants`)
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
          <Link href={`/jobs/${params.id}/applicants`}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Applicants
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add Applicant</h1>
        <p className="text-sm text-muted-foreground mt-1">Add a new applicant for {job.title}</p>
      </div>

      <div className="border rounded-lg p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. John Smith"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. john@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. (555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stage">Application Stage</Label>
              <Select name="stage" defaultValue="Applied" onValueChange={(value) => handleSelectChange("stage", value)}>
                <SelectTrigger id="stage">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Phone Screen">Phone Screen</SelectItem>
                  <SelectItem value="Interview">Interview</SelectItem>
                  <SelectItem value="Offer">Offer</SelectItem>
                  <SelectItem value="Hired">Hired</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resume">Resume URL</Label>
              <Input
                id="resume"
                name="resume"
                value={formData.resume}
                onChange={handleChange}
                placeholder="e.g. https://example.com/resume.pdf"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <Textarea
              id="coverLetter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              placeholder="Enter cover letter..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter any notes about this applicant..."
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? "Adding..." : "Add Applicant"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
