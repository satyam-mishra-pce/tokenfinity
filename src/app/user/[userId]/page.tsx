import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React, { use } from "react";

const Page = ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = use(params);
  return (
    <div className="w-full flex flex-col items-center p-4 mt-4">
      <div className="flex flex-col gap-3 items-center">
        <div className="p-2 bg-gradient-to-tr from-primary2 to-primary rounded-full">
          <Avatar className="h-32 w-32 bg-background"></Avatar>
        </div>
        <span className="font-bold text-2xl">{userId}</span>
        <div className="flex items-center justify-stretch rounded-xl bg-muted divide-x w-max">
          <div className="flex-1 flex flex-col items-center px-3 py-2 w-[90px]">
            <span className="text-primary2 font-bold">948</span>
            <span className="text-sm text-muted-foreground">Posts</span>
          </div>
          <div className="flex-1 flex flex-col items-center px-3 py-2 w-[90px]">
            <span className="text-primary2 font-bold">343</span>
            <span className="text-sm text-muted-foreground">Replies</span>
          </div>
          <div className="flex-1 flex flex-col items-center px-3 py-2 w-[90px]">
            <span className="text-primary2 font-bold">3.2K</span>
            <span className="text-sm text-muted-foreground">Followers</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button>
            View on X<ArrowRight />
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 mt-8">
        <span className="bold text-xl font-bold">My Memecoins</span>
        <div className="bg-muted w-full h-20 rounded-xl flex items-center justify-center text-muted-foreground p-4 text-balance text-center">
          Your created tokens appear here.
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 mt-8">
        <span className="bold text-xl font-bold">Memecoin Requests</span>
        <div className="bg-muted w-full h-20 rounded-xl flex items-center justify-center text-muted-foreground p-4 text-balance text-center">
          Your posts that ready to be tokenized appear here.
        </div>
      </div>
    </div>
  );
};

export default Page;
