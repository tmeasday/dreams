Template.geometry.created = function() {
  transitioning.set(false);
}

Template.geometry.helpers({
  r: function() {
    return SVG_WIDTH;
  },
  rectAttributes: {
    x: -1 * SVG_WIDTH,
    y: -1 * SVG_HEIGHT,
    width: 2 * SVG_WIDTH,
    height: 2 * SVG_HEIGHT
  },
  trianglePoints: '0,' + -1 * SVG_HEIGHT + ' '  +
    SVG_WIDTH + ',' + SVG_HEIGHT*0.9 + ' ' +
    -1*SVG_WIDTH + ',' + SVG_HEIGHT*0.9 + ' '
});