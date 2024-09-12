import * as dateUtils from './dateUtils'

describe('formatDate', () => {
  describe('dateToString', () => {
    it('converts a date to string YYYY-MM-DD', () => {
      const zero = new Date(0)
      const zeroConverted = dateUtils.formatDate.dateToString(zero)

      expect(zeroConverted).toBe('1970-01-01')

      const future = new Date('2024/12/18')
      const futureConverted = dateUtils.formatDate.dateToString(future)

      expect(futureConverted).toBe('2024-12-18')
    })
  })

  describe('firebaseToDisplay', () => {
    it('converts YYYY-MM-DD to DD/MM/YYYY format', () => {
      const input = '2024-12-18'
      const converted = dateUtils.formatDate.firebaseToDisplay(input)

      expect(converted).toBe('18/12/2024')
    })
  })

  describe('displayToFirebase', () => {
    it('converts DD/MM/YYYY to YYYY-MM-DD format', () => {
      const input = '18/12/2024'
      const converted = dateUtils.formatDate.displayToFirebase(input)

      expect(converted).toBe('2024-12-18')
    })
  })
})

describe('dateIs', () => {
  const pastDate = '1999-12-18'
  const todayDate = new Date().toISOString().split('T')[0] // '2024-01-01T00:00:00' >> '2024-01-01'
  const futureDate = '2999-12-18'

  describe('past', () => {
    it('returns true if the date is past', () => {
      const result = dateUtils.dateIs.past(pastDate)
      expect(result).toBe(true)
    })
    it('returns false if the date is today', () => {
      const result = dateUtils.dateIs.past(todayDate)
      expect(result).toBe(false)
    })
    it('returns false if the date is future', () => {
      const result = dateUtils.dateIs.past(futureDate)
      expect(result).toBe(false)
    })
  })

  describe('today', () => {
    it('returns false if the date is past', () => {
      const result = dateUtils.dateIs.today(pastDate)
      expect(result).toBe(false)
    })
    it('returns true if the date is today', () => {
      const result = dateUtils.dateIs.today(todayDate)
      expect(result).toBe(true)
    })
    it('returns false if the date is future', () => {
      const result = dateUtils.dateIs.today(futureDate)
      expect(result).toBe(false)
    })
  })

  describe('future', () => {
    it('returns false if the date is past', () => {
      const result = dateUtils.dateIs.future(pastDate)
      expect(result).toBe(false)
    })
    it('returns false if the date is today', () => {
      const result = dateUtils.dateIs.future(todayDate)
      expect(result).toBe(false)
    })
    it('returns true if the date is future', () => {
      const result = dateUtils.dateIs.future(futureDate)
      expect(result).toBe(true)
    })
  })
})

describe('find wednesdays', () => {
  type DateType = typeof Date
  let OriginalDate: DateType

  beforeAll(() => {
    OriginalDate = global.Date
    vi.spyOn(global, 'Date')
  })

  afterAll(() => {
    global.Date = OriginalDate
  })

  const firstWed = '2024-01-03'
  const secondWed = '2024-01-10'

  describe('getThisWednesday', () => {
    it('on TUE, gets THIS Wed', () => {
      vi.spyOn(global, 'Date').mockImplementation(
        () => new OriginalDate('2024-01-02T00:00:00Z'),
      )

      const returnedWed = dateUtils.getThisWednesday()
      expect(returnedWed).toEqual(firstWed)
    })

    it('on WED, gets CURRENT date', () => {
      vi.spyOn(global, 'Date').mockImplementation(
        () => new OriginalDate('2024-01-03T00:00:00Z'),
      )

      const returnedWed = dateUtils.getThisWednesday()
      expect(returnedWed).toEqual(firstWed)
    })

    it('on THU, gets NEXT Wed', () => {
      vi.spyOn(global, 'Date').mockImplementation(
        () => new OriginalDate('2024-01-04T00:00:00Z'),
      )

      const returnedWed = dateUtils.getThisWednesday()
      expect(returnedWed).toEqual(secondWed)
    })
  })

  describe('getNextWednesday', () => {
    it('on TUE, gets THIS Wed', () => {
      vi.spyOn(global, 'Date').mockImplementation(
        () => new OriginalDate('2024-01-02T00:00:00Z'),
      )

      const returnedWed = dateUtils.getNextWednesday()
      expect(returnedWed).toEqual(firstWed)
    })

    it('on Wed, gets NEXT Wed', () => {
      vi.spyOn(global, 'Date').mockImplementation(
        () => new OriginalDate('2024-01-03T00:00:00Z'),
      )

      const returnedWed = dateUtils.getNextWednesday()
      expect(returnedWed).toEqual(secondWed)
    })

    it('on THU, gets NEXT Wed', () => {
      vi.spyOn(global, 'Date').mockImplementation(
        () => new OriginalDate('2024-01-04T00:00:00Z'),
      )

      const returnedWed = dateUtils.getNextWednesday()
      expect(returnedWed).toEqual(secondWed)
    })
  })
})

describe('getRecentWednesdays', () => {
  type DateType = typeof Date
  let OriginalDate: DateType

  beforeAll(() => {
    OriginalDate = global.Date
    vi.spyOn(global, 'Date')
  })

  afterAll(() => {
    global.Date = OriginalDate
  })

  describe('returns five dates in reverse order', () => {
    it('starting with upcoming Wednesday', () => {
      vi.spyOn(global, 'Date').mockImplementation(
        () => new OriginalDate('2024-01-01T00:00:00Z'),
      )

      const dateArr = dateUtils.getRecentWednesdays()
      expect(dateArr).toEqual([
        '2024-01-03',
        '2023-12-27',
        '2023-12-20',
        '2023-12-13',
        '2023-12-06',
      ])
    })

    it('starting with today when called on Wednesday', () => {
      vi.spyOn(global, 'Date').mockImplementation(
        () => new OriginalDate('2024-01-10T00:00:00Z'),
      )

      const dateArr = dateUtils.getRecentWednesdays()
      expect(dateArr).toEqual([
        '2024-01-10',
        '2024-01-03',
        '2023-12-27',
        '2023-12-20',
        '2023-12-13',
      ])
    })
  })
})
