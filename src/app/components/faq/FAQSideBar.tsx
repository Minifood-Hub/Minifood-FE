import React from 'react';

interface FAQSideBarProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
}

export default function FAQSideBar({
  categories,
  selectedCategory,
  onSelectCategory,
}: FAQSideBarProps) {
  return (
    <div className="mt-[31px] mb-12 flex w-40 h-[814px] py-6 px-[18px] flex-col gap-[18px] rounded-lg bg-gray-0">
      <div className="flex w-[124px] flex-col items-start gap-[18px]">
        {categories.map((category) => (
          <div
            key={category}
            className={`flex w-full p-3 items-center rounded ${
              selectedCategory === category
                ? 'bg-primary-3 text-white'
                : 'bg-gray-0 text-gray-7'
            } text-center text-lg font-semibold cursor-pointer`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}
