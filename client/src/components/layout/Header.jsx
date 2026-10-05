import { Search, Bell, Plus, ChevronDown, CheckCircle2, MenuIcon } from 'lucide-react';

export default function Header({ onMenuClick, onNewTaskClick }) {
  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10">
      <section className="flex items-center gap-2 lg:w-56">
        <button type="button" onClick={onMenuClick} aria-label="open-menu" className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer">
          <MenuIcon />
        </button>
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
          <CheckCircle2 className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
        </div>
        <span className="font-bold text-slate-900">TaskFlow</span>
      </section>

      <section className="hidden md:block flex-1 max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input type="text" placeholder="Search tasks..." className="w-full pl-9 pr-16 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-slate-400 border border-slate-200 rounded px-1.5 py-0.5">
            ⌘K
          </span>
        </div>
      </section>

      <section className="flex items-center gap-2 sm:gap-4">
        <button type="button" onClick={onNewTaskClick} aria-label="New task" className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 cursor-pointer transition-colors">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Task</span>
        </button>

        <button type="button" className="relative w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-50">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <button type="button" className="flex items-center gap-2">
          <img src="https://i.pravatar.cc/150?img=3" alt="Ishaku Lawan" className="w-8 h-8 rounded-full object-cover" />
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium text-slate-800 leading-none">Alex Rivera</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
        </button>
      </section>
    </header>
  );
}