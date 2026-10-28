import { ListChecks, Sun, CalendarDays, Star, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api/axios";

const taskLinks = [
  { label: "All Tasks", icon: ListChecks, count: 24, active: true },
  { label: "Today", icon: Sun, count: 6 },
  { label: "Upcoming", icon: CalendarDays, count: 12 },
  { label: "Important", icon: Star, count: 3 },
];

const projects = [
  { label: "Product Launch", color: "bg-indigo-500" },
  { label: "Design System", color: "bg-emerald-500" },
  { label: "Engineering Sprint", color: "bg-amber-500" },
  { label: "Client Ops", color: "bg-rose-500" },
];


export default function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // const res = await api.post("/auth/logout");
      logout();
      navigate("/login");
      console.log(res);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-x-0 top-16 bottom-0 z-30 bg-black/40 lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside className={`w-56 shrink-0 border-r border-slate-100 bg-white flex flex-col justify-between fixed top-16 bottom-0 left-0 z-40 -translate-x-full transition-transform lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="px-4 py-6 overflow-y-auto">
          {/* Tasks section */}
          <p className="text-xs font-semibold text-slate-400 tracking-wide px-2 mb-2">
            TASKS
          </p>
          <nav className="space-y-1">
            {taskLinks.map(({ label, icon: Icon, count, active }) => (
              <button
                key={label}
                type="button"
                onClick={onClose}
                className={`w-full flex cursor-pointer items-center justify-between px-2.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-indigo-600 text-white"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {label}
                </span>
                <span
                  className={`text-xs font-semibold px-1.5 rounded ${
                    active ? "bg-white/20" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            ))}
          </nav>

          {/* Projects section */}
          <div className="flex items-center justify-between px-2 mt-8 mb-2">
            <p className="text-xs font-semibold text-slate-400 tracking-wide">
              PROJECTS
            </p>
            <button
              type="button"
              className="text-slate-400 hover:text-slate-600"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <nav className="space-y-1">
            {projects.map(({ label, color }) => (
              <button
                key={label}
                type="button"
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <span className={`w-2 h-2 rounded-full ${color}`} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Workspace footer */}
        <div className="border-t border-slate-100 px-4 py-4 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-800 text-white text-xs font-semibold flex items-center justify-center">
            LO
          </div>
          <button 
            type="button"
            onClick={handleLogout}
            className="leading-tight cursor-pointer text-[0.8rem] text-slate-600 font-medium hover:text-red-700 transition-colors">
           Logout
          </button>
        </div>
      </aside>
    </>
  );
}
