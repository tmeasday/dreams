var RADIUS = 1000

var MAX = 500;
var MIN = 20;
var SPACING = 10;

var TRIES = 10;

var circleDistance = function(c1, c2) {
  return Math.sqrt(c1.d * c1.d + c2.d * c2.d - 
    2 * c1.d * c2.d * Math.cos(c1.theta - c2.theta));
}

var makeCircles = function() {
  var circles = [];
  
  var makeCircle = function(n) {
    // couldn't find one
    if (n < 0)
      return false;
    
    var circle = {};
    // choose a random point that's not inside a circle
    
    // XXX: is it possible to work out the point *furthest* from all other circles?
    
    // XXX: could try the angle that's furthest from all other angles?
    // XXX: could try each angle that's half-way between two other angles?
    circle.theta = Math.random() * 2 * Math.PI; // between 0 and 2pi
    
    // XXX: it wouldn't be too hard to calculate the best distance to use
    //   - figure out the points along the arc where the other circles intersect
    //     and take the mid point of the biggest gap (is that right?)
    circle.d = Math.random() * RADIUS;
    
    circle.r = RADIUS - circle.d;
    for (var i = 0; i < circles.length; i++) {
      circle.r = Math.min(circle.r, circleDistance(circle, circles[i]) - SPACING);
      if (circle.r < MIN) {
        // too small, try again
        return makeCircle(n - 1);
      }
    }
    
    return circle;
  }
  
  while (true) {
    var circle = makeCircle(TRIES);
    if (! circle)
      return circles;
    
    circles.push(circle)
  }
}

var drawCircles = function($svg, circles) {
  _.each(circles, function(circle) {
    var $circle = $('<circle>')
      .attr('r', circle.r)
      .attr('cx', circle.d * Math.cos(circle.r))
      .attr('cy', circle.d * Math.sin(circle.r))
      .appendTo($svg);
  });
}

Meteor.startup(function() {
  var circles = makeCircles();
  console.log(circles)
  var $svg = $('svg');
  drawCircles($svg, circles);
});