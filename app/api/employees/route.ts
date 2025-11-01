import { NextResponse } from "next/server";
import { Employees } from "@/app/data/employees";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit")) || 0;
  const index = Number(searchParams.get("index")) || 1;
  const q = String(searchParams.get("q") ?? "").trim().toLowerCase();

  function normalize(emp: any) {
    const firstName = emp.firstName ?? emp.fName ?? "";
    const lastName = emp.lastName ?? emp.lName ?? "";
    const computedFullName =
      (emp.fullName && emp.fullName.toString().trim()) ||
      `${firstName} ${lastName}`.trim();

    const joinedAt =
      emp.joinedAt ??
      emp.employmentStartDate ??
      emp.hireDate ??
      emp.createdAt ??
      "";

    return {
      id: emp.id ?? emp.employeeId ?? null,
      fullName: computedFullName,
      firstName,
      lastName,
      email: emp.email ?? "",
      phoneNumber: emp.phoneNumber ?? emp.phone ?? "",
      title: emp.title ?? emp.role ?? "",
      role: emp.role ?? emp.title ?? "",
      workDays: emp.workDays ?? [],
      workStart: emp.workStart ?? "",
      workEnd: emp.workEnd ?? "",
      gender: emp.gender ?? "",
      // <-- ensure status exists
      status: emp.status ?? emp.active ?? "",
      joinedAt: joinedAt,
      // you can include any other raw fields if needed:
      // raw: emp
    };
  }

  const normalizedAll = Employees.map(normalize);

  let filtered = normalizedAll;
  if (q) {
    filtered = normalizedAll.filter((e) => {
      const name = (e.fullName ?? "").toString().toLowerCase();
      const email = (e.email ?? "").toString().toLowerCase();
      return name.includes(q) || email.includes(q);
    });
  }

  const pageCount = limit ? Math.ceil(filtered.length / limit) : 1;
  const pageIndex = Math.max(1, index);
  const start = limit ? (pageIndex - 1) * limit : 0;
  const end = limit ? start + limit : filtered.length;
  const data = limit ? filtered.slice(start, end) : filtered;

  return NextResponse.json({
    data: {
      employees: data,
      pageCount,
      totalItemCount: filtered.length,
    },
    message: "Success",
  });
}
