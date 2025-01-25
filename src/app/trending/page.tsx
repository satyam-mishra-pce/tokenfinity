import { Trophy } from "lucide-react";
import React from "react";

const TokenEntry = () => {
  return (
    <li className="bg-background border border-border rounded-xl p-4 flex flex-col gap-1">
      <span className="font-bold text-lg text-primary2">TOKEN</span>
      <span className="text-muted-foreground">$1.73265</span>
    </li>
  );
};

const Page = () => {
  return (
    <div className="p-4">
      <div className="w-full relative z-10">
        <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full border border-primary2/80 bg-background flex items-center justify-center">
          <Trophy size={20} className="text-primary2/80" />
        </div>
      </div>
      <div className="flex flex-col gap-2 rounded-2xl w-full bg-accent2 text-primary2 p-6 relative z-[9] overflow-hidden">
        <div className="absolute -bottom-6 -right-6 h-20 w-20 bg-primary2/50 blur-xl "></div>
        <span className="font-bold text-5xl text-primary2/50">TOKEN</span>
        <span className="font-bold text-4xl text-primary2">$1.73265</span>
      </div>
      <ul className="w-full flex flex-col gap-1 mt-2">
        <TokenEntry />
        <TokenEntry />
        <TokenEntry />
      </ul>
    </div>
  );
};

export default Page;
