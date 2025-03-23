import React from "react";

interface RecipeCardProps {
  title: string;
  description: string;
  cookingTime: string;
  difficulty: string;
}

export const RecipeCard = ({
  title,
  description,
  cookingTime,
  difficulty,
}: RecipeCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-primary/10 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <h2 className="font-heading text-2xl text-primary mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center space-x-4 text-sm">
          <span className="flex items-center text-primary-accent">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {cookingTime}
          </span>
          <span className="flex items-center text-secondary-sage">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {difficulty}
          </span>
        </div>
      </div>
    </div>
  );
};
