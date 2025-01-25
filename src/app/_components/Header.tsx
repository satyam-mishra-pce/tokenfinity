"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

const FeedPostHeader = () => {
  const router = useRouter();
  return (
    <>
      {/* Phone UI: */}
      <header className="h-14 px-2 flex items-center fixed top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-xl border-b shadow-lg">
        <Button
          variant={"ghost"}
          className="text-muted-foreground [&_svg]:size-auto px-2"
          onClick={() => router.back()}
        >
          <ChevronLeft />
        </Button>
        <span className="font-bold text-lg">Post</span>
      </header>
      <div className="h-14 w-full"></div>
    </>
  );
};

const TrendingPageHeader = () => {
  return (
    <>
      {/* Phone UI: */}
      <header className="mt-2 p-4 flex flex-col">
        <h1 className="font-bold text-4xl">Trending</h1>
      </header>
    </>
  );
};

const UserPageHeader = () => {
  return (
    <>
      {/* Phone UI: */}
      {/* Nothing */}
    </>
  );
};

const Header = () => {
  const path = usePathname();

  if (path.startsWith("/onboarding") || path.startsWith("/auth")) {
    return null;
  }

  if (path.startsWith("/feedpost")) {
    return <FeedPostHeader />;
  }

  if (path.startsWith("/trending")) {
    return <TrendingPageHeader />;
  }

  if (path.startsWith("/user")) {
    return <UserPageHeader />;
  }

  return (
    <>
      {/* Phone UI: */}
      <header className="mt-2 p-4 flex flex-col">
        <h1 className="font-bold text-4xl">Tokenfinity</h1>
      </header>
    </>
  );
};

export default Header;
