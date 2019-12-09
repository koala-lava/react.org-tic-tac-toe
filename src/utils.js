export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        'winner': squares[a],
        'winningLine': lines[i]
      };
    }
  }

  return {};
}

export function calculateDraw(squares) {
  const empty = squares.indexOf(null);
  //'empty>-2' allows to pass '0 index' as truthy value, not found -1 also ok 
  if (empty > -2 && squares.indexOf(null, empty + 1) === -1) {
    const test = squares.slice();
    let draw;
    test[empty] = 'X';
    if (!calculateWinner(test).winner) {
      draw = true;
    }
    if (draw) {
      return { 'draw': true };
    }
  }

  return {};
}