import { ListChecks, Calendar1, TriangleAlert, CheckCircle } from "lucide-react";
import SummaryCard from "./SummaryCard";

export default function () {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <SummaryCard
        title={"TOTAL ACTIVE"}
        value={28}
        description={"tasks assigned"}
        accentColor={"purple"}
        icon={<ListChecks className="text-purple-700 font-bold" size={18} />}
      />

      <SummaryCard
        title={"DUE TODAY"}
        value={4}
        description={"Pending action"}
        accentColor={"blue"}
        icon={<Calendar1 className="text-blue-700 font-bold" size={18} />}
      />

      <SummaryCard
        title={"OVERDUE"}
        value={1}
        description={"Requires Attention"}
        icon={<TriangleAlert className="text-red-700 font-bold" size={18} />}
        accentColor={"red"}
      />

      <SummaryCard
        title={"WEEKLY VELOCITY"}
        value={19}
        description={"Completed"}
        accentColor={"blue"}
        icon={<CheckCircle className="text-blue-700 font-bold" size={18} />}
      />
    </div>
  );
}
