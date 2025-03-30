# Conway's Game of Life

I randomly decided to implement [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) using React + TS + Canvas. I tried to implement this A LONG time ago and the performance was terrible. I was using direct DOM maniupulation to render the cells at the time. No surprise, canvas is much more performant for this kind of thing. It actually runs much faster, but I've slowed it down from peak update frequency in order to make it easier to follow.

I'll probably add more controls and settings later, but for now it's fun to just watch a random starting state evolve.

Try it on http://pgambl.in/gol

- Press spacebar to start and stop the game.
- Toggle a cell between alive and dead by clicking on it.
