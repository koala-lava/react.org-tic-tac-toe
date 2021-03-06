import React from 'react'
import Board from './Board'
import { calculateWinner, calculateDraw } from '../utils'

export default class Game extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          coords: null
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      asc: true
    }
  }

  handleClickOnSquare (i, winner = false) {
    const { stepNumber, xIsNext } = this.state
    const history = this.state.history.slice(0, stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if (winner || squares[i]) {
      return
    }
    squares[i] = xIsNext ? 'X' : 'O'
    const row = i < 3 ? 1 : i < 6 ? 2 : 3
    const col = i % 3 + 1
    this.setState({
      history: [...history, { squares: squares, coords: [row, col] }],
      stepNumber: history.length,
      xIsNext: !xIsNext
    })
  }

  jumpTo (step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    })
  }

  sortMoves () {
    this.setState({ asc: !this.state.asc })
  }

  render () {
    const { history, asc, stepNumber, xIsNext } = this.state
    const current = history[stepNumber]
    const { draw } =
      stepNumber <= 7 ? {} : calculateDraw(current.squares, stepNumber)
    const { winner, winningLine } = draw
      ? {}
      : calculateWinner(current.squares)

    let moves = history.map((step, move) => {
      const text = move
        ? 'Go to move #' + move + ' (' + step.coords.join(':') + ')'
        : 'Go to game start'
      return (
        <li key={move}>
          <button
            onClick={(e) => {
              this.jumpTo(move)
              const buttons = document.querySelectorAll('ol button')
              buttons.forEach((button) => (button.style = ''))
              e.target.style.fontWeight = 'bold'
            }}
          >
            {text}
          </button>
        </li>
      )
    })

    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else if (draw) {
      status = 'Draw: No winner'
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O')
    }

    let sortBtnText
    if (asc) {
      sortBtnText = 'Sort desc'
    } else {
      moves = moves.sort((a, b) => b.key - a.key)
      sortBtnText = 'Sort asc'
    }
    const sort = (
      <button className='sort' onClick={() => this.sortMoves()}>
        {sortBtnText}
      </button>
    )

    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClickOnSquare(i, winner)}
            winningLine={winningLine}
            draw={draw}
          />
        </div>
        <div className='game-info'>
          <div>{status}</div>
          <ol>{moves}</ol>
          {history.length > 1 && sort}
        </div>
      </div>
    )
  }
}
