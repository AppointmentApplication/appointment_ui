import { BoxType } from "../hooks/useVerticalMovement";
import Box from "./box";

type VerticalBoxesProps = {
  boxes: BoxType[];
  personId: number;
};

export default function VerticalBoxGroup({ boxes, personId }: VerticalBoxesProps) {
  return (
    <>
      {boxes
        .filter((box) => box.personId === personId)
        .map((box) => (
          <Box key={box.id} box={box} />
        ))}
    </>
  );
}
