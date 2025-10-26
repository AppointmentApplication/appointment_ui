"use client";

import React, { useRef, useState } from "react";

type Box = {
  id: number;
  top: number;
  height: number;
  personId: number;
  startTime: Date;
  endTime: Date;
};

type Person = {
  id: number;
  name: string;
};

export default function Page() {
  const [people] = useState<Person[]>([
    { id: 1, name: "Ali Balun" },
    { id: 2, name: "Veli Can" },
    { id: 3, name: "Ayşe Yıldız" },
  ]);

  const [boxes, setBoxes] = useState<Box[]>([]);
  const [preview, setPreview] = useState<Box | null>(null);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const startYRef = useRef<number | null>(null);
  const containerRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const pieceHeight = 80 / 4; // 15dk = 20px

  const getOffsetY = (clientY: number, personId: number) => {
    const container = containerRefs.current[personId];

    if (!container) return 0;

    const rect = container.getBoundingClientRect();

    return clientY - rect.top;
  };

  const roundToPiece = (value: number) =>
    Math.floor(value / pieceHeight) * pieceHeight;

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    personId: number
  ) => {
    const target = e.target as HTMLElement;
    const container = containerRefs.current[personId];
    if (!container || target !== container) return;

    const offsetY = getOffsetY(e.clientY, personId);
    startYRef.current = offsetY;
    setPreview({
      top: roundToPiece(offsetY),
      height: 0,
      id: 0,
      personId,
      startTime: startDate,
      endTime: endDate,
    });
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    personId: number
  ) => {
    if (startYRef.current === null) return;

    const offsetY = getOffsetY(e.clientY, personId);
    const top = roundToPiece(Math.min(startYRef.current, offsetY));
    const bottom = roundToPiece(Math.max(startYRef.current, offsetY));
    const height = bottom - top;

    const startTime = top / pieceHeight;
    const startHour = 9 + (startTime * 20) / 60;
    const startMinute = (startTime * 20) % 60;
    const endHour = 9 + ((bottom / pieceHeight) * 20) / 60;
    const endMinute = ((bottom / pieceHeight) * 20) % 60;

    setStartDate(new Date(2025, 10, 26, startHour, startMinute));
    setEndDate(new Date(2025, 10, 26, endHour, endMinute));
    setPreview({
      top,
      height,
      id: 0,
      personId,
      startTime: startDate,
      endTime: endDate,
    });
  };

  const handleMouseUp = (
    e: React.MouseEvent<HTMLDivElement>,
    personId: number
  ) => {
    if (!preview || preview.personId !== personId) return;

    if (preview.height > 0) {
      setBoxes((prev) => [...prev, { ...preview, id: Date.now() }]);
    }

    setPreview(null);
    startYRef.current = null;
  };

  return (
    <div className="flex flex-row h-[600px] overflow-x-auto overflow-y-auto m-4 border border-gray-200 rounded-md select-none">
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

      <div className="flex flex-row gap-2 flex-shrink-0 relative">
        {people.map((person) => (
          <div key={person.id} className="flex flex-col w-[200px] relative">
            <div className="h-[40px] bg-blue-200 flex items-center justify-center font-semibold border-b border-gray-200">
              {person.name}
            </div>

            <div
              ref={(el) => {
                containerRefs.current[person.id] = el;
              }}
              className="relative flex-1 bg-blue-50 hover:bg-blue-100 border border-gray-100 transition-all duration-200 cursor-pointer"
              onMouseDown={(e) => handleMouseDown(e, person.id)}
              onMouseMove={(e) => handleMouseMove(e, person.id)}
              onMouseUp={(e) => handleMouseUp(e, person.id)}
            >
              {boxes
                .filter((box) => box.personId === person.id)
                .map((box) => (
                  <div
                    key={box.id}
                    className="absolute text-sm left-0 right-0 bg-blue-400 bg-opacity-50 rounded-md mx-2 pointer-events-none flex items-center justify-center"
                    style={{ top: box.top, height: box.height }}
                  >
                    {box.startTime.toLocaleTimeString()} -{" "}
                    {box.endTime.toLocaleTimeString()}
                  </div>
                ))}

              {preview && preview.personId === person.id && (
                <div
                  className="absolute left-0 right-0 bg-blue-200 bg-opacity-50 rounded-md mx-2 pointer-events-none"
                  style={{ top: preview.top, height: preview.height }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
