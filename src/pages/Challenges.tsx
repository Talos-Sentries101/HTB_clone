import { useState } from 'react';
import { CategoryFilter } from '../components/CategoryFilter';
import { ChallengeCard } from '../components/ChallengeCard';
import { Category, Challenge } from '../types/challenge';

const challenges: Challenge[] = [
  {
    id: '1',
    title: 'SQL Injection Basics',
    description: 'Learn the fundamentals of SQL injection attacks and how to exploit vulnerable web applications.',
    category: 'Web',
    difficulty: 'Easy',
    points: 100
  },
  {
    id: '2',
    title: 'RSA Encryption',
    description: 'Break weak RSA encryption implementation by factoring small prime numbers.',
    category: 'Crypto',
    difficulty: 'Medium',
    points: 250
  },
  {
    id: '3',
    title: 'Memory Forensics',
    description: 'Analyze a memory dump to find hidden artifacts and recover deleted data.',
    category: 'Forensics',
    difficulty: 'Hard',
    points: 500
  },
  {
    id: '4',
    title: 'Buffer Overflow',
    description: 'Exploit a buffer overflow vulnerability to gain control of program execution.',
    category: 'Exploitation',
    difficulty: 'Hard',
    points: 450
  },
  {
    id: '5',
    title: 'Reverse Engineering 101',
    description: 'Analyze and reverse engineer a simple binary to find the flag.',
    category: 'Reversing',
    difficulty: 'Medium',
    points: 300
  },
  {
    id: '6',
    title: 'XSS Attack',
    description: 'Find and exploit Cross-Site Scripting vulnerabilities in a web application.',
    category: 'Web',
    difficulty: 'Easy',
    points: 150
  }
];

export function Challenges() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredChallenges = activeCategory === 'All'
    ? challenges
    : challenges.filter(c => c.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-white text-3xl font-bold mb-2">Challenges</h1>
        <p className="text-gray-400">Test your skills with hands-on cybersecurity challenges</p>
      </div>

      <div className="mb-8">
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {filteredChallenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
}
