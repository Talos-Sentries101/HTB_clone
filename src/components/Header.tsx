import { Search, Bell } from 'lucide-react';

type Page = 'dashboard' | 'courses' | 'challenges' | 'community';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const navItems: { page: Page; label: string }[] = [
    { page: 'dashboard', label: 'Dashboard' },
    { page: 'courses', label: 'Courses' },
    { page: 'challenges', label: 'Challenges' },
    { page: 'community', label: 'Community' }
  ];

  return (
    <header className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-0.5">
                <div className="w-8 h-1 bg-red-600 rounded"></div>
                <div className="w-8 h-1 bg-red-600 rounded"></div>
                <div className="w-8 h-1 bg-red-600 rounded"></div>
              </div>
              <span className="text-white text-xl font-semibold">CyberLearn</span>
            </div>

            <nav className="flex items-center gap-8">
              {navItems.map(({ page, label }) => (
                <button
                  key={page}
                  onClick={() => onNavigate(page)}
                  className={`transition-colors ${
                    currentPage === page
                      ? 'text-white font-medium'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-900 text-white border border-gray-700 rounded-lg pl-12 pr-4 py-2.5 w-64 focus:outline-none focus:border-gray-600 transition-colors"
              />
            </div>

            <button className="p-2.5 hover:bg-gray-900 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-white" />
            </button>

            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-medium">
              S
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
