export default function TaskCard({ title, description, dueDate, priority, completed }) {
  return (
    <section className={`bg-white rounded-lg p-4 flex gap-4 transition-opacity ${
    completed ? 'opacity-60' : ''
  }`}>
      <div>
        <label className="cursor-pointer select-none">
          <input type="checkbox" className="peer sr-only" checked={completed} />
          <span className="w-5 h-5 border border-gray-300 rounded-full flex items-center justify-center peer-checked:bg-blue-800 peer-checked:border-blue-800 transition-colors duration-200 [&>svg]:hidden peer-checked:[&>svg]:block peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </span>
        </label>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap gap-2 text-[0.6rem] font-bold">
          <div className="bg-orange-200 px-2  rounded-lg py-1">
            Engineering Sprint
          </div>
          <div className="bg-red-200 px-2 rounded-lg py-1">Overdue</div>
          <p className="text-red-800 px-2 rounded-lg py-1">
            {priority}
          </p>
        </div>
        <p className={`text-[0.9rem] font-bold ${completed ? 'line-through' : ''}`}>
          {title}
        </p>
        <p className={`text-[0.8rem] ${completed ? 'line-through' : ''}`}>
          {description}
        </p>
      </div>

      <div className="flex shrink-0 items-center">
        <p className="text-red-700 text-[0.7rem] font-bold whitespace-nowrap">
          {dueDate}
        </p>
      </div>
    </section>
  );
}
