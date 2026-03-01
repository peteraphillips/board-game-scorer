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

  const deletePlayer = (index: number) => {
    const updatedPlayers = players.filter((_, i) => i !== index);
    const updatedRounds = rounds.map((r) => ({
      ...r,
      scores: r.scores.filter((_, i) => i !== index),
    }));
    setPlayers(updatedPlayers);
    setRounds(updatedRounds);
  };

  const addRound = () => {
    setRounds([...rounds, { scores: players.map(() => 0) }]);
  };

  const deleteRound = (index: number) => {
    setRounds(rounds.filter((_, i) => i !== index));
  };

  const totals = players.map((_, i) =>
    rounds.reduce((sum, r) => sum + (r.scores[i] || 0), 0),
  );

  const highestScore = Math.max(...totals);

  const reset = () => {
    setPlayers([]);
    setRounds([]);
    localStorage.removeItem("scorer-data");
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
          🎲 Scorer
        </h1>

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
                totals[i] === highestScore ? "text-emerald-600" : ""
              }`}
            >
              <span>{p}</span>
              <span>{totals[i]}</span>
            </motion.div>
          ))}
        </div>

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
              <div className="flex justify-start gap-2 items-center">
                <h2 className="font-semibold">Round {rounds.length - ri}</h2>
                <button onClick={() => deleteRound(ri)}>
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
              {players.map((p, pi) => (
                <div
                  key={pi}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="text-sm font-medium">{p}</span>

                  <div className="flex items-center bg-gray-100 dark:bg-neutral-700 rounded-xl overflow-hidden shadow-sm">
                    <motion.button
                      type="button"
                      onClick={() => {
                        const copy = [...rounds];
                        copy[ri].scores[pi] = (copy[ri].scores[pi] || 0) - 1;
                        setRounds(copy);
                      }}
                      className="px-4 py-3 text-lg active:scale-95 transition"
                      whileTap={{ backgroundColor: "lightgrey" }}
                    >
                      −
                    </motion.button>

                    <input
                      type="number"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={round.scores[pi] || 0}
                      onWheel={(e) => e.currentTarget.blur()}
                      onChange={(e) => {
                        const copy = [...rounds];
                        copy[ri].scores[pi] = Number(e.target.value);
                        setRounds(copy);
                      }}
                      className="w-14 text-center bg-transparent outline-none text-base"
                    />

                    <motion.button
                      type="button"
                      onClick={() => {
                        const copy = [...rounds];
                        copy[ri].scores[pi] = (copy[ri].scores[pi] || 0) + 1;
                        setRounds(copy);
                      }}
                      className="px-4 py-3 text-lg active:scale-95 transition"
                      whileTap={{ backgroundColor: "lightgrey" }}
                    >
                      +
                    </motion.button>
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="flex justify-start gap-4 flex-wrap">
          {/* Player List with Delete */}
          {players.map((player, index) => (
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 200 }}
              key={index}
              className="flex justify-start gap-2 items-center bg-white p-2 rounded-xl shadow "
            >
              <span>{player}</span>
              <button onClick={() => deletePlayer(index)}>
                <Trash2 size={16} className="text-red-500" />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={addRound}
          className="w-full bg-black text-gray-50 py-2 rounded-2xl dark:bg-gray-50 dark:text-black"
        >
          Add Round
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
          onClick={finishGame}
          className="w-full bg-emerald-600 text-white py-2 rounded-2xl "
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
