import { useState, useEffect } from "react";

type PaginationProps = {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const [prev, setPrev] = useState(1);
  const [current, setCurrent] = useState(2);
  const [next, setNext] = useState(3);
  const [last, setLast] = useState(10);

  useEffect(() => {
    setLast(pageCount);
  }, [pageCount]);

  const handlePrev = () => {
    if (prev > 1) {
      setPrev((p) => p - 1);
      setCurrent((p) => p - 1);
      setNext((p) => p - 1);
    }
    onPageChange(prev);
  };

  const handleNext = () => {
    if (next < last - 1) {
      setPrev((p) => p + 1);
      setCurrent((p) => p + 1);
      setNext((p) => p + 1);
    }
    onPageChange(next);
  };

  const handleCurrent = () => onPageChange(current);
  const handleLast = () => {
    setNext(last - 1);
    setCurrent(last - 2);
    setPrev(last - 3);
    onPageChange(last);
  };

  return (
    <div className="flex items-center gap-2 mt-4">
      {pageCount >= 1 && (
        <div
          className="w-[30px] h-[30px] bg-red-200 flex items-center justify-center cursor-pointer hover:bg-red-400"
          onClick={handlePrev}
        >
          {prev}
        </div>
      )}
      {pageCount >= 2 && (
        <div
          className="w-[30px] h-[30px] bg-red-200 flex items-center justify-center cursor-pointer hover:bg-red-400"
          onClick={handleCurrent}
        >
          {current}
        </div>
      )}
      {pageCount >= 3 && (
        <div
          className="w-[30px] h-[30px] bg-red-200 flex items-center justify-center cursor-pointer hover:bg-red-400"
          onClick={handleNext}
        >
          {next}
        </div>
      )}

      {next < last - 1 && <div>...</div>}
      {pageCount >= 4 && (
        <div
          className="w-[30px] h-[30px] bg-red-200 flex items-center justify-center cursor-pointer hover:bg-red-400"
          onClick={handleLast}
        >
          {last}
        </div>
      )}

      <select
        className="ml-4"
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
      >
        <option>5</option>
        <option>10</option>
        <option>15</option>
      </select>
    </div>
  );
}
