import React from 'react'
import { Game } from '../game'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

test('highlight winning squares and render Winner status', () => {
  const { getAllByTestId, getByText } = render(<Game />)

  const sqr0 = getAllByTestId('square')[0]
  const sqr1 = getAllByTestId('square')[1]
  const sqr4 = getAllByTestId('square')[4]
  const sqr2 = getAllByTestId('square')[2]
  const sqr8 = getAllByTestId('square')[8]

  expect(sqr0).toBeEmpty()
  fireEvent.click(sqr0)
  expect(sqr0).toHaveTextContent('X')
  expect(sqr0).not.toHaveClass('square-winning')
  expect(getByText('Go to move #1 (1:1)')).toBeInTheDocument()
  fireEvent.click(sqr1)
  expect(sqr1).toHaveTextContent('O')
  fireEvent.click(sqr4)
  expect(sqr4).toHaveTextContent('X')
  fireEvent.click(sqr2)
  expect(sqr2).toHaveTextContent('O')
  fireEvent.click(sqr8)
  expect(sqr8).toHaveTextContent('X')
  expect(sqr0).toHaveClass('square-winning')
  expect(sqr4).toHaveClass('square-winning')
  expect(sqr8).toHaveClass('square-winning')
  expect(getByText('Winner: X')).toBeInTheDocument()
})

test('higlights draw correctly and Draw status', () => {
  const { getAllByTestId, getByText } = render(<Game />)

  const sqr0 = getAllByTestId('square')[0]
  const sqr1 = getAllByTestId('square')[1]
  const sqr2 = getAllByTestId('square')[2]
  const sqr3 = getAllByTestId('square')[3]
  const sqr4 = getAllByTestId('square')[4]
  const sqr5 = getAllByTestId('square')[5]
  const sqr6 = getAllByTestId('square')[6]
  const sqr7 = getAllByTestId('square')[7]
  const sqr8 = getAllByTestId('square')[8]

  expect(sqr0).toBeEmpty()
  expect(sqr0).not.toHaveClass('square-draw')
  fireEvent.click(sqr0)
  expect(sqr0).toHaveTextContent('X')
  expect(sqr0).not.toHaveClass('square-winning')
  expect(getByText('Go to move #1 (1:1)')).toBeInTheDocument()
  fireEvent.click(sqr1)
  expect(sqr1).toHaveTextContent('O')
  fireEvent.click(sqr4)
  expect(sqr4).toHaveTextContent('X')
  fireEvent.click(sqr2)
  expect(sqr2).toHaveTextContent('O')
  fireEvent.click(sqr6)
  expect(sqr6).toHaveTextContent('X')
  fireEvent.click(sqr3)
  expect(sqr3).toHaveTextContent('O')
  fireEvent.click(sqr5)
  expect(sqr5).toHaveTextContent('X')
  expect(getByText('Next player: O')).toBeInTheDocument()
  fireEvent.click(sqr8)
  expect(sqr8).toHaveTextContent('O')
  expect(sqr8).toHaveClass('square-draw')
  expect(sqr0).toHaveClass('square-draw')
  expect(getByText('Draw: No winner')).toBeInTheDocument()
  expect(sqr7).toBeEmpty()
  fireEvent.click(sqr7)
  expect(sqr7).toHaveTextContent('X')
  expect(sqr7).toHaveClass('square-draw')
})

test('render history list and check sorting', () => {
  const { getAllByTestId, getByText, getByRole } = render(<Game />)

  const sqr0 = getAllByTestId('square')[0]
  const sqr1 = getAllByTestId('square')[1]
  const sqr4 = getAllByTestId('square')[4]

  const gameStart = getByText('Go to game start')
  expect(gameStart).toHaveStyle('')
  expect(getByRole('list')).toHaveTextContent(/^Go to game start/)
  fireEvent.click(sqr0)
  expect(getByText('Go to move #1 (1:1)')).toBeInTheDocument()
  fireEvent.click(sqr1)
  expect(getByText('Go to move #2 (1:2)')).toBeInTheDocument()
  fireEvent.click(sqr4)
  expect(getByText('Go to move #3 (2:2)')).toBeInTheDocument()
  fireEvent.click(getByText('Sort desc'))
  expect(getByRole('list')).toHaveTextContent(/^Go to move #3 \(2:2\)/)
  fireEvent.click(getByText('Sort asc'))
  expect(getByRole('list')).toHaveTextContent(/^Go to game start/)
  fireEvent.click(gameStart)
  expect(sqr0).toBeEmpty()
  expect(gameStart).toHaveStyle('font-weight: bold;')
})
