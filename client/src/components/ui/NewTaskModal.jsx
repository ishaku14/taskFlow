import { X } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../../schemas/taskSchema";
import { api } from '../../api/axios';

const priorities = ['Low', 'Medium', 'High']
const labelClass = 'mb-1.5 block text-sm font-medium text-slate-600'
const fieldClass =
  'w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'

export default function NewTaskModal({ onClose, setTasks }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: zodResolver(taskSchema)});

  const onSubmit = async(data) => {
    // Send to server
    console.log(data)
    try {
      const newTask = await api.post("task", data);
      setTasks(current => [newTask.data, ...current]);
      onClose()
    } catch (err) {
      if (err.response) {
        setError("root.serverError", {
          message: err.response?.data.err || "Task creation failed. Try again"
        });
      } else {
        setError("root.serverError", {
          message: "Could not reach server. Try again."
        });
      }
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div onClick={handleBackdropClick} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div role="dialog" aria-modal="true" aria-labelledby="new-task-heading" className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-5 shadow-xl sm:p-6">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 id="new-task-heading" className="text-lg font-bold text-slate-900">
              New task
            </h2>
            <p className="mt-0.5 text-sm text-slate-500">Add the details for your new task.</p>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <div>
            <label htmlFor="task-title" className={labelClass}>Title</label>
            <input {...register("title")} required id="task-title" type="text" placeholder="Audit authentication flows" className={fieldClass} />
            {errors.title && <p className="text-red-700 text-[0.8rem]">{errors.title.message}</p>}
          </div>

          <div>
            <label htmlFor="task-description" className={labelClass}>Description</label>
            <textarea {...register("description")} id="task-description" rows={3} placeholder="Add any notes or context"className={`${fieldClass} resize-none`} />
            {errors.description && <p className="text-red-700 text-[0.8rem]">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* <div>
              <label htmlFor="task-project" className={labelClass}>Project</label>
              <select id="task-project" className={fieldClass}>
                <option>Engineering Sprint</option>
                <option>Product Launch</option>
                <option>Design System</option>
                <option>Client Ops</option>
              </select>
            </div> */}
            <div>
              <label htmlFor="task-due" className={labelClass}>Due date</label>
              <input {...register("dueDate")} required id="task-due" type="date" className={fieldClass} />
              {errors.dueDate && <p className="text-red-700 text-[0.8rem]">{errors.dueDate.message}</p>}
            </div>
          </div>

          <fieldset>
            <legend className={labelClass}>Priority</legend>
            <div className="grid grid-cols-3 gap-2">
              {priorities.map((priority) => (
                <label key={priority} className="cursor-pointer">
                  <input
                    {...register("priority")}
                    type="radio"
                    name="priority"
                    value={priority.toUpperCase()}
                    defaultChecked={priority === 'Medium'}
                    className="peer sr-only"
                  />
                  <span className="block rounded-lg border border-slate-200 py-2 text-center text-sm font-medium text-slate-600 transition-colors peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 peer-focus-visible:ring-offset-2">
                    {priority}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          {errors.root?.serverError && (
            <p className="text-red-700 text-[0.8rem]">{errors.root.serverError.message}</p>
          )}

          {/* Footer */}
          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700">
              {isSubmitting ? "Creating task" : "Create task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}