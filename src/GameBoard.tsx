import { useLayoutEffect, useRef } from 'react';
import Game from './Game';

type Props = {
  cellSize: number;
}

function GameBoard ({ cellSize }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    
    if (!container || !canvas) return;
    
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    const game = new Game(canvas, cellSize);
    gameRef.current = game;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        if (game.isRunning()) {
          game.stop();
        } else {
          game.start();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      game.stop();
      window.removeEventListener('keydown', handleKeyDown);
    }
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    if (gameRef.current) {
      gameRef.current.toggleCell(x, y);
    }
  };

  return (
    <div
      ref={containerRef} 
      style={{ width: "100%", height: "100vh", overflow: "hidden" }}
      onClick={handleClick}
    >
      <canvas width={800} height={600} ref={canvasRef}></canvas>
    </div>
  )
}

export default GameBoard;