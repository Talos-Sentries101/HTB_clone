import { BookOpen, Clock, Users } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Web Application Security',
    description: 'Master the art of finding and exploiting web vulnerabilities',
    duration: '8 hours',
    students: 1234,
    level: 'Beginner'
  },
  {
    id: 2,
    title: 'Network Penetration Testing',
    description: 'Learn professional techniques for network security assessment',
    duration: '12 hours',
    students: 856,
    level: 'Intermediate'
  },
  {
    id: 3,
    title: 'Cryptography Fundamentals',
    description: 'Understand encryption algorithms and cryptographic protocols',
    duration: '6 hours',
    students: 643,
    level: 'Beginner'
  },
  {
    id: 4,
    title: 'Advanced Exploitation',
    description: 'Deep dive into binary exploitation and reverse engineering',
    duration: '15 hours',
    students: 421,
    level: 'Advanced'
  }
];

export function Courses() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-white text-3xl font-bold mb-2">Courses</h1>
        <p className="text-gray-400">Structured learning paths to advance your skills</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-red-600/10 rounded-lg">
                <BookOpen className="w-6 h-6 text-red-500" />
              </div>
              <span className="text-xs px-3 py-1 bg-gray-800 text-gray-300 rounded-full">
                {course.level}
              </span>
            </div>

            <h3 className="text-white text-xl font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-400 text-sm mb-6">{course.description}</p>

            <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{course.students.toLocaleString()} students</span>
              </div>
            </div>

            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-medium transition-colors">
              Start Learning
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
