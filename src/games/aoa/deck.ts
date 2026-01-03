import type { Card, TrapType, SpecialEffect, RuleSet } from './types/game';
import { ATLANTIS_TRAP_TYPES, INCAN_TRAP_TYPES } from './types/game';

// ユニークIDを生成
const generateId = (): string => Math.random().toString(36).substring(2, 9);

// ===== アトランティスの深淵用 =====

// 宝石カードを生成（アトランティス版: 37枚）
const createAtlantisGemCards = (): Card[] => {
  const cards: Card[] = [];

  // 低額（4枚ずつ）
  [1, 2, 3, 4, 5].forEach(value => {
    for (let i = 0; i < 4; i++) {
      cards.push({ id: generateId(), type: 'gem' as const, value });
    }
  });

  // 中額（3枚ずつ）
  [7, 9, 11].forEach(value => {
    for (let i = 0; i < 3; i++) {
      cards.push({ id: generateId(), type: 'gem' as const, value });
    }
  });

  // 高額（2枚ずつ）
  [15, 20, 25].forEach(value => {
    for (let i = 0; i < 2; i++) {
      cards.push({ id: generateId(), type: 'gem' as const, value });
    }
  });

  // 超高額（1枚ずつ）
  [30, 50].forEach(value => {
    cards.push({ id: generateId(), type: 'gem' as const, value });
  });

  return cards;
};

// 罠カードを生成（アトランティス版: 5種×4枚=20枚）
const createAtlantisTrapCards = (): Card[] => {
  const cards: Card[] = [];

  // 各罠を4枚ずつ（アトランティス用罠タイプを使用）
  for (const trapType of ATLANTIS_TRAP_TYPES) {
    for (let i = 0; i < 4; i++) {
      cards.push({
        id: generateId(),
        type: 'trap',
        trapType,
      });
    }
  }

  return cards;
};

// ===== インカの黄金用 =====

// 宝石カードを生成（インカの黄金版: 15枚）
// 値: 1, 2, 3, 4, 5, 5, 7, 7, 9, 11, 11, 13, 14, 15, 17
const createIncanGemCards = (): Card[] => {
  const values = [1, 2, 3, 4, 5, 5, 7, 7, 9, 11, 11, 13, 14, 15, 17];
  return values.map(value => ({
    id: generateId(),
    type: 'gem' as const,
    value,
  }));
};

// 罠カードを生成（インカの黄金版: 5種×3枚=15枚）
const createIncanTrapCards = (): Card[] => {
  const cards: Card[] = [];

  // 各罠を3枚ずつ（インカ用罠タイプを使用）
  for (const trapType of INCAN_TRAP_TYPES) {
    for (let i = 0; i < 3; i++) {
      cards.push({
        id: generateId(),
        type: 'trap',
        trapType,
      });
    }
  }

  return cards;
};

// 特殊カードを生成
const createSpecialCards = (): Card[] => {
  const effects: SpecialEffect[] = [
    'double_remainder',
    'bonus_all',
    'draw_three',
    'remove_trap',
  ];

  return effects.map(effect => ({
    id: generateId(),
    type: 'special',
    specialEffect: effect,
  }));
};

// 遺物カードを生成
const createRelicCards = (count: number): Card[] => {
  const cards: Card[] = [];
  for (let i = 0; i < count; i++) {
    cards.push({
      id: generateId(),
      type: 'relic',
    });
  }
  return cards;
};

// デッキをシャッフル
export const shuffleDeck = <T>(deck: T[]): T[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// デッキを生成（初期遺物5枚含む）
export const createDeck = (ruleSet?: RuleSet): Card[] => {
  const isIncan = ruleSet?.type === 'incan_gold';

  // ルールに応じた宝石・罠カード
  const gemCards = isIncan ? createIncanGemCards() : createAtlantisGemCards();
  const trapCards = isIncan ? createIncanTrapCards() : createAtlantisTrapCards();
  const relicCards = createRelicCards(5); // 初期遺物5枚

  // 特殊カードはルールセットで有効な場合のみ含める
  const specialCards = ruleSet?.useSpecialCards !== false ? createSpecialCards() : [];

  const deck = [...gemCards, ...trapCards, ...specialCards, ...relicCards];
  return shuffleDeck(deck);
};

// 既存デッキに遺物を1枚追加してシャッフル
export const addRelicToDeck = (deck: Card[]): Card[] => {
  const newRelic = createRelicCards(1)[0];
  return shuffleDeck([...deck, newRelic]);
};

// 遺物の価値をルーレットで決定（アトランティス版）
export const rollRelicValue = (): number => {
  const random = Math.random() * 100;
  // 5: 5%, 10: 25%, 15: 30%, 20: 25%, 25: 10%, 50: 4%, 100: 1%
  if (random < 5) return 5;
  if (random < 30) return 10;
  if (random < 60) return 15;
  if (random < 85) return 20;
  if (random < 95) return 25;
  if (random < 99) return 50;
  return 100; // 1%でジャックポット！
};

// 遺物の価値を取得（インカの黄金版: 固定値）
// relicCount: プレイヤーが既に持っている遺物の数
export const getFixedRelicValue = (relicCount: number): number => {
  // 4個目以降は10点、それ以外は5点
  return relicCount >= 3 ? 10 : 5;
};

// デッキから特定の罠カードを1枚除去
export const removeTrapFromDeck = (deck: Card[], trapType: TrapType): Card[] => {
  const index = deck.findIndex(card => card.type === 'trap' && card.trapType === trapType);
  if (index === -1) return deck;

  const newDeck = [...deck];
  newDeck.splice(index, 1);
  return newDeck;
};

// ミステリー発生判定（5%）
// useMysteryCardsがfalseの場合は常にfalseを返す
export const shouldBeMystery = (useMysteryCards: boolean = true): boolean => {
  if (!useMysteryCards) return false;
  return Math.random() < 0.05; // 5%
};

// ターンイベント発生判定（10%）
// オールインタイムは5ラウンド目のみ
// useEventsがfalseの場合は常にnullを返す
export const rollTurnEvent = (round: number, useEvents: boolean = true): 'combo_chance' | 'last_survivor' | 'all_in_time' | null => {
  if (!useEvents) return null;
  if (Math.random() >= 0.10) return null;

  // 5ラウンド目はオールインタイムも含む
  if (round === 5) {
    const events = ['combo_chance', 'last_survivor', 'all_in_time'] as const;
    return events[Math.floor(Math.random() * events.length)];
  }

  // 1-4ラウンドはコンボとサバイバーのみ
  const events = ['combo_chance', 'last_survivor'] as const;
  return events[Math.floor(Math.random() * events.length)];
};
