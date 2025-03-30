class Game {
  private state: boolean[][];
  private canvas: HTMLCanvasElement;
  private cellSize: number;
  private running: boolean = false;
  private frameCount: number = 0;
  private slowdownFactor: number = 4;

  constructor(canvas: HTMLCanvasElement, cellSize: number) {
    const rows = Math.floor(canvas.height / cellSize);
    const cols = Math.floor(canvas.width / cellSize);

    this.canvas = canvas;
    this.cellSize = cellSize;

    this.state = Array(rows)
      .fill(false)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map((_) =>
        Array(cols)
          .fill(false)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .map((_) => Math.random() < 0.3)
      );

    this.drawGrid();
  }

  private updateCells(): void {
    const xMax = this.state[0].length;
    const yMax = this.state.length;

    const stateChanges: { x: number; y: number; newState: boolean }[] = [];

    for (let x = 0; x < xMax; x++) {
      for (let y = 0; y < yMax; y++) {
        const currentState: boolean = this.state[y][x];
        const newState: boolean = this.calcNewState(x, y);
        if (newState !== currentState) {
          stateChanges.push({ x, y, newState });
        }
      }
    }

    for (const change of stateChanges) {
      this.state[change.y][change.x] = change.newState;
    }
  }

  private calcNewState(x: number, y: number): boolean {
    const isAlive: boolean = !!this.state[y][x];
    const startx = x - 1 >= 0 ? x - 1 : 0;
    const starty = y - 1 >= 0 ? y - 1 : 0;
    const endx = x + 1 < this.state[0].length ? x + 1 : x;
    const endy = y + 1 < this.state.length ? y + 1 : y;

    let numNeighbors = 0;
    for (let i = startx; i <= endx; i++) {
      for (let j = starty; j <= endy; j++) {
        if (i === x && j === y) continue;
        if (this.state[j][i]) numNeighbors += 1;
      }
    }

    if (isAlive) {
      if (numNeighbors > 3) return false;
      if (numNeighbors < 2) return false;
      return true;
    }

    return numNeighbors === 3;
  }

  private drawGrid(): void {
    const ctx = this.canvas.getContext("2d");

    if (!ctx) return;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "black";

    for (let y = 0; y < this.state.length; y++) {
      for (let x = 0; x < this.state[0].length; x++) {
        if (this.state[y][x]) {
          ctx.fillRect(
            x * this.cellSize,
            y * this.cellSize,
            this.cellSize,
            this.cellSize
          );
        }
      }
    }
  }

  private gameLoop(): void {
    this.frameCount++;

    if (this.frameCount % this.slowdownFactor === 0) {
      this.updateCells();
      this.drawGrid();
    }

    if (this.running) {
      requestAnimationFrame(() => this.gameLoop());
    }
  }

  public start(): void {
    this.running = true;
    requestAnimationFrame(() => this.gameLoop());
  }

  public stop(): void {
    this.running = false;
  }

  public isRunning(): boolean {
    return this.running;
  }

  public toggleCell(screenX: number, screenY: number): void {
    const stateX = Math.floor(screenX / this.cellSize);
    const stateY = Math.floor(screenY / this.cellSize);
    const newState = !this.state[stateY][stateX];

    this.state[stateY][stateX] = newState;
    this.drawGrid();
  }
}

export default Game;
