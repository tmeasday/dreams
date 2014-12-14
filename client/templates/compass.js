var HAND_LENGTH = 0.95;
var ROTATION_SPEED = 5000;

Template.compass.created = function() {
  this.minuteEaser = new ReactiveEaser(d3.ease('linear'), ROTATION_SPEED);
  this.hourEaser = new ReactiveEaser(d3.ease('linear'), 12 * ROTATION_SPEED);
  this.minuteEaser.loop();
  this.hourEaser.loop();
}

Template.compass.helpers({
  maskPoints: function() {
    var rotation = Template.instance().minuteEaser.get();
    var points = '0,0 0,' + -2*SVG_HEIGHT + ' ' + 2*SVG_HEIGHT + ',0';
    return points;
  },
  arcPath: function() {
    var path =  'M 0 ' + -1 * SVG_HEIGHT + ' ';
    var minuteTheta = Template.instance().minuteEaser.get() * 2 * Math.PI;
    path += 'A ' + SVG_HEIGHT + ' ' + SVG_HEIGHT + ' 0 ';
    // large axis -- depends if we've made it to half way?
    path += (minuteTheta > Math.PI) ? '0 ' : '1 ';
    // sweep flag is always 0
    path += '0 ';
    // final position of the path -- somewhere around the circle
    path += SVG_HEIGHT * Math.sin(minuteTheta) + ' ' + -1 * SVG_HEIGHT * Math.cos(minuteTheta);
    return path;
  },
  minuteAttrs: function() {
    return {
      class: 'minute-hand',
      x: -0.5,
      width: 1,
      y: -1 * HAND_LENGTH * SVG_HEIGHT,
      height:  HAND_LENGTH * SVG_HEIGHT,
      transform: 'rotate(' + Template.instance().minuteEaser.get() * 360 + ')'
    }
  },
  hourAttrs: function() {
    return {
      class: 'hour-hand',
      x: -0.5,
      width: 1,
      y: 0,
      height:  HAND_LENGTH * SVG_HEIGHT,
      transform: 'rotate(' + Template.instance().hourEaser.get() * 360 + ')'
    }
  }
})