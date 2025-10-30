import React, { useEffect, useState, useCallback } from "react";
import Spinner from "./Spinner";
import TableItemNotFound from "./TableItemNotFound";


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


type ConfigColumn = {
  key: string;
  label: string;
  icon?: string;
  visible?: boolean;
};

type TableConfig = { columns: ConfigColumn[] };

const CONFIG_URL = "/tableConfig.json";
const STORAGE_KEY = "table.config";

export default function Table({ employees, loading }: { employees: Employee[]; loading: boolean }) {
  const [config, setConfig] = useState<ConfigColumn[] | null>(null);
  const [icons, setIcons] = useState<Record<string, React.ComponentType<any> | null>>({});
  const [cols, setCols] = useState<ConfigColumn[] | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch(CONFIG_URL);
        const data: TableConfig = await res.json();
        if (!mounted) return;

        // merge with localStorage (order & visibility)
        const saved = localStorage.getItem(STORAGE_KEY);
        let merged = data.columns;
        if (saved) {
          try {
            const savedCols: ConfigColumn[] = JSON.parse(saved);
            const byKey = Object.fromEntries(data.columns.map(c => [c.key, c]));
            merged = savedCols
              .map(sc => byKey[sc.key] ? { ...byKey[sc.key], visible: sc.visible ?? byKey[sc.key].visible } : sc)
              .filter(Boolean);
            const existingKeys = new Set(merged.map(c => c.key));
            data.columns.forEach(c => { if (!existingKeys.has(c.key)) merged.push(c); });
          } catch {
            merged = data.columns;
          }
        }

        setConfig(data.columns);
        setCols(merged);

        // dynamic import icons for merged columns
        const imports = await Promise.all(
          merged.map(async (c) => {
            if (!c.icon) return { key: c.key, comp: null };
            try {
              const mod = await import(/* @vite-ignore */ c.icon);
              const comp = (mod && (Object.values(mod)[0] as any)) ?? null;
              return { key: c.key, comp };
            } catch (e) {
              return { key: c.key, comp: null };
            }
          })
        );
        const map: Record<string, React.ComponentType<any> | null> = {};
        imports.forEach(x => { map[x.key] = x.comp; });
        setIcons(map);
      } catch (e) {
        console.error("Failed loading table config", e);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!cols) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cols));
  }, [cols]);

  const onDragStart = (e: React.DragEvent, idx: number) => {
    e.dataTransfer.setData("text/plain", String(idx));
    e.dataTransfer.effectAllowed = "move";
  };
  const onDrop = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    const from = Number(e.dataTransfer.getData("text/plain"));
    if (Number.isNaN(from) || !cols) return;
    const newCols = Array.from(cols);
    const [m] = newCols.splice(from, 1);
    newCols.splice(idx, 0, m);
    setCols(newCols);
  };
  const onDragOver = (e: React.DragEvent) => e.preventDefault();

  const toggleVisible = (key: string) => {
    if (!cols) return;
    setCols(cols.map(c => c.key === key ? { ...c, visible: !c.visible } : c));
  };

  const resetConfig = () => {
    if (!config) return;
    const fresh = config.map(c => ({ ...c }));
    setCols(fresh);
    localStorage.removeItem(STORAGE_KEY);
  };

  const formatDate = useCallback((d?: string | Date) => {
    if (!d) return "-";
    const date = typeof d === "string" ? new Date(d) : d;
    if (isNaN(date.getTime())) return String(d);
    return date.toLocaleString();
  }, []);

  const renderCell = useCallback((colKey: string, emp: Employee) => {
    switch (colKey) {
      case "select":
        return <input aria-label={`select-${emp.id}`} type="checkbox" />;
      case "fullName":
        return (
          <div className="flex items-center gap-2">
            {emp.gender === "male" ? <span className="text-gray-700">👤</span> : <span className="text-gray-700">👩</span>}
            <span>{emp.firstName} {emp.lastName}</span>
          </div>
        );
      case "email":
        return <span>{emp.email}</span>;
      case "role":
        return <span>{emp.title ?? "-"}</span>;
      case "status":
        return (
          <div className="flex items-center gap-2">
            {emp.status === "Active" ? <><span className="text-green-600">●</span><span className="font-medium">Active</span></> : <><span className="text-red-600">●</span><span className="font-medium">Inactive</span></>}
          </div>
        );
      case "joinedAt":
        return <span>{formatDate(emp.employmentStartDate)}</span>;
      case "actions":
        return (
          <div className="flex items-center gap-4">
            <button aria-label={`edit-${emp.id}`} className="text-gray-600 hover:text-blue-600">✏️</button>
            <button aria-label={`delete-${emp.id}`} className="text-gray-600 hover:text-red-600">🗑️</button>
          </div>
        );
      default:
        return <span>-</span>;
    }
  }, [formatDate]);

  if (!cols) return (
    <div className="relative overflow-x-auto shadow-lg rounded-lg border border-gray-200 overflow-y-auto h-[400px] bg-white">
      {loading && <Spinner />}
      <div className="p-4">Loading configuration...</div>
    </div>
  );

  const visibleCols = cols.filter(c => c.visible !== false);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-700">Showing {employees.length} employees</div>
        <div className="flex items-center gap-2">
          <button onClick={() => { const el = document.getElementById('table-settings'); if (el) el.classList.toggle('hidden'); }} className="px-3 py-1 border rounded text-sm">Columns</button>
          <button onClick={resetConfig} className="px-3 py-1 border rounded text-sm">Reset</button>
        </div>
      </div>

      <div id="table-settings" className="hidden mb-2 p-3 border rounded bg-white">
        <div className="flex gap-4 flex-wrap items-center">
          {cols.map((col, idx) => (
            <div key={col.key} className="flex items-center gap-2">
              <div draggable onDragStart={(e) => onDragStart(e, idx)} onDragOver={onDragOver} onDrop={(e) => onDrop(e, idx)} className="p-1 border rounded cursor-grab">☰</div>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={col.visible !== false} onChange={() => toggleVisible(col.key)} />
                <span className="text-sm">{col.label || col.key}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-lg rounded-lg border border-gray-200 overflow-y-auto h-[400px] bg-white">
        {loading && <Spinner />}

        {employees.length > 0 ? (
          <table className="min-w-full">
            <thead className="bg-slate-600 select-none">
              <tr>
                {cols.map((col, idx) => (
                  col.visible !== false ? (
                    <th key={col.key} draggable onDragStart={(e) => onDragStart(e, idx)} onDragOver={onDragOver} onDrop={(e) => onDrop(e, idx)} className="text-left py-1 px-2 font-medium text-gray-200 cursor-pointer">
                      <div className="flex items-center gap-2">
                        {icons[col.key] ? React.createElement(icons[col.key] as any) : null}
                        <span>{col.label}</span>
                      </div>
                    </th>
                  ) : null
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, rowIdx) => (
                <tr key={emp.id} className={rowIdx % 2 === 0 ? "bg-slate-200" : "bg-slate-100 hover:bg-slate-100"}>
                  {cols.map(col => (
                    col.visible !== false ? (
                      <td key={col.key} className="py-1 px-2">{renderCell(col.key, emp)}</td>
                    ) : null
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <TableItemNotFound message="No employees found" />
        )}
      </div>
    </div>
  );
}


