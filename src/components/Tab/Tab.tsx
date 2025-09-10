import Link from "next/link";

interface TabProps {
  className?: string;
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Tab({ href, onClick, className, children }: TabProps) {
  return (
    <Link
      className={`${className} text-[rgba(127,133,141,1)] text-nowrap`}
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
