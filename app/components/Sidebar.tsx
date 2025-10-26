// https://dribbble.com/shots/25949981--Sleek-Side-Navbar-Design
import Link from "next/link";
import { BsPeople, BsPeopleFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";

export default function Sidebar() {
  return (
    <div className="h-screen border-r border-transparent fixed left-0 top-0 flex flex-col px-4 bg-white w-[300] ring-1 ring-gray-200 shadow-lg">
      <div className="h-20 w-full flex justify-center items-center">
        <span className="font-bold text-lg text-black">Navbar</span>
      </div>
      <div className="flex-1 w-full p-4 flex flex-col items-center">
        <Link href="/dashboard/appointments/create" className="flex items-center justify-center gap-2 mt-4 bg-blue-800 text-white px-6 py-3 rounded-sm cursor-pointer w-full">
          <GoPlus size={24} />
          <span className="text-md">New Appointment</span>
        </Link>

        <div className="mt-6 flex flex-col gap-2 w-full">
          <Link
            href="/dashboard/employees"
            className="flex items-center text-md text-lg gap-2 px-4 py-2 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
          >
            <BsPeopleFill />
            <span>Employees</span>
          </Link>
          <Link
            href="/dashboard/customers"
            className="flex items-center font-medium text-lg hover:text-blue-600 gap-2 px-4 py-2 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
          >
            <BsPeople />
            <span>Customers</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
