export interface Round {
  scores: number[];
}

export interface Game {
  id: string;
  date: string;
  players: string[];
  rounds: Round[];
  totals: number[];
  winner: string;
}