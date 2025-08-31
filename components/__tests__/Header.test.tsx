import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '../Header'

describe('Header', () => {
  afterEach(() => {
    document.documentElement.classList.remove('dark')
  })

  it('toggles dark mode on button click', async () => {
    render(<Header />)
    const buttons = screen.getAllByRole('button')
    const toggle = buttons[1]

    expect(document.documentElement.classList.contains('dark')).toBe(false)
    await userEvent.click(toggle)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
