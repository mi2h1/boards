import { useEffect } from 'react';
import { usePlayer } from '../../shared/hooks/usePlayer';
import { useRoom } from './hooks/useRoom';
import { Lobby } from './components/Lobby';
import { GamePlayPhase } from './components/GamePlayPhase';

interface PolyformGameProps {
  debugMode?: boolean;
  onBack?: () => void;
}

export const PolyformGame = ({ debugMode = false, onBack }: PolyformGameProps) => {
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
    addTestPlayer,
  } = useRoom(playerId, playerName);

  // ブラウザタブタイトル設定
  useEffect(() => {
    document.title = debugMode ? 'PolyformDEV' : 'Polyform';
    return () => {
      document.title = 'Game Board';
    };
  }, [debugMode]);

  const gameState = roomData?.gameState;
  const players = gameState?.players ?? [];

  // ゲームプレイ中
  if (gameState && gameState.phase !== 'waiting' && playerId) {
    return (
      <GamePlayPhase
        gameState={gameState}
        currentPlayerId={playerId}
        onLeaveRoom={leaveRoom}
        onUpdateGameState={updateGameState}
      />
    );
  }

  // ロビー画面
  return (
    <Lobby
      roomCode={roomCode}
      players={players}
      isHost={isHost}
      isLoading={isLoading}
      error={error}
      hostId={roomData?.hostId ?? ''}
      playerName={playerName}
      onCreateRoom={createRoom}
      onJoinRoom={joinRoom}
      onLeaveRoom={leaveRoom}
      onStartGame={startGame}
      onBack={onBack}
      debugMode={debugMode}
      onAddTestPlayer={addTestPlayer}
    />
  );
};
