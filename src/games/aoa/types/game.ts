// カードの種類
export type CardType = 'gem' | 'trap' | 'special' | 'relic';

// 罠の種類（アトランティス用 + インカ用）
export type TrapType = 'shark' | 'light' | 'rope' | 'bombe' | 'pressure' | 'scorpion' | 'zombi' | 'snake' | 'fire' | 'rock';

// アトランティス用罠タイプ
export const ATLANTIS_TRAP_TYPES: TrapType[] = ['shark', 'light', 'rope', 'bombe', 'pressure'];

// インカ用罠タイプ
export const INCAN_TRAP_TYPES: TrapType[] = ['scorpion', 'zombi', 'snake', 'fire', 'rock'];

// 特殊カードの効果
export type SpecialEffect = 'double_remainder' | 'bonus_all' | 'draw_three' | 'remove_trap';

// カードの定義
export interface Card {
  id: string;
  type: CardType;
  // 宝石カードの場合
  value?: number;
  // 罠カードの場合
  trapType?: TrapType;
  // 特殊カードの場合
  specialEffect?: SpecialEffect;
}

// プレイヤーの決定
export type PlayerDecision = 'proceed' | 'return' | null;

// プレイヤーの状態
export interface Player {
  id: string;
  name: string;
  confirmedGems: number;    // 確定宝石
  pendingGems: number;      // 未確定宝石
  isExploring: boolean;     // 探索中かどうか
  hasReturnedThisTurn: boolean; // このターンに帰還したか
  isAllIn: boolean;         // オールイン宣言中か
  decision: PlayerDecision; // 今ターンの選択
  relics: number[];         // 獲得した遺物の価値リスト
}

// 帰還演出用の情報
export interface ReturnInfo {
  playerId: string;
  playerName: string;
  pendingGems: number;      // 未確定宝石
  bonusGems: number;        // 端数ボーナス
  lastSurvivorBonus: number; // ラストサバイバーボーナス
  relicsCount: number;      // 獲得する遺物の数
  rolledRelics: number[];   // ロール済みの遺物価値（演出中に追加される）
  allInMultiplier: number;  // オールイン倍率
  total: number;            // 合計（遺物ロール前の値、ロール後に更新）
}

// ターンイベントの種類
export type TurnEventType = 'combo_chance' | 'last_survivor' | 'all_in_time' | null;

// ゲームのフェーズ
export type GamePhase =
  | 'waiting'        // ゲーム開始待ち
  | 'round_start'    // ラウンド開始
  | 'turn_start'     // ターン開始（イベント判定）
  | 'decision'       // プレイヤー判断（進む/帰る）
  | 'card_draw'      // カードめくり演出
  | 'card_reveal'    // カード公開（旧）
  | 'card_resolve'   // カード効果処理
  | 'return_resolve' // 帰還演出
  | 'relic_roll'     // 遺物価値ロール演出
  | 'mystery_reveal' // ミステリーカード公開演出
  | 'draw_three'     // 3枚ドロー演出
  | 'round_end'      // ラウンド終了
  | 'game_end';      // ゲーム終了

// 場に出ているカード
export interface FieldCard {
  card: Card;
  isMystery: boolean;  // 裏向きかどうか
  isRevealed: boolean; // 公開済みかどうか
  remainderGems: number; // このカードで発生した端数宝石
  revealedAtTurn?: number; // ミステリーが公開されたターン（公開ハイライト用）
}

// ゲームの状態
export interface GameState {
  phase: GamePhase;
  round: number;           // 現在のラウンド（1-5）
  turn: number;            // 現在のターン
  players: Player[];
  deck: Card[];            // 山札
  field: FieldCard[];      // 場に出ているカード
  remainderGems: number;   // 端数宝石
  trapCounts: Record<TrapType, number>; // 場に出ている罠の数
  currentEvent: TurnEventType; // 現在のターンイベント
  relicsOnField: number;       // 場にある遺物の数
  comboCount: number;      // コンボカウント（コンボチャンス時）
  returnResolve?: {            // 帰還演出用
    returningPlayers: ReturnInfo[];  // 帰還するプレイヤー情報リスト
    currentIndex: number;            // 現在処理中のインデックス
  } | null;
  relicRoll?: {               // 遺物ロール演出用
    playerId: string;
    playerName: string;
    relicsToRoll: number;     // ロールする遺物の残り数
    rolledValues: number[];   // ロール済みの価値
    currentRolling: boolean;  // ロール中かどうか
    showingResult: boolean;   // 結果表示中かどうか
  } | null;
  mysteryReveal?: {           // ミステリーカード公開演出用
    mysteryIndices: number[]; // 公開するミステリーカードのfieldインデックス
    currentIndex: number;     // 現在公開中のインデックス
    isFlipping: boolean;      // フリップ中かどうか
  } | null;
  cardDraw?: {                // カードめくり演出用
    card: Card;               // めくるカード
    isMystery: boolean;       // ミステリーかどうか
  } | null;
  drawThree?: {               // 3枚ドロー演出用
    cards: { card: Card; isMystery: boolean }[];  // ドローするカード
    currentIndex: number;     // 現在表示中のインデックス
    isFlipping: boolean;      // フリップ中かどうか
  } | null;
}

// ルールセットの種類
export type RuleSetType = 'atlantis' | 'incan_gold';

// ルールセットの設定
export interface RuleSet {
  type: RuleSetType;
  // 特殊カードを使用するか
  useSpecialCards: boolean;
  // イベントを使用するか（combo_chance, last_survivor, all_in_time）
  useEvents: boolean;
  // ミステリーカード（裏向きカード）を使用するか
  useMysteryCards: boolean;
  // 罠脱落に必要な同種カード枚数（2 or 3）
  trapBustCount: number;
  // 罠脱落時にデッキから1枚除去するか
  removeTrapOnBust: boolean;
  // 遺物の価値タイプ（'random' = ランダム抽選, 'fixed' = 固定5点/4-5個目10点）
  relicValueType: 'random' | 'fixed';
}

// 定義済みルールセット
export const RULE_SETS: Record<RuleSetType, RuleSet> = {
  atlantis: {
    type: 'atlantis',
    useSpecialCards: true,
    useEvents: true,
    useMysteryCards: true,
    trapBustCount: 3,
    removeTrapOnBust: false,
    relicValueType: 'random',
  },
  incan_gold: {
    type: 'incan_gold',
    useSpecialCards: false,
    useEvents: false,
    useMysteryCards: false,
    trapBustCount: 2,
    removeTrapOnBust: true,
    relicValueType: 'fixed',
  },
};

// ルールセットの表示名
export const RULE_SET_NAMES: Record<RuleSetType, string> = {
  atlantis: 'アトランティスの深淵',
  incan_gold: 'インカの黄金',
};

// ルールセットの説明
export const RULE_SET_DESCRIPTIONS: Record<RuleSetType, string> = {
  atlantis: '特殊カード・イベント・ミステリーカードあり',
  incan_gold: 'オリジナルルール（シンプル版）',
};

// ルームの状態
export interface Room {
  id: string;
  hostId: string;
  gameState: GameState;
  ruleSet: RuleSet;
  createdAt: number;
}

// 罠の絵文字マッピング
export const TRAP_EMOJI: Record<TrapType, string> = {
  // アトランティス用
  shark: '🦈',
  light: '💡',
  rope: '🪢',
  bombe: '🫧',
  pressure: '💀',
  // インカ用
  scorpion: '🦂',
  zombi: '🧟',
  snake: '🐍',
  fire: '🔥',
  rock: '🪨',
};

// 特殊カードの絵文字マッピング
export const SPECIAL_EMOJI: Record<SpecialEffect, string> = {
  double_remainder: '💰',
  bonus_all: '🎁',
  draw_three: '⚡',
  remove_trap: '🛡️',
};
