import Link from "next/link";

interface TabProps {
  className?: string;
  href: string;
  onClick?: () => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  children: React.ReactNode;
}

export default function Tab({
  href,
  onClick,
  onMouseEnter,
  className,
  children,
}: TabProps) {
  return (
    <Link
      className={`${className} text-[rgba(127,133,141,1)] text-nowrap`}
      href={href}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {children}
    </Link>
  );
}
