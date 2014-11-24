Template.shapes.created = function() {
  var self = this;
  
  self.firstEaser = new ReactiveEaser(1000);
  self.secondEaser = new ReactiveEaser(3000)
  self.finalizeEaser = new ReactiveEaser();
  
  self.shapeParams = _.times(6, function(i) {
    var point1 = {x: randomBetween(-0.5, 0.5), y: randomBetween(-0.5, 0.5)};
    var point2 = {x: randomBetween(-0.5, 0.5), y: randomBetween(-0.5, 0.5)};

    return {
      scale: self.firstEaser.interpolate(1, randomLike(0.2)),
      firstPoint: self.firstEaser.interpolate({x: 0, y: 0}, point1),
      secondPoint: self.secondEaser.interpolate({x: 0, y: 0}, point2)
    }
  });
  
  self.firstEaser.start(function() {
    self.secondEaser.bounce();
  });
    
  Blaze._getCurrentView('Template.slide').finalize = function(done) {
    self.firstEaser.stop();
    self.secondEaser.stop();
    self.finalizeEaser.start(done);
  };
}

Template.shapes.helpers({
  transform: function(index) {
    var params = Template.instance().shapeParams[index];
    var scale = params.scale();
    var point = addPoints(params.firstPoint(), params.secondPoint());
    
    var finalizeEaser = Template.instance().finalizeEaser;
    // if we are finalizing, we transition the first point back to the center
    if (index === 0 && finalizeEaser.get()) {
      scale += d3.interpolate(0, 1-scale)(finalizeEaser.get());
      point.x -= d3.interpolate(0, point.x)(finalizeEaser.get());
      point.y -= d3.interpolate(0, point.y)(finalizeEaser.get());
    }
    
    var translate = 'translate(' + SVG_WIDTH * point.x + ',' + 
      SVG_HEIGHT * point.y + ')'
    var scale = 'scale(' + SVG_WIDTH * scale + ')';
    return translate + ' ' + scale;
  },
  fade: function() {
    return Math.max(0, 1 - 3 * Template.instance().finalizeEaser.get());
  }
});