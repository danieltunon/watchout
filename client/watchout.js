/*global d3*/

var numOfAsteroids = 10;
var w = 500;
var h = 500;
var highScore = 0;
var score;
var board = d3.select('.board')
  .append('svg');

var randomCoord = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var data = d3.range(numOfAsteroids).map(function() {
  return [randomCoord(50, 450), randomCoord(50, 450)];
});

var quadtree = d3.geom.quadtree();


var asteroids = board.selectAll('image')
  .data(data)
  .enter()
  .append('image')
  .attr('x', function(d) {
    return d[0];
  })
  .attr('y', function(d) {
    return d[1];
  })
  .attr('xlink:href', 'asteroid.png')
  .attr('height', 50)
  .attr('width', 50);

var moveAsteroids = function() {
  var coordData = [];
  for ( var i = 0; i < numOfAsteroids; i++ ) {
    coordData.push({
      x: randomCoord(50, 450),
      y: randomCoord(50, 450)
    });
  }

  asteroids.data(coordData)
  .transition()
  .duration(1000)
  .attr('x', function(d) {
    return d.x;
  })
  .attr('y', function(d) {
    return d.y;
  });
};

moveAsteroids();
setInterval(moveAsteroids, 1000);

var player = board.selectAll('circle')
  .data([{x: 150, y: 150}])
  .enter()
  .append('circle')
  .attr('cx', function(d) {
    return d.x;
  })
  .attr('cy', function(d) {
    return d.y;
  })
  .attr('r', 20)
  .attr('style', 'fill: red');

var dragPlayer = d3.behavior.drag()
  .on('drag', function(d) {
    d.x += d3.event.dx;
    d.y += d3.event.dy;
    d3.select(this)
      // .attr('cx', function(d) { return d.x; })
      // .attr('cy', function(d) { return d.y; })
      .attr('cx', function(d) { return d.x = Math.max(20, Math.min(w - 20, d.x)); })
      .attr('cy', function(d) { return d.y = Math.max(20, Math.min(h - 20, d.y)); });
  });

player.call(dragPlayer);

var distance = function (coord1, coord2) {
  var x = coord1[0] - coord2[0];
  var y = coord1[1] - coord2[1];
  return Math.sqrt( x * x + y * y);
};

var checkCollisions = function() {
  var enemiesCoord = asteroids.data().map(function(val) {
    return [val.x, val.y];
  });
  var playerCoord = [player.data()[0].x, player.data()[0].y];
  var nearestEnemy = quadtree(enemiesCoord, 1, -1, 501, 501).find(playerCoord);
  console.log(distance(playerCoord, nearestEnemy));
  if ( distance(playerCoord, nearestEnemy) < 70 ) {
    // collision happened
  }
};

setInterval(checkCollisions, 100);

var updateScore = function(score) {
  // if score is > high score
  if (score > highScore) {
    // update high score
    highScore = score;
  }
};

var scoreCount = setInterval(function() {
  score++;
}, 1000);


// var updatePlayer = function(data) {
//   player.data(data);
//   player.attr('cx', function(d) {
//     return d[0];
//   })
//   .attr('cy', function(d) {
//     return d[1];
//   });
// };
