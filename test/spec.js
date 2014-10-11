describe("Game of life", function() {
  describe("Seed the game", function() {
    it("Creates a cell", function() {
      var cell1 = new Cell(0,0, "alive");
      expect(cell1.x).toEqual(0);
      expect(cell1.y).toEqual(0);
      expect(cell1.status).toEqual("alive");
    });
    it("Creates a board with the given cells", function() {
      var cell1 = new Cell(0,0, "alive");
      var cell2 = new Cell(0,1, "dead");
      board = new Board();
      board.addCells(cell1, cell2);
      expect(board.cells).toEqual([cell1,cell2]);
    })
  });

  describe("Next Step", function() {
    describe("utility methods",function() {
      it("#contains - check if the given living cell exist on the board", function() {
        var cell1 = new Cell(0,0,"alive");
        var cell2 = new Cell(-1,-1,"dead");
        board = new Board();
        board.addCells(cell1, cell2);
        console.log(board.cells);
        expect(board.contains(cell1.x -1, cell1.y -1, "dead")).toBe(true);
      });
      it("#neighbourSize - calculates and return the neighbour size of a cell", function() {
        //cell of interest
        var cell = new Cell(10,11, "alive");
        //neighbours alive
        var cell2 = new Cell(10,10, "alive");
        var cell3 = new Cell(10,12, "alive");
        var cell4 = new Cell(-1,-1, "alive");
        //neigbours dead
        var cell5 = new Cell(0,1, "dead");
        var cell6 = new Cell(0,-1, "dead");
        var cell7 = new Cell(1,1, "dead");
        var cell8 = new Cell(1,0, "dead");
        var cell9 = new Cell(1,-1,"dead");
        board = new Board();
        board.addCells(cell, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9);
        console.log(board.cells);
        expect(cell.aliveNeighbourSize(board)).toEqual(2);
      });
    });
    describe("#applyRules - change the cell status based on Conway's Game of Life Rules",function() {
      describe("Any live cell with fewer than two live neighbours dies, as if caused by under-population.", function() {
        it("The cell dies with 0 live neighbours", function() {
          var cell1 = new Cell(0,0, "alive");
          var board = new Board();
          board.addCells(cell1);
          board.applyRules();
          expect(cell1.status).toEqual("dead");
        });
        it("The cell dies with 1 live neighbours", function() {
          var cell1 = new Cell(0,0, "alive");
          var cell2 = new Cell(0,1, "alive");
          var cell3 = new Cell(0,2, "dead");
          board = new Board();
          board.addCells(cell1, cell2, cell3);
          board.applyRules();
          expect(cell1.status).toEqual("dead");
        });

      });
      describe("Any live cell with two or three live neighbours lives on to the next generation.",function() {
        it("A live cell with two live neighbours lives on", function() {
          var cell1 = new Cell(0,0, "alive");
          var cell2 = new Cell(0,1, "alive");
          var cell3 = new Cell(0,-1, "alive");
          board = new Board();
          board.addCells(cell1, cell2, cell3);
          board.applyRules();
          expect(cell1.status).toEqual("alive");
        });
        it("A live cell with three live neighbours lives on", function() {
          var cell1 = new Cell(0,0, "alive");
          var cell2 = new Cell(0,1, "alive");
          var cell3 = new Cell(0,-1, "alive");
          var cell4 = new Cell(-1,-1, "alive");
          board = new Board();
          board.addCells(cell1, cell2, cell3, cell4);
          board.applyRules();
          expect(cell1.status).toEqual("alive");
        });
      });
      describe("Any live cell with more than three live neighbours dies, as if by overcrowding.",function() {
        it("A live cell with more than three live neighbours die", function() {
          var cell1 = new Cell(0,0, "alive");
          var cell2 = new Cell(0,1, "alive");
          var cell3 = new Cell(0,-1, "alive");
          var cell4 = new Cell(-1,-1, "alive");
          var cell5 = new Cell(1,1, "alive");
          board = new Board();
          board.addCells(cell1, cell2, cell3, cell4, cell5);
          board.applyRules();
          expect(cell1.status).toEqual("dead");
        })
      });
      describe("Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.", function() {
        it("A dead cell with four or more live neighbours stay dead", function() {
          var cell1 = new Cell(0,0, "dead");
          var cell2 = new Cell(0,1, "alive");
          var cell3 = new Cell(0,-1, "alive");
          var cell4 = new Cell(-1,-1, "alive");
          var cell5 = new Cell(1,1, "alive");
          board = new Board();
          board.addCells(cell1, cell2, cell3, cell4, cell5);
          board.applyRules();
          expect(cell1.status).toEqual("dead");
        });
        it("a dead cell with only three live neighbours revive", function() {
          var cell1 = new Cell(0,0, "dead");
          var cell2 = new Cell(0,1, "alive");
          var cell3 = new Cell(0,-1, "alive");
          var cell4 = new Cell(-1,0, "alive");
          board = new Board();
          board.addCells(cell1, cell2, cell3, cell4);
          board.applyRules();
          expect(cell1.status).toEqual("alive");
        });  
      });
    });
    describe("#nextStep - it updates the board cells as a representation of the next step", function() {
      it("shows the blinker pattern", function() {
        var cell1 = new Cell(10,0, "alive");
        var cell2 = new Cell(10,1, "alive");
        var cell3 = new Cell(10,2, "alive");

        board = new Board();
        board.addCells(cell1, cell2, cell3);
        board.applyRules();
        expect(cell1.status).toEqual("dead");
        expect(cell2.status).toEqual("alive");
        expect(cell3.status).toEqual("dead");
      });
    });
  });
});