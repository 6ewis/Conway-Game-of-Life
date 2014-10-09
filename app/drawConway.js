 var $ = function(id) {
   return document.getElementById(id);
 };

 var conwayBody = $('conway');
 var clickStar = $('startConway');
 var Id;
 window.addEventListener("load", function() {
   clickStar.addEventListener('click', function() {
     Id = startConway(conwayBody);
     this.disabled = true;
   });

   $('reset').addEventListener('click', function() {
     clickStar.disabled = false;
     clearInterval(Id);
     var ctx = conwayBody.getContext('2d');
     ctx.fillStyle = "white";
     ctx.font = "16px monospace";
     ctx.clearRect(0, 0, body.width, body.height);
   });
 });

 var board = new Board();
 var randomCells = function() {
   var cell1 = new Cell(10, 10, "alive");
   var cell2 = new Cell(10, 11, "alive");
   var cell3 = new Cell(10, 12, "alive");
   board.addCells(cell1, cell2, cell3);
 };

 var startConway = function(body) {
   randomCells();
   var ctx = body.getContext('2d');
   ctx.fillStyle = "white";
   ctx.font = "16px monospace";

   drawCanvas(board, ctx);

   return setInterval(function() {
     board.applyRules(board.cells);
     ctx.clearRect(0, 0, body.width, body.height);
     drawCanvas(board, ctx);
   }, 3000);
 };

 function drawCanvas(board, ctx) {
   board.cells.forEach(function(el) {
     ctx.fillText(el[2] === 1 ? 'X' : '', el[0] * 20, el[1] * 20);
   });
 }