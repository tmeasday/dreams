var N_DRIP_LINES = 10;
var N_DRIPS_PER_LINE = 3;
var MAX_PERIOD = 10000;


Template.dreams.helpers({
  dripLines: function() {
    return _.times(N_DRIP_LINES, _.identity);
  }
});


// XXX: this should probably go in the interpolated helper package
var interpolate = function(interpolator, easer) {
  return function() {
    return interpolator(easer.get());
  }
}

// kind of like an interpolator, but instead varies y between max and min in a loop
// XXX: this feels weird?
var circulator = function(x, min, max) {
  var diff = max - min;
  return function(t) {
    return min + ((x + t) % 1) * (max - min);
  }
}


Template._dreamsDripLine.created = function() {
  // no transition required
  transitioning.set(false);
  
  this.easer = new ReactiveEaser(d3.ease('linear'), randomLike(MAX_PERIOD));
  this.easer.loop();

  this.drips = [];
  for (var i = 0; i < N_DRIPS_PER_LINE; i++) {
    var startTop = (randomLike(1/3) + i)/3;
    this.drips.push({
      x: this.data * 2 * SVG_WIDTH / N_DRIP_LINES - SVG_WIDTH,
      top: interpolate(circulator(startTop, -SVG_HEIGHT, SVG_HEIGHT), this.easer),
      height: randomLike(1/4) * SVG_HEIGHT
    });
  }
};

Template._dreamsDripLine.helpers({
  drips: function() {
    return Template.instance().drips;
  },
  bottom: function() {
    return this.top() + this.height;
  }
});