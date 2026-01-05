// カード一覧コンポーネント（カウンティング用）

import { CARD_REFERENCE } from '../lib/cards';

// 表示用のカードデータ（高い数字から順に）
const DISPLAY_CARDS = [
  { label: '20', count: 1, color: 'bg-red-600' },
  { label: '15', count: 2, color: 'bg-orange-500' },
  { label: '10', count: 3, color: 'bg-amber-500' },
  { label: '5', count: 4, color: 'bg-yellow-400 text-slate-900' },
  { label: '4', count: 4, color: 'bg-lime-300 text-slate-900' },
  { label: '3', count: 4, color: 'bg-stone-200 text-slate-900' },
  { label: '2', count: 4, color: 'bg-stone-200 text-slate-900' },
  { label: '1', count: 4, color: 'bg-stone-200 text-slate-900' },
  { label: '0', count: 4, color: 'bg-stone-200 text-slate-900', note: '※1枚は0⟳' },
  { label: '-5', count: 2, color: 'bg-cyan-400 text-slate-900' },
  { label: '-10', count: 1, color: 'bg-blue-500' },
  // 特殊カード
  { label: '×2', count: 1, color: 'bg-yellow-300 text-slate-900', special: true },
  { label: 'MAX→0', count: 1, color: 'bg-yellow-300 text-slate-900', special: true },
  { label: '?', count: 1, color: 'bg-yellow-300 text-slate-900', special: true },
];

export const CardReference = () => {
  return (
    <div className="bg-slate-800/80 rounded-xl p-3 h-fit">
      <div className="text-slate-400 text-xs mb-2 text-center">
        カード一覧（{CARD_REFERENCE.totalCards}枚）
      </div>
      <div className="space-y-1">
        {DISPLAY_CARDS.map((card) => (
          <div
            key={card.label}
            className="flex items-center gap-2"
          >
            {/* カード値 */}
            <div
              className={`w-14 py-0.5 rounded text-center text-xs font-bold ${card.color}`}
            >
              {card.label}
            </div>
            {/* 枚数インジケーター */}
            <div className="flex gap-0.5">
              {Array.from({ length: card.count }).map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-sm bg-slate-500"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
