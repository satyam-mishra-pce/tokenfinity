"use client";
import { cn } from "@/lib/utils";
import { Home, LucideProps, TrendingUp, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const FooterTab = ({
  Icon,
  text,
  isActive,
}: {
  Icon: React.FC<LucideProps>;
  text: string;
  isActive?: boolean;
}) => {
  return (
    <button
      className={cn(
        "rounded-xl flex flex-col items-center h-auto w-[80px] font-sans py-2 gap-1",
        isActive ? "bg-accent text-primary" : ""
      )}
    >
      {<Icon size={20} />}
      <span
        className={cn(
          "text-xs",
          isActive ? "text-primary" : "text-muted-foreground"
        )}
      >
        {text}
      </span>
    </button>
  );
};

const Footer = () => {
  const pathname = usePathname();
  if (pathname.startsWith("/onboarding") || pathname.startsWith("/auth"))
    return null;
  return (
    <>
      {/* Phone UI: */}
      <footer className="p-2 border-t sticky bottom-0 bg-background/80 backdrop-blur-xl w-full shadow-[0_-3px_20px_0px_rgba(0,0,0,0.075)]">
        <div className="w-full flex items-center justify-center gap-2">
          <Link href={"/"}>
            <FooterTab Icon={Home} text="Home" isActive={pathname === "/"} />
          </Link>
          <Link href={"/trending"}>
            <FooterTab
              Icon={TrendingUp}
              text="Trending"
              isActive={pathname.startsWith("/trending")}
            />
          </Link>
          <Link href={"/user/satyammishra.eth"}>
            <FooterTab
              Icon={User2}
              text="You"
              isActive={pathname === "/user/satyammishra.eth"}
            />
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
