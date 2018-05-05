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
           this.message = "No buses departing soon";
       } else{ //extract times of arrival for the buses
            var busIcon = document.createElement("img");
			busIcon.className = "badge";
			busIcon.src = "modules/MMM-OneBusAway/bus_badge.png";
            var departureMessage = "<br>";
            for(var departure in this.result){
                if (departure<5){
                    var departureDetails = this.result[departure]
                    var busShortName = departureDetails['routeShortName'];
                    var busDepartureTimeStamp = departureDetails['scheduledArrivalTime'];
                    var busDepartureDate = new Date(busDepartureTimeStamp);
                    console.log("Departure for route: " + busShortName);
                    console.log("Departure time: " + busDepartureDate);
                    var dateNow = new Date();
                    var departingInMinutes = (busDepartureDate - dateNow)/60000; //difference in minutes
                    if (departingInMinutes>0){
                        departingInMinutes = departingInMinutes.toFixed(0);
                        console.log(busShortName + ": bus departing in: " + departingInMinutes + "mins");
                        departureMessage = departureMessage + busShortName + ": " + departingInMinutes + "mins<br>";
                    }
                }
            }
            this.message = departureMessage;
       }
        var html = this.message;
        var wrapper = document.createElement("div");
        wrapper.className = "oneBusAway";
        var busesText = document.createElement("span");
        busesText.innerHTML = this.message;
        wrapper.appendChild(busIcon);
		wrapper.appendChild(busesText);
		return wrapper;
    },
    getStyles: function() {
		return ["MMM-OneBusAway.css"];
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