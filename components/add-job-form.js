"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export function AddJobForm({ onSuccess }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    salary: "",
    description: "",
    requirements: "",
    hiringManager: "",
  })

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
      if (!formData.title || !formData.department) {
        throw new Error("Job title and department are required")
      }

      // In a real app, you would send this to an API
      // For now, we'll simulate an API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate a unique ID (in a real app, this would come from the backend)
      const newJob = {
        ...formData,
        id: Date.now().toString(),
        posted: "Just now",
        applicants: 0,
        interviews: 0,
      }

      // Get existing jobs from localStorage or initialize empty array
      const existingJobs = JSON.parse(localStorage.getItem("jobs") || "[]")

      // Add new job to the array
      const updatedJobs = [newJob, ...existingJobs]

      // Save back to localStorage
      localStorage.setItem("jobs", JSON.stringify(updatedJobs))

      // Show success message
      toast({
        title: "Job Added",
        description: `${formData.title} has been added successfully.`,
      })

      // Reset form or redirect
      if (onSuccess) {
        onSuccess(newJob)
      } else {
        router.push("/jobs")
        router.refresh()
      }
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">
            Job Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">
            Department <span className="text-red-500">*</span>
          </Label>
          <Select name="department" onValueChange={(value) => handleSelectChange("department", value)} required>
            <SelectTrigger id="department">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Product">Product</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Remote, New York, NY"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Job Type</Label>
          <Select name="type" defaultValue="Full-time" onValueChange={(value) => handleSelectChange("type", value)}>
            <SelectTrigger id="type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="salary">Salary Range</Label>
          <Input
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="e.g. $80,000 - $100,000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hiringManager">Hiring Manager</Label>
          <Input
            id="hiringManager"
            name="hiringManager"
            value={formData.hiringManager}
            onChange={handleChange}
            placeholder="e.g. Jane Smith"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Job Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter job description..."
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="requirements">Requirements</Label>
        <Textarea
          id="requirements"
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          placeholder="Enter job requirements..."
          rows={4}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? "Adding..." : "Add Job"}
        </Button>
      </div>
    </form>
  )
}
