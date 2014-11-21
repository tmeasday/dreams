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
  triangleTransform: 'matrix(' + 2*SVG_WIDTH + ', 0, 0, ' + 2*SVG_WIDTH + ', ' 
    + (-1*SVG_WIDTH) + ', ' + (-1*SVG_WIDTH) + ')'
});