import Link from "next/link";

interface TabProps {
  href: string;
  children: React.ReactNode;
}

export default function Tab({ href, children }: TabProps) {
  return (
    <Link className="text-[rgba(127,133,141,1)] text-nowrap" href={href}>
      {children}
    </Link>
  );
}
