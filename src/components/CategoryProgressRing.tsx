import React from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CategoryProgressRingProps {
  percentage: number;
  readCount: number;
  totalCount: number;
  categoryTitle?: string;
  size?: number;
  strokeWidth?: number;
}

export const CategoryProgressRing: React.FC<CategoryProgressRingProps> = ({
  percentage,
  readCount,
  totalCount,
  categoryTitle,
  size = 38,
  strokeWidth = 3.2,
}) => {
  const { language } = useLanguage();

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  const strokeDashoffset = circumference - (circumference * clampedPercentage) / 100;

  const isCompleted = clampedPercentage === 100;
  const isInProgress = clampedPercentage > 0 && !isCompleted;

  // Accessible description and tooltip
  const tooltipText = language === 'ar'
    ? `${categoryTitle ? `${categoryTitle}: ` : ''}${readCount} من ${totalCount} مقروء (${clampedPercentage}%)`
    : `${categoryTitle ? `${categoryTitle}: ` : ''}${readCount} of ${totalCount} read (${clampedPercentage}%)`;

  const safeCategorySlug = categoryTitle ? categoryTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'category';

  return (
    <div
      id={`category-progress-ring-${safeCategorySlug}`}
      className="flex flex-col items-center justify-center shrink-0"
      title={tooltipText}
      role="progressbar"
      aria-valuenow={clampedPercentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={tooltipText}
    >
      <div
        className={`relative flex items-center justify-center rounded-full transition-colors ${
          isCompleted ? 'bg-emerald-50/80 ring-1 ring-emerald-200' : 'bg-slate-50/50'
        }`}
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          {/* Track / Background Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className={isCompleted ? 'text-emerald-100' : 'text-slate-200'}
            stroke="currentColor"
          />

          {/* Active Progress Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke={isCompleted ? '#10B981' : isInProgress ? '#005293' : '#CBD5E1'}
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          {isCompleted ? (
            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3] animate-in zoom-in duration-200" />
          ) : (
            <span
              className={`text-[9px] font-black tracking-tighter ${
                isInProgress ? 'text-[#005293]' : 'text-slate-400'
              }`}
            >
              {clampedPercentage}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
