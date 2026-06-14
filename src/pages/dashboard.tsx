import React, { useState } from "react";
import { Link } from "wouter";
import { useListTasks, useGetTaskStats, useDeleteTask, getListTasksQueryKey, getGetTaskStatsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Trash2, 
  Edit, 
  AlertCircle,
  MoreVertical,
  Plus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { data: tasks, isLoading: tasksLoading } = useListTasks();
  const { data: stats, isLoading: statsLoading } = useGetTaskStats();
  const deleteTask = useDeleteTask();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleDelete = (id: number) => {
    deleteTask.mutate({ id }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListTasksQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetTaskStatsQueryKey() });
        toast({ title: "Task deleted successfully" });
      },
      onError: () => {
        toast({ title: "Failed to delete task", variant: "destructive" });
      }
    });
  };

  const filteredTasks = tasks?.filter(task => filterStatus === "all" || task.status === filterStatus) || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your tasks and productivity.</p>
        </div>
        <Link href="/tasks/new" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          Create Task
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-sm border-muted">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <Circle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">{stats?.total || 0}</div>}
          </CardContent>
        </Card>
        <Card className="shadow-sm border-muted">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">To Do</CardTitle>
            <Circle className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            {statsLoading ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">{stats?.todo || 0}</div>}
          </CardContent>
        </Card>
        <Card className="shadow-sm border-muted">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            {statsLoading ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">{stats?.in_progress || 0}</div>}
          </CardContent>
        </Card>
        <Card className="shadow-sm border-muted">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Done</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            {statsLoading ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">{stats?.done || 0}</div>}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-4">
          <Button variant={filterStatus === "all" ? "default" : "ghost"} size="sm" onClick={() => setFilterStatus("all")}>All</Button>
          <Button variant={filterStatus === "todo" ? "default" : "ghost"} size="sm" onClick={() => setFilterStatus("todo")}>To Do</Button>
          <Button variant={filterStatus === "in_progress" ? "default" : "ghost"} size="sm" onClick={() => setFilterStatus("in_progress")}>In Progress</Button>
          <Button variant={filterStatus === "done" ? "default" : "ghost"} size="sm" onClick={() => setFilterStatus("done")}>Done</Button>
        </div>

        {tasksLoading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <Skeleton key={i} className="h-20 w-full" />)}
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-card/50 border-dashed">
            <div className="text-muted-foreground mb-4">No tasks found.</div>
            <Link href="/tasks/new" className="text-primary hover:underline text-sm font-medium">Create your first task</Link>
          </div>
        ) : (
          <div className="grid gap-3">
            {filteredTasks.map(task => (
              <div key={task.id} className="group flex items-center justify-between p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all hover:border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="pt-1">
                    {task.status === "todo" && <Circle className="w-5 h-5 text-slate-400" />}
                    {task.status === "in_progress" && <Clock className="w-5 h-5 text-blue-500" />}
                    {task.status === "done" && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                  </div>
                  <div>
                    <Link href={`/tasks/${task.id}`} className="font-semibold text-lg hover:text-primary transition-colors cursor-pointer">
                      {task.title}
                    </Link>
                    <div className="flex items-center gap-3 mt-2">
                      {task.priority === "low" && <Badge variant="secondary" className="font-mono text-xs">Low</Badge>}
                      {task.priority === "medium" && <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 font-mono text-xs border-amber-200">Medium</Badge>}
                      {task.priority === "high" && <Badge variant="destructive" className="font-mono text-xs">High</Badge>}
                      <span className="text-xs text-muted-foreground font-mono">
                        {format(new Date(task.createdAt), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/tasks/${task.id}`} className="cursor-pointer flex items-center">
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer" onClick={() => handleDelete(task.id)}>
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
