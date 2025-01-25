"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

const variants = {
  "invisible-right": {
    opacity: 0,
    x: 100,
    y: 0,
    scale: 1,
    filter: "blur(10px)",
  },
  "invisible-left": {
    opacity: 0,
    x: -100,
    y: 0,
    scale: 1,
    filter: "blur(10px)",
  },
  "invisible-top": {
    opacity: 0,
    x: 0,
    y: -100,
    scale: 1,
    filter: "blur(10px)",
  },
  "invisible-bottom": {
    opacity: 0,
    x: 0,
    y: 100,
    scale: 1,
    filter: "blur(10px)",
  },
  "invisible-center": {
    opacity: 0,
    x: 0,
    y: 0,
    scale: 0.5,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  },
};

const Step1Main = () => {
  return (
    <>
      <Image
        src="/assets/media/images/X.png"
        alt="X"
        width={200}
        height={200}
        className="w-[100px] h-auto rounded-3xl"
      />
      <span className="font-bold text-2xl mt-4 text-center text-balance">
        Share memes on X.
      </span>
      <span className="text-muted-foreground text-center text-balance">
        Just keep sharing memes on X, and we keep them analyzing.
      </span>
    </>
  );
};

const Step2Main = () => {
  return (
    <>
      <Image
        src="/assets/media/images/Engagement.svg"
        alt="Tokenfinity"
        width={200}
        height={200}
        className="w-[100px] h-auto"
      />
      <span className="font-bold text-2xl mt-4 text-center text-balance">
        Break Barriers
      </span>
      <span className="text-muted-foreground text-center text-balance">
        Break the engagement barriers , to reach threshold AURA points.
      </span>
    </>
  );
};

const Step3Main = () => {
  return (
    <>
      <Image
        src="/assets/media/images/Tokenfinity.svg"
        alt="Tokenfinity"
        width={200}
        height={200}
        className="w-[100px] h-auto"
      />
      <span className="font-bold text-2xl mt-4 text-center text-balance">
        Launch your meme
      </span>
      <span className="text-muted-foreground text-center text-balance">
        Launch your meme as a token, after reaching the threshold.
      </span>
    </>
  );
};

const StepMainWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center flex-1 p-4"
      variants={variants}
      initial={"invisible-center"}
      animate="visible"
      exit={"invisible-center"}
    >
      {children}
    </motion.div>
  );
};

const StepProgressChunk = ({ filled }: { filled?: boolean }) => {
  return (
    <div className="bg-accent h-4 flex-1 rounded-full border border-border overflow-hidden">
      <motion.div
        className="h-full bg-primary2"
        initial={{
          width: "0%",
        }}
        animate={{
          width: filled ? "100%" : "0%",
        }}
      ></motion.div>
    </div>
  );
};

const Page = () => {
  const [step, setStep] = useState(0);
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full">
      <AnimatePresence>
        {step === 0 ? (
          <>
            <motion.div
              className="flex items-center justify-between p-4"
              variants={variants}
              initial={"invisible-top"}
              animate="visible"
              exit="invisible-top"
            >
              <span className="bg-muted text-muted-foreground text-sm rounded-full px-3 py-1">
                Powered by Aptos
              </span>
            </motion.div>
            <StepMainWrapper key={"step-0-main"}>
              <Image
                src="/assets/media/images/Tokenfinity.svg"
                alt="Tokenfinity"
                width={200}
                height={200}
                className="w-[100px] h-auto"
              />
              <span className="font-bold text-2xl mt-4 text-center text-balance">
                Tokenfinity
              </span>
              <span className="text-muted-foreground text-center text-balance">
                Tokenize your twitter memes.
              </span>
            </StepMainWrapper>
            <motion.div
              className="flex items-center p-2 w-full gap-2"
              variants={variants}
              initial={"invisible-bottom"}
              animate="visible"
              exit="invisible-bottom"
              key={"step-0-footer"}
            >
              <Link href={"/auth"}>
                <Button variant={"secondary"} className="min-w-[120px]">
                  Skip
                </Button>
              </Link>
              <Button className="flex-1" onClick={() => setStep(step + 1)}>
                Get Started <ArrowRight />
              </Button>
            </motion.div>
          </>
        ) : (
          <>
            <div className="w-full flex items-center gap-2 px-4 py-2">
              <StepProgressChunk filled={step >= 1} />
              <StepProgressChunk filled={step >= 2} />
              <StepProgressChunk filled={step >= 3} />
            </div>
            <StepMainWrapper key={`step-${step}-main`}>
              {step === 1 ? (
                <Step1Main />
              ) : step === 2 ? (
                <Step2Main />
              ) : (
                <Step3Main />
              )}
            </StepMainWrapper>
            <motion.div
              className="flex items-center p-2 w-full gap-2"
              variants={variants}
              initial={"invisible-bottom"}
              animate="visible"
              exit={"invisible-bottom"}
              key={"step-1-footer"}
            >
              <Button variant={"secondary"} onClick={() => setStep(step - 1)}>
                <ChevronLeft />
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  if (step === 3) {
                    router.push("/auth");
                  } else {
                    setStep(step + 1);
                  }
                }}
              >
                {step === 3 ? "Sign in with X" : "Next "} <ArrowRight />
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;
