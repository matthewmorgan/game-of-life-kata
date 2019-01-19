import {Life} from './life'

describe('Life business class can', () => {
  test('accept an input grid', () => {
    const grid = [['.']]
    expect(() => new Life(grid)).not.toThrow()
  })

  test('accept a multi-line grid', () => {
    const grid = [
      ['.'],
      ['.'],
    ]
    expect(() => new Life(grid)).not.toThrow()
  })

  test('throw on an asymmetrical multi-line grid', () => {
    const grid = [
      ['.'],
      ['.', '.'],
    ]
    expect(() => new Life(grid)).toThrow()
  })

  test('return grid when asked', () => {
    const grid = [['.']]
    const life = new Life(grid)
    expect(life.grid).toEqual([['.']])
  })

  test('accept argument to trigger grid evolution', () => {
    const grid = [['.']]
    const life = new Life(grid)
    expect(() => life.tick()).not.toThrow()
  })
})

describe('Cell evolution', () => {
  test('dead grid never changes', () => {
    const grid = [
      ['.']
    ]
    const life = new Life(grid)
    expect(life.grid).toEqual(grid)
    life.tick()
    expect(life.grid).toEqual(grid)
    life.tick()
    life.tick()
    life.tick()
    expect(life.grid).toEqual(grid)
  })

  test('live cell with no neighbors dies', () => {
    const grid = [
      ['*']
    ]
    const life = new Life(grid)
    expect(life.grid).toEqual(grid)
    life.tick()
    expect(life.grid).toEqual([['.']])
  })

  test('live cell with one neighbor dies', () => {
    const grid = [
      ['*', '*'],
    ]
    const deadGrid = [
      ['.', '.'],
    ]
    const life = new Life(grid)
    expect(life.grid).toEqual(grid)
    life.tick()
    expect(life.grid).toEqual(deadGrid)
  })

  test('live cell with two neighbors lives', () => {
    const grid = [
      ['*', '*', '*'],
    ]
    const nextGrid = [
      ['.', '*', '.'],
    ]
    const life = new Life(grid)
    expect(life.grid).toEqual(grid)
    life.tick()
    expect(life.grid).toEqual(nextGrid)
  })
  test('dead cell with three live neighbors comes to life', () => {
    const grid = [
      ['*', '.', '*'],
      ['.', '.', '.'],
      ['.', '.', '*'],
    ]
    const nextGrid = [
      ['.', '.', '.'],
      ['.', '*', '.'],
      ['.', '.', '.'],
    ]
    const life = new Life(grid)
    expect(life.grid).toEqual(grid)
    life.tick()
    expect(life.grid).toEqual(nextGrid)
  })

  test('dead cell with three live neighbors comes to life, then with no neighbors, dies', () => {
    const grid = [
      ['*', '.', '*'],
      ['.', '.', '.'],
      ['.', '.', '*'],
    ]
    const nextGrid = [
      ['.', '.', '.'],
      ['.', '*', '.'],
      ['.', '.', '.'],
    ]

    const finalGrid = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ]

    const life = new Life(grid)
    expect(life.grid).toEqual(grid)
    life.tick()
    expect(life.grid).toEqual(nextGrid)
    life.tick()
    expect(life.grid).toEqual(finalGrid)
  })

})

describe('explore some edge cases', () => {
  test('corners with no neighbors die', () => {
    const grid = [
      ['*', '.', '*'],
      ['.', '.', '.'],
      ['*', '.', '*'],
    ]

    const finalGrid = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ]
    const life = new Life(grid)
    life.tick()
    expect(life.grid).toEqual(finalGrid)
  })

  test('top edge something something', () => {
    const grid = [
      ['*', '*', '*'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ]

    const firstTick = [
      ['.', '*', '.'],
      ['.', '*', '.'],
      ['.', '.', '.'],
    ]
    const life = new Life(grid)
    life.tick()
    expect(life.grid).toEqual(firstTick)


    const secondTick = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ]
    life.tick();
    expect(life.grid).toEqual(secondTick)
  })

  test('bottom edge something something', () => {
    const grid = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['*', '*', '*'],
    ]

    const firstTick = [
      ['.', '.', '.'],
      ['.', '*', '.'],
      ['.', '*', '.'],
    ]
    const life = new Life(grid)
    life.tick()
    expect(life.grid).toEqual(firstTick)


    const secondTick = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ]
    life.tick();
    expect(life.grid).toEqual(secondTick)
  })

  test('left edge something something', () => {
    const grid = [
      ['*', '.', '.'],
      ['*', '.', '.'],
      ['*', '.', '.'],
    ]

    const firstTick = [
      ['.', '.', '.'],
      ['*', '*', '.'],
      ['.', '.', '.'],
    ]
    const life = new Life(grid)
    life.tick()
    expect(life.grid).toEqual(firstTick)


    const secondTick = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ]
    life.tick();
    expect(life.grid).toEqual(secondTick)
  })

  test('right edge something something', () => {
    const grid = [
      ['.', '.', '*'],
      ['.', '.', '*'],
      ['.', '.', '*'],
    ]

    const firstTick = [
      ['.', '.', '.'],
      ['.', '*', '*'],
      ['.', '.', '.'],
    ]
    const life = new Life(grid)
    life.tick()
    expect(life.grid).toEqual(firstTick)


    const secondTick = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ]
    life.tick();
    expect(life.grid).toEqual(secondTick)
  })

})

describe('full grid evolution', () => {
  test('full grid to start', () => {
    const grid = [
      ['*', '*', '*'],
      ['*', '*', '*'],
      ['*', '*', '*'],
    ]

    const firstTick = [
      ['*', '.', '*'],
      ['.', '.', '.'],
      ['*', '.', '*'],
    ]
    const life = new Life(grid)
    life.tick()
    expect(life.grid).toEqual(firstTick)


    const secondTick = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ]
    life.tick();
    expect(life.grid).toEqual(secondTick)
  })
})

describe('full grid evolution', () => {
  test('full grid to start', () => {
    const grid = [
      ['*', '.', '*'],
      ['*', '*', '*'],
      ['*', '.', '*'],
    ]

    const firstTick = [
      ['*', '.', '*'],
      ['*', '.', '*'],
      ['*', '.', '*'],
    ]
    const life = new Life(grid)
    life.tick()
    expect(life.grid).toEqual(firstTick)


    const secondTick = [
      ['.', '.', '.'],
      ['*', '.', '*'],
      ['.', '.', '.'],
    ]
    life.tick();
    expect(life.grid).toEqual(secondTick)

    const thirdTick = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ]
    life.tick();
    expect(life.grid).toEqual(thirdTick)
  })
})

describe('full grid evolution', () => {
  test('full grid to start', () => {
    const grid = [
      ['*', '*', '.'],
      ['.', '*', '.'],
      ['.', '*', '*'],
    ]

    const firstTick = [
      ['*', '*', '.'],
      ['.', '.', '.'],
      ['.', '*', '*'],
    ]
    const life = new Life(grid)
    life.tick()
    expect(life.grid).toEqual(firstTick)


    const secondTick = [
      ['.', '.', '.'],
      ['*', '.', '*'],
      ['.', '.', '.'],
    ]
    life.tick();
    expect(life.grid).toEqual(secondTick)
  })
})

describe('full grid evolution', () => {
  test('full grid to start', () => {
    const grid = [
      ['*', '*', '.'],
      ['.', '*', '.'],
      ['.', '*', '*'],
    ]

    const firstTick = [
      ['*', '*', '.'],
      ['.', '.', '.'],
      ['.', '*', '*'],
    ]
    const life = new Life(grid)
    life.tick()
    expect(life.grid).toEqual(firstTick)


    const secondTick = [
      ['.', '.', '.'],
      ['*', '.', '*'],
      ['.', '.', '.'],
    ]
    life.tick();
    expect(life.grid).toEqual(secondTick)
  })
})
