var ANIMATION_TIME = 10000;
var ZOOM = 2;

Template.circles.created = function () {
  this.easer = new ReactiveEaser(d3.ease('ease-in-expo'));
  this.easer.set(0);
  // this.easer.start(ANIMATION_TIME);
}

var currentZoom = function(power) {
  power = power || 1;
  // a number between 1 and ZOOM;
  var zoom = Template.instance().easer.get() * (ZOOM - 1) + 1
  return Math.pow(zoom, power);
};

Template.circles.helpers({
  boundaryWidth: function () {
    // zoom way, way faster
    return SVG_WIDTH * currentZoom(100);
  },
  circles: function () {
    return circles;
  },
  r: function () {
    return SVG_WIDTH * currentZoom(this.depth) * this.r;
  },
  cx: function () {
    return SVG_WIDTH * currentZoom(this.depth) * this.d * Math.cos(this.theta);
  },
  cy: function () {
    return SVG_WIDTH * currentZoom(this.depth) * this.d * Math.sin(this.theta);
  }
});
