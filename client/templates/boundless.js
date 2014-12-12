var ANIMATION_TIME = 10000;
var ZOOM = 2;

Template.boundless.created = function () {
  Circles.boundaryEaser.start(function() {
    Circles.depthEaser.loop();
  });
}

var currentZoom = function(power) {
  power = power || 1;
  // a number between 1 and ZOOM;
  var zoom = Template.instance().easer.get() * (ZOOM - 1) + 1
  return Math.pow(zoom, power);
};

Template.boundless.helpers({
  circles: function () {
    return Circles.find();
  }
});
