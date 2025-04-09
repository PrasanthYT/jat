import Link from "next/link"
import { Users, Calendar, MapPin, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export function JobCard({ job, className, ...props }) {
  return (
    <Link href={`/jobs/${job.id}`} className={cn("block", className)} {...props}>
      <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold">{job.title}</h2>
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
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{job.applicants || 0} applicants</span>
            </div>
            {job.interviews !== undefined && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{job.interviews} interviews</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
    