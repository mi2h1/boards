import { FlaskConical } from 'lucide-react';
import type { Player } from '../types/game';

interface PlayerInfoProps {
  player: Player;
  isCurrentPlayer?: boolean;
  showDecision?: boolean; // 全員決定後のみtrue
  debugMode?: boolean; // デバッグモード
  onDebugDecision?: (playerId: string, decision: 'proceed' | 'return') => void;
}

export const PlayerInfo = ({ player, isCurrentPlayer = false, showDecision = false, debugMode = false, onDebugDecision }: PlayerInfoProps) => {
  const hasDecided = player.decision === 'proceed' || player.decision === 'return';

  const statusColor = !player.isExploring
    ? 'bg-gray-500' // 帰還済み or 脱落
    : player.isAllIn
    ? 'bg-red-500' // オールイン中
    : hasDecided
    ? 'bg-blue-500' // 決定済み（内容は非公開）
    : 'bg-green-500'; // 探索中・未決定

  // 決定内容は全員揃った時のみ表示
  const decisionText = showDecision && hasDecided
    ? (player.decision === 'proceed' ? '進む' : '帰る')
    : null;

  return (
    <div
      className={`p-3 rounded-lg border-2 ${
        isCurrentPlayer ? 'border-cyan-400 bg-cyan-900/30' : 'border-slate-600 bg-slate-800/50'
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-3 h-3 rounded-full ${statusColor}`} />
        <span className="font-bold text-white">{player.name}</span>
        {player.isAllIn && <span className="text-xs bg-red-600 px-1 rounded">ALL IN</span>}
        {!player.isExploring && (
          <span className="text-xs bg-gray-600 text-gray-300 px-1 rounded">帰還済</span>
        )}
        {hasDecided && player.isExploring && !showDecision && (
          <span className="text-xs bg-blue-600 text-white px-1 rounded">確定</span>
        )}
        {decisionText && player.isExploring && (
          <span className={`text-xs px-1 rounded ${player.decision === 'proceed' ? 'bg-emerald-600' : 'bg-indigo-600'}`}>
            {decisionText}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="text-white">
          確定: <span className="text-cyan-300 font-bold">{player.confirmedGems}</span>
        </div>
        <div className="text-white">
          未確定: <span className="text-emerald-400 font-bold">{player.pendingGems}</span>
        </div>
      </div>

      <div className="mt-1 text-xs text-slate-500">
        合計: {player.confirmedGems + player.pendingGems}
      </div>

      {/* 遺物表示 */}
      {player.relics && player.relics.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {player.relics.map((value, index) => (
            <span
              key={index}
              className="text-xs bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-1.5 py-0.5 rounded"
              title={`遺物: ${value}点`}
            >
              🏺{value}
            </span>
          ))}
        </div>
      )}

      {/* デバッグ用投票ボタン */}
      {debugMode && player.isExploring && onDebugDecision && (
        <div className="mt-2 flex gap-1">
          <button
            onClick={() => onDebugDecision(player.id, 'proceed')}
            className={`flex-1 text-xs py-1 px-2 rounded transition-colors ${
              player.decision === 'proceed'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-600 hover:bg-emerald-700 text-slate-300'
            }`}
          >
            進む
          </button>
          <button
            onClick={() => onDebugDecision(player.id, 'return')}
            className={`flex-1 text-xs py-1 px-2 rounded transition-colors ${
              player.decision === 'return'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-600 hover:bg-indigo-700 text-slate-300'
            }`}
          >
            帰る
          </button>
        </div>
      )}
    </div>
  );
};

interface PlayerListProps {
  players: Player[];
  currentPlayerId?: string;
  allDecided?: boolean;
  debugMode?: boolean;
  onDebugDecision?: (playerId: string, decision: 'proceed' | 'return') => void;
}

export const PlayerList = ({ players, currentPlayerId, allDecided = false, debugMode = false, onDebugDecision }: PlayerListProps) => {
  // 配列を安全に取得
  const safePlayers = Array.isArray(players) ? players : [];

  return (
    <div className="space-y-2">
      <h3 className="text-white font-bold text-sm mb-2 flex items-center gap-2">
        プレイヤー
        {debugMode && (
          <span className="text-xs bg-orange-600 text-white px-1.5 py-0.5 rounded inline-flex items-center gap-1">
            <FlaskConical className="w-3 h-3" />
          </span>
        )}
      </h3>
      {safePlayers.map(player => (
        <PlayerInfo
          key={player.id}
          player={player}
          isCurrentPlayer={player.id === currentPlayerId}
          showDecision={allDecided}
          debugMode={debugMode}
          onDebugDecision={onDebugDecision}
        />
      ))}
    </div>
  );
};

// 6列グリッド用のコンパクトなプレイヤーカード
interface PlayerCardCompactProps extends PlayerInfoProps {
  showConfirmedGems?: boolean; // 確定宝石を表示するか（自分 or ラウンド終了時のみtrue）
}

const PlayerCardCompact = ({ player, isCurrentPlayer = false, showDecision = false, showConfirmedGems = false, debugMode = false, onDebugDecision }: PlayerCardCompactProps) => {
  const hasDecided = player.decision === 'proceed' || player.decision === 'return';

  const decisionText = showDecision && hasDecided
    ? (player.decision === 'proceed' ? '進む' : '帰る')
    : null;

  // 確定宝石は自分のカードか、ラウンド終了時のみ表示
  const canSeeConfirmed = isCurrentPlayer || showConfirmedGems;

  // ボーダースタイルの決定
  // - 自分のカード: シアンのハイライトのみ（待機/確定ボーダーなし）
  // - 他プレイヤー:
  //   - 帰還済み: グレー
  //   - 探索中 + 未確定: 青の回転グラデーション（待機中）
  //   - 探索中 + 確定: 緑
  const isWaiting = player.isExploring && !hasDecided;
  const isConfirmed = player.isExploring && hasDecided;
  const isReturned = !player.isExploring;

  // 自分のカードはシアンのハイライトのみ
  // 他プレイヤーは待機中/確定/帰還済みでボーダーを変える
  let cardClassName: string;
  if (isCurrentPlayer) {
    cardClassName = 'p-2 rounded-lg border-2 h-full border-cyan-400 bg-cyan-900/30';
  } else if (isWaiting) {
    cardClassName = 'waiting-border p-2 h-full';
  } else if (isConfirmed) {
    cardClassName = 'p-2 rounded-lg border-2 h-full border-emerald-500 bg-slate-800/50';
  } else if (isReturned) {
    cardClassName = 'p-2 rounded-lg border-2 h-full border-gray-600 bg-slate-800/30';
  } else {
    cardClassName = 'p-2 rounded-lg border-2 h-full border-slate-600 bg-slate-800/50';
  }

  return (
    <div className={cardClassName}>
      {/* 名前とステータス（ラベルは右寄せ） */}
      <div className="flex items-center gap-1 mb-1">
        <span className="font-bold text-white text-xs truncate">{player.name}</span>
        <div className="flex-1" />
        {/* ラベル（右寄せ） */}
        {player.isAllIn && <span className="text-[10px] bg-red-600 px-1 rounded">ALL IN</span>}
        {!player.isExploring && (
          <span className="text-[10px] bg-gray-600 text-gray-300 px-1 rounded">帰還済</span>
        )}
        {hasDecided && player.isExploring && !showDecision && (
          <span className="text-[10px] bg-blue-600 text-white px-1 rounded">確定</span>
        )}
        {decisionText && player.isExploring && (
          <span className={`text-[10px] px-1 rounded ${player.decision === 'proceed' ? 'bg-emerald-600' : 'bg-indigo-600'}`}>
            {decisionText}
          </span>
        )}
      </div>

      {/* 宝石 */}
      <div className="text-[10px] text-slate-300 space-y-0.5">
        {/* 確定宝石は自分かゲーム終了時のみ表示 */}
        {canSeeConfirmed && (
          <div>確定: <span className="text-cyan-300 font-bold">{player.confirmedGems}</span></div>
        )}
        <div>未確定: <span className="text-emerald-400 font-bold">{player.pendingGems}</span></div>
      </div>

      {/* 遺物（全員に見える） */}
      {player.relics && player.relics.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-0.5">
          {player.relics.map((value, index) => (
            <span
              key={index}
              className="text-[10px] bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-1 rounded"
            >
              🏺{value}
            </span>
          ))}
        </div>
      )}

      {/* デバッグ用投票ボタン */}
      {debugMode && player.isExploring && onDebugDecision && (
        <div className="mt-1 flex gap-1">
          <button
            onClick={() => onDebugDecision(player.id, 'proceed')}
            className={`flex-1 text-[10px] py-0.5 px-1 rounded transition-colors ${
              player.decision === 'proceed'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-600 hover:bg-emerald-700 text-slate-300'
            }`}
          >
            進
          </button>
          <button
            onClick={() => onDebugDecision(player.id, 'return')}
            className={`flex-1 text-[10px] py-0.5 px-1 rounded transition-colors ${
              player.decision === 'return'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-600 hover:bg-indigo-700 text-slate-300'
            }`}
          >
            帰
          </button>
        </div>
      )}
    </div>
  );
};

// 空のスロット
const EmptyPlayerSlot = () => (
  <div className="p-2 rounded-lg border-2 border-slate-700 border-dashed bg-slate-800/20 h-full min-h-[80px] flex items-center justify-center">
    <span className="text-slate-600 text-xs">空席</span>
  </div>
);

// 6列グリッドのプレイヤーカード
interface PlayerCardGridProps {
  players: Player[];
  currentPlayerId?: string;
  allDecided?: boolean;
  showConfirmedGems?: boolean; // 確定宝石を全員に公開するか（ラウンド終了時のみtrue）
  debugMode?: boolean;
  onDebugDecision?: (playerId: string, decision: 'proceed' | 'return') => void;
}

export const PlayerCardGrid = ({ players, currentPlayerId, allDecided = false, showConfirmedGems = false, debugMode = false, onDebugDecision }: PlayerCardGridProps) => {
  const safePlayers = Array.isArray(players) ? players : [];
  const slots = Array(6).fill(null);

  // プレイヤーをスロットに配置
  safePlayers.forEach((player, index) => {
    if (index < 6) {
      slots[index] = player;
    }
  });

  return (
    <div className="grid grid-cols-6 gap-2">
      {slots.map((player, index) => (
        <div key={index}>
          {player ? (
            <PlayerCardCompact
              player={player}
              isCurrentPlayer={player.id === currentPlayerId}
              showDecision={allDecided}
              showConfirmedGems={showConfirmedGems}
              debugMode={debugMode}
              onDebugDecision={onDebugDecision}
            />
          ) : (
            <EmptyPlayerSlot />
          )}
        </div>
      ))}
    </div>
  );
};
