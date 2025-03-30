import GameBoard from './GameBoard';
import './App.css'

function App() {
  return (
    <div id="gameContainer">
      <GameBoard cellSize={10} />
    </div>
  )
}

export default App
