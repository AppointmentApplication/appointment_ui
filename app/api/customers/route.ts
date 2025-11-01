import { NextResponse } from "next/server";
import { Customers } from "@/app/data/customers";

function normalize(cust: any) {
  const firstName = cust.firstName ?? "";
  const lastName = cust.lastName ?? "";
  const computedFullName = (cust.fullName && String(cust.fullName).trim()) || `${firstName} ${lastName}`.trim();

  return {
    id: cust.id ?? cust.customerId ?? null,
    firstName,
    lastName,
    fullName: computedFullName,
    email: cust.email ?? "",
    phoneNumber: cust.phoneNumber ?? "",
    membershipLevel: cust.membershipLevel ?? "",
    totalSpent: cust.totalSpent ?? 0,
    registrationDate: cust.registrationDate ?? cust.createdAt ?? "",
    // raw: cust // istersen debug için
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit")) || 0; // 0 => return all
  const index = Number(searchParams.get("index")) || 1; // 1-based
  const q = String(searchParams.get("q") ?? "").trim().toLowerCase();

  const normalized = Customers.map(normalize);

  let filtered = normalized;
  if (q) {
    filtered = normalized.filter((c) => {
      const name = (c.fullName ?? "").toString().toLowerCase();
      const email = (c.email ?? "").toString().toLowerCase();
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
      customers: data,
      pageCount,
      totalItemCount: filtered.length,
    },
    message: "Success",
  });
}
