Session.setDefault('visibleSlideIndex', 0);
transitioning = new ReactiveVar(false);

$(function() {
  $('body').on('keyup', function(event) {
    if (event.which === 38) { // up
      Session.set('visibleSlideIndex', Session.get('visibleSlideIndex') - 1);
    } else if (event.which === 40) { // down
      Session.set('visibleSlideIndex', Session.get('visibleSlideIndex') + 1);
      
      // it is the responsibility of the slide to set this to false
      transitioning.set(true);
    }
  });
})

var i = 0;
Template.slide.created = function() {
  this.index = i++;
}

Template.slide.helpers({
  visible: function() {
    var index = Template.instance().index;
    return Session.equals('visibleSlideIndex', index)
      || (transitioning.get() && Session.equals('visibleSlideIndex', index + 1));
  }
});