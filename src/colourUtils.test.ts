import * as colourUtils from './colourUtils'
import { Goal } from './models'

describe('lightenColour', () => {
  describe('returns an appropriate colour', () => {
    it('given varying percentages', () => {
      const black = colourUtils.lightenColour('#000000', 0)
      expect(black).toBe('#000000')

      const lightBlack = colourUtils.lightenColour('#000000', 10)
      expect(lightBlack).toBe('#191919')

      const grey = colourUtils.lightenColour('#000000', 50)
      expect(grey).toBe('#7f7f7f')

      const almostWhite = colourUtils.lightenColour('#000000', 75)
      expect(almostWhite).toBe('#bfbfbf')

      const white = colourUtils.lightenColour('#000000', 100)
      expect(white).toBe('#ffffff')
    })

    it('given varying colours', () => {
      const scuba = colourUtils.lightenColour('#00b3ca', 20)
      expect(scuba).toBe('#33c2d4')

      const blue = colourUtils.lightenColour('#111189', 20)
      expect(blue).toBe('#4040a0')

      const tangerine = colourUtils.lightenColour('#f69256', 20)
      expect(tangerine).toBe('#f7a777')

      const badass = colourUtils.lightenColour('#bada55', 20)
      expect(badass).toBe('#c7e177')

      const dino = colourUtils.lightenColour('#009e49', 20)
      expect(dino).toBe('#33b16d')

      const pink = colourUtils.lightenColour('#ec008c', 20)
      expect(pink).toBe('#ef33a3')

      const yellow = colourUtils.lightenColour('#fff100', 20)
      expect(yellow).toBe('#fff333')
    })
  })
})

describe('getGenericColour', () => {
  it('when given a low number returns a color string', () => {
    const zeroCol = colourUtils.getGenericColour(0)
    expect(zeroCol).toMatch(/^#[0-9a-fA-F]{6}$/)

    const littleCol = colourUtils.getGenericColour(2)
    expect(littleCol).toMatch(/^#[0-9a-fA-F]{6}$/)
  })

  it('when given a large number returns a color string', () => {
    const bigCol = colourUtils.getGenericColour(1000)
    expect(bigCol).toMatch(/^#[0-9a-fA-F]{6}$/)
  })
})

describe('showAsIncomplete', () => {
  const pastDate = '2024-01-01'
  const currentDate = new Date().toISOString().split('T')[0] // '2024-01-01T00:00:00' >> '2024-01-01'
  const futureDate = '2999-01-01'

  describe('when goal is complete', () => {
    it('PAST date returns FALSE', () => {
      const pastGoal: Goal = {
        text: 'Test Goal',
        date: pastDate,
        completed: true,
      }

      const isIncomplete = colourUtils.showAsIncomplete(pastGoal)
      expect(isIncomplete).toBe(false)
    })

    it('CURRENT date returns FALSE', () => {
      const currentGoal: Goal = {
        text: 'Test Goal',
        date: currentDate,
        completed: true,
      }

      const isIncomplete = colourUtils.showAsIncomplete(currentGoal)
      expect(isIncomplete).toBe(false)
    })

    it('FUTURE date returns FALSE', () => {
      const futureGoal: Goal = {
        text: 'Test Goal',
        date: futureDate,
        completed: true,
      }

      const isIncomplete = colourUtils.showAsIncomplete(futureGoal)
      expect(isIncomplete).toBe(false)
    })
  })

  describe('when goal is incomplete', () => {
    it('PAST date returns TRUE', () => {
      const pastGoal: Goal = {
        text: 'Test Goal',
        date: pastDate,
        completed: false,
      }

      const isIncomplete = colourUtils.showAsIncomplete(pastGoal)
      expect(isIncomplete).toBe(true)
    })

    it('CURRENT date returns TRUE', () => {
      const currentGoal: Goal = {
        text: 'Test Goal',
        date: currentDate,
        completed: false,
      }

      const isIncomplete = colourUtils.showAsIncomplete(currentGoal)
      expect(isIncomplete).toBe(true)
    })

    it('FUTURE date returns TRUE', () => {
      const futureGoal: Goal = {
        text: 'Test Goal',
        date: futureDate,
        completed: false,
      }

      const isIncomplete = colourUtils.showAsIncomplete(futureGoal)
      expect(isIncomplete).toBe(true)
    })
  })

  describe('when completion is undefined', () => {
    it('PAST date returns TRUE', () => {
      const pastGoal: Goal = {
        text: 'Test Goal',
        date: pastDate,
      }

      const isIncomplete = colourUtils.showAsIncomplete(pastGoal)
      expect(isIncomplete).toBe(true)
    })

    it('CURRENT date returns FALSE', () => {
      const currentGoal: Goal = {
        text: 'Test Goal',
        date: currentDate,
      }

      const isIncomplete = colourUtils.showAsIncomplete(currentGoal)
      expect(isIncomplete).toBe(false)
    })

    it('FUTURE date returns FALSE', () => {
      const futureGoal: Goal = {
        text: 'Test Goal',
        date: futureDate,
      }

      const isIncomplete = colourUtils.showAsIncomplete(futureGoal)
      expect(isIncomplete).toBe(false)
    })
  })
})

describe('GetGoalCompletedCol', () => {
  const pastDate = '2024-01-01'
  const currentDate = new Date().toISOString().split('T')[0] // '2024-01-01T00:00:00' >> '2024-01-01'
  const futureDate = '2999-01-01'

  describe('when goal is complete', () => {
    it('PAST date returns GREEN', () => {
      const pastGoal: Goal = {
        text: 'Test Goal',
        date: pastDate,
        completed: true,
      }

      const col = colourUtils.getGoalCompletedCol(pastGoal)
      expect(col).toBe('green')
    })

    it('CURRENT date returns GREEN', () => {
      const currentGoal: Goal = {
        text: 'Test Goal',
        date: currentDate,
        completed: true,
      }

      const col = colourUtils.getGoalCompletedCol(currentGoal)
      expect(col).toBe('green')
    })

    it('FUTURE date returns GREEN', () => {
      const futureGoal: Goal = {
        text: 'Test Goal',
        date: futureDate,
        completed: true,
      }

      const col = colourUtils.getGoalCompletedCol(futureGoal)
      expect(col).toBe('green')
    })
  })

  describe('when goal is incomplete', () => {
    it('PAST date returns RED', () => {
      const pastGoal: Goal = {
        text: 'Test Goal',
        date: pastDate,
        completed: false,
      }

      const col = colourUtils.getGoalCompletedCol(pastGoal)
      expect(col).toBe('red')
    })

    it('CURRENT date returns RED', () => {
      const currentGoal: Goal = {
        text: 'Test Goal',
        date: currentDate,
        completed: false,
      }

      const col = colourUtils.getGoalCompletedCol(currentGoal)
      expect(col).toBe('red')
    })

    it('FUTURE date returns RED', () => {
      const futureGoal: Goal = {
        text: 'Test Goal',
        date: futureDate,
        completed: false,
      }

      const col = colourUtils.getGoalCompletedCol(futureGoal)
      expect(col).toBe('red')
    })
  })

  describe('when completion is undefined', () => {
    it('PAST date returns RED', () => {
      const pastGoal: Goal = {
        text: 'Test Goal',
        date: pastDate,
      }

      const col = colourUtils.getGoalCompletedCol(pastGoal)
      expect(col).toBe('red')
    })

    it('CURRENT date returns BLACK', () => {
      const currentGoal: Goal = {
        text: 'Test Goal',
        date: currentDate,
      }

      const col = colourUtils.getGoalCompletedCol(currentGoal)
      expect(col).toBe('black')
    })

    it('FUTURE date returns BLACK', () => {
      const futureGoal: Goal = {
        text: 'Test Goal',
        date: futureDate,
      }

      const col = colourUtils.getGoalCompletedCol(futureGoal)
      expect(col).toBe('black')
    })
  })
})
