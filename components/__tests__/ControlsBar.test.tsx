import { render, fireEvent } from '@testing-library/react'
import ControlsBar from '../ControlsBar'

describe('ControlsBar', () => {
  it('calls handlers on selection', () => {
    const onGroup = jest.fn()
    const onSort = jest.fn()
    const { getAllByRole } = render(
      <ControlsBar
        groupBy="none"
        sortBy="alpha"
        onGroupChange={onGroup}
        onSortChange={onSort}
      />
    )
    const [groupSelect, sortSelect] = getAllByRole('combobox')
    fireEvent.change(groupSelect, { target: { value: 'status' } })
    fireEvent.change(sortSelect, { target: { value: 'hydration' } })
    expect(onGroup).toHaveBeenCalledWith('status')
    expect(onSort).toHaveBeenCalledWith('hydration')
  })
})
