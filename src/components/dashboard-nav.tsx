"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Bell, FileText, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { name: "Knowledge Gaps", href: "/dashboard/knowledge-gaps", icon: FileText },
  { name: "Documents", href: "/dashboard/documents", icon: Bell },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-2 lg:space-x-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === link.href
              ? "bg-secondary text-primary-foreground"
              : "hover:bg-secondary/80",
            "justify-start"
          )}
        >
          <link.icon className="mr-2 h-4 w-4" />
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
