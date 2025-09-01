import { render } from '@testing-library/react'
import TodayPage from '../page'

describe('Dashboard page layout', () => {
  it('uses responsive grid and centered container', () => {
    const { container } = render(<TodayPage />)
    const wrapper = container.querySelector('main > div')
    expect(wrapper).toHaveClass('max-w-7xl')
    expect(wrapper).toHaveClass('mx-auto')

    const grid = container.querySelector('section')
    expect(grid).toHaveClass('grid-cols-1')
    expect(grid).toHaveClass('md:grid-cols-2')
    expect(grid).toHaveClass('lg:grid-cols-3')
    expect(grid).toHaveClass('xl:grid-cols-4')
  })

  it('renders only plants with due tasks', () => {
    const { queryByText } = render(<TodayPage />)
    expect(queryByText('Delilah')).toBeInTheDocument()
    expect(queryByText('Ivy')).toBeInTheDocument()
    expect(queryByText('Sunny')).not.toBeInTheDocument()
    expect(queryByText('Figgy')).not.toBeInTheDocument()
  })
})
