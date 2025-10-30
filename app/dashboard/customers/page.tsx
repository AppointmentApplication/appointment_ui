"use client";

import usePagination from "../hooks/usePagination";
import Pagination from "../components/Pagination";
import Table, { Employee } from "../components/Table";
import Popover from "../components/Popover";
import { useState } from "react";

export default function Page() {
  const [isOpened, setIsOpened] = useState(false);
  const {
    data: customers,
    pageCount,
    pageIndex,
    pageSize,
    loading,
    goToPage,
    changePageSize,
  } = usePagination<Employee>({
    target: "customers",
  });

  return (
    <div>
      <div className="text-center mt-8 text-2xl font-bold text-blue-800">
        CUSTOMER MANAGEMENT
      </div>

      <Popover isOpened={isOpened} onClose={() => setIsOpened(false)}>
        <form className="flex flex-col gap-2">
          <input type="text" placeholder="İsim giriniz." />
          <input type="text" placeholder="Soyisim giriniz." />
          <input type="text" placeholder="Departman giriniz." />
          <input type="text" placeholder="Pozisyon giriniz." />
        </form>
      </Popover>

      <div
        className="mt-4 cursor-pointer bg-blue-500 text-white px-3 py-2 rounded"
        onClick={() => setIsOpened(true)}
      >
        Open Popover
      </div>

      <div className="mt-6">
        <Table employees={customers} loading={loading} />
        <Pagination
          pageCount={pageCount}
          currentPage={pageIndex}
          onPageChange={goToPage}
          onPageSizeChange={changePageSize}
        />
      </div>
    </div>
  );
}
