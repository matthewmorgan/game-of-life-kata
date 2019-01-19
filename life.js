class Life {
  constructor(grid) {
    if (!this.validateGrid(grid)) {
      throw new Error('Grid does not validate')
    }
    this.grid = grid
  }

  validateGrid(grid) {
    return grid.every(row => row.length === grid[0].length)
  }

  tick() {
    this.grid = this.grid
      .reduce((newGrid, row, r) => {
        newGrid.push(
          row
            .reduce((newRow, cell, c) => {
              const liveNeighborCount = countLiveNeighbors({x: r, y: c, grid: this.grid})
              const cellContinues = cell === '*' && [2, 3].includes(liveNeighborCount)
              const spawnNewCell = cell === '.' && liveNeighborCount === 3
              return newRow.concat(cellContinues || spawnNewCell ? '*' : '.')
            }, [])
        )
        return newGrid
      }, [])
  }
}

function countLiveNeighbors({x, y, grid}) {
  let currentRow = grid[x] || []
  let prevRow = grid[x - 1] || []
  let nextRow = grid[x + 1] || []

  const neighbors = [
    {cells: currentRow, isOwnRow: true},
    {cells: prevRow, isOwnRow: false},
    {cells: nextRow, isOwnRow: false},
  ]

  const countLiveCells = row => [-1, 0, 1]
    .reduce((count, offset) => {
      if (offset) {
        count += row.cells[y + offset] === '*' ? 1 : 0
      } else if (!row.isOwnRow) {
        count += row.cells[y] === '*' ? 1 : 0
      }
      return count
    }, 0)

  return neighbors.reduce((count, row) => count + countLiveCells(row), 0)
}

export {Life}
