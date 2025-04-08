import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function ApplicantsPage() {
  // This would normally come from an API or local storage
  const applicants = [
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      job: "Frontend Developer",
      stage: "Interview",
      applied: "3 days ago",
      rating: 4,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      job: "UX Designer",
      stage: "Phone Screen",
      applied: "1 week ago",
      rating: 5,
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael@example.com",
      job: "Frontend Developer",
      stage: "Applied",
      applied: "2 days ago",
      rating: 3,
    },
  ];

  const stages = {
    Applied: "bg-blue-100 text-blue-800",
    "Phone Screen": "bg-purple-100 text-purple-800",
    Interview: "bg-green-100 text-green-800",
    Offer: "bg-yellow-100 text-yellow-800",
    Hired: "bg-emerald-100 text-emerald-800",
    Rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">All Applicants</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search applicants..."
              className="rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <Button size="sm">Filter</Button>
        </div>
      </div>

      {applicants.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No applicants found.</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-medium text-sm">Name</th>
                  <th className="text-left p-3 font-medium text-sm">Job</th>
                  <th className="text-left p-3 font-medium text-sm">Applied</th>
                  <th className="text-left p-3 font-medium text-sm">Stage</th>
                  <th className="text-left p-3 font-medium text-sm">Rating</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant) => (
                  <tr
                    key={applicant.id}
                    className="border-t hover:bg-muted/50 cursor-pointer"
                  >
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{applicant.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {applicant.email}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">{applicant.job}</td>
                    <td className="p-3 text-sm text-muted-foreground">
                      {applicant.applied}
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          stages[applicant.stage]
                        }`}
                      >
                        {applicant.stage}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < applicant.rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
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
  );
}
