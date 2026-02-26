"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, RotateCcw } from "lucide-react";

import { createGameObject } from "@/lib/game-utils";

interface Round {
  scores: number[];
}

export default function Scorer() {
  const [players, setPlayers] = useState<string[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [newPlayer, setNewPlayer] = useState("");

  // Hydrate from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("scorer-data");
    if (saved) {
      const parsed = JSON.parse(saved);
      setPlayers(parsed.players);
      setRounds(parsed.rounds);
    } else {
      setPlayers(["Player 1", "Player 2"]);
      setRounds([{ scores: [0, 0] }]);
    }
  }, []);

  // Persist
  useEffect(() => {
    if (players.length)
      localStorage.setItem("scorer-data", JSON.stringify({ players, rounds }));
  }, [players, rounds]);

  const addPlayer = () => {
    if (!newPlayer.trim()) return;
    setPlayers([...players, newPlayer]);
    setRounds(rounds.map((r) => ({ ...r, scores: [...r.scores, 0] })));
    setNewPlayer("");
  };

  const addRound = () => {
    setRounds([...rounds, { scores: players.map(() => 0) }]);
  };

  const totals = players.map((_, i) =>
    rounds.reduce((sum, r) => sum + (r.scores[i] || 0), 0),
  );

  const highestScore = Math.max(...totals);

  const reset = () => {
    setRounds([{ scores: players.map(() => 0) }]);
  };

  const finishGame = () => {
    const game = createGameObject(players, rounds);

    const existing = JSON.parse(localStorage.getItem("game-history") || "[]");

    localStorage.setItem("game-history", JSON.stringify([game, ...existing]));

    alert("Game saved to history!");
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto space-y-4 py-4">
        <h1 className="text-3xl font-bold text-center text-black dark:text-gray-50">
          🎲 Round Scorer
        </h1>

        <div className="flex gap-2">
          <input
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            placeholder="Add player"
            className="flex-1 rounded-xl border px-3 py-2 dark:border-gray-50 dark:bg-gray-50"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={addPlayer}
            className="bg-black text-gray-50 px-4 rounded-xl dark:bg-gray-50 dark:text-black"
          >
            <Plus size={18} />
          </motion.button>
        </div>

        <AnimatePresence>
          {rounds.map((round, ri) => (
            <motion.div
              key={ri}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-2xl shadow p-4 space-y-2"
            >
              <h2 className="font-semibold">Round {ri + 1}</h2>
              {players.map((p, pi) => (
                <div key={pi} className="flex justify-between">
                  <span>{p}</span>
                  <input
                    type="number"
                    value={round.scores[pi]}
                    onChange={(e) => {
                      const copy = [...rounds];
                      copy[ri].scores[pi] = Number(e.target.value);
                      setRounds(copy);
                    }}
                    className="w-20 text-center border rounded-lg"
                  />
                </div>
              ))}
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={addRound}
          className="w-full bg-black text-gray-50 py-2 rounded-2xl dark:bg-gray-50 dark:text-black"
        >
          Add Round
        </motion.button>

        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="font-semibold mb-2">Totals</h2>
          {players.map((p, i) => (
            <motion.div
              animate={
                totals[i] === highestScore ? { scale: 1.02 } : { scale: 1 }
              }
              transition={{ type: "spring", stiffness: 200 }}
              key={i}
              className={`flex justify-between font-medium ${
                totals[i] === highestScore ? "text-green-600" : ""
              }`}
            >
              <span>{p}</span>
              <span>{totals[i]}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={finishGame}
          className="w-full bg-green-600 text-white py-2 rounded-2xl "
        >
          Finish Game
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={reset}
          className="w-full border py-2 rounded-2xl flex justify-center gap-2 dark:text-gray-50"
        >
          <RotateCcw /> Reset Game
        </motion.button>
      </div>
    </div>
  );
}
