import { FILTERS } from "../../utils/taskStatus";

export default function Category({ setActiveFilter, activeFilter, handleFilterChange }) {

  return (
    <section className="px-2 flex justify-between overflow-auto scrollbar-none">
      {FILTERS.map((categoryItem) => (
        <div key={categoryItem.key} className="p-2">
          <input
            className="peer sr-only"
            type="radio"
            value={categoryItem.key}
            name="category"
            id={categoryItem.key}
            onChange={handleFilterChange}
            checked={activeFilter === categoryItem.key}
          />

          <label className={`rounded-[999px] px-4  py-2 cursor-pointer text-[0.75rem] text-gray-900 whitespace-nowrap text-center font-bold transition-all duration-150 ease-in-out peer-checked:bg-blue-600 peer-checked:text-white peer-checked:font-medium peer-checked:shadow-[0_2px_6px_rgba(0,0,0,0.15)] peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2`}
            htmlFor={categoryItem.key}>
            {categoryItem.label}
          </label>
        </div>
      ))}
    </section>
  );
}
