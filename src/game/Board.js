import React from 'react'
import PropTypes from 'prop-types'

function Square (props) {
  let btnClass = 'square'
  if (props.isWinning) btnClass += ' square-winning'
  if (props.draw) btnClass += ' square-draw'
  return (
    <button className={btnClass} onClick={props.onClick} data-testid='square'>
      {props.value}
    </button>
  )
}

export default class Board extends React.Component {
  renderSquare (i) {
    const { squares, winningLine, onClick, draw } = this.props
    let isWinning
    if (winningLine) {
      isWinning = winningLine.includes(i)
    }

    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinning={isWinning}
        draw={draw}
      />
    )
  }

  render () {
    const cols = [[]]
    for (let i = 0, y = 0; i < 9; i++) {
      if (i % 3 === 0 && i !== 0) {
        y++
        cols.push([])
      }
      cols[y].push(this.renderSquare(i))
    }
    const rows = []
    for (let i = 0; i < 3; i++) {
      rows.push(<div key={i} className='board-row'>{cols[i]}</div>)
    }

    return <>{rows}</>
  }
}

const common = {
  onClick: PropTypes.func.isRequired,
  draw: PropTypes.bool
}

Square.propTypes = Object.assign({
  isWinning: PropTypes.bool,
  value: PropTypes.string
}, common)

Board.propTypes = Object.assign({
  squares: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])).isRequired,
  winningLine: PropTypes.array
}, common)
