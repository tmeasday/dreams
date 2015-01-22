Template.registerHelper('RADIUS', function() {
  return SVG_WIDTH;
});

Template.registerHelper('MIN_X', function() {
  return -1 * SVG_WIDTH - 0.5;
});

Template.registerHelper('MAX_X', function() {
  return SVG_WIDTH - 0.5;
});
Template.registerHelper('MIN_Y', function() {
  return -1 * SVG_HEIGHT - 0.5;
});
Template.registerHelper('MAX_Y', function() {
  return SVG_HEIGHT - 0.5;
});
Template.registerHelper('WIDTH', function() {
  return 2 * SVG_WIDTH;
});

Template.registerHelper('HEIGHT', function() {
  return 2 * SVG_HEIGHT;
});