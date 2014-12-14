// generate the circles that we use to drive slides 6-8

Circles = new Meteor.Collection(null);

// The circles are global in that they are shared by various slides.
// 
// The current state that the circles are in is controlled by these vars:

// The bound of the cirles -- when 0, they are all inside the boundary
//   -- when 1, they are where they "want" to be.
Circles.boundaryEaser = new ReactiveEaser(d3.ease('linear'), 1000);

// The z-depth of the circles -- when 0 they are at their starting depth,
//   when it reaches 1 they have returned to that depth, via close + far
Circles.depthEaser = new ReactiveEaser(d3.ease('linear'), 3000);
Circles.depthEaser.set(0.5)

var FOCAL_DEPTH = 1;

// a circle looks like: 
// {
//   theta: angle,
//   d: distance, // radial coordinates
//   extraD: distance, // to be added when not bounded
//   radius: radius,
//   depthOffset: 0-1 // offset to be used for z-position
// }

Circles.helpers({
  // the effective size of a measurement (x,y pos / radius) given the current
  //   viewing depth (controlled by the depthEaser) + the circle's depth offset
  effective: function(measurement) {
    // 0 - 2 -- will be 0.5 when inside the boundary
    var depth = this.currentDepthOffset() + Circles.depthEaser.get();
    
    // make it between 0-1 and circular as the depthEaser changes
    var normalizedDepth = (1+depth) % 1;
  
    // make it -3 - 3 -- and 0 when inside the boundary
    var currentDepth = 1 - 2 * normalizedDepth;
    return measurement * FOCAL_DEPTH / (FOCAL_DEPTH + currentDepth);
  },
  currentDepthOffset: function() {
    return this.depthOffset * Circles.boundaryEaser.get();
  },
  r: function () {
    return Math.abs(SVG_WIDTH * this.effective(this.radius));
  },
  currentD: function() {
    return this.d + Circles.boundaryEaser.get() * this.extraD;
  },
  cx: function () {
    return SVG_WIDTH * this.effective(this.currentD() * Math.cos(this.theta));
  },
  cy: function () {
    return SVG_HEIGHT * this.effective(this.currentD() * Math.sin(this.theta));
  }
});


var RADIUS = 1

var MAX = RADIUS / 5;
var MIN = 0.04;
var SPACING = 0.015;

var TRIES = 1000;
// var TRIES = 1;

centerDistance = function(c1, c2) {
  return Math.sqrt(c1.d * c1.d + c2.d * c2.d - 
    2 * c1.d * c2.d * Math.cos(c1.theta - c2.theta));
}

circleDistance = function (c1, c2) {
  return centerDistance(c1, c2) - c1.radius - c2.radius;
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
    circle.extraD = (Math.sqrt(2) - 1) * Math.random() * RADIUS;
    
    circle.radius = Math.min(RADIUS - circle.d, MAX);
    for (var i = 0; i < circles.length; i++) {
      var distance = circleDistance(circle, circles[i]);
      circle.radius += Math.min(distance, 0);
      
      if (circle.radius < (MIN + SPACING)) {
        // too small, try again
        return makeCircle(n - 1);
      }
    }
    
    circle.radius -= SPACING;
    
    circle.depthOffset = 0.5 - Math.random();
    
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
makeCircles().forEach(function(circle) {
  Circles.insert(circle);
});
