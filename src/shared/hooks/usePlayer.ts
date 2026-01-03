import { useState, useEffect, useCallback } from 'react';

const PLAYER_NAME_KEY = 'lche-board-player-name';
const PLAYER_ID_KEY = 'lche-board-player-id';

// ユニークIDを生成
const generatePlayerId = (): string => {
  return 'p_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
};

export const usePlayer = () => {
  const [playerName, setPlayerNameState] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 初期化: localStorageから読み込み
  useEffect(() => {
    const storedName = localStorage.getItem(PLAYER_NAME_KEY);
    let storedId = localStorage.getItem(PLAYER_ID_KEY);

    // IDがなければ生成
    if (!storedId) {
      storedId = generatePlayerId();
      localStorage.setItem(PLAYER_ID_KEY, storedId);
    }

    setPlayerNameState(storedName);
    setPlayerId(storedId);
    setIsLoading(false);
  }, []);

  // プレイヤー名を設定
  const setPlayerName = useCallback((name: string) => {
    const trimmedName = name.trim();
    if (trimmedName) {
      localStorage.setItem(PLAYER_NAME_KEY, trimmedName);
      setPlayerNameState(trimmedName);
    }
  }, []);

  // プレイヤー名をクリア（デバッグ用）
  const clearPlayerName = useCallback(() => {
    localStorage.removeItem(PLAYER_NAME_KEY);
    setPlayerNameState(null);
  }, []);

  return {
    playerId,
    playerName,
    setPlayerName,
    clearPlayerName,
    isLoading,
    hasName: !!playerName,
  };
};
