Session.setDefault('visibleSlideIndex', 0);

$(function() {
  $('body').on('keyup', function(event) {
    if (event.which === 38) { // up
      Session.set('visibleSlideIndex', Session.get('visibleSlideIndex') - 1);
    } else if (event.which === 40) { // down
      Session.set('visibleSlideIndex', Session.get('visibleSlideIndex') + 1);
    }
  });
})

var i = 0;
Template.slide.created = function() {
  this.index = i++;
}

Template.slide.helpers({
  visible: function() {
    return Session.equals('visibleSlideIndex', Template.instance().index);
  }
});