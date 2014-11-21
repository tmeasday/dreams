var ROWS = 7;
var COLUMNS = 8;

var coords = function(t, max) { // t between 0-1
  return max * (2 * t - 1);
}

Template.waves.created = function() {
  transitioning.set(false);
  
  this.easer = new ReactiveEaser(d3.ease('linear'), 5000);
  this.easer.loop();
}

var angle = Math.random() * 2 * Math.PI;

Template.waves.helpers({
  drops: function() {
    return _.times(ROWS * COLUMNS, _.identity);
  },
  
  dropAttrs: function() {
    var x = this / COLUMNS % 1;
    var y = Math.floor(this / COLUMNS) / ROWS;
    // real distance is the magnitude, sign indicates which side the
    //   dot is of the line
    var distance = x * Math.sin(angle) - y * Math.cos(angle);
    var easer = Template.instance().easer;
    
    return {
      cx: coords(x, SVG_WIDTH),
      cy: coords(y, SVG_HEIGHT),
      r: function() {
        var currentDist = Math.abs(2 * (0.5 - easer.get()) + distance);
        var r = 0.1 / Math.pow((1 + currentDist), 1);
        return SVG_WIDTH * r;
      }
    }
  }
});