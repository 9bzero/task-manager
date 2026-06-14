import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, tasksTable, insertTaskSchema, updateTaskSchema } from "@workspace/db";

const router: IRouter = Router();

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await db.select().from(tasksTable).orderBy(tasksTable.createdAt);
    res.json(tasks);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch tasks");
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

router.get("/tasks/stats", async (req, res) => {
  try {
    const tasks = await db.select().from(tasksTable);
    const total = tasks.length;
    const todo = tasks.filter((t) => t.status === "todo").length;
    const in_progress = tasks.filter((t) => t.status === "in_progress").length;
    const done = tasks.filter((t) => t.status === "done").length;
    const high_priority = tasks.filter((t) => t.priority === "high").length;
    res.json({ total, todo, in_progress, done, high_priority });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch stats");
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

router.get("/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [task] = await db.select().from(tasksTable).where(eq(tasksTable.id, id));
    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.json(task);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch task");
    res.status(500).json({ error: "Failed to fetch task" });
  }
});

router.post("/tasks", async (req, res) => {
  try {
    const parsed = insertTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid data", details: parsed.error.issues });
      return;
    }
    const [task] = await db.insert(tasksTable).values(parsed.data).returning();
    res.status(201).json(task);
  } catch (err) {
    req.log.error({ err }, "Failed to create task");
    res.status(500).json({ error: "Failed to create task" });
  }
});

router.put("/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const parsed = updateTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid data", details: parsed.error.issues });
      return;
    }
    const [task] = await db
      .update(tasksTable)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(tasksTable.id, id))
      .returning();
    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.json(task);
  } catch (err) {
    req.log.error({ err }, "Failed to update task");
    res.status(500).json({ error: "Failed to update task" });
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const [task] = await db
      .delete(tasksTable)
      .where(eq(tasksTable.id, id))
      .returning();
    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to delete task");
    res.status(500).json({ error: "Failed to delete task" });
  }
});

export default router;
