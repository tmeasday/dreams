var SPEEDS = _.times(4, function() {
  return Math.floor(Math.random() * 8) + 1;
});

Template.scope.created = function() {
  this.easer = new ReactiveEaser(d3.ease('linear'), 10000);
  this.easer.loop();
}

Template.scope.helpers({
  ringRotation: function(i) {
    return Template.instance().easer.get() * SPEEDS[i] * 360;
  },
  radius: function(i) {
    return (0.7 + 0.1*i) * SVG_WIDTH;
  }
});