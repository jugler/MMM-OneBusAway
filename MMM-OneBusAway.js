//helloworld.js:

Module.register("MMM-OneBusAway",{
	// Default module config.
	defaults: {
		text: "OneBusAway Widget hello world!"
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.innerHTML = this.config.text;
		return wrapper;
	}
});