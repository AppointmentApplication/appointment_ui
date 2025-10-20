// https://dribbble.com/shots/24661171-User-management-page
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

export default function Table() {
  // Örnek data
  const employees = [
    {
      id: 1,
      name: "Ali Balun",
      email: "ali@example.com",
      role: "User",
      status: "Active",
      joinedAt: "2022-01-01",
      gender: "male",
    },
    {
      id: 2,
      name: "Selin Güneş",
      email: "selin@example.com",
      role: "User",
      status: "Inactive",
      joinedAt: "2022-01-01",
      gender: "female",
    },
    {
      id: 3,
      name: "Mehmet Kaya",
      email: "mehmet@example.com",
      role: "User",
      status: "Active",
      joinedAt: "2022-01-01",
      gender: "male",
    },
  ];

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 ">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50 bg-slate-600 ">
          <tr>
            <th className="text-left py-1 px-2 font-medium text-gray-200 ">
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                FullName</div>
            </th>
            <th className="text-left py-1 px-2 font-medium text-gray-200">
              <div className="flex items-center gap-2">
                <MdEmail />
                Email </div>
            </th>
            <th className="text-left py-1 px-2 font-medium text-gray-200">
              <div className="flex items-center gap-2">
                <BsPerson />
                Role </div>
            </th>
            <th className="text-left py-1 px-2 font-medium text-gray-200">
              <div className="flex items-center gap-2">
                <FaRegDotCircle />
                Status</div>
            </th>
            <th className="text-left py-1 px-2 font-medium text-gray-200">
              <div className="flex items-center gap-2">
                <BsCalendarDate />
                Joined Date </div>
            </th>
            <th className="text-left py-1 px-2 font-medium text-gray-200">
              <div className="flex items-center gap-2">
                <BiSolidHandUp />
                Actions </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, idx) => (
            <tr
              key={emp.id}
              className={
                idx % 2 === 0 ? "bg-slate-200" : "bg-slate-100 hover:bg-slate-100"
              }
            >
              <td className="py-1 px-2 flex items-center gap-2">
                <input type="checkbox" className="align-middle" />
                {emp.gender === "male" ? (
                  <GrUser className="text-gray-700" />
                ) : (
                  <GrUserFemale className="text-gray-700" />
                )}
                <span>{emp.name}</span>
              </td>
              <td className="py-1 px-2">{emp.email}</td>
              <td className="py-1 px-2">{emp.role}</td>
              <td className="py-1 px-2">
                <td className="py-1 px-2 flex items-center gap-2">
                  {emp.status === "Active" ? (
                    <>
                      <BsFillPersonCheckFill className="text-green-600" />
                      <span className=" font-medium">Active</span>
                    </>
                  ) : (
                    <>
                      <BsFillPersonXFill className="text-red-600" />
                      <span className="font-medium">Inactive</span>
                    </>
                  )}
                </td>
              </td>
              <td className="py-1 px-2">{emp.joinedAt}</td>
              <td className="py-1 px-2">
                <div className="flex items-center gap-4">
                  <button className="text-gray-600 hover:text-blue-600 active:scale-90 transition-all duration-150">
                    <BsFillPencilFill />
                  </button>
                  <button className="text-gray-600 hover:text-red-600 active:scale-90 transition-all duration-150">
                    <BsFillTrashFill />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
