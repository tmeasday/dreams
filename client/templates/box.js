var N_LINES = 12;

Template.box.created = function() {
  this.lines = _.times(N_LINES, function(y) {
    return {
      y: y,
      x: Math.random()
    }
  });
  
  this.easer = new ReactiveEaser(d3.ease('linear'), 1000);
  this.easer.loop();
}

var currentWidth = function() {
  return Math.min(1, this.x + Template.instance().easer.get()) * 2 * SVG_WIDTH;
}

Template.box.helpers({
  lines: function() {
    return Template.instance().lines;
  },
  y: function() {
    return (1 + this.y) / (N_LINES+1) * 2 * SVG_HEIGHT - SVG_HEIGHT;
  },
  currentWidth: currentWidth,
  cx: function() {
    return currentWidth.call(this) - SVG_WIDTH;
  }
});