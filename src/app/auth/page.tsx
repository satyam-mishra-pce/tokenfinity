import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="flex-1 flex flex-col gap-4 items-center justify-center w-full p-8 relative">
      <div className="absolute top-0 translate-y-[-50%] w-full aspect-square rounded-full bg-primary/20 blur-2xl"></div>

      <div className="absolute bottom-0 translate-y-[50%] w-full aspect-square rounded-full bg-primary2/20 blur-2xl"></div>
      <div className="flex items-center justify-center gap-4 mb-4">
        <Image
          src="/assets/media/images/X.png"
          alt="X"
          width={200}
          height={200}
          className="w-[60px] h-auto rounded-2xl"
        />
        <Image
          src="/assets/media/images/Tokenfinity.svg"
          alt="Tokenfinity"
          width={200}
          height={200}
          className="w-[60px] h-auto"
        />
      </div>
      <span className="font-bold text-3xl text-center text-balance">
        Sign in Tokenfinity with X
      </span>
    </div>
  );
};

export default Page;
