import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  ChevronRight,
  Heart,
  LucideProps,
  MessageCircle,
  Repeat,
} from "lucide-react";
import Link from "next/link";
import React, { use } from "react";

const PostStatCard = ({
  Icon,
  title,
  value,
}: {
  Icon: React.FC<LucideProps>;
  title: string;
  value: string;
}) => {
  return (
    <div className="rounded-2xl w-full bg-accent p-4 text-primary flex items-center justify-between">
      <div className="flex-col gap-1">
        <Icon size={28} className="text-primary/50" />
        <span className="font-bold text-xl">{title}</span>
      </div>
      <span className="font-bold text-5xl">{value}</span>
    </div>
  );
};

const Page = ({ params }: { params: Promise<{ feedpostId: string }> }) => {
  const {} = use(params);
  return (
    <div className="p-4 flex flex-col gap-2">
      <div className="relative rounded-2xl w-full bg-violet-100 dark:bg-violet-950 p-4 text-primary flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-violet-500/50">TOKEN</span>
          <span className="font-bold text-2xl text-violet-500">$0.00</span>
        </div>
        <Link href={"/token/SOME_TOKEN"}>
          <button className="flex items-center justify-center gap-1 bg-violet-500/20 px-3 pr-2 py-1 text-sm rounded-full text-violet-500 absolute top-3 right-3">
            View Token
            <ChevronRight size={16} />
          </button>
        </Link>
      </div>
      <div className="border rounded-2xl p-4 flex flex-col gap-2">
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
            ullamcorper, augue at commodo interdum, turpis nisi convallis
            ligula, ac semper augue turpis eget nunc. Sed vitae nisi ut elit
            facilisis venenatis. Duis sit amet ligula sit amet mi hendrerit
            aliquet. Sed vitae nisi ut elit facilisis venenatis. Duis sit amet
            ligula sit amet mi hendrerit aliquet. Sed vitae nisi ut elit
            facilisis venenatis.
          </div>
        </div>
        <Button
          className="rounded-full p-0 px-4 h-10 mt-2"
          variant={"secondary"}
        >
          <span>View on X</span>
          <ArrowUpRight size={20} />
        </Button>
      </div>
      <PostStatCard Icon={MessageCircle} title="Replies" value="367" />
      <PostStatCard Icon={Repeat} title="Reposts" value="9" />
      <PostStatCard Icon={Heart} title="Likes" value="938" />
    </div>
  );
};

export default Page;
