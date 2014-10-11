//Board
var Board = function() {
  this.cells = [];
  this.addCells = function( /* cells */ ) {
    for (var i = 0; i < arguments.length; i++) {
      this.cells.push(arguments[i]);
    }
  };
};

Board.prototype = {
  updateOriginalCells: function(changedCells) {
    changedCells.forEach(function(cell) {
        if (cell.status === "alive") {
          cell.status = "dead";
        } else {
          cell.status = "alive"; 
        }
      });
    },
  applyRules: function() {
    var changedCells = [];
    for(var i=0; i < this.cells.length ; i++) {
      var cell = this.cells[i];
      if ((cell.status === "alive") && (cell.aliveNeighbourSize(this) < 2)) {
        changedCells.push(cell)
      } else if ((cell.status === "alive") && (cell.aliveNeighbourSize(this) > 3)) {
        changedCells.push(cell)
      } else if ((cell.status === "dead") && (cell.aliveNeighbourSize(this) === 3)) {
        changedCells.push(cell)
      }
    }
    this.updateOriginalCells(changedCells);
  },
  contains: function(x, y, status) {
    return this.cells.some(function(element, index, array) {
      return (element.x === x && element.y === y && element.status === status);
    });
  }
};
// Cell
var Cell = function(x, y, status) {
  this.x = x;
  this.y = y;
  this.status = status;
};

Cell.prototype = {
  aliveNeighbourSize: function(board) {
    var size = 0;
    for (var i = -1; i < 2; i++) {
      for (var j = -1; j < 2; j++) {
        if (i === 0 && j === 0) continue;
        if (board.contains(this.x + i, this.y + j, "alive")) size++;
      }
    }
    return size;
  }
};