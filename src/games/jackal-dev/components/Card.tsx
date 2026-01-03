import type { Card as CardType } from '../types/game';

interface CardProps {
  card?: CardType;
  hidden?: boolean;
  size?: 'sm' | 'md' | 'lg';
  highlighted?: boolean;
}

export const Card = ({
  card,
  hidden = false,
  size = 'md',
  highlighted = false,
}: CardProps) => {
  // サイズ設定
  const sizeClasses = {
    sm: 'w-12 h-16 text-sm',
    md: 'w-16 h-22 text-base',
    lg: 'w-20 h-28 text-lg',
  };

  const baseClasses = `
    ${sizeClasses[size]}
    rounded-lg
    flex items-center justify-center
    font-bold
    transition-all
    ${highlighted ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-slate-800' : ''}
  `;

  // カード裏面（自分のカード = 見えない）
  if (hidden || !card) {
    return (
      <div
        className={`${baseClasses} bg-gradient-to-br from-indigo-600 to-purple-700 border-2 border-indigo-400`}
      >
        <div className="text-white/30 text-2xl">?</div>
      </div>
    );
  }

  // カードの種類に応じた表示
  const getCardStyle = () => {
    switch (card.type) {
      case 'number':
        if (card.value !== null && card.value < 0) {
          // マイナス値
          return {
            bg: 'bg-gradient-to-br from-blue-600 to-blue-800',
            border: 'border-blue-400',
            text: 'text-blue-100',
          };
        } else if (card.value !== null && card.value >= 10) {
          // 高い値
          return {
            bg: 'bg-gradient-to-br from-amber-500 to-orange-600',
            border: 'border-amber-300',
            text: 'text-amber-100',
          };
        } else {
          // 通常値
          return {
            bg: 'bg-gradient-to-br from-slate-100 to-slate-300',
            border: 'border-slate-400',
            text: 'text-slate-800',
          };
        }
      case 'double':
        return {
          bg: 'bg-gradient-to-br from-pink-500 to-rose-600',
          border: 'border-pink-300',
          text: 'text-white',
        };
      case 'max_zero':
        return {
          bg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
          border: 'border-emerald-300',
          text: 'text-white',
        };
      case 'mystery':
        return {
          bg: 'bg-gradient-to-br from-violet-500 to-purple-600',
          border: 'border-violet-300',
          text: 'text-white',
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-gray-500 to-gray-700',
          border: 'border-gray-400',
          text: 'text-white',
        };
    }
  };

  const style = getCardStyle();

  return (
    <div
      className={`${baseClasses} ${style.bg} border-2 ${style.border}`}
    >
      <span className={`${style.text} font-bold`}>
        {card.label}
      </span>
    </div>
  );
};
