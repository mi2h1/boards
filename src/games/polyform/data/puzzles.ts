import type { PuzzleCard } from '../types/game';

// 白パズル（32枚）- すべて5x5グリッド
export const WHITE_PUZZLES: PuzzleCard[] = [
  // w001: 0pt, t4報酬
  {
    id: 'w001',
    type: 'white',
    points: 0,
    rewardPieceType: 't4',
    shape: [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, true, false, false],
      [false, true, true, true, false],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w002: 1pt, l4報酬
  {
    id: 'w002',
    type: 'white',
    points: 1,
    rewardPieceType: 'l4',
    shape: [
      [false, false, false, false, false],
      [false, true, false, false, false],
      [false, true, true, false, false],
      [false, true, true, true, false],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w003: 2pt, o4報酬
  {
    id: 'w003',
    type: 'white',
    points: 2,
    rewardPieceType: 'o4',
    shape: [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [true, true, true, true, false],
      [false, true, true, true, true],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w004: 0pt, i3報酬
  {
    id: 'w004',
    type: 'white',
    points: 0,
    rewardPieceType: 'i3',
    shape: [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, true, true, true, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w005: 1pt, i4報酬
  {
    id: 'w005',
    type: 'white',
    points: 1,
    rewardPieceType: 'i4',
    shape: [
      [false, false, false, false, false],
      [false, true, false, false, false],
      [false, true, false, true, false],
      [false, true, true, true, false],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w006: 1pt, dot報酬
  {
    id: 'w006',
    type: 'white',
    points: 1,
    rewardPieceType: 'dot',
    shape: [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w007: 1pt, s4報酬
  {
    id: 'w007',
    type: 'white',
    points: 1,
    rewardPieceType: 's4',
    shape: [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, true, true, false, false],
      [true, true, true, true, false],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w008: 1pt, t4報酬
  {
    id: 'w008',
    type: 'white',
    points: 1,
    rewardPieceType: 't4',
    shape: [
      [false, false, false, false, false],
      [false, false, false, true, false],
      [false, true, true, true, false],
      [false, true, true, false, false],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w009: 0pt, v3報酬
  {
    id: 'w009',
    type: 'white',
    points: 0,
    rewardPieceType: 'v3',
    shape: [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, true, false, false, false],
      [false, true, true, false, false],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w010: 0pt, s4報酬
  {
    id: 'w010',
    type: 'white',
    points: 0,
    rewardPieceType: 's4',
    shape: [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, true, true, false, false],
      [false, false, true, true, false],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w011: 1pt, v3報酬
  {
    id: 'w011',
    type: 'white',
    points: 1,
    rewardPieceType: 'v3',
    shape: [
      [false, false, false, false, false],
      [false, true, true, false, false],
      [false, false, true, true, false],
      [false, false, false, true, false],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w012: 2pt, i4報酬
  {
    id: 'w012',
    type: 'white',
    points: 2,
    rewardPieceType: 'i4',
    shape: [
      [false, false, false, false, false],
      [false, true, false, false, false],
      [false, true, true, true, false],
      [false, true, true, true, false],
      [false, false, true, true, false],
    ],
    width: 5,
    height: 5,
  },
  // w013: 1pt, i2報酬
  {
    id: 'w013',
    type: 'white',
    points: 1,
    rewardPieceType: 'i2',
    shape: [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, true, true, true, false],
      [false, false, true, false, false],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w014: 1pt, i2報酬
  {
    id: 'w014',
    type: 'white',
    points: 1,
    rewardPieceType: 'i2',
    shape: [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, true, false],
      [false, false, true, true, false],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w015: 2pt, v3報酬
  {
    id: 'w015',
    type: 'white',
    points: 2,
    rewardPieceType: 'v3',
    shape: [
      [false, false, false, false, false],
      [false, true, false, false, false],
      [false, true, true, false, false],
      [false, true, true, true, false],
      [false, true, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w016: 2pt, i2報酬
  {
    id: 'w016',
    type: 'white',
    points: 2,
    rewardPieceType: 'i2',
    shape: [
      [false, false, false, false, false],
      [false, true, true, true, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w017: 0pt, l4報酬
  {
    id: 'w017',
    type: 'white',
    points: 0,
    rewardPieceType: 'l4',
    shape: [
      [false, false, false, false, false],
      [false, true, false, false, false],
      [false, true, false, false, false],
      [false, true, true, false, false],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w018: 0pt, i2報酬
  {
    id: 'w018',
    type: 'white',
    points: 0,
    rewardPieceType: 'i2',
    shape: [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w019: 0pt, i2報酬
  {
    id: 'w019',
    type: 'white',
    points: 0,
    rewardPieceType: 'i2',
    shape: [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w020: 2pt, s4報酬
  {
    id: 'w020',
    type: 'white',
    points: 2,
    rewardPieceType: 's4',
    shape: [
      [false, false, false, false, false],
      [false, false, true, false, false],
      [false, false, true, true, false],
      [false, true, true, true, false],
      [false, false, true, true, false],
    ],
    width: 5,
    height: 5,
  },
  // w021: 1pt, i3報酬
  {
    id: 'w021',
    type: 'white',
    points: 1,
    rewardPieceType: 'i3',
    shape: [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, true, true, false, false],
      [false, true, true, true, false],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w022: 1pt, o4報酬
  {
    id: 'w022',
    type: 'white',
    points: 1,
    rewardPieceType: 'o4',
    shape: [
      [false, false, false, false, false],
      [false, true, false, false, false],
      [false, true, false, false, false],
      [false, true, false, false, false],
      [false, true, true, true, false],
    ],
    width: 5,
    height: 5,
  },
  // w023: 0pt, i3報酬
  {
    id: 'w023',
    type: 'white',
    points: 0,
    rewardPieceType: 'i3',
    shape: [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, true, true, false, false],
      [false, false, true, false, false],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w024: 0pt, o4報酬
  {
    id: 'w024',
    type: 'white',
    points: 0,
    rewardPieceType: 'o4',
    shape: [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, true, true, false, false],
      [false, true, true, false, false],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w025: 1pt, i3報酬
  {
    id: 'w025',
    type: 'white',
    points: 1,
    rewardPieceType: 'i3',
    shape: [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [true, true, true, true, true],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w026: 0pt, v3報酬
  {
    id: 'w026',
    type: 'white',
    points: 0,
    rewardPieceType: 'v3',
    shape: [
      [false, false, false, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w027: 1pt, v3報酬
  {
    id: 'w027',
    type: 'white',
    points: 1,
    rewardPieceType: 'v3',
    shape: [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, true, false, true, false],
      [false, true, true, true, false],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w028: 2pt, i3報酬
  {
    id: 'w028',
    type: 'white',
    points: 2,
    rewardPieceType: 'i3',
    shape: [
      [false, false, false, false, false],
      [false, true, true, false, false],
      [false, true, true, false, false],
      [false, true, true, true, false],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w029: 2pt, t4報酬
  {
    id: 'w029',
    type: 'white',
    points: 2,
    rewardPieceType: 't4',
    shape: [
      [false, false, false, false, false],
      [true, true, false, false, false],
      [true, true, true, true, false],
      [false, false, true, true, false],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w030: 0pt, i4報酬
  {
    id: 'w030',
    type: 'white',
    points: 0,
    rewardPieceType: 'i4',
    shape: [
      [false, false, false, false, false],
      [false, true, false, false, false],
      [false, true, false, false, false],
      [false, true, false, false, false],
      [false, true, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w031: 1pt, i2報酬
  {
    id: 'w031',
    type: 'white',
    points: 1,
    rewardPieceType: 'i2',
    shape: [
      [false, false, false, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, false, false, false],
    ],
    width: 5,
    height: 5,
  },
  // w032: 2pt, l4報酬
  {
    id: 'w032',
    type: 'white',
    points: 2,
    rewardPieceType: 'l4',
    shape: [
      [false, false, false, false, false],
      [false, false, true, false, false],
      [false, true, true, true, false],
      [false, true, true, true, false],
      [false, false, true, false, false],
    ],
    width: 5,
    height: 5,
  },
];

// 黒パズル（20枚）- すべて5x5グリッド
export const BLACK_PUZZLES: PuzzleCard[] = [
  // b001: 3pt, l4報酬
  {
    id: 'b001',
    type: 'black',
    points: 3,
    rewardPieceType: 'l4',
    shape: [
      [false, false, false, false, false],
      [false, true, true, false, false],
      [false, true, true, false, false],
      [false, true, true, true, false],
      [false, true, true, true, false],
    ],
    width: 5,
    height: 5,
  },
  // b002: 3pt, i2報酬
  {
    id: 'b002',
    type: 'black',
    points: 3,
    rewardPieceType: 'i2',
    shape: [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [true, true, true, false, false],
      [true, true, true, true, true],
    ],
    width: 5,
    height: 5,
  },
  // b003: 3pt, i3報酬
  {
    id: 'b003',
    type: 'black',
    points: 3,
    rewardPieceType: 'i3',
    shape: [
      [false, false, false, false, false],
      [false, true, false, false, false],
      [false, true, true, false, false],
      [false, true, true, true, false],
      [false, true, true, true, false],
    ],
    width: 5,
    height: 5,
  },
  // b004: 3pt, v3報酬
  {
    id: 'b004',
    type: 'black',
    points: 3,
    rewardPieceType: 'v3',
    shape: [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, true, true, false, false],
      [true, true, true, false, false],
      [true, true, true, true, false],
    ],
    width: 5,
    height: 5,
  },
  // b005: 4pt, dot報酬
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
  // b006: 4pt, i2報酬
  {
    id: 'b006',
    type: 'black',
    points: 4,
    rewardPieceType: 'i2',
    shape: [
      [false, false, false, false, false],
      [false, true, false, false, false],
      [false, true, true, true, false],
      [false, true, true, true, false],
      [true, true, true, true, true],
    ],
    width: 5,
    height: 5,
  },
  // b007: 4pt, i2報酬
  {
    id: 'b007',
    type: 'black',
    points: 4,
    rewardPieceType: 'i2',
    shape: [
      [false, false, false, false, false],
      [false, false, false, true, false],
      [false, false, true, true, false],
      [true, true, true, true, false],
      [true, true, true, true, true],
    ],
    width: 5,
    height: 5,
  },
  // b008: 3pt, i4報酬
  {
    id: 'b008',
    type: 'black',
    points: 3,
    rewardPieceType: 'i4',
    shape: [
      [false, false, false, false, false],
      [false, true, true, false, false],
      [false, true, true, true, false],
      [false, true, true, true, false],
      [false, true, true, false, false],
    ],
    width: 5,
    height: 5,
  },
  // b009: 3pt, s4報酬
  {
    id: 'b009',
    type: 'black',
    points: 3,
    rewardPieceType: 's4',
    shape: [
      [false, false, false, false, false],
      [true, false, false, false, false],
      [true, true, false, false, false],
      [true, true, true, false, false],
      [true, true, true, true, false],
    ],
    width: 5,
    height: 5,
  },
  // b010: 3pt, o4報酬
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
  // b011: 3pt, t4報酬
  {
    id: 'b011',
    type: 'black',
    points: 3,
    rewardPieceType: 't4',
    shape: [
      [false, false, false, false, false],
      [false, false, true, true, false],
      [false, true, true, true, false],
      [false, true, true, true, false],
      [false, true, true, true, false],
    ],
    width: 5,
    height: 5,
  },
  // b012: 4pt, v3報酬
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
  // b013: 4pt, v3報酬
  {
    id: 'b013',
    type: 'black',
    points: 4,
    rewardPieceType: 'v3',
    shape: [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, true, true, true, false],
      [true, true, true, true, true],
      [true, true, true, true, true],
    ],
    width: 5,
    height: 5,
  },
  // b014: 4pt, i3報酬
  {
    id: 'b014',
    type: 'black',
    points: 4,
    rewardPieceType: 'i3',
    shape: [
      [false, false, false, false, false],
      [false, false, false, true, true],
      [false, false, true, true, true],
      [false, true, true, true, true],
      [true, true, true, true, true],
    ],
    width: 5,
    height: 5,
  },
  // b015: 4pt, i3報酬
  {
    id: 'b015',
    type: 'black',
    points: 4,
    rewardPieceType: 'i3',
    shape: [
      [false, false, false, false, false],
      [false, false, false, false, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [false, false, true, true, true],
    ],
    width: 5,
    height: 5,
  },
  // b016: 5pt, dot報酬
  {
    id: 'b016',
    type: 'black',
    points: 5,
    rewardPieceType: 'dot',
    shape: [
      [false, false, false, false, false],
      [false, true, true, true, true],
      [false, true, true, true, true],
      [true, true, true, true, false],
      [true, true, true, true, false],
    ],
    width: 5,
    height: 5,
  },
  // b017: 5pt, dot報酬
  {
    id: 'b017',
    type: 'black',
    points: 5,
    rewardPieceType: 'dot',
    shape: [
      [false, false, false, false, false],
      [true, true, true, true, false],
      [false, true, true, true, true],
      [false, true, true, true, true],
      [true, true, true, true, false],
    ],
    width: 5,
    height: 5,
  },
  // b018: 5pt, dot報酬
  {
    id: 'b018',
    type: 'black',
    points: 5,
    rewardPieceType: 'dot',
    shape: [
      [false, false, false, false, false],
      [false, false, true, false, false],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
    ],
    width: 5,
    height: 5,
  },
  // b019: 5pt, dot報酬
  {
    id: 'b019',
    type: 'black',
    points: 5,
    rewardPieceType: 'dot',
    shape: [
      [false, false, false, false, false],
      [false, true, true, true, false],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [false, true, true, true, false],
    ],
    width: 5,
    height: 5,
  },
  // b020: 5pt, dot報酬
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
