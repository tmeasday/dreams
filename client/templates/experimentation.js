Template.experimentation.helpers({
  circles: function () {
    return Circles.find();
  },
  opacity: function() {
    var depth = this.normalizedDepth();
    
    if (depth < 0.2 || depth > 0.6) {
      return 0.5;
    }
    return 1;
  }
});