export default function Category() {
  const categories = [
    { id: 1, value: "all", label: "All" },
    { id: 2, value: "in-progress", label: "In Progress" },
    { id: 3, value: "pending", label: "Pending" },
    { id: 4, value: "over-due", label: "Overdue" },
    { id: 5, value: "done", label: "Done" },
  ];

  return (
    <section className="px-2 flex justify-between overflow-auto scrollbar-none">
      {categories.map((categoryItem) => (
        <div key={categoryItem.id} className="p-2">
          <input
            className="peer sr-only"
            type="radio"
            value={categoryItem.value}
            name="category"
            id={categoryItem.id}
            // onChange={handleCategoryChange}
            // checked={category === categoryItem.value}
          />

          <label className={`rounded-[999px] px-4  py-2 cursor-pointer text-[0.75rem] text-gray-900 whitespace-nowrap text-center font-bold transition-all duration-150 ease-in-out peer-checked:bg-blue-600 peer-checked:text-white peer-checked:font-medium peer-checked:shadow-[0_2px_6px_rgba(0,0,0,0.15)] peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2`}
            htmlFor={categoryItem.id}>
            {categoryItem.label}
          </label>
        </div>
      ))}
    </section>
  );
}
