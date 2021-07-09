import { cleanup, render, screen } from '../setupTests'
import { App } from './App'

it('Renders the app', () => {
  render(<App />)

  expect(screen.getByTestId('Map')).toBeInTheDocument()

  cleanup()
})
