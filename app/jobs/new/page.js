import { AddJobForm } from "@/components/add-job-form";

export const metadata = {
  title: "Add New Job | Job Application Tracker",
};

export default function NewJobPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add New Job</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Fill out the form below to add a new job position to your tracker.
        </p>
      </div>

      <div className="border rounded-lg p-4">
        <AddJobForm />
      </div>
    </div>
  );
}
