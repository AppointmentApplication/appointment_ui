"use client";

import usePagination from "../hooks/usePagination";
import Pagination from "../components/Pagination";
import Table, { Employee } from "../components/Table";
import { useState, useMemo, useRef } from "react";
import { GrUser, GrUserFemale } from "react-icons/gr";
import { BsFillPersonCheckFill, BsFillPersonXFill } from "react-icons/bs";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import EditEmployeePopover from "./components/EditEmployeePopover";
import DeletePopover, {
  DeletePopoverHandle,
} from "../components/DeletePopover";

export default function Page() {
  const [isOpened, setIsOpened] = useState(false);
  const deleteRef = useRef<DeletePopoverHandle>(null);

  const {
    data: employees,
    pageCount,
    pageIndex,
    pageSize,
    loading,
    totalItemCount,
    goToPage,
    changePageSize,
  } = usePagination<Employee>({
    target: "employees",
  });

  // search active kontrolü (opsiyonel, eğer Table'dan onSearchStateChange alırsan kullan)
  const [isSearchActive, setIsSearchActive] = useState(false);

  const thead = useMemo(
    () => [
      { id: 1, name: "fullName", content: <span>Full Name</span> },
      { id: 2, name: "email", content: <span>Email</span> },
      { id: 3, name: "role", content: <span>Role</span> },
      { id: 4, name: "status", content: <span>Status</span> },
      { id: 5, name: "joinedAt", content: <span>Joined At</span> },
      { id: 6, name: "actions", content: <span>Actions</span> },
    ],
    []
  );

  // local tbody: burada actions JSX'leri tanımlı, bunları arama sonuçlarına da kopyalayacağız
  const tbody = useMemo(
    () =>
      employees.map((emp) => ({
        id: emp.id,
        fullName: (
          <div className="flex items-center gap-2">
            {emp.gender === "male" ? <GrUser /> : <GrUserFemale />}
            <span>
              {emp.firstName} {emp.lastName}
            </span>
          </div>
        ),
        email: emp.email,
        role: emp.title,
        status: (
          <div className="flex items-center gap-2">
            {emp.status === "Active" ? (
              <>
                <BsFillPersonCheckFill className="text-green-600" />
                <span>Active</span>
              </>
            ) : (
              <>
                <BsFillPersonXFill className="text-red-600" />
                <span>Inactive</span>
              </>
            )}
          </div>
        ),
        joinedAt: new Date(emp.employmentStartDate).toLocaleDateString(),
        actions: (
          <div className="flex items-center gap-4">
            <button
              className="text-gray-600 hover:text-blue-600 active:scale-90 transition-all duration-150 cursor-pointer"
              onClick={() => {
                // aç popoveru ve istenen elemanı düzenle
                // isOpened, EditEmployeePopover içindeki state'in emp id'yi alması gerekiyorsa ona göre uyarlay
                setIsOpened(true);
              }}
            >
              <BsFillPencilFill />
            </button>
            <button
              className="text-gray-600 hover:text-red-600 active:scale-90 transition-all duration-150 cursor-pointer"
              onClick={() =>
                deleteRef.current?.open(Number(emp.id), "Delete this user?", handleDelete)

              }
            >
              <BsFillTrashFill />
            </button>
          </div>
        ),
      })),
    [employees]
  );

  const handleDelete = () => {
    console.log("Item deleted!");
  };

  // onEdit / onDelete Table'a geçirilecek: parent burada hangi davranışı istediğini belirtir
  function onEditHandler(id: number | string) {
    // örnek: id'ye göre popover aç
    console.log("onEdit from Table:", id);
    setIsOpened(true);
    // istersen EditEmployeePopover'a seçilen id'yi iletecek state ekle
  }

  function onDeleteHandler(id: number | string) {
  // id tipi string de olabilir -> Number ile güvenli şekilde sayıya çeviriyoruz
  const numericId = Number(id);
  deleteRef.current?.open(numericId, "Delete this user?", () => {
    console.log("deleted from onDeleteHandler", id);
    // gerçek silme işlemini burada çağır (id yine orijinal tipte gerekirse kullanabilirsin)
  });
}


  return (
    <div>
      <div className="text-center mt-8 text-2xl font-bold text-blue-800">
        EMPLOYEE MANAGEMENT
      </div>

      <EditEmployeePopover isOpened={isOpened} setIsOpened={setIsOpened} />
      <div className="mt-6">
        <Table
          thead={thead}
          tbody={tbody}
          loading={loading}
          // dynamic props for reuse:
          apiPath="/api/employees"
          searchParamName="q"
          idKeys={["id"]} // employees'de id alanı "id" olduğu için
          columnsToCopyFromLocal={["actions", "status"]} // actions ve status'ü local'den kopyala
          onEdit={onEditHandler}
          onDelete={onDeleteHandler}
          // opsiyonel: Table'da arama aktiflik durumunu takip etmek istersen aşağıyı aç:
          onSearchStateChange={(active: boolean) => setIsSearchActive(active)}
        />

        {/* Eğer arama aktifse sayfalama gizlemek istersen: */}
        {!isSearchActive && (
          <Pagination
            pageCount={pageCount}
            currentPage={pageIndex}
            onPageChange={goToPage}
            onPageSizeChange={changePageSize}
            totalItemCount={totalItemCount}
          />
        )}
      </div>

      <DeletePopover ref={deleteRef} />
    </div>
  );
}
