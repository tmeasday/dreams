Session.setDefault('visibleSlideIndex', 0);

var slideViews = [];

var previous = function() {
  Session.set('visibleSlideIndex', Session.get('visibleSlideIndex') - 1);
}

var next = function() {
  var currentIndex = Session.get('visibleSlideIndex');
  var done = function() {
    Session.set('visibleSlideIndex', currentIndex + 1);
  }
  
  if (slideViews[currentIndex].finalize) {
    slideViews[currentIndex].finalize(done);
  } else {
    done();
  }
}

$(function() {
  $('body').on('keyup', function(event) {
    if (event.which === 38) { // up
      previous();
    } else if (event.which === 40) { // down
      next();
    }
  });
})

var i = 0;
Template.slide.created = function() {
  this.index = i++;
  slideViews[this.index] = this.view;
}

Template.slide.helpers({
  visible: function() {
    var index = Template.instance().index;
    return Session.equals('visibleSlideIndex', index);
  }
});