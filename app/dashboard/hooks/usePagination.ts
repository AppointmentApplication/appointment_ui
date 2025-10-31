import { useEffect, useState } from "react";

type UsePaginationProps = {
  target: string; // örn: "employees"
  initialPageIndex?: number;
  initialPageSize?: number;
};

export default function usePagination<T>({
  target,
  initialPageIndex = 1,
  initialPageSize = 5,
}: UsePaginationProps) {
  const [data, setData] = useState<T[]>([]);
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalItemCount, setTotalItemCount] = useState(0);

  const BASE_API = "http://localhost:3000/api";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const url = `${BASE_API}/${target}?limit=${pageSize}&index=${pageIndex}`;
        const response = await fetch(url);
        const json = await response.json();

        const list = json.data[target] as T[];
        const count = json.data.pageCount as number;
        const totalItem = json.data.totalItemCount as number;

        setTotalItemCount(totalItem);
        setData(list);
        setPageCount(count);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [target, pageIndex, pageSize]);

  const goToPage = (index: number) => setPageIndex(index);
  const changePageSize = (size: number) => {
    setPageSize(size);
    setPageIndex(1);
  };

  return {
    data,
    pageCount,
    pageIndex,
    pageSize,
    loading,
    totalItemCount,
    goToPage,
    changePageSize,
  };
}
