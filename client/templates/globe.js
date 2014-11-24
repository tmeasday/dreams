Template.globe.created = function() {
  var self = this;
  self.easer = new ReactiveEaser(d3.ease('sin-in-out'), 3000);
  self.easer.loop();
  
  Blaze._getCurrentView('Template.slide').finalize = function(done) {
    self.easer.finish(done);
  };
}

Template.globe.helpers({
  r: SVG_WIDTH,
  equatorAttrs:  {
    x1: -1 * SVG_WIDTH,
    x2: SVG_WIDTH
  },
  rx: function () {
    return SVG_WIDTH * Math.abs(2 * Template.instance().easer.get() - 1);
  }
});
