Template.snake.created = function() {
  var self = this;
  self.easer = new ReactiveEaser(d3.ease('linear'), 4000);
  self.easer.loop();
  
  Blaze._getCurrentView('Template.slide').finalize = function(done) {
    self.easer.finish(done);
  };
}

var currentWidth = function(template) {
  // runs from 0-1 4 times
  return ((Template.instance().easer.get() * 4) % 1) * 2 * SVG_WIDTH;
}

Template.snake.helpers({
  currentWidth: function() {
    return currentWidth();
  },
  cx: function() {
    return -1 * SVG_WIDTH + currentWidth();
  },
  currentRotation: function() {
    // either 0, 90, 180 or 270, as easer runs from 0-1
    return Math.floor(Template.instance().easer.get() * 4) * -90;
  }
});