import Sidebar from "../components/Sidebar";
import UpperMenu from "../components/UpperMenu";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Sidebar />
      <UpperMenu />
      <div className="ml-[300]">{children}</div>
    </div>
  );
}
