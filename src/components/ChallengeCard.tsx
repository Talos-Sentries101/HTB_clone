import { Challenge } from '../types/challenge';

interface ChallengeCardProps {
  challenge: Challenge;
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  const difficultyColors = {
    Easy: 'text-green-500',
    Medium: 'text-yellow-500',
    Hard: 'text-red-500'
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all">
      <h3 className="text-white text-xl font-semibold mb-3">{challenge.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-6">
        {challenge.description}
      </p>

      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium ${difficultyColors[challenge.difficulty]}`}>
          {challenge.difficulty}
        </span>
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
          Start Challenge
        </button>
      </div>
    </div>
  );
}
