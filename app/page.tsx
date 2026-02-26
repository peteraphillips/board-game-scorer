"use client";

import Scorer from "@/components/Scorer";
import Nav from "@/components/Nav";
import { main } from "framer-motion/client";

export default function Page() {
  return (
    <main className="relative bg-gray-50 dark:bg-neutral-900 transition-all duration-400">
      <div className="max-w-md mx-auto py-4"><Nav /></div>
      <Scorer />
    </main>
  );
}
