var WHEEL_RADIUS = 0.3 * SVG_WIDTH;
var WHEEL_DISTANCE = 0.8 * SVG_WIDTH;
var PISTON_OFFSET = 0.1 * SVG_WIDTH;

Template.bike.created = function() {
  this.easer = new ReactiveEaser(d3.ease('linear'), 2000);
  this.easer.loop();
}

Template.bike.helpers({
  wheelOneX: -0.5 * WHEEL_DISTANCE,
  wheelTwoX: 0.5 * WHEEL_DISTANCE,
  wheelRotation: function() {
    return Template.instance().easer.get() * 360;
  },
  distance: WHEEL_DISTANCE,
  pistonTranslation: function() {
    var p = Template.instance().easer.get();
    var x = Math.cos(2 * Math.PI * p) * PISTON_OFFSET;
    var y = Math.sin(2 * Math.PI * p) * PISTON_OFFSET;
    return x + ',' + y;
  }
});

Template.bikeWheel.helpers({
  radius: WHEEL_RADIUS,
  rectAttrs: {
    x: -1 * WHEEL_RADIUS,
    y: 0,
    width: 2 * WHEEL_RADIUS,
    height: 1
  }
});