// start slingin' some d3 here.
var numOfAsteroids = 5;
var board = d3.select('.board')
.append('svg');
  // .attr('width', 500)
  // .attr('height', 500);

var data = [20, 20, 30, 40, 50];

var asteroids = board.selectAll('image')
.data(data)
.enter()
.append('image');

asteroids.attr('x', function(d) {
  return d;
})
.attr('y', function(d) {
  return d;
})
.attr('xlink:href', 'asteroid.png')
.attr('height', 50)
.attr('width', 50);

var data2 = [{z: 4, y: 5}, 370, 145, 600, 110];

// asteroids.data(data2)
//   .transition()
//   .duration(500)
//   .attr('x', function(d) {
//     return d;
//   })
//   .attr('y', function(d) {
//     return d;
//   });

var randomCoord = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var update = function() {
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

setInterval(update, 1000);

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
    d3.select(this).attr('cx', function(d) {
      return d.x;
    })
    .attr('cy', function(d) {
      return d.y;
    });
  });

player.call(dragPlayer);

var force = d3.layout.force()
  .gravity(0.05) 

  

// var updatePlayer = function(data) {
//   player.data(data);
//   player.attr('cx', function(d) {
//     return d[0];
//   })
//   .attr('cy', function(d) {
//     return d[1];
//   });
// };










