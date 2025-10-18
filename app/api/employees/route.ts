import { Employees } from "@/app/data/employees";
import { NextResponse } from "next/server";

// http://localhost:3000/api/employees?index=3&limit=5 -> paginated employees
// http://localhost:3000/api/employees -> all employees

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit"));
  const pageIndex = Number(searchParams.get("index")) - 1;

  const start = pageIndex * limit;
  const end = start + limit;

  const data = limit ? Employees.slice(start, end) : Employees;

  return NextResponse.json({
    data,
    message: "Success",
  });
}
