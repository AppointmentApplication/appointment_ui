// https://dribbble.com/shots/25949981--Sleek-Side-Navbar-Design
import { BsPeople, BsPeopleFill } from "react-icons/bs";

export default function Sidebar() {
  return (
    <div className="h-screen w-80 border-r border-transparent fixed left-0 top-0 flex flex-col">
      
      
      <div className="h-20 w-full bg-blue-800 flex justify-center items-center">
        <span className="font-bold text-lg text-white">Navbar</span>
      </div>

     
     <div className="flex-1 w-full bg-blue-200 p-4 flex flex-col items-center justify-start">
  
  <div className="mt-8">
    <button className="bg-blue-800 text-white font-semibold px-8 py-3 rounded-xl 
               transition-all duration-200 hover:rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/50 active:scale-95">
      New Appointment
    </button>
  </div>

  <div className="mt-10 flex flex-col items-center gap-8">
    <a href="/dashboard/employees" className="flex items-center text-blue-800 font-medium text-lg hover:text-blue-900 gap-2">
      <BsPeopleFill className="text-blue-800" /> Employees
    </a>
    <a href="/dashboard/customers" className="flex items-center text-blue-800 font-medium text-lg hover:text-blue-900 gap-2">
      <BsPeople className="text-blue-800" /> Customers
    </a>
  </div>

</div>

    </div>
  );
}

