import { useState, useEffect } from "react";

type PaginationProps = {
  pageCount: number;
  currentPage: number;
  totalItemCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export default function Pagination({
  pageCount,
  currentPage,
  totalItemCount,
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
    <div className="flex items-center gap-2 mt-4 justify-between">
      <div className="text-sm text-neutral-500 mx-4">Showing: {(totalItemCount / pageCount) * currentPage} of {totalItemCount}</div>
      <div className="flex items-center gap-2 ">
        {pageCount >= 1 && (
          <div
            className={`w-[30px] h-[30px] border border-neutral-400 rounded-sm flex items-center justify-center cursor-pointer hover:bg-neutral-400 hover:text-white ${
              currentPage === Number(prev) ? "bg-neutral-400 text-white" : ""
            }`}
            onClick={handlePrev}
          >
            {prev}
          </div>
        )}
        {pageCount >= 2 && (
          <div
            className={`w-[30px] h-[30px] border border-neutral-400 rounded-sm flex items-center justify-center cursor-pointer hover:bg-neutral-400 hover:text-white ${
              currentPage === Number(current) ? "bg-neutral-400 text-white" : ""
            }`}
            onClick={handleCurrent}
          >
            {current}
          </div>
        )}
        {pageCount >= 3 && (
          <div
            className={`w-[30px] h-[30px] border border-neutral-400 rounded-sm flex items-center justify-center cursor-pointer hover:bg-neutral-400 hover:text-white ${
              currentPage === Number(next) ? "bg-neutral-400 text-white" : ""
            }`}
            onClick={handleNext}
          >
            {next}
          </div>
        )}
        {next < last - 1 && <div>...</div>}
        {pageCount >= 4 && (
          <div
            className={`w-[30px] h-[30px] border border-neutral-400 rounded-sm flex items-center justify-center cursor-pointer hover:bg-neutral-400 hover:text-white ${
              currentPage === last ? "bg-neutral-400 text-white" : ""
            }`}
            onClick={handleLast}
          >
            {last}
          </div>
        )}

        <select
          className="mx-4 p-2 bg-neutral-200 rounded-sm border-none outline-none"
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          <option>5</option>
          <option>10</option>
          <option>15</option>
        </select>
      </div>
    </div>
  );
}
