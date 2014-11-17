var RADIUS = 50;

Template.globe.created = function() {
  this.easer = new ReactiveEaser(d3.ease('ease-in-expo'));
  this.easer.set(0);
}

Template.globe.helpers({
  rx: function () {
    return RADIUS * Template.instance().easer.get();
  }
});

Template.globe.events({
  'click button': function (event, template) {
    template.easer.start();
  }
});