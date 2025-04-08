import { BarChart3, Users, Calendar, BriefcaseIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Open Positions"
          value="5"
          icon={BriefcaseIcon}
          trend="+2"
          trendUp={true}
        />
        <DashboardCard
          title="Total Applicants"
          value="24"
          icon={Users}
          trend="+5"
          trendUp={true}
        />
        <DashboardCard
          title="Interviews"
          value="8"
          icon={Calendar}
          trend="+3"
          trendUp={true}
        />
        <DashboardCard
          title="Conversion Rate"
          value="12%"
          icon={BarChart3}
          trend="-2%"
          trendUp={false}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-start gap-2 pb-2 border-b last:border-0"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    New applicant for Frontend Developer
                  </p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-3">Upcoming Interviews</h2>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex items-start gap-2 pb-2 border-b last:border-0"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Interview with Sarah Johnson
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Tomorrow, 10:00 AM
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon: Icon, trend, trendUp }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      {trend && (
        <div
          className={`text-xs mt-2 ${
            trendUp ? "text-green-600" : "text-red-600"
          }`}
        >
          {trend} {trendUp ? "↑" : "↓"} from last month
        </div>
      )}
    </div>
  );
}
