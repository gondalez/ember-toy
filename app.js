(function(){

	window.QueueApp = Ember.Application.create({

		ApplicationController: Ember.Controller.extend({

		}),
		ApplicationView: Ember.View.extend({
			templateName: "application"
		}),

		HomeController: Ember.Controller.extend({

		}),
		HomeView: Ember.View.extend({
			templateName: "home"
		}),

		QueueController: Ember.ArrayController.extend({
			init: function(){
				this._super(); //call base init
				this.set('content', Ember.A([1,2,3]));
			}

		}),
		QueueView: Ember.View.extend({
			templateName: "queue"
		}),

		QueueItemController: Ember.Controller.extend({

		}),
		QueueItemView: Ember.View.extend({
			templateName: "queueItem"
		}),

		Router: Ember.Router.extend({
			root: Ember.Route.extend({
				doHome: function(router, event){
					router.transitionTo("home");
				},
				doQueue: function(router, event){ 
					router.transitionTo("queue.index"); 
				},
				home: Ember.Route.extend({
					route: "/",
					connectOutlets: function(router, context) {
		            	router.get('applicationController').connectOutlet('home');
			        }
				}),
				queue: Ember.Route.extend({
					route: "/queue",
					index: Ember.Route.extend({
						route: "/",
						connectOutlets: function(router, context) {
			            	router.get('applicationController').connectOutlet('queue');
				        },
				        doQueueItem: function(router, event) {
				        	router.transitionTo("item", {value: event.context});
				        }
			        }),
					item: Ember.Route.extend({
						route: "/:value",
						connectOutlets: function(router, context) {
			            	router.get('applicationController').connectOutlet('queueItem');
			            	router.get("queueItemController").set('value', context.value);
				        },
					})
				})
			})
		})
	});

})();

$(function(){
	QueueApp.initialize();
});