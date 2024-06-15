"use client";

import Footer from "@/components/footer";
import Settings from "@/components/settings";
import Timer from "@/components/timer";
import TimerToggler from "@/components/timer-toggler";
import { StyleContext } from "@/contexts/style-context";
import { Variants, motion } from "framer-motion";
import Head from "next/head";
import { useContext } from "react";
import Image from "next/image";

export default function Home() {
  const { font } = useContext(StyleContext);

  const imageVariants: Variants = {
    initial: { opacity: 0, y: -10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        ease: 'easeOut',
        duration: 0.3,
      },
    },
  };

  return (
    <div
      className={`grid min-h-screen w-full grid-rows-[1fr_auto] justify-center bg-primary ${font}`}
    >
      <Head>
        <title>Pomodoro App</title>
        <meta
          name='description'
          content='Pomodoro App built with Next.JS, TypeScript, Tailwind CSS, and Framer Motion'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='my-8 mx-auto flex w-[88vw] max-w-lg flex-col items-center md:my-12 md:justify-between'>
        <h1 className='sr-only'>Pomodoro</h1>

        <motion.div
          initial='initial'
          animate='animate'
          variants={imageVariants}
        >
          <Image src={"/assets/logo.svg"} alt='pomodoro' width={125} height={125} />
        </motion.div>

        <TimerToggler />

        <Timer />

        <Settings />
      </main>

      <Footer />
    </div>
  );
}