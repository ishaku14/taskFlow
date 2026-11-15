import { ListChecks, Calendar1, TriangleAlert, CheckCircle } from "lucide-react";
import SummaryCard from "./SummaryCard";
import { isDueToday, isOverdue } from "../../utils/taskStatus";

export default function Summary({ tasks }) {
  // Calculate summary values based on tasks
  const totalActive = tasks.length;
  const dueToday = tasks.filter(isDueToday).length;
  const overdue = tasks.filter(isOverdue).length;
  const weeklyVelocity = tasks.filter(task => task.status === "COMPLETED").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <SummaryCard
        title={"TOTAL ACTIVE"}
        value={totalActive}
        description={"tasks assigned"}
        accentColor={"purple"}
        icon={<ListChecks className="text-purple-700 font-bold" size={18} />}
      />

      <SummaryCard
        title={"DUE TODAY"}
        value={dueToday}
        description={"Pending action"}
        accentColor={"blue"}
        icon={<Calendar1 className="text-blue-700 font-bold" size={18} />}
      />

      <SummaryCard
        title={"OVERDUE"}
        value={overdue}
        description={"Requires Attention"}
        icon={<TriangleAlert className="text-red-700 font-bold" size={18} />}
        accentColor={"red"}
      />

      <SummaryCard
        title={"WEEKLY VELOCITY"}
        value={weeklyVelocity}
        description={"Completed"}
        accentColor={"blue"}
        icon={<CheckCircle className="text-blue-700 font-bold" size={18} />}
      />
    </div>
  );
}
