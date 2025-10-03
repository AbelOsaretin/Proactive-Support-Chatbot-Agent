import { DashboardNav } from "@/components/dashboard-nav";
import { Button } from "@/components/ui/button";
import { Bell, Home } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/icons/logo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-10">
        <div className="flex items-center gap-2">
            <Logo className="w-8 h-8"/>
            <h1 className="text-xl font-bold tracking-tight text-foreground/90">Abel AI / Internal</h1>
        </div>

        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 sm:flex-initial">
            <DashboardNav />
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href="/">
              <Home className="h-5 w-5"/>
              <span className="sr-only">Go to Chat</span>
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}
