import FeedPost from "./_components/FeedPost";
import { Hand } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession();
  console.log(session);
  return (
    <div className="w-full flex flex-col divide-y space-y-2">
      {new Array(5).fill(0).map((_, i) => (
        <Link
          href={`/feedpost/${i}`}
          key={i}
          className="bg-background hover:brightness-[0.97] dark:brightness-[1.03] active:brightness-[0.95] dark:active:brightness-[1.05] transition"
        >
          <FeedPost />
        </Link>
      ))}

      <div className="w-full h-96 flex flex-col items-center justify-center p-4 gap-2">
        <Hand size={64} className="text-primary" />
        <span className="text-xl font-bold text-balance text-center">
          Time to touch grass.
        </span>
        <span className="text-muted-foreground text-balance text-center">
          We really think that you&apos;ve scrolled it too much. Go out. Look
          for some grass.
        </span>
      </div>
    </div>
  );
}
