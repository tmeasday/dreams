var RADIUS = 1000

var MAX = RADIUS / 5;
var MIN = 40;
var SPACING = 15;

var TRIES = 1000;

centerDistance = function(c1, c2) {
  return Math.sqrt(c1.d * c1.d + c2.d * c2.d - 
    2 * c1.d * c2.d * Math.cos(c1.theta - c2.theta));
}

circleDistance = function (c1, c2) {
  return centerDistance(c1, c2) - c1.r - c2.r;
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
    
    circle.r = Math.min(RADIUS - circle.d, MAX);
    for (var i = 0; i < circles.length; i++) {
      var distance = circleDistance(circle, circles[i]);
      circle.r += Math.min(distance, 0);
      
      if (circle.r < (MIN + SPACING)) {
        // too small, try again
        return makeCircle(n - 1);
      }
    }
    
    circle.r -= SPACING;
    
    return circle;
  }
  
  while (true) {
    var circle = makeCircle(TRIES);
    if (! circle) 
      return circles;
    
    circles.push(circle);
  }
}


// we just do this once at the start
circles = makeCircles();
