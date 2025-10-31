"use client";

import { useState, useMemo, useRef } from "react";
import usePagination from "../hooks/usePagination";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import { Customer } from "@/app/data/customers";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { FaCrown } from "react-icons/fa";
import DeletePopover, {
  DeletePopoverHandle,
} from "../components/DeletePopover";
import EditEmployeePopover from "../employees/components/EditEmployeePopover";

export default function Page() {
  const [isOpened, setIsOpened] = useState(false);
  const deleteRef = useRef<DeletePopoverHandle>(null);

  const {
    data: customers,
    pageCount,
    pageIndex,
    pageSize,
    loading,
    totalItemCount,
    goToPage,
    changePageSize,
  } = usePagination<Customer>({
    target: "customers",
  });

  // Tablo başlıkları
  const thead = useMemo(
    () => [
      { id: 1, name: "fullName", content: <span>Full Name</span> },
      { id: 2, name: "email", content: <span>Email</span> },
      { id: 3, name: "phoneNumber", content: <span>Phone</span> },
      { id: 4, name: "membershipLevel", content: <span>Membership</span> },
      { id: 5, name: "totalSpent", content: <span>Total Spent</span> },
      { id: 6, name: "registrationDate", content: <span>Registered</span> },
      { id: 7, name: "actions", content: <span>Actions</span> },
    ],
    []
  );

  // Tablo satırları
  const tbody = useMemo(
    () =>
      customers.map((c) => ({
        id: c.id,
        fullName: (
          <div className="flex items-center gap-2">
            <span>{c.firstName} {c.lastName}</span>
          </div>
        ),
        email: c.email,
        phoneNumber: c.phoneNumber,
        membershipLevel: (
          <div className="flex items-center gap-2">
            <FaCrown
              className={
                c.membershipLevel === "Platinum"
                  ? "text-gray-400"
                  : c.membershipLevel === "Gold"
                  ? "text-yellow-500"
                  : c.membershipLevel === "Silver"
                  ? "text-gray-300"
                  : "text-orange-600"
              }
            />
            <span>{c.membershipLevel}</span>
          </div>
        ),
        totalSpent: `$${c.totalSpent.toLocaleString()}`,
        registrationDate: new Date(c.registrationDate).toLocaleDateString(),
        actions: (
          <div className="flex items-center gap-4">
            <button
              className="text-gray-600 hover:text-blue-600 active:scale-90 transition-all duration-150 cursor-pointer"
              onClick={() => setIsOpened(true)}
            >
              <BsFillPencilFill />
            </button>
            <button
              className="text-gray-600 hover:text-red-600 active:scale-90 transition-all duration-150 cursor-pointer"
              onClick={() =>
                deleteRef.current?.open(c.id, "Delete this customer?", handleDelete)
              }
            >
              <BsFillTrashFill />
            </button>
          </div>
        ),
      })),
    [customers]
  );

  const handleDelete = () => {
    console.log("Customer deleted!");
  };

  return (
    <div>
      <div className="text-center mt-8 text-2xl font-bold text-blue-800">
        CUSTOMER MANAGEMENT
      </div>

      <EditEmployeePopover isOpened={isOpened} setIsOpened={setIsOpened} />

      <div className="mt-6">
        <Table thead={thead} tbody={tbody} loading={loading} />
        <Pagination
          pageCount={pageCount}
          currentPage={pageIndex}
          onPageChange={goToPage}
          onPageSizeChange={changePageSize}
          totalItemCount={totalItemCount}
        />
      </div>

      <DeletePopover ref={deleteRef} />
    </div>
  );
}
