"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, RotateCcw } from "lucide-react";

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

  const reset = () => {
    setRounds([{ scores: players.map(() => 0) }]);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="text-3xl font-bold text-center">🎲 Round Scorer</h1>

        <div className="flex gap-2">
          <input
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            placeholder="Add player"
            className="flex-1 rounded-xl border px-3 py-2"
          />
          <button
            onClick={addPlayer}
            className="bg-black text-white px-4 rounded-xl"
          >
            <Plus size={18} />
          </button>
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

        <button
          onClick={addRound}
          className="w-full bg-black text-white py-2 rounded-2xl"
        >
          Add Round
        </button>

        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="font-semibold mb-2">Totals</h2>
          {players.map((p, i) => (
            <div key={i} className="flex justify-between font-medium">
              <span>{p}</span>
              <span>{totals[i]}</span>
            </div>
          ))}
        </div>

        <button
          onClick={reset}
          className="w-full border py-2 rounded-2xl flex justify-center gap-2"
        >
          <RotateCcw size={16} /> Reset Game
        </button>
      </div>
    </div>
  );
}
