import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  ChevronRight,
  Heart,
  MessageCircle,
  Repeat,
} from "lucide-react";
import React from "react";

const FeedPost = () => {
  return (
    <div className="p-4 flex flex-col gap-2 relative" data-component="post">
      <button className="rounded-xl bg-violet-600/20 w-full p-3 flex items-center justify-between">
        <span className="font-bold text-violet-500">TOKEN</span>
        <span className="flex items-center gap-1">
          <span>$0.00</span>
          <ChevronRight size={20} className="text-violet-500" />
        </span>
      </button>
      <div className="flex gap-3 items-center">
        <img
          src="/default_profile_normal.png"
          className="h-10 w-10 rounded-full border border-border overflow-hidden"
        />
        <div className="flex flex-col">
          <strong>UserName</strong>
          <span className="text-muted-foreground">@username · Now</span>
        </div>
      </div>
      <div className="flex flex-col gap-0.5 flex-1">
        <div
          style={{
            whiteSpace: "pre-wrap",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
          ullamcorper, augue at commodo interdum, turpis nisi convallis ligula,
          ac semper augue turpis eget nunc. Sed vitae nisi ut elit facilisis
          venenatis. Duis sit amet ligula sit amet mi hendrerit aliquet. Sed
          vitae nisi ut elit facilisis venenatis. Duis sit amet ligula sit amet
          mi hendrerit aliquet. Sed vitae nisi ut elit facilisis venenatis.
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="rounded-full flex items-center divide-x divide-border/50 space-x-2 border border-border/50 bg-transparent text-muted-foreground h-10">
            <div className="flex items-center gap-2 p-2 pl-4 pr-1">
              <MessageCircle size={20} className="text-primary/80" />
              <span>0</span>
            </div>
            <div className="flex items-center gap-2 p-2 px-2 pr-1">
              <Repeat size={20} className="text-primary/80" />
              <span>0</span>
            </div>
            <div className="flex items-center gap-2 p-2 pl-2 pr-4">
              <Heart size={20} className="text-primary/80" />
              <span>0</span>
            </div>
            {/* <Repeat size={16} className="text-muted-foreground" />
            <Heart size={16} className="text-muted-foreground" /> */}
          </div>
          <Button className="rounded-full h-10 w-10 p-0" variant={"outline"}>
            <ArrowUpRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeedPost;
