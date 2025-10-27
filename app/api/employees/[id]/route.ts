import { Employees } from "@/app/data/employees";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const data = Employees.find((item) => item.id === Number(id));

  if (!data) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }

  return NextResponse.json({ data, message: "Success" });
}
