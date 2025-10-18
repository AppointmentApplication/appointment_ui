// https://dribbble.com/shots/24661171-User-management-page
import { MdEmail } from "@react-icons/all-files/md/MdEmail";
import { BsPerson } from "@react-icons/all-files/bs/BsPerson";
import { FaRegDotCircle } from "@react-icons/all-files/fa/FaRegDotCircle";

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
    },
    {
      id: 2,
      name: "Selin Güneş",
      email: "selin@example.com",
      role: "User",
      status: "Active",
      joinedAt: "2022-01-01",
    },
    {
      id: 3,
      name: "Mehmet Kaya",
      email: "mehmet@example.com",
      role: "User",
      status: "Active",
      joinedAt: "2022-01-01",
    },
  ];

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left py-1 px-2 font-medium text-gray-700">
              <input type="checkbox" />
              FullName
            </th>
            <th className="text-left py-1 px-2 font-medium text-gray-700">
              <MdEmail />
              Email
            </th>
            <th className="text-left py-1 px-2 font-medium text-gray-700">
              <BsPerson />
              Role
            </th>
            <th className="text-left py-1 px-2 font-medium text-gray-700">
              <FaRegDotCircle />
              Status
            </th>
            <th className="text-left py-1 px-2 font-medium text-gray-700">
              Joined Date
            </th>
            <th className="text-left py-1 px-2 font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, idx) => (
            <tr
              key={emp.id}
              className={
                idx % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
              }
            >
              <td className="py-1 px-2">
                <input type="checkbox" />
                {emp.name}
              </td>
              <td className="py-1 px-2">{emp.email}</td>
              <td className="py-1 px-2">{emp.role}</td>
              <td className="py-1 px-2">{emp.status}</td>
              <td className="py-1 px-2">{emp.joinedAt}</td>
              <td className="py-1 px-2">
                <button>Düzenle</button>
                <button>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
