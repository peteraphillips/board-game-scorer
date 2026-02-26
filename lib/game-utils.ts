import { Game, Round } from "@/types/game";

export const calculateTotals = (
  players: string[],
  rounds: Round[]
) => {
  return players.map((_, i) =>
    rounds.reduce((sum, r) => sum + (r.scores[i] || 0), 0)
  );
};

export const determineWinner = (
  players: string[],
  totals: number[]
) => {
  const max = Math.max(...totals);
  const winnerIndex = totals.indexOf(max);
  return players[winnerIndex];
};

export const createGameObject = (
  players: string[],
  rounds: Round[]
): Game => {
  const totals = calculateTotals(players, rounds);
  const winner = determineWinner(players, totals);

  return {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    players,
    rounds,
    totals,
    winner,
  };
};