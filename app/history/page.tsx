"use client";

import { useEffect, useState } from "react";
import { Game } from "@/types/game";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

export default function HistoryPage() {
  const [history, setHistory] = useState<Game[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("game-history") || "[]");
    setHistory(stored);
  }, []);

  const deleteGame = (id: string) => {
    const updated = history.filter((g) => g.id !== id);
    setHistory(updated);
    localStorage.setItem("game-history", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen p-4 dark:bg-neutral-900">
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="text-2xl font-bold dark:text-gray-50">Game History</h1>

        <Link href="/" className="underline dark:text-gray-50">
          <motion.button
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-black p-2 rounded-xl dark:bg-gray-50 dark:text-black my-2 border"
          >
            ← Back to Game
          </motion.button>
        </Link>

        {history.length === 0 && (
          <p className="text-sm opacity-60 dark:text-gray-50">
            No games saved yet.
          </p>
        )}

{history.map(game => (
          <div key={game.id} className="bg-white dark:bg-gray-50 p-4 rounded-2xl shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm opacity-60">
                  {new Date(game.date).toLocaleDateString()}
                </p>
                <p className="font-semibold">Winner: {game.winner}</p>
                <p className="text-sm">Players: {game.players.join(", ")}</p>
                <p className="text-sm">Rounds: {game.rounds.length}</p>
              </div>
              <button onClick={() => deleteGame(game.id)}>
                <Trash2 size={18} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
