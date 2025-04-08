import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      </div>

      <div className="border rounded-lg">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Application Settings</h2>
          <p className="text-sm text-muted-foreground">
            Manage your application preferences and configurations.
          </p>
        </div>
        <Separator />
        <div className="p-4 space-y-4">
          <div className="grid gap-2">
            <label htmlFor="company-name" className="text-sm font-medium">
              Company Name
            </label>
            <input
              id="company-name"
              type="text"
              placeholder="Your Company"
              className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="email-notifications"
              className="text-sm font-medium"
            >
              Email Notifications
            </label>
            <select
              id="email-notifications"
              className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="all">All notifications</option>
              <option value="important">Important only</option>
              <option value="none">None</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="dark-mode"
              type="checkbox"
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="dark-mode" className="text-sm font-medium">
              Use system theme
            </label>
          </div>
        </div>
        <Separator />
        <div className="p-4 flex justify-end gap-2">
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button size="sm">Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
