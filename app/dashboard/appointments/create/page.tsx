"use client";

import React, { useRef, useState } from "react";
import Preview from "../components/Preview";
import PersonTag from "../components/PersonTag";
import Timeline from "../components/TimeLine";
import VerticalBoxGroup from "../components/VerticalBoxGroup";
import useVerticalMovement from "../hooks/useVerticalMovement";

type Person = {
  id: number;
  name: string;
};

export default function CreateAppointmentPage() {
  const [people] = useState<Person[]>([
    { id: 1, name: "Ali Balun" },
    { id: 2, name: "Veli Can" },
    { id: 3, name: "Ayşe Yıldız" },
  ]);
  const pieceHeight = 80 / 4; // 15dk = 20px
  const {
    containerRefs,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    boxes,
    preview,
  } = useVerticalMovement(pieceHeight);

  return (
    <div className="flex flex-row h-[600px] overflow-x-auto overflow-y-auto m-4 border border-gray-200 rounded-md select-none">
      <Timeline />

      <div className="flex flex-row gap-2 flex-shrink-0 relative">
        {people.map((person) => (
          <div key={person.id} className="flex flex-col w-[200px] relative">
            <PersonTag person={person} />

            <div
              ref={(el) => {
                containerRefs.current[person.id] = el;
              }}
              className="relative flex-1 bg-blue-50 hover:bg-blue-100 border border-gray-100 transition-all duration-200 cursor-pointer"
              onMouseDown={(e) => handleMouseDown(e, person.id)}
              onMouseMove={(e) => handleMouseMove(e, person.id)}
              onMouseUp={(e) => handleMouseUp(e, person.id)}
            >
              <VerticalBoxGroup boxes={boxes} personId={person.id} />

              {preview && preview.personId === person.id && (
                <Preview top={preview.top} height={preview.height} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
