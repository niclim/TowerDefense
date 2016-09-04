// background contains the static canvas elements
var background = document.getElementById("static");
var backgroundContext = background.getContext("2d");

// Settings for the background
var settings = {
  backgroundColor: "#8CD1E6",
  pathColor: "gray"
}

// Drawing the background
backgroundContext.fillStyle = settings.backgroundColor;
backgroundContext.fillRect(0,0,background.width,background.height);

// Drawing the path - width of the path is 50px
backgroundContext.fillStyle = settings.pathColor;

backgroundContext.beginPath();
// var x = 0, y = 525;
// backgroundContext.moveTo(x, y);
// for (var i = 0; i < 12; i++) {
//   if (i % 2 === 0) {
//     // change x value
//     if ((i % 4 === 0) && (i !== 0)) {
//       x += 200;
//     } else {
//       x += 100;
//     }
//   } else {
//     // change y value
//     if (y === 525) {
//       y = 125;
//     } else {
//       y = 525;
//     }
//   }
//   backgroundContext.lineTo(x, y);
// }

// For the bottom part of the path
backgroundContext.moveTo(0, 525);

backgroundContext.lineTo(100, 525);
backgroundContext.lineTo(100, 125);// Top
backgroundContext.lineTo(200, 125);
backgroundContext.lineTo(200, 525);// Bottom
backgroundContext.lineTo(400, 525);
backgroundContext.lineTo(400, 125);// Top
backgroundContext.lineTo(500, 125);
backgroundContext.lineTo(500, 525);// Bottom
backgroundContext.lineTo(700, 525);
backgroundContext.lineTo(700, 125);// Top
backgroundContext.lineTo(800, 125);
backgroundContext.lineTo(800, 525);// Bottom

//Middle section to the side
backgroundContext.lineTo(900, 525);
backgroundContext.lineTo(900, 475);
backgroundContext.lineTo(850, 475);

// For the top part of the path
backgroundContext.lineTo(850, 75);
backgroundContext.lineTo(650, 75);
backgroundContext.lineTo(650, 475);
backgroundContext.lineTo(550, 475);
backgroundContext.lineTo(550, 75);
backgroundContext.lineTo(350, 75);
backgroundContext.lineTo(350, 475);
backgroundContext.lineTo(250, 475);
backgroundContext.lineTo(250, 75);
backgroundContext.lineTo(50, 75);
backgroundContext.lineTo(50, 475);

// End section
backgroundContext.lineTo(0, 475);

backgroundContext.fill();
// backgroundContext.lineTo();
