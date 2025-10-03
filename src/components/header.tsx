import { SidebarTrigger } from "@/components/ui/sidebar";
import Logo from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-4 shrink-0">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8" />
          <h1 className="text-xl font-bold tracking-tight">Abel AI</h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/knowledge-gaps">
            <LayoutGrid />
            <span className="sr-only">Go to Dashboard</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
