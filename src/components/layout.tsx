import React from "react";
import { Link, useLocation } from "wouter";
import { CheckSquare, LayoutDashboard, PlusCircle } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="flex min-h-screen w-full bg-background flex-col md:flex-row">
      <aside className="w-full md:w-64 border-r bg-card/50 flex-shrink-0 flex flex-col">
        <div className="p-4 border-b flex items-center gap-2">
          <CheckSquare className="w-6 h-6 text-primary" />
          <span className="font-semibold text-lg tracking-tight font-mono">Task.io</span>
        </div>
        <nav className="p-4 space-y-2 flex-grow">
          <Link
            href="/"
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
              location === "/" 
                ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/tasks/new"
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
              location === "/tasks/new" 
                ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Task</span>
          </Link>
        </nav>
      </aside>
      <main className="flex-grow p-6 md:p-10 overflow-auto">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
