type PreviewProps = {
  top: number;
  height: number;
};

export default function Preview({ top, height }: PreviewProps) {
  return (
    <div
      className="absolute left-0 right-0 bg-blue-200 bg-opacity-50 rounded-md mx-2 pointer-events-none"
      style={{ top: `${top}px`, height: `${height}px` }}
    />
  );
}
