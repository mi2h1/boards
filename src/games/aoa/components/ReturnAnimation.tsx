import { useState, useEffect } from 'react';
import type { ReturnInfo } from '../types/game';

interface ReturnAnimationProps {
  returningPlayers: ReturnInfo[];
  isIncan?: boolean;
}

// 可能な遺物価値（ドラムロール表示用）
const POSSIBLE_VALUES = [5, 10, 15, 20, 25, 50, 100];

// 単一プレイヤーのカード表示
const PlayerReturnCard = ({ returnInfo, isIncan = false }: { returnInfo: ReturnInfo; isIncan?: boolean }) => {
  const { playerName, pendingGems, bonusGems, lastSurvivorBonus, rolledRelics, allInMultiplier, total } = returnInfo;
  const relicsCount = rolledRelics.length;

  // ドラムロールの表示状態
  // インカルールでは最初から全て公開済み
  const [revealedCount, setRevealedCount] = useState(isIncan ? relicsCount : 0);
  const [isRolling, setIsRolling] = useState(false);
  const [displayValue, setDisplayValue] = useState(10);

  // 遺物のドラムロールアニメーション（インカルールではスキップ）
  useEffect(() => {
    if (isIncan) return; // インカルールではアニメーションなし
    if (relicsCount === 0 || revealedCount >= relicsCount) return;

    // 次の遺物をロール開始
    setIsRolling(true);

    // ドラムロール効果（値をランダムに変える）
    const rollInterval = setInterval(() => {
      setDisplayValue(POSSIBLE_VALUES[Math.floor(Math.random() * POSSIBLE_VALUES.length)]);
    }, 80);

    // 0.8秒後にロール停止して結果表示
    const revealTimer = setTimeout(() => {
      clearInterval(rollInterval);
      setIsRolling(false);
      setRevealedCount(prev => prev + 1);
    }, 800);

    return () => {
      clearInterval(rollInterval);
      clearTimeout(revealTimer);
    };
  }, [relicsCount, revealedCount, isIncan]);

  const relicsTotal = rolledRelics.reduce((sum, v) => sum + v, 0);

  return (
    <div className="bg-gradient-to-b from-stone-800 to-stone-900 rounded-2xl p-5 w-full max-w-md shadow-2xl border-2 border-amber-500/50">
      <h2 className="text-xl font-bold text-center text-amber-400 mb-3">
        {playerName} が帰還！
      </h2>

      <div className="space-y-2 mb-3 text-sm">
        {/* 未確定宝石 */}
        {pendingGems > 0 && (
          <div className="flex justify-between items-center bg-stone-700/50 rounded-lg px-3 py-1.5">
            <span className="text-gray-300">💎 宝石</span>
            <span className="text-emerald-400 font-bold">+{pendingGems}</span>
          </div>
        )}

        {/* 端数ボーナス */}
        {bonusGems > 0 && (
          <div className="flex justify-between items-center bg-stone-700/50 rounded-lg px-3 py-1.5">
            <span className="text-gray-300">✨ 端数</span>
            <span className="text-yellow-400 font-bold">+{bonusGems}</span>
          </div>
        )}

        {/* ラストサバイバーボーナス */}
        {lastSurvivorBonus > 0 && (
          <div className="flex justify-between items-center bg-gradient-to-r from-yellow-900/50 to-amber-900/50 rounded-lg px-3 py-1.5 border border-yellow-500/30">
            <span className="text-yellow-200">👑 ラスサバ</span>
            <span className="text-yellow-400 font-bold">+{lastSurvivorBonus}</span>
          </div>
        )}

        {/* 遺物（インカルールでは鑑定なし、直接表示） */}
        {relicsCount > 0 && (
          <div className="bg-gradient-to-r from-amber-900/50 to-yellow-900/50 rounded-lg px-3 py-2 border border-amber-500/30">
            <div className="flex justify-between items-center mb-1">
              <span className="text-amber-200">{isIncan ? '🏺 遺物' : '🏺 遺物鑑定'}</span>
              {!isIncan && <span className="text-amber-400 text-xs">{revealedCount}/{relicsCount}</span>}
            </div>

            {/* 遺物の値を表示 */}
            <div className="flex flex-wrap gap-1 justify-center">
              {rolledRelics.map((value, index) => (
                <div
                  key={index}
                  className={`
                    px-2 py-1 rounded font-bold text-sm transition-all duration-300
                    ${index < revealedCount
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white scale-100'
                      : index === revealedCount && isRolling
                        ? 'bg-gradient-to-br from-amber-500 to-yellow-600 text-white animate-pulse scale-110'
                        : 'bg-stone-600 text-stone-400 scale-90'
                    }
                  `}
                >
                  🏺 {index < revealedCount ? value : index === revealedCount && isRolling ? displayValue : '???'}
                </div>
              ))}
            </div>

            {/* 遺物合計（インカルールでは不要、複数遺物の時のみ表示） */}
            {revealedCount >= relicsCount && relicsCount > 1 && !isIncan && (
              <div className="text-center mt-1 text-amber-300 font-bold text-sm animate-pulse">
                合計: +{relicsTotal}
              </div>
            )}
          </div>
        )}

        {/* オールイン倍率 */}
        {allInMultiplier > 1 && (
          <div className="flex justify-between items-center bg-gradient-to-r from-red-900/50 to-pink-900/50 rounded-lg px-3 py-1.5 border border-red-500/30">
            <span className="text-red-200">🎰 オールイン</span>
            <span className="text-red-400 font-bold">×{allInMultiplier}</span>
          </div>
        )}
      </div>

      {/* 合計 */}
      <div className="border-t border-stone-600 pt-2">
        <div className="flex justify-between items-center">
          <span className="text-lg text-white font-bold">合計</span>
          <span className={`text-2xl font-bold ${revealedCount >= relicsCount ? 'text-yellow-400 animate-pulse' : 'text-yellow-400/50'}`}>
            +{total}
          </span>
        </div>
      </div>
    </div>
  );
};

export const ReturnAnimation = ({ returningPlayers, isIncan = false }: ReturnAnimationProps) => {
  if (returningPlayers.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in p-4">
      <div className={`flex flex-wrap gap-4 justify-center items-start ${
        returningPlayers.length > 2 ? 'max-w-4xl' : ''
      }`}>
        {returningPlayers.map((info) => (
          <PlayerReturnCard key={info.playerId} returnInfo={info} isIncan={isIncan} />
        ))}
      </div>
    </div>
  );
};
