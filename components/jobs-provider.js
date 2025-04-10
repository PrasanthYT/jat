"use client"

import { createContext, useContext, useEffect, useState } from "react"

// Sample data for initial state
const sampleJobs = [
  {
    id: "1",
    title: "Frontend Developer",
    department: "Engineering",
    hiringManager: "Jane Smith",
    applicants: 3,
    interviews: 2,
    location: "Remote",
    posted: "2 weeks ago",
    type: "Full-time",
    salary: "$80,000 - $100,000",
  },
  {
    id: "2",
    title: "Product Manager",
    department: "Product",
    hiringManager: "John Doe",
    applicants: 0,
    interviews: 0,
    location: "New York, NY",
    posted: "3 days ago",
    type: "Full-time",
    salary: "$100,000 - $120,000",
  },
  {
    id: "3",
    title: "UX Designer",
    department: "Design",
    hiringManager: "Alice Johnson",
    applicants: 5,
    interviews: 3,
    location: "San Francisco, CA",
    posted: "1 month ago",
    type: "Full-time",
    salary: "$90,000 - $110,000",
  },
]

const JobsContext = createContext({
  jobs: [],
  loading: true,
  error: null,
  addJob: () => {},
  updateJob: () => {},
  deleteJob: () => {},
})

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Load jobs from localStorage or use sample data if none exist
    try {
      const storedJobs = localStorage.getItem("jobs")
      if (storedJobs) {
        const parsedJobs = JSON.parse(storedJobs)
        setJobs(parsedJobs)
      } else {
        // Initialize with sample data
        setJobs(sampleJobs)
        localStorage.setItem("jobs", JSON.stringify(sampleJobs))
      }
    } catch (err) {
      console.error("Error loading jobs:", err)
      setError("Failed to load jobs. Please try again.")
      // Fallback to sample data
      setJobs(sampleJobs)
    } finally {
      setLoading(false)
    }
  }, [])

  const addJob = (newJob) => {
    try {
      const updatedJobs = [newJob, ...jobs]
      setJobs(updatedJobs)
      localStorage.setItem("jobs", JSON.stringify(updatedJobs))
      return true
    } catch (err) {
      console.error("Error adding job:", err)
      setError("Failed to add job. Please try again.")
      return false
    }
  }

  const updateJob = (updatedJob) => {
    try {
      const updatedJobs = jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
      setJobs(updatedJobs)
      localStorage.setItem("jobs", JSON.stringify(updatedJobs))
      return true
    } catch (err) {
      console.error("Error updating job:", err)
      setError("Failed to update job. Please try again.")
      return false
    }
  }

  const deleteJob = (jobId) => {
    try {
      const updatedJobs = jobs.filter((job) => job.id !== jobId)
      setJobs(updatedJobs)
      localStorage.setItem("jobs", JSON.stringify(updatedJobs))
      return true
    } catch (err) {
      console.error("Error deleting job:", err)
      setError("Failed to delete job. Please try again.")
      return false
    }
  }

  return (
    <JobsContext.Provider value={{ jobs, loading, error, addJob, updateJob, deleteJob }}>
      {children}
    </JobsContext.Provider>
  )
}

export function useJobs() {
  const context = useContext(JobsContext)
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobsProvider")
  }
  return context
}
