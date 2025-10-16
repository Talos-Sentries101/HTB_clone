import { MessageSquare, ThumbsUp, User } from 'lucide-react';

const discussions = [
  {
    id: 1,
    author: 'SecurityPro',
    title: 'Best tools for web application testing?',
    preview: 'I\'m looking for recommendations on the best tools for web app penetration testing...',
    replies: 23,
    likes: 45,
    time: '2 hours ago'
  },
  {
    id: 2,
    author: 'CyberNinja',
    title: 'How to approach buffer overflow challenges',
    preview: 'I\'m struggling with buffer overflow challenges. Can someone explain the basics...',
    replies: 18,
    likes: 32,
    time: '5 hours ago'
  },
  {
    id: 3,
    author: 'HashCracker',
    title: 'RSA encryption challenge walkthrough',
    preview: 'Just completed the RSA challenge! Here\'s my approach to solving it...',
    replies: 41,
    likes: 78,
    time: '1 day ago'
  },
  {
    id: 4,
    author: 'CodeBreaker',
    title: 'Tips for reverse engineering beginners',
    preview: 'Starting with reverse engineering? Here are some essential tips...',
    replies: 56,
    likes: 92,
    time: '2 days ago'
  }
];

export function Community() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-3xl font-bold mb-2">Community</h1>
          <p className="text-gray-400">Connect with fellow learners and share knowledge</p>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
          New Discussion
        </button>
      </div>

      <div className="space-y-4">
        {discussions.map((discussion) => (
          <div
            key={discussion.id}
            className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-medium flex-shrink-0">
                <User className="w-6 h-6" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-white font-medium">{discussion.author}</span>
                  <span className="text-gray-500 text-sm">•</span>
                  <span className="text-gray-500 text-sm">{discussion.time}</span>
                </div>
                
                <h3 className="text-white text-lg font-semibold mb-2">{discussion.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{discussion.preview}</p>
                
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>{discussion.replies} replies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{discussion.likes} likes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
