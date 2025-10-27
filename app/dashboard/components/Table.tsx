import { MdEmail } from "@react-icons/all-files/md/MdEmail";
import { BsPerson } from "@react-icons/all-files/bs/BsPerson";
import { FaRegDotCircle } from "@react-icons/all-files/fa/FaRegDotCircle";
import { BsFillPencilFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { BsCalendarDate } from "react-icons/bs";
import { BsFillPersonCheckFill, BsFillPersonXFill } from "react-icons/bs";
import { BiSolidHandUp } from "react-icons/bi";
import { GrUser } from "react-icons/gr";
import { GrUserFemale } from "react-icons/gr";
import Spinner from "./Spinner";
import TableItemNotFound from "./TableItemNotFound";

type TableProps = {
  employees: Employee[];
  loading: boolean;
};

export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  employmentStartDate: Date;
  title: string;
  workDays: string[];
  workStart: string;
  workEnd: string;
  gender: string;
  status: string;
};

export default function Table({ employees, loading }: TableProps) {
  return (
    <div className="relative overflow-x-auto shadow-lg rounded-lg border border-gray-200 overflow-y-scroll h-[400px] bg-white">
      {loading && <Spinner />}

      {employees.length > 0 ? (
        <table className="min-w-full">
          <thead className="bg-slate-600">
            <tr>
              <th className="text-left py-1 px-2 font-medium text-gray-200 ">
                <div className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>FullName</span>
                </div>
              </th>
              <th className="text-left py-1 px-2 font-medium text-gray-200">
                <div className="flex items-center gap-2">
                  <MdEmail />
                  <span>Email</span>
                </div>
              </th>
              <th className="text-left py-1 px-2 font-medium text-gray-200">
                <div className="flex items-center gap-2">
                  <BsPerson />
                  <span>Role</span>
                </div>
              </th>
              <th className="text-left py-1 px-2 font-medium text-gray-200">
                <div className="flex items-center gap-2">
                  <FaRegDotCircle />
                  <span>Status</span>
                </div>
              </th>
              <th className="text-left py-1 px-2 font-medium text-gray-200">
                <div className="flex items-center gap-2">
                  <BsCalendarDate />
                  <span>Joined At</span>
                </div>
              </th>
              <th className="text-left py-1 px-2 font-medium text-gray-200">
                <div className="flex items-center gap-2">
                  <BiSolidHandUp />
                  <span>Actions</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => (
              <tr
                key={emp.id}
                className={
                  idx % 2 === 0
                    ? "bg-slate-200"
                    : "bg-slate-100 hover:bg-slate-100"
                }
              >
                <td className="py-1 px-2 flex items-center gap-2">
                  <input type="checkbox" className="align-middle" />
                  {emp.gender === "male" ? (
                    <GrUser className="text-gray-700" />
                  ) : (
                    <GrUserFemale className="text-gray-700" />
                  )}
                  <span>
                    {emp.firstName} {emp.lastName}
                  </span>
                </td>
                <td className="py-1 px-2">{emp.email}</td>
                <td className="py-1 px-2">{emp.title}</td>
                <td className="py-1 px-2">
                  <div className="flex items-center gap-2">
                    {emp.status === "Active" ? (
                      <>
                        <BsFillPersonCheckFill className="text-green-600" />
                        <span className="font-medium">Active</span>
                      </>
                    ) : (
                      <>
                        <BsFillPersonXFill className="text-red-600" />
                        <span className="font-medium">Inactive</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="py-1 px-2">
                  {emp.employmentStartDate.toString()}
                </td>
                <td className="py-1 px-2">
                  <div className="flex items-center gap-4">
                    <button className="text-gray-600 hover:text-blue-600 active:scale-90 transition-all duration-150 cursor-pointer">
                      <BsFillPencilFill />
                    </button>
                    <button className="text-gray-600 hover:text-red-600 active:scale-90 transition-all duration-150 cursor-pointer">
                      <BsFillTrashFill />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && (
          <TableItemNotFound message="No employees found" />
        )
      )}
    </div>
  );
}
