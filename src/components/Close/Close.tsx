import { X } from "lucide-react";

interface CloseProps {
  isDropdown?: boolean;
  onDelete: (id: number) => void;
  id: number;
}

export default function Close({
  isDropdown = false,
  onDelete,
  id,
}: CloseProps) {
  const style = isDropdown
    ? "flex-shrink-0 ml-auto bg-gray opacity-60"
    : "ml-1 bg-red-500";

  return (
    <div
      className={`flex items-center justify-center h-4 w-4  rounded-full ${style}`}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();

        onDelete(id);
      }}
    >
      <X className="w-2.5 h-2.5 text-white" strokeWidth={3} />
    </div>
  );
}
