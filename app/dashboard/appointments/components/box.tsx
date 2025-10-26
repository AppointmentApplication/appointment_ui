import type { BoxType } from "../create/page";

type BoxProps = {
  box: BoxType;
};

export default function Box({ box }: BoxProps) {
  return (
    <div
      key={box.id}
      className="absolute text-sm left-0 right-0 bg-blue-400 bg-opacity-50 rounded-md mx-2 pointer-events-none flex items-center justify-center"
      style={{ top: box.top, height: box.height }}
    >
      {box.startTime.toLocaleTimeString()}
      {box.endTime.toLocaleTimeString()}
    </div>
  );
}
