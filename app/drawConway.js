//drawing 

var canvas = document.getElementById('conway').getContext('2d');
canvas.strokeStyle = '#e1e1e1';
canvas.fillStyle = 'cadetblue';

init();

function init() {
    var board = new Board();
    var cells = [];
    //blinker pattern
    //var cell1 = new Cell(10,10, "alive");
    //var cell2 = new Cell(10,11, "alive");
    //var cell3 = new Cell(10,12, "alive");
    //board.addCells(cell1, cell2, cell3);
    
    //tetromino pattern
    var cell1 = new Cell(10,10, "alive");
    var cell2 = new Cell(9,10, "alive");
    var cell3 = new Cell(11,10, "alive");
    var cell4 = new Cell(10,11, "alive");
    board.addCells(cell1, cell2, cell3, cell4);
    
    for (var i=0; i<32; i++) {
        for (var j=0; j<32; j++) {
          if (board.contains(i,j,"alive")) continue;
          var cell = new Cell(i,j,"dead");
          cells.push(cell);
        }
    }
  
    
    board.cells.push.apply(board.cells,cells);
    

    setInterval(function() {draw(board);}, 2000);

}

function draw(board) {
       canvas.clearRect(0, 0, 512, 512);
        board.cells.forEach(function(cell) {
            canvas.beginPath();
            canvas.rect(cell.x*8, cell.y*8, 8, 8);
            if (cell.status === "alive") {
                canvas.fill();
            } else {
                canvas.stroke();
            }
    });
   board.applyRules();
    
}