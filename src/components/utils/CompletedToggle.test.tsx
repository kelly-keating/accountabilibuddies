import userEvent from '@testing-library/user-event'

import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CompletedToggle from './CompletedToggle'
import { setGoalComplete } from '../../firebase/db'
import { Goal } from '../../models'

vi.mock('../../firebase/db', () => ({
  setGoalComplete: vi.fn(),
}))

vi.mock('../../colourUtils', () => ({
  showAsIncomplete: vi.fn((g: Goal) => !g.completed),
}))

describe('CompletedToggle Component', () => {
  describe('renders buttons with correct state', () => {
    it('when goal is incomplete', () => {
      const mockGoal: Goal = {
        date: '2024-01-01',
        completed: false,
        text: 'Test goal',
      }
      const { container } = render(<CompletedToggle goal={mockGoal} />)
      expect(container).toMatchSnapshot()

      const markCompleteButton = screen.getByLabelText('mark completed')
      expect(markCompleteButton).toBeInTheDocument()
      expect(markCompleteButton).toBeEnabled()

      const markIncompleteButton = screen.getByLabelText('mark incomplete')
      expect(markIncompleteButton).toBeInTheDocument()
      expect(markIncompleteButton).toBeDisabled()
    })

    it('when goal is complete', () => {
      const mockGoal: Goal = {
        date: '2024-01-01',
        completed: true,
        text: 'Test goal',
      }

      const { container } = render(<CompletedToggle goal={mockGoal} />)
      expect(container).toMatchSnapshot()

      const markCompleteButton = screen.getByLabelText('mark completed')
      expect(markCompleteButton).toBeInTheDocument()
      expect(markCompleteButton).toBeDisabled()

      const markIncompleteButton = screen.getByLabelText('mark incomplete')
      expect(markIncompleteButton).toBeInTheDocument()
      expect(markIncompleteButton).toBeEnabled()
    })

    it('when completion is unknown', () => {
      const mockGoal: Goal = {
        date: '2024-01-01',
        text: 'Test goal',
      }

      const { container } = render(<CompletedToggle goal={mockGoal} />)
      expect(container).toMatchSnapshot()

      const markCompleteButton = screen.getByLabelText('mark completed')
      expect(markCompleteButton).toBeInTheDocument()
      expect(markCompleteButton).toBeEnabled()

      const markIncompleteButton = screen.getByLabelText('mark incomplete')
      expect(markIncompleteButton).toBeInTheDocument()
      expect(markIncompleteButton).toBeDisabled()
    })

    it('when goal data changes', () => {
      const mockGoal: Goal = {
        date: '2024-01-01',
        text: 'Test goal',
        completed: false,
      }

      const { container, rerender } = render(
        <CompletedToggle goal={mockGoal} />,
      )
      expect(container).toMatchSnapshot()
      const markCompleteButton = screen.getByLabelText('mark completed')
      const markIncompleteButton = screen.getByLabelText('mark incomplete')

      expect(markCompleteButton).toBeEnabled()
      expect(markIncompleteButton).toBeDisabled()

      mockGoal.completed = true
      rerender(<CompletedToggle goal={mockGoal} />)

      expect(markCompleteButton).not.toBeEnabled()
      expect(markIncompleteButton).not.toBeDisabled()

      mockGoal.completed = false
      rerender(<CompletedToggle goal={mockGoal} />)

      expect(markCompleteButton).toBeEnabled()
      expect(markIncompleteButton).toBeDisabled()
    })
  })

  describe('calls setGoalComplete', () => {
    it('when mark complete is clicked', async () => {
      const user = userEvent.setup()
      const mockGoal: Goal = {
        date: '2024-01-01',
        completed: false,
        text: 'Test goal',
      }

      render(<CompletedToggle goal={mockGoal} />)

      const markCompleteButton = screen.getByLabelText('mark completed')

      await user.click(markCompleteButton)
      expect(setGoalComplete).toHaveBeenCalledWith(mockGoal.date, true)
      expect(setGoalComplete).toHaveBeenCalledTimes(1)

      await user.click(markCompleteButton)
      expect(setGoalComplete).toHaveBeenCalledTimes(2)
    })

    it('when mark incomplete is clicked', async () => {
      const user = userEvent.setup()
      const mockGoal: Goal = {
        date: '2024-01-01',
        completed: true,
        text: 'Test goal',
      }

      const { container } = render(<CompletedToggle goal={mockGoal} />)
      expect(container).toMatchSnapshot()

      const markIncompleteButton = screen.getByLabelText('mark incomplete')

      await user.click(markIncompleteButton)
      await user.click(markIncompleteButton)
      await user.click(markIncompleteButton)

      expect(setGoalComplete).toHaveBeenCalledWith(mockGoal.date, false)
      expect(setGoalComplete).toHaveBeenCalledTimes(3)
    })

    it('only when enabled buttons are clicked', async () => {
      const user = userEvent.setup()
      const mockGoal: Goal = {
        date: '2024-01-01',
        completed: false,
        text: 'Test goal',
      }

      const { container } = render(<CompletedToggle goal={mockGoal} />)
      expect(container).toMatchSnapshot()

      const markCompleteButton = screen.getByLabelText('mark completed')
      const markIncompleteButton = screen.getByLabelText('mark incomplete')

      await user.click(markIncompleteButton)
      await user.click(markCompleteButton)
      await user.click(markIncompleteButton)
      await user.click(markIncompleteButton)

      expect(setGoalComplete).toHaveBeenCalledWith(mockGoal.date, true)
      expect(setGoalComplete).toHaveBeenCalledTimes(1)
    })
  })
})
