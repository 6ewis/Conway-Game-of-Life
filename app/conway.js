//General helpful function
function deepCopy(o) {
  var copy = Object.create(Object.getPrototypeOf(o));
  var propNames = Object.getOwnPropertyNames(o);

  propNames.forEach(function(name) {
    var desc = Object.getOwnPropertyDescriptor(o, name);
    Object.defineProperty(copy, name, desc);
  });

  return copy;
}

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
  // nextStep: function() {
  //   var tempCells = deepCopy(this.cells);
  //   tempCells.forEach(function(element,index,array){
  //      this.applyRules(element);
  //   });
  //   this.cells = tempCells;
  // },
  applyRules: function(cell) {
    if ((cell.status === "alive") && (cell.aliveNeighbourSize(this) < 2)) {
      cell.status = "dead";
    } else if ((cell.status === "alive") && (cell.aliveNeighbourSize(this) > 3)) {
      cell.status = "dead";
    } else if ((cell.status === "dead") && (cell.aliveNeighbourSize(this) === 3)) {
      cell.status = "alive";
    }
    return cell;
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