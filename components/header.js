import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="border-b h-14 flex items-center px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2 md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex items-center gap-4 ml-auto">
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="rounded-md border border-input bg-background px-3 py-1 pl-8 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
        <nav className="hidden md:flex gap-1">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">Dashboard</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/jobs">Jobs</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/applicants">Applicants</Link>
          </Button>
        </nav>
        <ModeToggle />
      </div>
    </header>
  );
}
