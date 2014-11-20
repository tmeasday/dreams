Template.globe.created = function() {
  this.easer = new ReactiveEaser(d3.ease('sin-in-out'), 3000);
  this.easer.loop();
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
