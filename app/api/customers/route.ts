import { Customers } from "@/app/data/customers";
import { NextResponse } from "next/server";

// http://localhost:3000/api/customers?index=3&limit=5 -> paginated customers
// http://localhost:3000/api/customers -> all customers

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit"));
  const pageIndex = Number(searchParams.get("index")) - 1;
  const pageCount = Math.ceil(Customers.length / limit);

  const start = pageIndex * limit;
  const end = start + limit;

  const data = limit ? Customers.slice(start, end) : Customers;

  return NextResponse.json({
    data: {
      customers: data,
      pageCount
    },
    message: "Success",
  });
}
