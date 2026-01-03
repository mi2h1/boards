import { useState, useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { db } from '../../lib/firebase';

// プレイヤー型
interface AoaPlayer {
  id: string;
  name: string;
  gems: number;
  isReturning?: boolean;
}

interface MojiHuntPlayer {
  id: string;
  name: string;
  isEliminated?: boolean;
  isReady?: boolean;
  wordLength?: number;
}

// AOAの部屋データ型
interface AoaRoom {
  code: string;
  hostId: string;
  createdAt: number;
  gameState: {
    phase: string;
    round: number;
    players: AoaPlayer[] | Record<string, AoaPlayer>;
  };
}

// もじはんとの部屋データ型
interface MojiHuntRoom {
  code: string;
  hostId: string;
  createdAt: number;
  gameState: {
    phase: string;
    currentTopic?: string;
    players: MojiHuntPlayer[] | Record<string, MojiHuntPlayer>;
    currentTurnPlayerId?: string;
  };
}

export interface AdminRoom {
  gameType: 'aoa' | 'moji-hunt';
  code: string;
  hostId: string;
  createdAt: number;
  phase: string;
  playerCount: number;
  players: Array<{ id: string; name: string }>;
  // ゲーム固有の情報
  details: {
    // AOA
    round?: number;
    // もじはんと
    currentTopic?: string;
    currentTurnPlayerName?: string;
    eliminatedCount?: number;
  };
}

export const useAdminRooms = () => {
  const [rooms, setRooms] = useState<AdminRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const aoaRef = ref(db, 'rooms');
    const mojiHuntRef = ref(db, 'moji-hunt-rooms');

    let aoaRooms: AdminRoom[] = [];
    let mojiHuntRooms: AdminRoom[] = [];

    const updateRooms = () => {
      setRooms([...aoaRooms, ...mojiHuntRooms].sort((a, b) => b.createdAt - a.createdAt));
      setIsLoading(false);
    };

    // AOAの部屋を監視
    onValue(aoaRef, (snapshot) => {
      if (!snapshot.exists()) {
        aoaRooms = [];
        updateRooms();
        return;
      }

      const data = snapshot.val();
      aoaRooms = Object.entries(data).map(([code, room]) => {
        const r = room as AoaRoom;
        const rawPlayers = r.gameState?.players;
        const players: AoaPlayer[] = Array.isArray(rawPlayers)
          ? rawPlayers
          : Object.values(rawPlayers || {}) as AoaPlayer[];

        return {
          gameType: 'aoa' as const,
          code,
          hostId: r.hostId,
          createdAt: r.createdAt || 0,
          phase: r.gameState?.phase || 'unknown',
          playerCount: players.length,
          players: players.map(p => ({ id: p.id, name: p.name })),
          details: {
            round: r.gameState?.round,
          },
        };
      });
      updateRooms();
    });

    // もじはんとの部屋を監視
    onValue(mojiHuntRef, (snapshot) => {
      if (!snapshot.exists()) {
        mojiHuntRooms = [];
        updateRooms();
        return;
      }

      const data = snapshot.val();
      mojiHuntRooms = Object.entries(data).map(([code, room]) => {
        const r = room as MojiHuntRoom;
        const rawPlayers = r.gameState?.players;
        const players: MojiHuntPlayer[] = Array.isArray(rawPlayers)
          ? rawPlayers
          : Object.values(rawPlayers || {}) as MojiHuntPlayer[];

        const currentTurnPlayer = players.find(p => p.id === r.gameState?.currentTurnPlayerId);
        const eliminatedCount = players.filter(p => p.isEliminated).length;

        return {
          gameType: 'moji-hunt' as const,
          code,
          hostId: r.hostId,
          createdAt: r.createdAt || 0,
          phase: r.gameState?.phase || 'unknown',
          playerCount: players.length,
          players: players.map(p => ({ id: p.id, name: p.name })),
          details: {
            currentTopic: r.gameState?.currentTopic,
            currentTurnPlayerName: currentTurnPlayer?.name,
            eliminatedCount,
          },
        };
      });
      updateRooms();
    });

    return () => {
      off(aoaRef);
      off(mojiHuntRef);
    };
  }, []);

  return { rooms, isLoading };
};
