import type { GamePhase, TurnEventType, Player, PlayerDecision, Card, TrapType } from '../types/game';

// 罠の日本語名
const TRAP_NAMES: Record<TrapType, string> = {
  // アトランティス用
  shark: 'サメ',
  light: 'ライト',
  rope: 'ロープ',
  bombe: '機雷',
  pressure: '水圧',
  // インカ用
  scorpion: 'サソリ',
  zombi: 'ゾンビ',
  snake: 'ヘビ',
  fire: '炎',
  rock: '落石',
};

// 罠の警告メッセージ（1枚目・2枚目）
const TRAP_WARNING_MESSAGES: Record<TrapType, string[]> = {
  // アトランティス用
  shark: ['サメの気配がする...', 'サメが近づいている！'],
  light: ['ライトがちらついている...', 'ライトの調子がおかしい！'],
  rope: ['ロープが傷んでいる...', 'ロープが切れそうだ！'],
  bombe: ['機雷を発見した...', '機雷が増えている！'],
  pressure: ['水圧が上がってきた...', '水圧が危険なレベルだ！'],
  // インカ用
  scorpion: ['サソリの巣だ...', 'サソリが群がっている！'],
  zombi: ['うめき声が聞こえる...', 'ゾンビが近づいてきた！'],
  snake: ['ヘビがいる...', 'ヘビが襲いかかってきた！'],
  fire: ['火の気配がする...', '炎が燃え広がっている！'],
  rock: ['天井が揺れている...', '岩が落ちてきそうだ！'],
};

// 罠の脱落メッセージ（揃った時）
const TRAP_DANGER_MESSAGES: Record<TrapType, string> = {
  // アトランティス用
  shark: 'サメに襲われた！強制帰還！',
  light: 'ライトが壊れた！強制帰還！',
  rope: 'ロープが切れた！強制帰還！',
  bombe: '機雷が爆発した！強制帰還！',
  pressure: '水圧に押し潰された！強制帰還！',
  // インカ用
  scorpion: 'サソリに刺された！強制帰還！',
  zombi: 'ゾンビに襲われた！強制帰還！',
  snake: 'ヘビに噛まれた！強制帰還！',
  fire: '炎に巻き込まれた！強制帰還！',
  rock: '落石に巻き込まれた！強制帰還！',
};

interface GameControlsProps {
  phase: GamePhase;
  currentEvent: TurnEventType;
  isExploring: boolean;
  isAllIn: boolean;
  round: number;
  decision: PlayerDecision;
  allDecided: boolean;
  isHost: boolean;
  players: Player[];
  // カードアナウンス用
  cardDraw?: { card: Card; isMystery: boolean } | null;
  trapCounts?: Record<TrapType, number>;
  remainderGems?: number;
  isIncan?: boolean;  // インカの黄金ルールか
  onProceed: () => void;
  onReturn: () => void;
  onAllIn: (declare: boolean) => void;
  onStartRound: () => void;
  onNextRound: () => void;
  onStartGame: () => void;
}

export const GameControls = ({
  phase,
  currentEvent,
  isExploring,
  isAllIn,
  round,
  decision,
  allDecided,
  isHost,
  players,
  cardDraw,
  trapCounts,
  remainderGems = 0,
  isIncan = false,
  onProceed,
  onReturn,
  onAllIn,
  onStartRound,
  onNextRound,
  onStartGame,
}: GameControlsProps) => {
  // 配列を安全に取得
  const safePlayers = Array.isArray(players) ? players : [];

  // 探索中のプレイヤー
  const exploringPlayers = safePlayers.filter(p => p.isExploring);

  // ラウンド開始（ホストのみ）
  if (phase === 'round_start') {
    return (
      <div className="min-h-[100px] flex items-center justify-center">
        {isHost ? (
          <button
            onClick={onStartRound}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600
              hover:from-emerald-600 hover:to-teal-700 rounded-xl text-white font-bold text-xl
              shadow-lg transform hover:scale-105 transition-all"
          >
            探索開始
          </button>
        ) : (
          <div className="text-slate-400 py-4">
            ホストの探索開始を待っています...
          </div>
        )}
      </div>
    );
  }

  // オールインタイム - 宣言フェーズ
  if (phase === 'turn_start' && currentEvent === 'all_in_time' && isExploring && !isAllIn) {
    return (
      <div className="min-h-[100px] flex flex-col items-center justify-center space-y-4">
        <div className="text-center text-white font-bold text-lg">
          オールイン宣言しますか？
        </div>
        <div className="text-center text-cyan-300 text-sm mb-4">
          成功で2倍！失敗で全て没収...
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => onAllIn(true)}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-700
              hover:from-red-600 hover:to-red-800 rounded-xl text-white font-bold
              shadow-lg transform hover:scale-105 transition-all"
          >
            オールイン！
          </button>
          <button
            onClick={() => onAllIn(false)}
            className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-700
              hover:from-gray-600 hover:to-gray-800 rounded-xl text-white font-bold
              shadow-lg transform hover:scale-105 transition-all"
          >
            パス
          </button>
        </div>
      </div>
    );
  }

  // プレイヤー判断フェーズ
  if (phase === 'decision') {
    // 自分が探索中で未決定の場合
    if (isExploring && decision === null) {
      return (
        <div className="min-h-[100px] flex flex-col items-center justify-center space-y-4">
          <div className="flex gap-4 justify-center">
            <button
              onClick={onProceed}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600
                hover:from-emerald-600 hover:to-green-700 rounded-xl text-white font-bold text-xl
                shadow-lg transform hover:scale-105 transition-all"
            >
              進む
            </button>
            <button
              onClick={onReturn}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600
                hover:from-blue-600 hover:to-indigo-700 rounded-xl text-white font-bold text-xl
                shadow-lg transform hover:scale-105 transition-all"
            >
              帰る
            </button>
          </div>
          {/* 他プレイヤーの決定状況 */}
          <div className="text-center text-slate-400 text-sm">
            決定済み: {exploringPlayers.filter(p => p.decision === 'proceed' || p.decision === 'return').length} / {exploringPlayers.length}
          </div>
        </div>
      );
    }

    // 自分が決定済み or 帰還済みの場合
    const decidedCount = exploringPlayers.filter(p => p.decision === 'proceed' || p.decision === 'return').length;

    return (
      <div className="min-h-[100px] flex flex-col items-center justify-center space-y-4">
        {decision !== null && !allDecided && (
          <div className="text-center text-blue-400 font-bold">
            決定しました（他のプレイヤーを待っています...）
          </div>
        )}
        {allDecided && (
          <div className="text-center space-y-2">
            <div className="text-cyan-300 font-bold text-lg">
              全員の決定が揃いました！
            </div>
            <div className="text-slate-300">
              {exploringPlayers.map(p => (
                <span key={p.id} className="inline-block mx-2">
                  {p.name}: <span className={p.decision === 'proceed' ? 'text-emerald-400' : 'text-indigo-400'}>
                    {p.decision === 'proceed' ? '進む' : '帰る'}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}
        {!isExploring && (
          <div className="text-center text-blue-400 font-bold">
            帰還済み
          </div>
        )}

        {/* 決定状況 */}
        {!allDecided && (
          <div className="text-center text-slate-400 text-sm">
            決定済み: {decidedCount} / {exploringPlayers.length}
          </div>
        )}
      </div>
    );
  }

  // ラウンド終了（罠脱落時）
  if (phase === 'round_end') {
    const isLastRound = round >= 5;
    return (
      <div className="min-h-[100px] flex flex-col items-center justify-center text-center space-y-4">
        <div className="text-red-400 font-bold text-xl">
          罠が揃った！全員脱落！
        </div>
        <div className="text-slate-400">
          ラウンド {round} 終了
        </div>
        {isHost ? (
          <button
            onClick={onNextRound}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-600
              hover:from-cyan-600 hover:to-teal-700 rounded-xl text-white font-bold text-xl
              shadow-lg transform hover:scale-105 transition-all"
          >
            {isLastRound ? '結果を見る' : '次のラウンドへ'}
          </button>
        ) : (
          <div className="text-slate-400 py-4">
            ホストが次のラウンドを開始するのを待っています...
          </div>
        )}
      </div>
    );
  }

  // ゲーム終了
  if (phase === 'game_end') {
    // 最終スコアでソート
    const sortedPlayers = [...safePlayers].sort((a, b) => b.confirmedGems - a.confirmedGems);
    const winner = sortedPlayers[0];

    return (
      <div className="min-h-[100px] flex flex-col items-center justify-center text-center space-y-4">
        <div className="text-cyan-300 font-bold text-2xl">
          ゲーム終了！
        </div>
        <div className="text-white text-xl">
          優勝: {winner.name} ({winner.confirmedGems}点)
        </div>
        <div className="space-y-1">
          {sortedPlayers.map((player, index) => (
            <div key={player.id} className="text-slate-400">
              {index + 1}位: {player.name} - {player.confirmedGems}点
            </div>
          ))}
        </div>
        {isHost && (
          <button
            onClick={onStartGame}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-600
              hover:from-cyan-600 hover:to-teal-700 rounded-xl text-white font-bold
              shadow-lg transform hover:scale-105 transition-all"
          >
            もう一度プレイ
          </button>
        )}
      </div>
    );
  }

  // カードアナウンスを生成
  const getCardAnnouncement = () => {
    if (!cardDraw) {
      return null;
    }

    // ミステリーカード
    if (cardDraw.isMystery) {
      return {
        type: 'mystery',
        message: 'ミステリーカード！',
        subMessage: '誰かが帰還した時に公開',
      };
    }

    const { card } = cardDraw;

    // 宝石カード
    if (card.type === 'gem' && card.value !== undefined) {
      const value = card.value;
      const playerCount = exploringPlayers.length;
      const distributed = playerCount > 0 ? Math.floor(value / playerCount) : 0;
      const remainder = playerCount > 0 ? value % playerCount : value;

      if (playerCount === 0) {
        return {
          type: 'gem',
          message: `${value}個の宝石を発見！`,
          subMessage: '探索者がいないため、全て残留',
        };
      }

      return {
        type: 'gem',
        message: `${value}個の宝石を発見！`,
        subMessage: distributed > 0
          ? `各${distributed}個を分配${remainder > 0 ? `、${remainder}個が残留` : ''}`
          : `${remainder}個が残留（分配なし）`,
      };
    }

    // 罠カード
    if (card.type === 'trap' && card.trapType) {
      const trapType = card.trapType;
      const count = trapCounts?.[trapType] ?? 0;
      const trapName = TRAP_NAMES[trapType];
      const trapBustCount = isIncan ? 2 : 3;  // インカは2枚、アトランティスは3枚で脱落

      if (count >= trapBustCount - 1) {
        // 脱落（インカ: 2枚目、アトランティス: 3枚目）
        return {
          type: 'danger',
          message: TRAP_DANGER_MESSAGES[trapType],
          subMessage: `${trapName}の罠が揃った...`,
        };
      } else {
        // 警告（1枚目 or それ以降）
        const warningIndex = Math.min(count, 1);
        return {
          type: 'warning',
          message: TRAP_WARNING_MESSAGES[trapType][warningIndex],
          subMessage: `${trapName}: ${count + 1}/${trapBustCount}`,
        };
      }
    }

    // 特殊カード
    if (card.type === 'special' && card.specialEffect) {
      const effectMessages: Record<string, { message: string; subMessage: string }> = {
        double_remainder: { message: '端数が2倍になった！', subMessage: `${remainderGems}個 → ${remainderGems * 2}個` },
        bonus_all: { message: '全員にボーナス！', subMessage: '探索者全員に+5' },
        draw_three: { message: '3枚ドロー発動！', subMessage: '連続で3枚めくる...' },
        remove_trap: { message: '罠が除去された！', subMessage: '場の最古の罠を除外' },
      };
      const effectInfo = effectMessages[card.specialEffect];
      if (effectInfo) {
        return { type: 'special', ...effectInfo };
      }
    }

    // 遺物カード
    if (card.type === 'relic') {
      return {
        type: 'relic',
        message: '遺物を発見！',
        subMessage: '1人で帰還すると獲得できる',
      };
    }

    return null;
  };

  const announcement = getCardAnnouncement();

  // その他のフェーズ（card_draw, return_resolve, mystery_revealなど）
  return (
    <div className="min-h-[100px] flex items-center justify-center">
      {announcement ? (
        <div className="text-center space-y-1">
          <div className={`font-bold text-lg ${
            announcement.type === 'gem' ? 'text-emerald-400' :
            announcement.type === 'danger' ? 'text-red-400' :
            announcement.type === 'warning' ? 'text-amber-400' :
            announcement.type === 'special' ? 'text-cyan-400' :
            announcement.type === 'relic' ? 'text-amber-300' :
            announcement.type === 'mystery' ? 'text-purple-400' :
            'text-slate-300'
          }`}>
            {announcement.message}
          </div>
          <div className="text-slate-400 text-sm">{announcement.subMessage}</div>
        </div>
      ) : (
        <div className="text-slate-400">処理中...</div>
      )}
    </div>
  );
};
