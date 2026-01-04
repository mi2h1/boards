import type { PuzzleCard } from '../types/game';

// 白パズル（仮データ - 後で正式データに置き換え）
export const WHITE_PUZZLES: PuzzleCard[] = [
  // 3マス - 0pt
  {
    id: 'w001',
    type: 'white',
    points: 0,
    rewardPieceType: null,
    shape: [[true, true, true]],
    width: 3,
    height: 1,
  },
  {
    id: 'w002',
    type: 'white',
    points: 0,
    rewardPieceType: null,
    shape: [[true], [true], [true]],
    width: 1,
    height: 3,
  },
  // 4マス - 1pt
  {
    id: 'w003',
    type: 'white',
    points: 1,
    rewardPieceType: 'dot',
    shape: [[true, true, true, true]],
    width: 4,
    height: 1,
  },
  {
    id: 'w004',
    type: 'white',
    points: 1,
    rewardPieceType: 'dot',
    shape: [
      [true, true],
      [true, true],
    ],
    width: 2,
    height: 2,
  },
  // 5マス - 1pt
  {
    id: 'w005',
    type: 'white',
    points: 1,
    rewardPieceType: 'i2',
    shape: [[true, true, true, true, true]],
    width: 5,
    height: 1,
  },
  {
    id: 'w006',
    type: 'white',
    points: 1,
    rewardPieceType: 'i2',
    shape: [
      [true, true, true],
      [true, false, false],
      [true, false, false],
    ],
    width: 3,
    height: 3,
  },
  // 6マス - 2pt
  {
    id: 'w007',
    type: 'white',
    points: 2,
    rewardPieceType: 'i3',
    shape: [
      [true, true, true],
      [true, true, true],
    ],
    width: 3,
    height: 2,
  },
  {
    id: 'w008',
    type: 'white',
    points: 2,
    rewardPieceType: 'v3',
    shape: [
      [true, true],
      [true, true],
      [true, true],
    ],
    width: 2,
    height: 3,
  },
];

// 黒パズル（20枚）
export const BLACK_PUZZLES: PuzzleCard[] = [
  // b001: 3pt, l4報酬, 10マス
  {
    id: 'b001',
    type: 'black',
    points: 3,
    rewardPieceType: 'l4',
    shape: [
      [true, true, false],
      [true, true, false],
      [true, true, true],
      [true, true, true],
    ],
    width: 3,
    height: 4,
  },
  // b002: 3pt, i2報酬, 8マス
  {
    id: 'b002',
    type: 'black',
    points: 3,
    rewardPieceType: 'i2',
    shape: [
      [true, true, true, false, false],
      [true, true, true, true, true],
    ],
    width: 5,
    height: 2,
  },
  // b003: 3pt, i3報酬, 9マス
  {
    id: 'b003',
    type: 'black',
    points: 3,
    rewardPieceType: 'i3',
    shape: [
      [true, false, false, false],
      [true, true, false, false],
      [true, true, true, false],
      [true, true, true, false],
    ],
    width: 4,
    height: 4,
  },
  // b004: 3pt, v3報酬, 9マス
  {
    id: 'b004',
    type: 'black',
    points: 3,
    rewardPieceType: 'v3',
    shape: [
      [false, true, true, false],
      [true, true, true, false],
      [true, true, true, true],
    ],
    width: 4,
    height: 3,
  },
  // b005: 4pt, dot報酬, 12マス
  {
    id: 'b005',
    type: 'black',
    points: 4,
    rewardPieceType: 'dot',
    shape: [
      [false, false, true, false, false],
      [false, false, true, true, false],
      [false, true, true, true, false],
      [false, true, true, true, false],
      [false, true, true, true, false],
    ],
    width: 5,
    height: 5,
  },
  // b006: 4pt, i2報酬, 12マス
  {
    id: 'b006',
    type: 'black',
    points: 4,
    rewardPieceType: 'i2',
    shape: [
      [true, false, false, false, false],
      [true, true, true, false, false],
      [true, true, true, false, false],
      [true, true, true, true, true],
    ],
    width: 5,
    height: 4,
  },
  // b007: 4pt, i2報酬, 11マス
  {
    id: 'b007',
    type: 'black',
    points: 4,
    rewardPieceType: 'i2',
    shape: [
      [false, false, false, true, false],
      [false, false, true, true, false],
      [true, true, true, true, false],
      [true, true, true, true, true],
    ],
    width: 5,
    height: 4,
  },
  // b008: 3pt, i4報酬, 9マス
  {
    id: 'b008',
    type: 'black',
    points: 3,
    rewardPieceType: 'i4',
    shape: [
      [true, true, false, false],
      [true, true, true, false],
      [true, true, true, false],
      [true, true, false, false],
    ],
    width: 4,
    height: 4,
  },
  // b009: 3pt, s4報酬, 10マス
  {
    id: 'b009',
    type: 'black',
    points: 3,
    rewardPieceType: 's4',
    shape: [
      [true, false, false, false, false],
      [true, true, false, false, false],
      [true, true, true, false, false],
      [true, true, true, true, false],
    ],
    width: 5,
    height: 4,
  },
  // b010: 3pt, o4報酬, 11マス
  {
    id: 'b010',
    type: 'black',
    points: 3,
    rewardPieceType: 'o4',
    shape: [
      [false, false, true, false, false],
      [false, true, true, false, false],
      [false, true, true, false, false],
      [false, true, true, true, false],
      [false, true, true, true, false],
    ],
    width: 5,
    height: 5,
  },
  // b011: 3pt, t4報酬, 11マス
  {
    id: 'b011',
    type: 'black',
    points: 3,
    rewardPieceType: 't4',
    shape: [
      [false, false, true, true, false],
      [false, true, true, true, false],
      [false, true, true, true, false],
      [false, true, true, true, false],
    ],
    width: 5,
    height: 4,
  },
  // b012: 4pt, v3報酬, 12マス
  {
    id: 'b012',
    type: 'black',
    points: 4,
    rewardPieceType: 'v3',
    shape: [
      [false, false, true, false, false],
      [false, true, true, false, false],
      [false, true, true, false, false],
      [false, true, true, true, false],
      [true, true, true, true, true],
    ],
    width: 5,
    height: 5,
  },
  // b013: 4pt, v3報酬, 11マス
  {
    id: 'b013',
    type: 'black',
    points: 4,
    rewardPieceType: 'v3',
    shape: [
      [false, true, true, true, false],
      [true, true, true, true, true],
      [true, true, true, true, true],
    ],
    width: 5,
    height: 3,
  },
  // b014: 4pt, i3報酬, 13マス
  {
    id: 'b014',
    type: 'black',
    points: 4,
    rewardPieceType: 'i3',
    shape: [
      [false, false, false, true, true],
      [false, false, true, true, true],
      [false, true, true, true, true],
      [true, true, true, true, true],
    ],
    width: 5,
    height: 4,
  },
  // b015: 4pt, i3報酬, 12マス
  {
    id: 'b015',
    type: 'black',
    points: 4,
    rewardPieceType: 'i3',
    shape: [
      [false, false, false, false, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [false, false, true, true, true],
    ],
    width: 5,
    height: 4,
  },
  // b016: 5pt, dot報酬, 12マス
  {
    id: 'b016',
    type: 'black',
    points: 5,
    rewardPieceType: 'dot',
    shape: [
      [true, true, true, true],
      [true, true, true, true],
      [true, true, true, false],
      [true, true, true, false],
    ],
    width: 4,
    height: 4,
  },
  // b017: 5pt, dot報酬, 12マス
  {
    id: 'b017',
    type: 'black',
    points: 5,
    rewardPieceType: 'dot',
    shape: [
      [true, true, true, true, false],
      [false, true, true, true, true],
      [false, true, true, true, true],
      [true, true, true, true, false],
    ],
    width: 5,
    height: 4,
  },
  // b018: 5pt, dot報酬, 13マス
  {
    id: 'b018',
    type: 'black',
    points: 5,
    rewardPieceType: 'dot',
    shape: [
      [false, false, true, false, false],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
    ],
    width: 5,
    height: 4,
  },
  // b019: 5pt, dot報酬, 12マス
  {
    id: 'b019',
    type: 'black',
    points: 5,
    rewardPieceType: 'dot',
    shape: [
      [false, true, true, true, false],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [false, true, true, true, false],
    ],
    width: 5,
    height: 4,
  },
  // b020: 5pt, dot報酬, 12マス
  {
    id: 'b020',
    type: 'black',
    points: 5,
    rewardPieceType: 'dot',
    shape: [
      [false, false, true, true, false],
      [true, true, true, true, false],
      [false, true, true, true, true],
      [false, true, true, true, true],
      [false, true, true, false, false],
    ],
    width: 5,
    height: 5,
  },
];

// 全パズルを取得
export const ALL_PUZZLES: PuzzleCard[] = [...WHITE_PUZZLES, ...BLACK_PUZZLES];

// IDからパズルを取得
export const getPuzzleById = (id: string): PuzzleCard | undefined => {
  return ALL_PUZZLES.find((p) => p.id === id);
};
