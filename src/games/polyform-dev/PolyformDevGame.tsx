import { useEffect, useState, useRef } from 'react';
import { usePlayer } from '../../shared/hooks/usePlayer';
import { useRoom } from './hooks/useRoom';
import { Lobby } from './components/Lobby';
import { GamePlayPhase } from './components/GamePlayPhase';
import { GameStartTransition } from './components/GameStartTransition';

interface PolyformDevGameProps {
  onBack?: () => void;
}

export const PolyformDevGame = ({ onBack }: PolyformDevGameProps) => {
  const { playerId, playerName } = usePlayer();
  const {
    roomCode,
    roomData,
    error,
    isLoading,
    isHost,
    createRoom,
    joinRoom,
    leaveRoom,
    startGame,
    updateGameState,
    updateSettings,
    addTestPlayer,
  } = useRoom(playerId, playerName);

  // ブラウザタブタイトル設定
  useEffect(() => {
    document.title = 'PolyformDEV';
    return () => {
      document.title = 'Game Board';
    };
  }, []);

  // トランジション状態
  const [showTransition, setShowTransition] = useState(false);
  const [isStartingGame, setIsStartingGame] = useState(false);
  const prevPhaseRef = useRef<string | null>(null);
  const hasCompletedTransitionRef = useRef(false);

  const gameState = roomData?.gameState;
  const players = gameState?.players ?? [];
  const phase = gameState?.phase ?? 'waiting';

  // フェーズが waiting に戻ったらトランジション完了フラグをリセット
  useEffect(() => {
    if (phase === 'waiting') {
      hasCompletedTransitionRef.current = false;
    }
    prevPhaseRef.current = phase;
  }, [phase]);

  // トランジションを表示すべきかの計算
  // - 明示的にshowTransitionがtrue（ホストがゲーム開始時）
  // - または、フェーズがplayingでまだトランジション完了していない（非ホスト用）
  const shouldShowTransition = showTransition || (phase === 'playing' && !hasCompletedTransitionRef.current);

  // トランジション完了時のハンドラ
  const handleTransitionComplete = () => {
    hasCompletedTransitionRef.current = true;
    setShowTransition(false);
    setIsStartingGame(false);
  };

  // ゲーム開始処理（トランジション付き）
  const handleStartGame = () => {
    if (!isHost) return;

    // トランジションを表示
    setShowTransition(true);
    setIsStartingGame(true);

    // 少し待ってからゲーム開始
    setTimeout(() => {
      startGame();
    }, 300);
  };

  // ゲームプレイ中
  if (gameState && gameState.phase !== 'waiting' && playerId) {
    return (
      <>
        {/* ゲーム開始トランジション */}
        {shouldShowTransition && (
          <GameStartTransition onComplete={handleTransitionComplete} />
        )}
        <GamePlayPhase
          gameState={gameState}
          currentPlayerId={playerId}
          onLeaveRoom={leaveRoom}
          onUpdateGameState={updateGameState}
          isTransitioning={shouldShowTransition}
        />
      </>
    );
  }

  // ロビー画面（デバッグモード有効）
  return (
    <>
      {/* ゲーム開始トランジション（ロビーの上に表示） */}
      {shouldShowTransition && (
        <GameStartTransition onComplete={handleTransitionComplete} />
      )}
      <Lobby
        roomCode={roomCode}
        players={players}
        isHost={isHost}
        isLoading={isLoading}
        error={error}
        hostId={roomData?.hostId ?? ''}
        playerName={playerName}
        settings={gameState?.settings}
        onCreateRoom={createRoom}
        onJoinRoom={joinRoom}
        onLeaveRoom={leaveRoom}
        onStartGame={handleStartGame}
        onUpdateSettings={updateSettings}
        onBack={onBack}
        debugMode={true}
        onAddTestPlayer={addTestPlayer}
        isFadingOut={isStartingGame}
      />
    </>
  );
};
