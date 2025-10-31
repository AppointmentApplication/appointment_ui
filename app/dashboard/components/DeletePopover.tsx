"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import Popover from "./Popover";

type DeletePopoverProps = {
  message?: string;
  onConfirm?: () => void;
};

export type DeletePopoverHandle = {
  open: (id: number, message?: string, onConfirm?: () => void) => void;
  close: () => void;
};

const DeletePopover = forwardRef<DeletePopoverHandle, DeletePopoverProps>(
  ({ message = "Are you sure you want to delete?", onConfirm }, ref) => {
    const [isOpened, setIsOpened] = useState(false);
    const [currentMessage, setCurrentMessage] = useState(message);
    const [currentConfirm, setCurrentConfirm] = useState<
      (() => void) | undefined
    >(onConfirm);

    useImperativeHandle(ref, () => ({
      open: (id: number, msg?: string, confirmCb?: () => void) => {
        console.log(`userId: ${id}`);
        if (msg) setCurrentMessage(msg);
        if (confirmCb) setCurrentConfirm(() => confirmCb);
        setIsOpened(true);
      },
      close: () => setIsOpened(false),
    }));

    const handleConfirm = () => {
      currentConfirm?.();
      setIsOpened(false);
    };

    return (
      <Popover isOpened={isOpened} onClose={() => setIsOpened(false)}>
        <div className="space-y-4">
          <p>{currentMessage}</p>
          <div className="flex justify-end gap-4">
            <button
              className="px-3 py-1.5 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => setIsOpened(false)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-500"
              onClick={handleConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </Popover>
    );
  }
);

export default DeletePopover;
