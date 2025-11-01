import React, { useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";
import TableItemNotFound from "./TableItemNotFound";
import { CiSearch, CiFilter } from "react-icons/ci";

export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  employmentStartDate: string | Date;
  title?: string;
  workDays?: string[];
  workStart?: string;
  workEnd?: string;
  gender?: string;
  status?: string;
};

type TheadCol = { id: number; name: string; content: React.ReactNode };

type TableProps = {
  loading: boolean;
  thead: TheadCol[];
  tbody: { [key: string]: any }[];
  apiPath?: string;
  searchParamName?: string;
  idKeys?: string[];
  columnsToCopyFromLocal?: string[];
  onEdit?: (id: number | string) => void;
  onDelete?: (id: number | string) => void;
  searchOnEmpty?: boolean;
  onSearchStateChange?: (active: boolean) => void; // <-- eklendi
};

export default function Table({
  loading,
  thead,
  tbody,
  apiPath = "/api/employees",
  searchParamName = "q",
  idKeys = ["id", "employeeId", "employee_id"],
  columnsToCopyFromLocal = ["actions"],
  onEdit,
  onDelete,
  searchOnEmpty = false,
  onSearchStateChange,
}: TableProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [fetchedRows, setFetchedRows] = useState<any[]>([]);
  const debounceRef = useRef<number | null>(null);

  // debounce
  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [query]);

  // helper: get first id match from object using idKeys
  function getIdFrom(obj: any): string | number | null {
    if (!obj) return null;
    for (const k of idKeys) {
      if (obj[k] !== undefined && obj[k] !== null) return obj[k];
    }
    return null;
  }

  // notify parent when debouncedQuery changes (search active state)
  useEffect(() => {
    if (typeof onSearchStateChange === "function") {
      onSearchStateChange(Boolean(debouncedQuery));
    }
  }, [debouncedQuery, onSearchStateChange]);

  // fetch when debouncedQuery changes (or when searchOnEmpty and debouncedQuery === "")
  useEffect(() => {
    const controller = new AbortController();

    async function fetchSearch() {
      const shouldCall = debouncedQuery !== "" || searchOnEmpty;
      if (!shouldCall) {
        setFetchedRows([]);
        setSearchLoading(false);
        return;
      }

      try {
        setSearchLoading(true);
        const params = new URLSearchParams();
        if (debouncedQuery !== "") params.set(searchParamName, debouncedQuery);
        const url = `${apiPath}${params.toString() ? "?" + params.toString() : ""}`;

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error("Search failed");
        const json = await res.json();
        // try common shapes: { data: { employees: [] } } or { data: [] } or directly []
        let list: any[] = [];

        if (json?.data) {
          if (Array.isArray(json.data)) list = json.data;
          else {
            const arrProp = Object.values(json.data).find((v) => Array.isArray(v));
            list = Array.isArray(arrProp) ? arrProp : [];
          }
        } else if (Array.isArray(json)) {
          list = json;
        } else if (Array.isArray(json?.employees)) {
          list = json.employees;
        } else {
          list = [];
        }

        // merge/copy columns from local tbody (match by idKeys)
        const merged = list.map((item: any) => {
          const itemId = getIdFrom(item);
          if (itemId == null) return item;
          const local = tbody.find((r) => {
            const localId = getIdFrom(r);
            return localId != null && String(localId) === String(itemId);
          });
          if (!local) return item;
          const copy: any = { ...item };
          columnsToCopyFromLocal.forEach((col) => {
            if ((local as any)[col] !== undefined) copy[col] = (local as any)[col];
          });
          return copy;
        });

        setFetchedRows(merged);
      } catch (err) {
        if ((err as any).name === "AbortError") return;
        console.error(err);
        setFetchedRows([]);
      } finally {
        setSearchLoading(false);
      }
    }

    fetchSearch();
    return () => controller.abort();
  }, [debouncedQuery, apiPath, searchParamName, idKeys, columnsToCopyFromLocal, tbody, searchOnEmpty]);

  const isLoading = loading || searchLoading;
  const displayRows = debouncedQuery ? fetchedRows : tbody;

  function clearSearch(keepOpen = true) {
    setQuery("");
    setDebouncedQuery("");
    setFetchedRows([]);
    if (!keepOpen) setShowSearch(false);
    // notify parent that search is inactive when cleared and not kept open
    if (!keepOpen && typeof onSearchStateChange === "function") onSearchStateChange(false);
  }

  function toggleSearch() {
    setShowSearch((s) => {
      const next = !s;
      if (!next) {
        clearSearch(false);
      }
      if (typeof onSearchStateChange === "function") onSearchStateChange(next);
      return next;
    });
  }

  function handleEdit(id: number | string) {
    if (onEdit) return onEdit(id);
    console.log("Edit", id);
  }
  function handleDelete(id: number | string) {
    if (onDelete) return onDelete(id);
    console.log("Delete", id);
  }

  function renderCellForColumn(colName: string, row: any) {
    const cellValue = row[colName];

    if (React.isValidElement(cellValue)) return cellValue;

    if (colName === "actions") {
      const id = getIdFrom(row);
      return (
        <div className="flex gap-2">
          <button
            onClick={() => id !== null && handleEdit(id)}
            className="px-2 py-1 text-sm border rounded-sm hover:bg-gray-100"
            title="Edit"
          >
            Edit
          </button>
          <button
            onClick={() => id !== null && handleDelete(id)}
            className="px-2 py-1 text-sm border rounded-sm hover:bg-gray-100"
            title="Delete"
          >
            Delete
          </button>
        </div>
      );
    }

    if (cellValue === null || cellValue === undefined || cellValue === "") return "-";
    if (typeof cellValue === "string" || typeof cellValue === "number" || typeof cellValue === "boolean")
      return String(cellValue);

    if (typeof cellValue === "object") {
      if ("firstName" in cellValue || "lastName" in cellValue) {
        const f = (cellValue.firstName ?? "").toString();
        const l = (cellValue.lastName ?? "").toString();
        const fullname = `${f} ${l}`.trim();
        if (fullname) return fullname;
      }
      if ("fullName" in cellValue) return String(cellValue.fullName);
      if ("email" in cellValue) return String(cellValue.email);
      try {
        const s = JSON.stringify(cellValue);
        return s.length > 100 ? s.slice(0, 97) + "..." : s;
      } catch {
        return "-";
      }
    }

    return String(cellValue);
  }

  return (
    <>
      <div className="flex m-4 justify-end items-center">
        <button
          onClick={toggleSearch}
          className="w-[34px] h-[34px] flex items-center justify-center bg-gray-50 border border-gray-300 rounded-sm user-select-none cursor-pointer mx-1 hover:bg-gray-200 transition-all"
          aria-label="Toggle search"
        >
          <CiSearch />
        </button>

        <div
          className="flex items-center border border-gray-200 rounded-sm overflow-hidden mx-1 transition-all"
          style={{
            width: showSearch ? 320 : 0,
            opacity: showSearch ? 1 : 0,
          }}
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="px-3 py-2 text-sm outline-none w-full"
            aria-label="Search"
            style={{ display: showSearch ? "block" : "none" }}
          />
          {showSearch && (
            <>
              {query ? (
                <button
                  onClick={() => clearSearch(true)}
                  className="px-3 py-2 user-select-none cursor-pointer hover:bg-gray-100"
                  aria-label="Clear search"
                >
                  ×
                </button>
              ) : (
                <div className="px-3 py-2 text-gray-400 text-sm" />
              )}
            </>
          )}
        </div>

        <button className="flex items-center justify-center w-[80px] p-2 h-[34px] bg-gray-50 border border-gray-300 rounded-sm gap-1 user-select-none cursor-pointer mx-1 hover:bg-gray-200 transition-all">
          <CiFilter />
          <span className="text-sm flex items-center">Filter</span>
        </button>
      </div>

      <div className="relative overflow-x-auto rounded-sm border border-gray-100 shadow-sm bg-white m-4 max-h-[450px]">
        {isLoading && <Spinner />}

        {displayRows && displayRows.length > 0 ? (
          <table className="min-w-full text-sm text-gray-700">
            <thead className="sticky top-0 bg-gradient-to-b from-gray-50 to-gray-100 text-gray-600 border-b border-gray-200">
              <tr>
                {thead.map((col) => (
                  <th key={col.id} className="text-left py-3 px-4 font-semibold uppercase tracking-wide text-[13px]">
                    {col.content}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {displayRows.map((row, idx) => {
                const trKey = getIdFrom(row) != null ? String(getIdFrom(row)) : `row-${idx}`;
                return (
                  <tr key={trKey} className={`transition-all duration-150 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100/70`}>
                    {thead.map((col) => (
                      <td key={col.id} className="py-3 px-4 border-b border-gray-100">
                        {renderCellForColumn(col.name, row)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          !isLoading && (
            <div className="p-8">
              <TableItemNotFound message="No items found" />
            </div>
          )
        )}
      </div>
    </>
  );
}
