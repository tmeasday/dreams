var RADIUS = 50;

Template.globe.created = function() {
  this.easer = new ReactiveEaser(d3.ease('sin-in-out'), 3000);
  this.easer.loop();
}

Template.globe.helpers({
  rx: function () {
    return RADIUS * Math.abs(2 * Template.instance().easer.get() - 1);
  }
});
