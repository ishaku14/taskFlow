import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { STATUS_CONFIG, STATUS_ORDER } from "../../utils/taskStatus";

export default function StatusBage({ status, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function select(newStatus) {
    setOpen(false);
    if (newStatus !== status) onChange(newStatus);
  }

  const current = STATUS_CONFIG[status];

  return (
    <div ref={ref} className="relative inline-block">
      <button type="button" onClick={() => setOpen(o => !o)} className={`flex items-end gap-1 rounded-full px-2 py-0.5 text-xs ${current.classes}`}>
        {current.label} <ChevronDown aria-hidden="true" size={12} />
      </button>

      {open && (
        <ul role="listbox" className="absolute left-0 top-full z-10 mt-1 w-36 rounded-lg border border-gray-200 bg-white py-1 shadow-md">
          {STATUS_ORDER.map(key => (
            <li key={key} role="option" aria-selected={key === status}>
              <button type="button" onClick={() => select(key)} className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50">
                {STATUS_CONFIG[key].label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}