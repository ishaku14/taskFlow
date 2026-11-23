import TaskCard from "./components/ui/TaskCard";
import Category from "./components/ui/Category";

export default function Tasks({ tasks, onStatusChange, setActiveFilter, activeFilter, handleFilterChange }) {
  return (
    <>
      {/* Task Header */}
      <div className="flex flex-col sm:flex-row sm:items-center mb-4 bg-white rounded-lgr">
        <div className="flex shrink-0 bg-white p-4 rounded-lg">
          <div className="flex gap-1">
            <h2 className="font-bold">Active Workstream</h2>
            <button className="bg-purple-300 text-[0.7rem] text-purple-900 font-bold px-4 py-1 rounded-3xl">
              {tasks.length}
            </button>
          </div>
        </div>

        <Category activeFilter={activeFilter} setActiveFilter={setActiveFilter} handleFilterChange={handleFilterChange} />
      </div>

      {/* Task card container */}
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} />
        ))}
      </div>
    </>
  );
}
