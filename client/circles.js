Template.circles.helpers({
  circles: function () {
    return circles;
  },
  cx: function () {
    return this.d * Math.cos(this.theta);
  },
  cy: function () {
    return this.d * Math.sin(this.theta);
  }
});