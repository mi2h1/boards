import { Heart } from 'lucide-react';
import { Card } from './Card';
import type { GameState } from '../types/game';

interface JudgmentPhaseProps {
  gameState: GameState;
  playerId: string;
  onNextRound: () => void;
  onLeaveRoom: () => void;
}

export const JudgmentPhase = ({
  gameState,
  playerId,
  onNextRound,
  onLeaveRoom,
}: JudgmentPhaseProps) => {
  const { judgmentResult, round, players } = gameState;

  if (!judgmentResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="text-white">判定結果を読み込み中...</div>
      </div>
    );
  }

  const {
    declaredValue,
    totalValue,
    loserId,
    loserName,
    reason,
    cardDetails,
    mysteryCard,
    hasDouble,
    hasMaxZero,
  } = judgmentResult;

  const loser = players.find(p => p.id === loserId);
  const isLoserMe = loserId === playerId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-white">ラウンド {round} 結果</h1>
        </div>

        {/* 判定結果 */}
        <div className={`rounded-xl p-6 mb-6 text-center ${
          isLoserMe ? 'bg-red-900/50' : 'bg-slate-800/80'
        }`}>
          <div className="text-slate-400 text-sm mb-2">宣言された数字</div>
          <div className="text-4xl font-bold text-white mb-4">{declaredValue}</div>

          <div className="text-2xl mb-2">
            {declaredValue > totalValue ? (
              <span className="text-red-400">{'>'}</span>
            ) : (
              <span className="text-green-400">{'≤'}</span>
            )}
          </div>

          <div className="text-slate-400 text-sm mb-2">カードの合計</div>
          <div className="text-4xl font-bold text-white mb-4">
            {totalValue}
            {hasDouble && <span className="text-pink-400 text-lg ml-2">(×2適用)</span>}
            {hasMaxZero && <span className="text-emerald-400 text-lg ml-2">(MAX→0適用)</span>}
          </div>

          {/* 負けた人 */}
          <div className="mt-6 pt-4 border-t border-slate-600">
            <div className="text-lg font-bold mb-2">
              {reason === 'over' ? (
                <span className="text-red-400">宣言オーバー！</span>
              ) : (
                <span className="text-orange-400">ジャッカル失敗！</span>
              )}
            </div>
            <div className={`text-xl ${isLoserMe ? 'text-red-300' : 'text-white'}`}>
              {loserName} がライフ -1
            </div>
            {loser && (
              <div className="flex items-center justify-center gap-1 mt-2">
                {Array.from({ length: loser.life }).map((_, i) => (
                  <Heart key={i} className="w-5 h-5 text-red-400 fill-red-400" />
                ))}
                {loser.life === 0 && (
                  <span className="text-red-400 ml-2">脱落！</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 全カード公開 */}
        <div className="bg-slate-800/60 rounded-xl p-4 mb-6">
          <h3 className="text-white font-bold text-center mb-4">公開されたカード</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {cardDetails.map((detail) => {
              const player = players.find(p => p.id === detail.playerId);
              const isMe = detail.playerId === playerId;

              return (
                <div
                  key={detail.playerId}
                  className={`flex flex-col items-center p-3 rounded-lg ${
                    detail.playerId === loserId ? 'bg-red-900/30' : 'bg-slate-700/50'
                  }`}
                >
                  <Card card={detail.card} size="md" />
                  <div className="mt-2 text-center">
                    <div className={`text-sm font-medium ${isMe ? 'text-yellow-300' : 'text-white'}`}>
                      {player?.name}
                      {isMe && ' (自分)'}
                    </div>
                    <div className="text-slate-400 text-xs">
                      → {detail.resolvedValue}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ?カードで引いたカード */}
          {mysteryCard && (
            <div className="mt-4 pt-4 border-t border-slate-600 text-center">
              <div className="text-slate-400 text-sm mb-2">?カードで引いたカード</div>
              <div className="flex justify-center">
                <Card card={mysteryCard} size="sm" />
              </div>
            </div>
          )}
        </div>

        {/* アクションボタン */}
        <div className="flex gap-3">
          <button
            onClick={onLeaveRoom}
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
          >
            退出
          </button>
          <button
            onClick={onNextRound}
            className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-lg text-white font-bold transition-all"
          >
            次のラウンドへ
          </button>
        </div>
      </div>
    </div>
  );
};
