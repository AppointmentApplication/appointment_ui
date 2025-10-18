import { Employees } from "@/app/data/employees";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const data = Employees.find((item) => item.id === Number(params.id));

    if (data === undefined) return NextResponse.json({ message: "Not Found" });

    return NextResponse.json({ data, message: "Success" });
}