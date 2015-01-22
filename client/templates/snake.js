Template.snake.created = function() {
  this.easer = new ReactiveEaser(d3.ease('linear'), 4000);
  this.easer.loop();
}

var currentWidth = function(template) {
  // runs from 0-1 4 times
  return ((Template.instance().easer.get() * 4) % 1) * 2 * SVG_WIDTH;
}

Template.snake.helpers({
  minX: -1 * SVG_WIDTH - 0.5,
  maxX: SVG_WIDTH - 0.5,
  minY: -1 * SVG_HEIGHT - 0.5,
  maxY: SVG_HEIGHT - 0.5,
  width: 2 * SVG_WIDTH,
  height: 2 * SVG_HEIGHT,
  currentWidth: function() {
    return currentWidth();
  },
  cx: function() {
    return -1 * SVG_HEIGHT + currentWidth();
  },
  currentRotation: function() {
    // either 0, 90, 180 or 270, as easer runs from 0-1
    return Math.floor(Template.instance().easer.get() * 4) * -90;
  }
});