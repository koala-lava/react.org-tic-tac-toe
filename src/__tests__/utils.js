import { calculateWinner, calculateDraw } from '../utils';

describe('Calculate winner', () => {
  it('calculates first winning row correctly for "X"', () => {
    const squares = ['X',  'X',  'X',
                     'O', null, 'O',
                     null, null, null];
    expect(calculateWinner(squares))
      .toStrictEqual({ 'winner': 'X', 'winningLine': [0, 1, 2] });
  });

  it('calculates second winning row correctly for "X"', () => {
    const squares = [null, null, null,
                      'X', 'X', 'X',
                      'O', null, 'O'];
    expect(calculateWinner(squares))
      .toStrictEqual({ 'winner': 'X', 'winningLine': [3, 4, 5] });
  });

  it('calculates second winning row correctly for "O"', () => {
    const squares = [null, 'X', null,
                     'O', 'O', 'O',
                     'X', null, 'X'];
    expect(calculateWinner(squares))
      .toStrictEqual({ 'winner': 'O', 'winningLine': [3, 4, 5] });
  });

  it('calculates third winning row correctly for "O"', () => {
    const squares = ['X', null, null,
                     'X', null, 'X',
                     'O', 'O', 'O'];
    expect(calculateWinner(squares))
      .toStrictEqual({ 'winner': 'O', 'winningLine': [6, 7, 8] });
  });

  it('calculates first winning column correctly for "X"', () => {
    const squares = ['X', null, null,
                     'X', null, 'O',
                     'X', 'O',  'O'];
    expect(calculateWinner(squares))
      .toStrictEqual({ 'winner': 'X', 'winningLine': [0, 3, 6] });
  });

  it('calculates nw-se winning diagonal correctly for "X"', () => {
    const squares = ['X', null, null,
                      null, 'X', 'O',
                      'O', 'O', 'X'];
    expect(calculateWinner(squares))
      .toStrictEqual({ 'winner': 'X', 'winningLine': [0, 4, 8] });
  });

  it('calculates nw-se winning diagonal correctly for "X" full board', () => {
    const squares = ['X', 'O', 'X',
                     'O', 'X', 'O',
                     'O', 'X', 'X'];
    expect(calculateWinner(squares))
      .toStrictEqual({ 'winner': 'X', 'winningLine': [0, 4, 8] });
  });

  it('calculates sw-ne winning diagonal correctly for "X"', () => {
    const squares = [null, null, 'X',
                     null, 'X',  'O',
                     'X',  'O',  'O'];
    expect(calculateWinner(squares))
      .toStrictEqual({ 'winner': 'X', 'winningLine': [2, 4, 6] });
  });

  it('calculates correctly if no winner', () => {
    const squares = [null, null, 'X',
                     null, null, null,
                     'X',  'O',  'O'];
    expect(calculateWinner(squares))
      .toStrictEqual({});
  });
});


describe('Calculate draw', () => {
  it('calculates draw correctly, empty square(1:3)', () => {
    const squares = ['O', 'X', null, 
                     'X', 'O', 'O',
                     'X', 'O', 'X'];
    expect(calculateDraw(squares))
      .toStrictEqual({ 'draw': true });
  });

  it('calculates draw correctly, empty square(3:1)', () => {
    const squares = ['X', 'X', 'O', 
                     'O', 'O', 'X',
                     null,'O', 'X'];
    expect(calculateDraw(squares))
      .toStrictEqual({ 'draw': true });
  });

  it('calculates draw correctly, empty square(3:2)', () => {
    const squares = ['X', 'O', 'O', 
                     'O', 'X', 'X',
                     'X', null,'O'];
    expect(calculateDraw(squares))
      .toStrictEqual({ 'draw': true });
  });

  it('calculates draw correctly, empty square(1:1)', () => {
    const squares = [null, 'O', 'X',
                      'X', 'O', 'X',
                      'O', 'X', 'O'];
    expect(calculateDraw(squares))
      .toStrictEqual({ 'draw': true });
  });

  it('calculates draw correctly for full board', () => {
    const squares = [ 'X', 'O', 'X',
                      'X', 'O', 'X',
                      'O', 'X', 'O'];
    expect(calculateDraw(squares))
      .toStrictEqual({ 'draw': true });
  });

  it('calculates correctly if no draw' , () => {
    const squares = [ 'X', 'O', null,
                      'X', null, 'X',
                      'O', 'X', 'O'];
    expect(calculateDraw(squares))
      .toStrictEqual({});
  });

  it('calculates correctly if no draw for full board' , () => {
    const squares = ['X', 'O', 'X',
                     'O', 'X', 'O',
                     'O', 'X', 'X'];
    expect(calculateDraw(squares))
      .toStrictEqual({});
  });
  
  it('calculates correctly if no draw for full board' , () => {
    const squares = ['X', 'O', 'X',
                     'O', 'X', 'O',
                     'O', 'X', 'X'];
    expect(calculateDraw(squares))
      .toStrictEqual({});
  });
});