import { useRef, useState } from "react";

export type BoxType = {
    id: number;
    top: number;
    height: number;
    personId: number;
    startTime: Date;
    endTime: Date;
};

export default function useVerticalMovement(pieceHeight: number) {
    const containerRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
    const startYRef = useRef<number | null>(null);
    const [preview, setPreview] = useState<BoxType | null>(null);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [boxes, setBoxes] = useState<BoxType[]>([]);


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

    return {
        containerRefs,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        preview,
        boxes,
    };
}