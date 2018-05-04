"use strict";

Module.register("MMM-OneBusAway",{
    result: [],
    message: 'Loading...',
	// Default module config.
	defaults: {
        text: "OneBusAway Widget hello world!",
        stopId: "1_905",
        routes: ["1_100146","40_100236"],
        fadeSpeed: 1000
	},

	// Override dom generator.
	getDom: function() {
       if (this.result.length==0){
           Log.log("Departures list is empty");
           this.message = "No buses departing soon, please check again later";
       } else{ //extract times of arrival for the buses
            var departureMessage = "";
            for(var departure in this.result){
                var busShortName = departure['routeShortName'];
                var busDepartureTimeStamp = departure['predictedDepartureTime'];
                var busDepartureDate = new Date(busDepartureTimeStamp*1000);
                Log.log("Departure for route: " + busShortName);
                Log.log("Departure time: " + busDepartureDate);
                var dateNow = new Date();
                var departingInMinutes = (dateNow - busDepartureDate)/60000; //difference in minutes
                Log.log("Bus departing in: " + departingInMinutes + "mins");
                departureMessage = departureMessage + busShortName;
                departureMessage = departureMessage + ":" + departingInMinutes + 'mins\n';
            }
            this.message = departureMessage;
       }
        var html = this.message;
        var wrapper = document.createElement("div");
		wrapper.innerHTML = html;
		return wrapper;
    },
    
    start: function() {
        var self = this;

        self.getBusesInfo();
        setInterval(function() {
          self.getBusesInfo();
          self.updateDom();
        },  1000*60);
      },

    
    
      getBusesInfo: function () {
        this.sendSocketNotification('GET_BUSES_INFO', this.config.stopId);
      },

      socketNotificationReceived: function(notification, payload) {
        if (notification === "BUSES_INFO") {
            var self = this;
            this.result = payload;
            //this.message = this.result.toString();
            this.updateDom();
        }
      },
});