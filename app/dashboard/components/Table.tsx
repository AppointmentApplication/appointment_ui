import Spinner from "./Spinner";
import TableItemNotFound from "./TableItemNotFound";
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";

/* example mock data
{
  thead: [
    { id: 1, name: "fullName", content: <div><IoIconCircle/><span>Full Name</span></div> },
    { id: 2, name: "email", content: <div><IoIconCircle/><span>Email</span></div> },
    { id: 3, name: "role", content: <div><IoIconCircle/><span>Role</span></div> },
    { id: 4, name: "status", content: <div><IoIconCircle/><span>Status</span></div> },
    { id: 5, name: "joinedAt", content: <div><IoIconCircle/><span>Joined At</span></div> },
    { id: 6, name: "actions", content: <div><IoIconCircle/><span>Actions</span></div> },
  ],
  tbody: [
    { id: 1, fullName: <div>Ali Balun</div>, email: "alibalun666@gmail.com", role: "Uzman Doktor", status: <div><IonIconInactive/><span>InActive</span></div>, joinedAt: "2023-01-01", actions: <div><IonIconPencil/><IonIconTrash /></div> },
    { id: 2, fullName: <div>Ali Balun</div>, email: "alibalun666@gmail.com", role: "Uzman Doktor", status: <div><IonIconInactive/><span>InActive</span></div>, joinedAt: "2023-01-01", actions: <div><IonIconPencil/><IonIconTrash /></div> },
    { id: 3, fullName: <div>Ali Balun</div>, email: "alibalun666@gmail.com", role: "Uzman Doktor", status: <div><IonIconInactive/><span>InActive</span></div>, joinedAt: "2023-01-01", actions: <div><IonIconPencil/><IonIconTrash /></div> },
    { id: 4, fullName: <div>Ali Balun</div>, email: "alibalun666@gmail.com", role: "Uzman Doktor", status: <div><IonIconInactive/><span>InActive</span></div>, joinedAt: "2023-01-01", actions: <div><IonIconPencil/><IonIconTrash /></div> },
    { id: 5, fullName: <div>Ali Balun</div>, email: "alibalun666@gmail.com", role: "Uzman Doktor", status: <div><IonIconInactive/><span>InActive</span></div>, joinedAt: "2023-01-01", actions: <div><IonIconPencil/><IonIconTrash /></div> },
    { id: 6, fullName: <div>Ali Balun</div>, email: "alibalun666@gmail.com", role: "Uzman Doktor", status: <div><IonIconInactive/><span>InActive</span></div>, joinedAt: "2023-01-01", actions: <div><IonIconPencil/><IonIconTrash /></div> },
  ],
}
*/

type TableProps = {
  loading: boolean;
  thead: { id: number; name: string; content: React.ReactNode }[];
  tbody: { id: number; [key: string]: React.ReactNode }[];
};

export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  employmentStartDate: string | Date;
  title?: string;
  workDays?: string[];
  workStart?: string;
  workEnd?: string;
  gender?: string;
  status?: string;
};

type ConfigColumn = {
  key: string;
  label: string;
  icon?: string;
  visible?: boolean;
};

type TableConfig = { columns: ConfigColumn[] };

const CONFIG_URL = "/tableConfig.json";
const STORAGE_KEY = "table.config";

export default function Table({ thead, tbody, loading }: TableProps) {
  return (
    <>
      <div className="flex m-4 justify-end">
        <button className="w-[30px] h-[30px] flex items-center justify-center bg-gray-50 border border-gray-300 rounded-sm user-select-none cursor-pointer mx-1 hover:bg-gray-200 transition-all">
          <CiSearch />
        </button>
        <button className="flex items-center justify-center w-[80px] p-2 h-[30px] bg-gray-50 border border-gray-300 rounded-sm gap-1 user-select-none cursor-pointer mx-1 hover:bg-gray-200 transition-all">
          <CiFilter />
          <span className="text-sm flex items-center">Filter</span>
        </button>
      </div>
      <div className="relative overflow-x-auto rounded-sm border border-gray-100 shadow-sm bg-white m-4 max-h-[450px]">
        {loading && <Spinner />}
        {tbody.length > 0 ? (
          <table className="min-w-full text-sm text-gray-700">
            <thead className="sticky top-0 bg-gradient-to-b from-gray-50 to-gray-100 text-gray-600 border-b border-gray-200">
              <tr>
                {thead.map((col) => (
                  <th
                    key={col.id}
                    className="text-left py-3 px-4 font-semibold uppercase tracking-wide text-[13px]"
                  >
                    {col.content}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tbody.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`transition-all duration-150 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100/70`}
                >
                  {thead.map((col) => (
                    <td
                      key={col.id}
                      className="py-3 px-4 border-b border-gray-100"
                    >
                      {row[col.name] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && (
            <div className="p-8">
              <TableItemNotFound message="No employees found" />
            </div>
          )
        )}
      </div>
    </>
  );
}
