export default function SummaryCard({ icon, accentColor, title, value, description }) {
  return (
    <div className="flex flex-col bg-white p-4 rounded-2xl">
      <div className="flex justify-between items-center">
        <p className="text-gray-600 text-[0.7rem]">{title}</p>
        <div className={`bg-${accentColor}-100 p-1 rounded-lg`}>
          {/* <icon className={`text-${accentColor}-700 font-bold`} size={18} /> */}
          { icon }
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <h1 className="text-[2rem] font-bold">{value}</h1>
        <p className="text-[0.7rem] font-bold">{description}</p>
      </div>

      <p className="text-[0.7rem]">
        <span className={`text-${accentColor}-700`}>4 new</span> added this sprint
      </p>
    </div>
  );
}
