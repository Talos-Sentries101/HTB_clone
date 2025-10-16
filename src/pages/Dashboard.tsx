import { TrendingUp, Award, Target } from 'lucide-react';
import { PwnBox } from '../components/PwnBox';

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-white text-3xl font-bold mb-2">Welcome back, Student!</h1>
        <p className="text-gray-400">Continue your cybersecurity journey</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-600/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Points</p>
              <p className="text-white text-2xl font-bold">1,250</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-600/10 rounded-lg">
              <Award className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Challenges Completed</p>
              <p className="text-white text-2xl font-bold">23</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600/10 rounded-lg">
              <Target className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Current Streak</p>
              <p className="text-white text-2xl font-bold">7 days</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-white text-xl font-semibold mb-4">Practice Environment</h2>
        <PwnBox challengeId="demo-001" challengeTitle="Getting Started" />
      </div>
    </div>
  );
}
