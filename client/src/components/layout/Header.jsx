import { Search, Bell, Plus, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-10">
      <section className="flex items-center gap-2 w-56">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
          <CheckCircle2 className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
        </div>
        <span className="font-bold text-slate-900">TaskFlow</span>
      </section>

      <section className="flex-1 max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input type="text" placeholder="Search tasks..." className="w-full pl-9 pr-16 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-slate-400 border border-slate-200 rounded px-1.5 py-0.5">
            ⌘K
          </span>
        </div>
      </section>

      <section className="flex items-center gap-4">
        <button type="button" className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">
          <Plus className="w-4 h-4" />
          New Task
        </button>

        <button type="button" className="relative w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-50">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <button type="button" className="flex items-center gap-2">
          <img src="" alt="Ishaku Lawan" className="w-8 h-8 rounded-full object-cover" />
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium text-slate-800 leading-none">Alex Rivera</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </section>
    </header>
  );
}