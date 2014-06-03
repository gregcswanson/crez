var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.Router.map(function() {
  // put your routes here
  this.route('about');
  this.route('search');
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('note');
  }
});

App.IndexController = Ember.ArrayController.extend({
  
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Note = DS.Model.extend({
  note: DS.attr('string'),
  reviewedAt: DS.attr('date')
});

App.Note.FIXTURES = [
  {
    id: 1,
    note: "note 1"
  }
  ,
  {
    id: 2,
    note: "note 2"
  }
];
