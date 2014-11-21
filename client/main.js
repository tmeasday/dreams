Session.setDefault('visibleSlideIndex', 0);

var currentSlideTemplate;

var previous = function() {
  Session.set('visibleSlideIndex', Session.get('visibleSlideIndex') - 1);
}

var next = function() {
  var done = function() {
    Session.set('visibleSlideIndex', Session.get('visibleSlideIndex') + 1);
  }
  
  // let the current slide wrap things up, if it wants
  if (currentSlideTemplate.finalize) {
    currentSlideTemplate.finalize(done);
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
  currentSlideTemplate = this;
  this.index = i++;
}

Template.slide.helpers({
  visible: function() {
    var index = Template.instance().index;
    return Session.equals('visibleSlideIndex', index);
  }
});