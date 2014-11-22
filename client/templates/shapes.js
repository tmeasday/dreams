Template.shapes.created = function() {
  var self = this;
  
  self.firstEaser = new ReactiveEaser(1000);
  self.secondEaser = new ReactiveEaser(3000)
  
  self.shapeParams = _.times(6, function() {
    var size = randomLike(0.2);
    var x1 = randomBetween(-0.5, 0.5);
    var x2 = randomBetween(-0.5, 0.5);
    var y1 = randomBetween(-0.5, 0.5);
    var y2 = randomBetween(-0.5, 0.5);
    
    return {
      scale: interpolate(d3.interpolateNumber(1, size), self.firstEaser),
      x: function() {
        return d3.interpolateNumber(0, x1)(self.firstEaser.get())
          + d3.interpolateNumber(0, x1-x2)(self.secondEaser.get());
      },
      y: function() {
        return d3.interpolateNumber(0, y1)(self.firstEaser.get())
          + d3.interpolateNumber(0, y1-y2)(self.secondEaser.get());
      },
    }
  });
  
  self.firstEaser.start(function() {
    self.secondEaser.bounce();
  })
}

Template.shapes.helpers({
  transform: function(index) {
    var params = Template.instance().shapeParams[index];
    var translate = 'translate(' + SVG_WIDTH * params.x() + ',' + 
      SVG_HEIGHT * params.y() + ')'
    var scale = 'scale(' + SVG_WIDTH * params.scale() + ')';
    return translate + ' ' + scale;
  }
});