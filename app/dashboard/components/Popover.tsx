import { ReactNode } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

type PopoverProps = {
  children?: ReactNode;
  isOpened: boolean;
  onClose: () => void;
};

export default function Popover({ children, isOpened, onClose }: PopoverProps) {
  if (!isOpened) return null;

  return (
    <>
      <div
        className="bg-gray-200/20 w-full h-full absolute inset-0 z-[99] backdrop-blur-xs"
        onClick={onClose}
      ></div>

      <div className="bg-white p-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] rounded-lg shadow-lg">
        <div
          className="absolute right-[10px] top-[10px] cursor-pointer"
          onClick={onClose}
        >
          <IoCloseCircleOutline size={20} />
        </div>
        {children}
      </div>
    </>
  );
}
