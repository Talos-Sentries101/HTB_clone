import { Category } from '../types/challenge';

interface CategoryFilterProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: Category[] = ['All', 'Web', 'Crypto', 'Forensics', 'Reversing', 'Exploitation'];

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
            activeCategory === category
              ? 'bg-gray-800 text-white border border-gray-700'
              : 'text-gray-400 hover:text-white hover:bg-gray-900'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
