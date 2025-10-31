type PersonTagProps = {
  person: { name: string };
};

export default function PersonTag({ person: { name } }: PersonTagProps) {
  return (
    <div className="h-[40px] bg-blue-200 flex items-center justify-center font-semibold border-b border-gray-200">
      {name}
    </div>
  );
}
