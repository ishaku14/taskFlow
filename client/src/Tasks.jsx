import TaskCard from "./components/ui/TaskCard";
import Category from "./components/ui/Category";

export default function Tasks() {
  const tasks = [
    { 
      id: 1,
      title: "Audit authentication and refresh flows",
      description: "Investigate edge cases with sliding window expiration and update",
      dueDate: "2026-10-06",
      priority: "HIGH"
    },
    { 
      id: 2,
      title: "Finalize Q3 product roadmap presentation deck",
      description: "Consolidate key metrics, engineering capacity projections",
      dueDate: "2026-10-12",
      priority: "HIGH",
    },
    { 
      id: 3,
      title: "Client review meeting preparations - Ops flow",
      description: "Generate sprint summary report and prepare questions for weekly meeting",
      dueDate: "2026-11-02",
      priority: "LOW"
    },
    { 
      id: 4,
      title: "Update desing tokens in tailwind configuration",
      description: "Export latest color palletes and types sxales from Figma tokens studios",
      dueDate: "2026-10-31",
      priority: "MEDIUM"
    }
  ];

  return (
    <>
      {/* Task Header */}
      <div className="flex flex-col sm:flex-row sm:items-center mb-4 bg-white rounded-lgr">
        <div className="flex shrink-0 bg-white p-4 rounded-lg">
          <div className="flex gap-1">
            <h2 className="font-bold">Active Workstream</h2>
            <button className="bg-purple-300 text-[0.7rem] text-purple-900 font-bold px-4 py-1 rounded-3xl">
              5 tasks
            </button>
          </div>
        </div>

        <Category />
      </div>

      {/* Task card container */}
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard
            completed={task.completed}
            key={task.id}
            title={task.title}
            description={task.description}
            dueDate={task.dueDate}
            priority={task.priority}
          />
        ))}
      </div>
    </>
  );
}
