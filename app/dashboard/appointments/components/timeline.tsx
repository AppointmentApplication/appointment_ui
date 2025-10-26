export default function Timeline() {
  return (
    <div className="flex flex-col flex-shrink-0 w-[80px] bg-gray-50 border-r border-gray-200">
      <div className="h-[40px] flex items-center justify-center font-semibold text-gray-700 text-sm border-b border-gray-200">
        #
      </div>
      {[
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
      ].map((time) => (
        <div
          key={time}
          className="h-[80px] flex items-center justify-center text-sm text-gray-600"
        >
          {time}
        </div>
      ))}
    </div>
  );
}
