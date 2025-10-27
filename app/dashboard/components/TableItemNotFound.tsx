type TableItemNotFoundProps = {
    message: string;
}
export default function TableItemNotFound({message}: TableItemNotFoundProps) {
  return (
    <div className="flex items-center justify-center h-full text-2xl font-semibold text-gray-500">
      {message}
    </div>
  );
}
