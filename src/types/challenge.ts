export type Category = 'All' | 'Web' | 'Crypto' | 'Forensics' | 'Reversing' | 'Exploitation';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  points: number;
}
