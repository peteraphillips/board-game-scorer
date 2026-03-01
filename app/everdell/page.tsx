"use client";

import Scorer from "@/components/Scorer";
import Nav from "@/components/Nav";
import { main } from "framer-motion/client";
import Image from "next/image";

export default function EverdellPage() {
  return (
    <main className="relative bg-gray-50 dark:bg-neutral-900 transition-all duration-400">
      <div className="max-w-md mx-auto py-4">
        <Nav />
      </div>
      <div className="flex justify-center">
        <Image
          src="/everdell.webp"
          alt="Everdell Banner"
          width={1080}
          height={800}
          sizes="(max-width: 768px) 100vw, 33v"
          objectFit="contain"
        />
      </div>
      <Scorer />
    </main>
  );
}
