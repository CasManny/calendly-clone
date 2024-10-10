"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
    href: string;
    className?: string;
};
const NavLink = ({ children, href, className }: Props) => {
  const path = usePathname();
  const isActive = path === href;
  return (
    <Link
      href={href}
      className={cn(
        "transition-colors",
        isActive
          ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
        className
      )}
      >
          {children}
    </Link>
  );
};

export default NavLink;
